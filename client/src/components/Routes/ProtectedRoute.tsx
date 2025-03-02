import PrivateRoute from "./PrivateRoute";
import RoleBasedRoute from "./RoleBasedRoute";

interface ProtectedRouteProps {
  children: React.ReactNode; // The component(s) to render if conditions are met
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => (
  <PrivateRoute>
    <RoleBasedRoute allowedRoles={allowedRoles}>{children}</RoleBasedRoute>
  </PrivateRoute>
);

export default ProtectedRoute;
