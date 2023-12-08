/**
 * GetOragnizationUsers API
 */
 import API from "../../../api";
 import ENDPOINTS from "../../../../config/apiendpoint";
 import constants from "../../../constants";
  
 export default class NotificationAPI extends API {
    constructor( timeout = 2000) {
      super("GET", timeout, false);
    //   this.type = constants.GET_ORGANIZATION_USERS;
      this.endpoint = `https://backend.dev.shoonya.ai4bharat.org/notifications/`;
    }
  
    processResponse(res) {
      super.processResponse(res);
      if (res) {
          this.organizationMembers = res;
      }
  }
  
    apiEndPoint() {
      return this.endpoint;
    }
 
    getBody() {}
  
    getHeaders() {
      this.headers = {
        headers: {
          "Content-Type": "application/json",
          "Authorization":`JWT ${localStorage.getItem('shoonya_access_token')}`
        },
      };
      return this.headers;
    }
  
    getPayload() {
      return this.organizationMembers;
    }
  }
  