export const ROUTES = Object.freeze({
  DASHBOARD: "dashboard",
  MY_APPLICATION: "my-application",
  PROFILE: "profile",
  APPLICATIONS: "applications",
  MASTERS: "masters",
  DISTRICTS: "districts", 
  CONSTITUENCIES: "constituencies", 
  PANCHAYATS: "panchayats",
  VILLAGES: "villages",
  CONTACT: "contact",
});

export const UserType = Object.freeze({
  STUDENT: 1,
  ADMIN: 2,
});

  export const QUERY_TAGS = Object.freeze({
    APP: "app",
    ADMIN: "admin",
    DASHBOARD: "dashboard",
    MY_APPLICATION: "my-application",
    PROFILE: "profile",
    APPLICATIONS: "applications",
    MASTERS: "masters",
    DISTRICTS: "districts",
    CONSTITUENCIES: "constituencies",
    PANCHAYATS: "panchayats",
    VILLAGES: "villages",
    
    CONTACT: "contact",
});

export const ChannelType = Object.freeze({
  WHATSAPP: 1,
  EMAIL: 2,
  SMS: 3,
});

export const STATUS = Object.freeze({
  Yes: true,
  No: false,
});

export const CONTACT_STATUS = Object.freeze({
  PENDING: 1,
  REVIEWED: 2,
  RESOLVED: 3,
});