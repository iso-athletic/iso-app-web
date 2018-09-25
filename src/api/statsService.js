const baseUrl = process.env.NODE_ENV == 'production' ? 'https://vdev-iso.herokuapp.com/api/': 'http://127.0.0.1:8000/api/';
import Axios from "axios";

export default class StatsService {
  getStatsForDrills(drillId){
    return Axios.get(`${baseUrl}drills/${drillId}/stats`);
  }
}