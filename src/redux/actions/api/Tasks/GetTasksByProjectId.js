/**
 * GetTasksByProjectId
 */

 import API from "../../../api";
 import ENDPOINTS from "../../../../config/apiendpoint";
import constants from "../../../constants";
 
 export default class GetTasksByProjectIdAPI extends API {
   constructor(projectId, pageNo, countPerPage, taskStatus, timeout = 2000) {
     super("GET", timeout, false);
     this.type = constants.GET_TASK_LIST;
     const queryString = `?project_id=${projectId}${pageNo ? "&page="+pageNo : ""}${countPerPage ?"&records="+countPerPage : ""}${taskStatus ?"&task_status="+taskStatus : ""}`
     this.endpoint = `${super.apiEndPointAuto()}${ENDPOINTS.getTasks+queryString}`;
   }
 
   processResponse(res) {
     super.processResponse(res);
     if (res) {
         this.taskList = res;
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
     return this.taskList
   }
 }
 