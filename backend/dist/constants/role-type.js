"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingStatus = exports.ServiceCategory = exports.permissionType = exports.PolicyType = exports.CommentType = exports.HouseRuleType = exports.RoleType = void 0;
var RoleType;
(function (RoleType) {
    RoleType["USER"] = "USER";
    RoleType["ADMIN"] = "ADMIN";
    RoleType["VENDOR"] = "VENDOR";
})(RoleType || (exports.RoleType = RoleType = {}));
var HouseRuleType;
(function (HouseRuleType) {
    HouseRuleType["STAY"] = "STAY";
    HouseRuleType["ALLOWED"] = "ALLOWED";
})(HouseRuleType || (exports.HouseRuleType = HouseRuleType = {}));
var CommentType;
(function (CommentType) {
    CommentType["REPLY"] = "REPLY";
    CommentType["COMMENT"] = "COMMENT";
})(CommentType || (exports.CommentType = CommentType = {}));
var PolicyType;
(function (PolicyType) {
    PolicyType["PRIVCAY"] = "PRIVCAY";
    PolicyType["TERMANDCOND"] = "TERMANDCOND";
    PolicyType["REFUND"] = "REFUND";
})(PolicyType || (exports.PolicyType = PolicyType = {}));
var permissionType;
(function (permissionType) {
    permissionType["USER"] = "USER";
    permissionType["ADMIN"] = "ADMIN";
    permissionType["MODERATOR"] = "MODERATOR";
})(permissionType || (exports.permissionType = permissionType = {}));
var ServiceCategory;
(function (ServiceCategory) {
    ServiceCategory["Venue"] = "Venue";
    ServiceCategory["Catering"] = "Catering";
    ServiceCategory["Photographer"] = "Photographer";
    ServiceCategory["CarRental"] = "CarRental";
    ServiceCategory["BridalMakeup"] = "BridalMakeup";
    ServiceCategory["Decor"] = "Decor";
    ServiceCategory["HennaArtist"] = "HennaArtist";
    ServiceCategory["BridalWear"] = "BridalWear";
    ServiceCategory["Invitations"] = "Invitations";
    ServiceCategory["Singers"] = "Singers";
    ServiceCategory["Choreographers"] = "Choreographers";
})(ServiceCategory || (exports.ServiceCategory = ServiceCategory = {}));
var BookingStatus;
(function (BookingStatus) {
    BookingStatus["empty"] = "empty";
    BookingStatus["pending"] = "pending";
    BookingStatus["confirmed"] = "confirmed";
    BookingStatus["rejected"] = "rejected";
})(BookingStatus || (exports.BookingStatus = BookingStatus = {}));
//# sourceMappingURL=role-type.js.map