export function useRole() {
  const { user } = useAuthStore();

  /**
   * Contoh untuk response data
   * "permissions": [
   *    {
   *        "module": "USER",
   *        "manage": true,
   *        "read": true,
   *        "create": true,
   *        "update": true,
   *        "delete": true
   *    }
   * ]
   */
  const getPermissions = () => {
    return user.value?.role.permissions ?? [];
  };
  const hasPermissions = (key: string, type: ('manage' | 'read' | 'create' | 'update' | 'delete')[]) => {
    const permissions = getPermissions();
    const modulePermission = permissions.find(p => p.module === key);

    if (!modulePermission)
      return false;

    return type.every(t => modulePermission[t]);
  };

  const hasAnyPermissions = (key: string, type: ('manage' | 'read' | 'create' | 'update' | 'delete')[]) => {
    const permissions = getPermissions();
    const modulePermission = permissions.find(p => p.module === key);

    if (!modulePermission)
      return false;

    return type.some(t => modulePermission[t]);
  };

  return {
    getPermissions,
    hasPermissions,
    hasAnyPermissions,
  };
}
