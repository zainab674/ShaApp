export const constTexts = {
  authRoute: {
    name: "auth",
    login: "signin",
    adminLogin: "adminSignin",
    supportLogin: "supportLogin",
    moderatorLogin: "moderatorLogin",
    signUp: "signup",
    forgetPassword: "forget-password",
    resetPassword: "reset-password",
    verifyOtp: "verify-otp",
    me: "me",
    phoneAuth: "phoneAuth",
    verifyPhoneOTP: "verifyPhoneOTP",
    phoneAuthUpdate: "phoneAuthUpdate",
    socialAuth: "socialAuth",
    verifyAccount: "verifyEmail",
    otpResend: "otpResend",
    logOut: "logOut",
    blockUserAccount: "blockUserAccount/:id",
  },
  postRoute: {
    name: "post",
    getAllPosts: "getAllPosts",
    my: "myPost",
    specific: "specific/:id",
    reply: "reply",
    completedByOther: "completedByOther",
    update: ":id",
    delete: ":id",
    details: "details/:id",
    deleteImage: "deleteImage/:id",
    search: "search",
  },
  serviceRoute: {
    name: "service",
    getAllPosts: "getAllServices",
    my: "mySerices",
    specific: "specific/:id",
    reply: "reply",
    users: "users/:id",
    update: ":id",
    delete: ":id",
    details: "details/:id",
    deleteImage: "deleteImage/:id",
    search: "search",
    withinRadius: "withinRadius",
    searchByName: "searchByName",
    searchByCategory: "searchByCategory",
    filter: "filter"
  },
  bookingRoute: {
    name: "booking",
    getAllBookings: "getAllBookings",
    details: "details/:id",
    update: ":id",
    delete: ":id",
    my: "myBookings",
    getUserBookings: "getUserBookings",
    getServiceBookings: "getServiceBookings/:id",
    checkBooking: "checkBooking/:id"

  },
  ratingRoute: {
    name: "rating",
    getAllRatings: "getAllRatings",
    details: "details/:id",
    update: ":id",
    delete: ":id",
    my: "myRatings/:id",
    user: "userRatings",

    getServiceRatings: "getServiceRatings/:id",

  },
  commentRoute: {
    name: "comment",
    my: "myreply",
    specific: "specific",
    post: "post",
    update: ":id",
    delete: ":id",
    details: "details/:id",
    search: "search",
  },
  mailRoute: {
    name: "mail",
    report: "report",
    contactUs: "contactUs",
  },

  policiesRoute: {
    name: "policy",
    privacy: "privacy",
    teramAndCond: "teramAndCond",
    refund: "refund",
    update: ":id",
    delete: ":id",
    getOne: ":id",
  },

  reviewsRoute: {
    name: "reviews",
    update: ":id",
    delete: ":id",
    getOne: ":id",
  },

  searcRoute: {
    name: "search",
    filter: "filter",
  },

  userRoute: {
    name: "users",
    otherUserProfile: "otherUserProfile",
    allUsers: "allUsers",
    oneUser: "oneUser/:id",
    dashUsers: "dashUsersCount",
    delete: ":id",
    schema: "/schema",
    handleBlock: "handleBlock",
    deleteAccount: "deleteAccount",
  },

  chatRoute: {
    name: "chat",
    inbox: "inbox",
    detail: ":id",
  },

  notifyRoute: {
    name: "notification",
    count: "count",
    chatCount: "chatCount",
    updateChat: "updateChat",
    detail: ":id",
    update: ":id",
  },
};
