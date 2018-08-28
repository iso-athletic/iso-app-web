const baseUrl = 'https://vdev-iso.herokuapp.com/api/';
import Axios from "axios";

export default class PlayersService {
  getOrganizationPlayers(organizationId) {
    return Axios.get(baseUrl + 'organizations/' + organizationId.toString() + '/players');
  }
  
}