const baseUrl = process.env.NODE_ENV == 'production' ? 'https://vdev-iso.herokuapp.com/api/': 'http://127.0.0.1:8000/api/';
import Axios from "axios";

export default class OrganizationsService {
  getOrganizationInfo(organizationId){
    return Axios.get(`${baseUrl}organizations/${organizationId}`);
  }

  getSessionsForOrganization(organizationId){
    return Axios.get(`${baseUrl}organizations/${organizationId}/sessions`);
  }
}