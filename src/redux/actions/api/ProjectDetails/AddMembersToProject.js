/**
 * API to add members to a project
 */
import API from "../../../api";
import ENDPOINTS from "../../../../config/apiendpoint";
import constants from "../../../constants";

export default class AddMembersToProjectAPI extends API {
  constructor(projectId, userEmails, timeout = 2000) {
    super("POST", timeout, false);
    this.type = constants.ADD_MEMBERS_TO_PROJECT;
    this.emails = userEmails;
    this.endpoint = `${super.apiEndPointAuto()}${
      ENDPOINTS.getProjects
    }${projectId}/add_project_users/`;
  }

  processResponse(res) {
    super.processResponse(res);
    if (res) {
      this.msg = res;
    }
  }

  apiEndPoint() {
    return this.endpoint;
  }

  getBody() {
    return {
      emails: this.emails,
    };
  }

  getHeaders() {
    this.headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("shoonya_access_token")}`,
      },
    };
    return this.headers;
  }

  getPayload() {
    return this.msg;
  }
}