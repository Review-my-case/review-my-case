// Compatibility alias: some code imports this navigator as "UserNavigator".
// It is functionally identical to UserTabs.js — same bottom tab navigator,
// same screens. Both file names now resolve to a working navigator so the
// build doesn't break regardless of which import path is used.
export { default } from "./UserTabs";
