import Request from 'request'

export default class getAPI {

  getTestData(){
    Request.get("https://bvouobiy16.execute-api.us-east-1.amazonaws.com/dev", (error, response, body) => {
      if(error) {
        console.log(error);
      }else {console.log(JSON.parse(body))};
    });
  }

  getActions(){
    
  }

}
