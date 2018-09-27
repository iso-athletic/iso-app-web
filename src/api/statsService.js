const baseUrl = process.env.NODE_ENV == 'production' ? 'https://vdev-iso.herokuapp.com/api/': 'http://127.0.0.1:8000/api/';
import Axios from "axios";

export default class StatsService {
  getStatsForDrills(organizationId, fromDate, toDate){
    return Axios.get(`${baseUrl}organizations/${organizationId}/stats/${fromDate}-${toDate}`);
  }

  updateStatsTable(){
    return Axios.put(`${baseUrl}stats`, {});
  }  
}