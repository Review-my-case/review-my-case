// Compatibility alias: some code imports "HomeScreen" without a role prefix.
// Defaults to the User-facing home screen (the app's main entry point).
// If your build actually needs this to resolve to the Lawyer or Admin
// dashboard instead, import UserHomeScreen/LawyerDashboardScreen/
// AdminOverviewScreen directly from src/screens/{user,lawyer,admin}/.
export { default } from "./user/UserHomeScreen";
