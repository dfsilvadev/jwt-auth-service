/**
 * Get Roles DTOs
 * Data Transfer Objects for getting roles and their permissions.
 */

export interface GetRolesDTO {
  readonly roleId: string;
}

export interface GetRolesResult {
  readonly permissionsCodes: string[];
}
