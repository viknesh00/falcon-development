/**
 * Custom hooks for authentication and authorization
 */
import { useAuth } from '../../app/providers/AuthContext';
import { useRole } from '../../app/providers/RoleContext';

/**
 * Hook to check if user has specific permission
 * Usage: const canViewLoans = usePermission('view_own_loans');
 */
export const usePermission = (permission) => {
  const { hasPermission } = useRole();
  return hasPermission(permission);
};

/**
 * Hook to check if user has any of the provided permissions
 * Usage: const canManage = useAnyPermission(['manage_loans', 'manage_accounts']);
 */
export const useAnyPermission = (permissions) => {
  const { hasAnyPermission } = useRole();
  return hasAnyPermission(permissions);
};

/**
 * Hook to check if user has all of the provided permissions
 * Usage: const canAdministrate = useAllPermissions(['manage_users', 'view_analytics']);
 */
export const useAllPermissions = (permissions) => {
  const { hasAllPermissions } = useRole();
  return hasAllPermissions(permissions);
};

/**
 * Hook to check if user has specific role
 * Usage: const isAdmin = useUserRole('admin');
 */
export const useUserRole = (role) => {
  const { hasRole } = useRole();
  return hasRole(role);
};

/**
 * Hook to check if user has any of the provided roles
 * Usage: const isAdminOrClient = useAnyRole(['admin', 'client']);
 */
export const useAnyRole = (roles) => {
  const { hasAnyRole } = useRole();
  return hasAnyRole(roles);
};

/**
 * Hook to get current user information
 * Usage: const { user, isAuthenticated } = useCurrentUser();
 */
export const useCurrentUser = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { userRole } = useRole();

  return {
    user,
    userRole,
    isAuthenticated,
    isLoading,
    isAdmin: userRole === 'admin' || userRole === 'super_admin',
    isClient: userRole === 'client',
  };
};
