const baseUrl = process.env.NODE_ENV == 'production' ? 'https://vdev-iso.herokuapp.com/api/': 'http://127.0.0.1:8000/api/';
import Axios from "axios";

export default class EventsService {
  createEvent(playerId, teamId, actionId, drillId, location, timestamp){
    return Axios.post(`${baseUrl}drills/${drillId}/events`, {
      action_id: actionId,
      player_id: playerId,
      team_id: teamId,
      location: location,
      timestamp: timestamp
    });
  }

  getAllShots(organizationId, dateFrom, dateTo){
    return Axios.get(`${baseUrl}organizations/${organizationId}/events/${dateFrom}-${dateTo}/shots`, {})
  }
}
