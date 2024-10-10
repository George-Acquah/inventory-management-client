export const ENTITY_TYPES = {
  USERS: {
    ALL: "all",
    ADMIN: "admin",
    OWNERS: "owners",
    CUSTOMERS: "customers",
    UNVERIFIED: "unvierified",
  },
};

const SEARCH_PARAMS: _ISearchParams = {
  SESSION: "session-modals",
  ERROR: "error-modals",
  ERR_MSG: "err-msg",
  ERR_DESC: "err-description",
  BTN_LABEL: "btn-label",
  ENTITY_TYPE: "type",
  QUERY: "q",
  FORM_STEP: "step",
};

export const SEARCH_COOKIES_KEYS = {
  ENTITY_TYPE: "base-url-type",
};

export { SEARCH_PARAMS };
