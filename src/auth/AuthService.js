import auth0 from 'auth0-js'
import { AUTH_CONFIG } from './auth0-variables'
import EventEmitter from 'EventEmitter'
import router from './../router'

export default class AuthService {

  authenticated = this.isAuthenticated();
  authNotifier = new EventEmitter();

  organizationId = null;

  constructor() {
    this.login = this.login.bind(this);
    this.setSession = this.setSession.bind(this);
    this.logout = this.logout.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: window.location.protocol + '//' + window.location.host + '/' + 'callback',
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    responseType: 'token id_token',
    scope: 'openid profile email',
  })

  login() {
    this.auth0.popup.authorize({
    }, function (err, result) {
      console.log(err, result);
    });
  }

  getUserInfo(authResult) {
    return new Promise((fulfill, reject) => {
      this.auth0.client.userInfo(authResult.accessToken, (err, user) => {
        fulfill(user);
        reject(err)
      });
    });
  }

  handleAuthentication() {
    this.auth0.parseHash(window.location.hash, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.getUserInfo(authResult).then((user) => {
          console.log(user);
          localStorage.setItem('organization_id', user['https://iso-athletic:auth0:com/organization_id']);
          this.setSession(authResult);
          window.opener.location.reload(true);
          window.close();
          e.preventDefault();
        });
      } else if (err) {
        router.replace('home')
        console.log(err)
      }
    })
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    )
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
    this.authNotifier.emit('authChange', { authenticated: true })
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.clear();
    this.userProfile = null;
    this.authNotifier.emit('authChange', false)
    // navigate to the home route
    router.replace('home')
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }
}
