const constants = {
  CHECK_LOGIN_CREDENTIALS: "CHECK_LOGIN_CREDENTIALS",
  APISTATUS: "APISTATUS",
  GET_PROJECT_DATA:"GET_PROJECT_DATA",
  GET_WORKSPACES_DATA:"GET_WORKSPACES_DATA",
  GET_LOGGED_IN_USER_DATA:"GET_LOGGED_IN_USER_DATA",
  GET_USER_ANALYTICS:"GET_USER_ANALYTICS",
  GET_PROJECT_DETAILS:"GET_PROJECT_DETAILS",
  GET_PROJECT_REPORT:"GET_PROJECT_REPORT",
  ADD_MEMBERS_TO_PROJECT:"ADD_MEMBERS_TO_PROJECT",
  ADD_MEMBERS_TO_WORKSPACE:"ADD_MEMBERS_TO_WORKSPACE",
  ASSIGN_MANAGER_TO_WORKSPACE:"ASSIGN_MANAGER_TO_WORKSPACE",
  GET_TASK_LIST:"GET_TASK_LIST",
  GET_WORKSPACE_PROJECT_DATA:"GET_WORKSPACE_PROJECT_DATA",
  GET_WORKSPACE_ANNOTATORS_DATA:"GET_WORKSPACE_ANNOTATORS_DATA",
  GET_WORKSPACE_MANAGERS_DATA:"GET_WORKSPACE_MANAGERS_DATA",
  GET_WORKSPACE_DETAILS:"GET_WORKSPACE_DETAILS",
  GET_WORKSPACE_USER_REPORTS:"GET_WORKSPACE_USER_REPORTS",
  GET_WORKSPACE_PROJECT_REPORTS:"GET_WORKSPACE_PROJECT_REPORTS",
  GET_TASK_PREDICTION:"GET_TASK_PREDICTION",
  GET_LANGUAGES:"GET_LANGUAGES",
  GET_ORGANIZATION_USERS:"GET_ORGANIZATION_USERS",
  GET_DATASET_LIST:"GET_DATASET_LIST",
  GET_TASK_DETAILS:"GET_TASK_DETAILS",
  GET_DATASET_DETAILS:"GET_DATASET_DETAILS",
  GET_DATAITEMS_BY_ID:"GET_DATAITEMS_BY_ID",
  GET_DATASETS_BY_TYPE:"GET_DATASETS_BY_TYPE",
  GET_PROJECT_DOMAINS:"GET_PROJECT_DOMAINS",
  GET_DATASET_FIELDS:"GET_DATASET_FIELDS",
  GET_LANGUAGE_CHOICES:"GET_LANGUAGE_CHOICES",
  CREATE_PROJECT:"CREATE_PROJECT",
  DOWNLOAD_PROJECT_CSV:"DOWNLOAD_PROJECT_CSV",
  DOWNLOAD_PROJECT_ANNOTATIONS:"DOWNLOAD_PROJECT_ANNOTATIONS",
  EDIT_ORGANIZATION_USERS:"EDIT_ORGANIZATION_USERS",
  FILTER_TASKS:"FILTER_TASKS",
  POST_ANNOTATION: "POST_ANNOTATION",
  UPDATE_ANNOTATION: "UPDATE_ANNOTATION",
  DELETE_ANNOTATION: "DELETE_ANNOTATION",
  GET_NEXT_TASK: "GET_NEXT_TASK",
  UPDATE_TASK: "UPDATE_TASK",
  GET_TASK_ANNOTATIONS: "GET_TASK_ANNOTATIONS",
  PULL_NEW_BATCH: "PULL_NEW_BATCH",
  PULL_NEW_REVIEW_BATCH: "PULL_NEW_REVIEW_BATCH",
  DE_ALLOCATE_TASKS: "DE_ALLOCATE_TASKS",
  DE_ALLOCATE_REVIEW_TASKS: "DE_ALLOCATE_REVIEW_TASKS",
  INVITE_USERS_TO_ORG: "INVITE_USERS_TO_ORG",
  SEARCH_PROJECT_CARDS:"SEARCH_PROJECT_CARDS",
  GET_ORGANIZATION_USER_REPORTS: "GET_ORGANIZATION_USER_REPORTS",
  GET_ORGANIZATION_PROJECT_REPORTS: "GET_ORGANIZATION_PROJECT_REPORTS",
  UPDATE_EMAIL: "UPDATE_EMAIL",
  VERIFY_EMAIL: "VERIFY_EMAIL",
  GET_DATASET_PROJECTS: "GET_DATASET_PROJECTS",
  GET_DATASET_MEMBERS: "GET_DATASET_MEMBERS",
  GET_DATASET_DOWNLOAD_CSV: "GET_DATASET_DOWNLOAD_CSV",
  CREATE_NEW_DATASET_INSTANCE:"CREATE_NEW_DATASET_INSTANCE",
  GET_DATASET_TYPE:"GET_DATASET_TYPE",
  UPLOAD_DATA:"UPLOAD_DATA",
  GET_FILE_TYPES:"GET_FILE_TYPES",
  CHANGE_PASSWORD:"CHANGE_PASSWORD",
  FETCH_USER_BY_ID:"FETCH_USER_BY_ID",
  SET_TASK_FILTER: "SET_TASK_FILTER",
  GET_ARCHIVE_PROJECT:"GET_ARCHIVE_PROJECT",
  TASK_REVIEWS: "TASK_REVIEWS",
  ADD_PROJECT_REVIEWERS: "ADD_PROJECT_REVIEWERS",
  DOWNLOAD_PROJECT_JSON:"DOWNLOAD_PROJECT_JSON",
  FORGOT_PASSWORD:"FORGOT_PASSWORD",
  CONFIRM_FORGOT_PASSWORD:"CONFIRM_FORGOT_PASSWORD",
  SIGN_UP_PAGE:"SIGN_UP_PAGE",
  ARCHIVE_WORKSPACE:"ARCHIVE_WORKSPACE",
  REMOVE_PROJECT_MEMBER:"REMOVE_PROJECT_MEMBER",
  REMOVE_PROJECT_REVIEWER:"REMOVE_PROJECT_REVIEWER",
  GET_WORKSPACE_DATA:"GET_WORKSPACE_DATA",
  AUTOMATE_DATASETS:"AUTOMATE_DATASETS",
  GET_INDIC_TRANS_LANGUAGES: "GET_INDIC_TRANS_LANGUAGES",
  CUMULATIVE_TASK_DATA:"CUMULATIVE_TASK_DATA",
  PERODICAL_TASK_DATA:"PERODICAL_TASK_DATA",
  GET_DATASET_LOGS: "GET_DATASET_LOGS",
  GET_PROJECT_LOGS: "GET_PROJECT_LOGS",
  DOWNLOAD_PROJECT_TSV:"DOWNLOAD_PROJECT_TSV",
  GET_DATASET_DOWNLOAD_TSV:"GET_DATASET_DOWNLOAD_TSV",
  GET_DATASET_DOWNLOAD_JSON:"GET_DATASET_DOWNLOAD_JSON",
  TOGGLE_MAILS:"TOGGLE_MAILS",
  GET_ORGANIZATION_ANNOTATOR_QUALITY:"GET_ORGANIZATION_ANNOTATOR_QUALITY",
  FIND_AND_REPLACE:"FIND_AND_REPLACE",
  GET_RECENT_TASKS:"GET_RECENT_TASKS",
  DATASET_SEARCH_POPUP:"DATASET_SEARCH_POPUP",
  GET_ALL_TASKS:"GET_ALL_TASKS",
  GLOSSARY_SENTENCE:"GLOSSARY_SENTENCE",
  GET_ALL_DOMAINS:"GET_ALL_DOMAINS",
  GET_PROJECT_TYPE_DETAILS:"GET_PROJECT_TYPE_DETAILS",
  FETCH_TASK_ANALYTICS_DATA:"FETCH_TASK_ANALYTICS_DATA",
  FETCH_META_ANALYTICS_DATA:"FETCH_META_ANALYTICS_DATA",
  GET_USER_DETAILS:"GET_USER_DETAILS",
  PULL_NEW_SUPER_CHECKER_BATCH:"PULL_NEW_SUPER_CHECKER_BATCH",
  DE_ALLOCATE_SUPERCHECKER_TASKS:"DE_ALLOCATE_SUPERCHECKER_TASKS",
  GET_DATASET_PROJECT_REPORTS:"GET_DATASET_PROJECT_REPORTS",
  WS_CUMULATIVE_TASK: "WS_CUMULATIVE_TASK",
  WS_META_ANALYTICS: "WS_META_ANALYTICS",
  WS_PERODICAL_TASK: "WS_PERODICAL_TASK",
  WS_TASK_ANALYTICS: "WS_TASK_ANALYTICS",
  SEND_ORGANIZATION_USER_REPORTS: "SEND_ORGANIZATION_USER_REPORTS",
  SEND_WORKSPACE_USER_REPORTS: "SEND_WORKSPACE_USER_REPORTS",
  GET_SCHEDULED_MAILS: "GET_SCHEDULED_MAILS",
  CREATE_SCHEDULED_MAILS: "CREATE_SCHEDULED_MAILS",
  UPDATE_SCHEDULED_MAILS: "UPDATE_SCHEDULED_MAILS",
  DELETE_SCHEDULED_MAILS: "DELETE_SCHEDULED_MAILS",
  PLAYER: "PLAYER",
  GET_ANNOTATIONS_TASK:"GET_ANNOTATIONS_TASK",
  SUBTITLES: "SUBTITLES",
  PATCH_ANNOTATION:"PATCH_ANNOTATION",
  PLAYER: "PLAYER",
  GET_ANNOTATIONS_TASK:"GET_ANNOTATIONS_TASK",
  SUBTITLES: "SUBTITLES",
  PATCH_ANNOTATION:"PATCH_ANNOTATION",
  NEXT_PROJECT:"NEXT_PROJECT",
  GET_SCHEDULED_MAILS: "GET_SCHEDULED_MAILS",
  CREATE_SCHEDULED_MAILS: "CREATE_SCHEDULED_MAILS",
  UPDATE_SCHEDULED_MAILS: "UPDATE_SCHEDULED_MAILS",
  DELETE_SCHEDULED_MAILS: "DELETE_SCHEDULED_MAILS",
};

export default constants;
