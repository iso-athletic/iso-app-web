const baseUrl = process.env.NODE_ENV == 'production' ? 'https://vdev-iso.herokuapp.com/api/': 'http://127.0.0.1:8000/api/';
import Axios from "axios";
import moment from "moment";

export default class DrillsService {
  
  constructor(){
    this.createDrill = this.createDrill.bind(this);
    this.endSession = this.endSession.bind(this);
  }

  createSession(organizationId, name){
    return Axios.post(`${baseUrl}sessions`, {
      start_time: moment().format('YYYY-MM-DD HH:mm:ss Z'),
      organization_id: organizationId
    }).then((response) => {
      this.createDrill(response.data.id, name);
    });
  }

  createDrill(sessionId, name){
    return Axios.post(`${baseUrl}sessions/${sessionId}/drills`, {
      type: name,
      start_time: moment().format('YYYY-MM-DD HH:mm:ss Z')
    }).then((response) => {
      localStorage.setItem("drill_id", response.data.id);
    });
  }

  endDrill(drillId){
    return Axios.put(`${baseUrl}drills/${drillId}`, {
      end_time: moment().format('YYYY-MM-DD HH:mm:ss Z')
    }).then((response) => {
      this.endSession(response.data[1][0].session_id); // something weird with the data that is returning more than just the drill
    })
  }

  endSession(sessionId){
    return Axios.put(`${baseUrl}sessions/${sessionId}`, {
      end_time: moment().format('YYYY-MM-DD HH:mm:ss Z')
    });
  }
}