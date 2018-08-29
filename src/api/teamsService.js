const baseUrl = process.env.NODE_ENV == 'production' ? 'https://vdev-iso.herokuapp.com/api/': 'http://127.0.0.1:8000/api/';
import Axios from "axios";

export default class TeamsService {
  createTeam(players, teamName){
    return Axios.post(`${baseUrl}teams`, {
      name: teamName,
      player1_id: players[0],
      player2_id: players[1],
      player3_id: players[2],
      player4_id: players[3],
      player5_id: players[4],
      drill_id: 1
    }).then(function(response){
      return response;
    });
  }
}