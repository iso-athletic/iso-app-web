const baseUrl = process.env.NODE_ENV == 'production' ? 'https://vdev-iso.herokuapp.com/api/': 'http://127.0.0.1:8000/api/';
import Axios from "axios";

export default class PlayersService {
  getOrganizationPlayers(organizationId) {
    var temp = `${baseUrl}organizations/${organizationId}/players`;
    return Axios.get(temp);
  }
  
}