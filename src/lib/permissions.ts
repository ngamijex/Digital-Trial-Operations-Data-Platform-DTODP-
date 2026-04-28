/**
 * Role-Based Access Control (RBAC) for DTODP
 * 
 * Defines permissions for each role across different resources and actions.
 * Roles: ADMIN, TRIAL_OWNER, DATA_TEAM, FIELD_TRIALS_TEAM, STATION_TEAM, LAB_TEAM, INVENTORY_TEAM, HTE_TEAM
 */

import { UserRole } from "@prisma/client";

// Permission categories
export enum Permission {
  // Trial Management
  TRIAL_VIEW_ALL = "TRIAL_VIEW_ALL",
  TRIAL_VIEW_OWN = "TRIAL_VIEW_OWN",
  TRIAL_CREATE = "TRIAL_CREATE",
  TRIAL_EDIT = "TRIAL_EDIT",
  TRIAL_DELETE = "TRIAL_DELETE",
  TRIAL_APPROVE = "TRIAL_APPROVE",
  
  // Task Management
  TASK_VIEW_ALL = "TASK_VIEW_ALL",
  TASK_VIEW_OWN = "TASK_VIEW_OWN",
  TASK_CREATE = "TASK_CREATE",
  TASK_EDIT = "TASK_EDIT",
  TASK_DELETE = "TASK_DELETE",
  TASK_ASSIGN = "TASK_ASSIGN",
  TASK_COMPLETE = "TASK_COMPLETE",
  
  // Data Collection
  DATA_FORM_CREATE = "DATA_FORM_CREATE",
  DATA_FORM_EDIT = "DATA_FORM_EDIT",
  DATA_FORM_DELETE = "DATA_FORM_DELETE",
  DATA_SUBMIT = "DATA_SUBMIT",
  DATA_VALIDATE = "DATA_VALIDATE",
  DATA_VIEW_ALL = "DATA_VIEW_ALL",
  DATA_VIEW_OWN = "DATA_VIEW_OWN",
  
  // Lab Management
  LAB_SAMPLE_VIEW = "LAB_SAMPLE_VIEW",
  LAB_SAMPLE_CREATE = "LAB_SAMPLE_CREATE",
  LAB_SAMPLE_ANALYZE = "LAB_SAMPLE_ANALYZE",
  LAB_SAMPLE_DELETE = "LAB_SAMPLE_DELETE",
  
  // Inventory Management
  INVENTORY_VIEW = "INVENTORY_VIEW",
  INVENTORY_MANAGE = "INVENTORY_MANAGE",
  INVENTORY_DISTRIBUTE = "INVENTORY_DISTRIBUTE",
  
  // Farmer Management
  FARMER_VIEW = "FARMER_VIEW",
  FARMER_CREATE = "FARMER_CREATE",
  FARMER_EDIT = "FARMER_EDIT",
  FARMER_DELETE = "FARMER_DELETE",
  
  // Reports & Analytics
  REPORTS_VIEW = "REPORTS_VIEW",
  REPORTS_EXPORT = "REPORTS_EXPORT",
  REPORTS_CREATE = "REPORTS_CREATE",
  
  // Escalations
  ESCALATION_VIEW = "ESCALATION_VIEW",
  ESCALATION_CREATE = "ESCALATION_CREATE",
  ESCALATION_RESOLVE = "ESCALATION_RESOLVE",
  
  // Settings & Admin
  SETTINGS_VIEW = "SETTINGS_VIEW",
  SETTINGS_MANAGE = "SETTINGS_MANAGE",
  USER_MANAGE = "USER_MANAGE",
  SLA_MANAGE = "SLA_MANAGE",
}

// Role-to-Permission mapping
const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  ADMIN: [
    // Full access to everything
    ...Object.values(Permission),
  ],
  
  TRIAL_OWNER: [
    // Trials
    Permission.TRIAL_VIEW_OWN,
    Permission.TRIAL_CREATE,
    Permission.TRIAL_EDIT,
    Permission.TRIAL_DELETE,
    
    // Tasks
    Permission.TASK_VIEW_OWN,
    Permission.TASK_CREATE,
    Permission.TASK_EDIT,
    Permission.TASK_DELETE,
    Permission.TASK_ASSIGN,
    
    // Data
    Permission.DATA_VIEW_OWN,
    Permission.DATA_SUBMIT,
    
    // Reports
    Permission.REPORTS_VIEW,
    Permission.REPORTS_EXPORT,
    
    // Escalations
    Permission.ESCALATION_VIEW,
    Permission.ESCALATION_CREATE,
    Permission.ESCALATION_RESOLVE,
  ],
  
  DATA_TEAM: [
    // Trials (view only)
    Permission.TRIAL_VIEW_ALL,
    
    // Tasks (view and create for data-related tasks)
    Permission.TASK_VIEW_ALL,
    Permission.TASK_CREATE,
    Permission.TASK_EDIT,
    
    // Data Forms (full management)
    Permission.DATA_FORM_CREATE,
    Permission.DATA_FORM_EDIT,
    Permission.DATA_FORM_DELETE,
    
    // Data Submissions (validation focus)
    Permission.DATA_VIEW_ALL,
    Permission.DATA_SUBMIT,
    Permission.DATA_VALIDATE,
    
    // Reports
    Permission.REPORTS_VIEW,
    Permission.REPORTS_EXPORT,
    Permission.REPORTS_CREATE,
    
    // Escalations
    Permission.ESCALATION_VIEW,
    Permission.ESCALATION_CREATE,
  ],
  
  STATION_TEAM: [
    // Trials (view assigned station trials)
    Permission.TRIAL_VIEW_OWN,
    
    // Tasks (view and complete assigned tasks)
    Permission.TASK_VIEW_OWN,
    Permission.TASK_COMPLETE,
    
    // Data (submit station trial data)
    Permission.DATA_SUBMIT,
    Permission.DATA_VIEW_OWN,
    
    // Lab (request samples)
    Permission.LAB_SAMPLE_VIEW,
    Permission.LAB_SAMPLE_CREATE,
    
    // Reports (view only)
    Permission.REPORTS_VIEW,
    
    // Escalations
    Permission.ESCALATION_VIEW,
    Permission.ESCALATION_CREATE,
  ],
  
  FIELD_TRIALS_TEAM: [
    // Trials (view assigned field trials)
    Permission.TRIAL_VIEW_OWN,
    
    // Tasks (view and complete assigned tasks)
    Permission.TASK_VIEW_OWN,
    Permission.TASK_COMPLETE,
    
    // Data (submit field trial data)
    Permission.DATA_SUBMIT,
    Permission.DATA_VIEW_OWN,
    
    // Farmers (manage enrolled farmers)
    Permission.FARMER_VIEW,
    Permission.FARMER_CREATE,
    Permission.FARMER_EDIT,
    
    // Reports (view only)
    Permission.REPORTS_VIEW,
    
    // Escalations
    Permission.ESCALATION_VIEW,
    Permission.ESCALATION_CREATE,
  ],
  
  LAB_TEAM: [
    // Trials (view trials with samples)
    Permission.TRIAL_VIEW_ALL,
    
    // Tasks (view lab-related tasks)
    Permission.TASK_VIEW_OWN,
    Permission.TASK_COMPLETE,
    
    // Lab Samples (full management)
    Permission.LAB_SAMPLE_VIEW,
    Permission.LAB_SAMPLE_CREATE,
    Permission.LAB_SAMPLE_ANALYZE,
    Permission.LAB_SAMPLE_DELETE,
    
    // Data (submit lab results)
    Permission.DATA_SUBMIT,
    Permission.DATA_VIEW_OWN,
    
    // Reports (view only)
    Permission.REPORTS_VIEW,
    
    // Escalations
    Permission.ESCALATION_VIEW,
    Permission.ESCALATION_CREATE,
  ],
  
  INVENTORY_TEAM: [
    // Trials (view trials requiring materials)
    Permission.TRIAL_VIEW_ALL,
    
    // Tasks (view inventory-related tasks)
    Permission.TASK_VIEW_OWN,
    Permission.TASK_COMPLETE,
    
    // Inventory (full management)
    Permission.INVENTORY_VIEW,
    Permission.INVENTORY_MANAGE,
    Permission.INVENTORY_DISTRIBUTE,
    
    // Reports (view only)
    Permission.REPORTS_VIEW,
    
    // Escalations
    Permission.ESCALATION_VIEW,
    Permission.ESCALATION_CREATE,
  ],
  
  HTE_TEAM: [
    // Trials (view trials with farmer extension)
    Permission.TRIAL_VIEW_ALL,
    
    // Tasks (view extension-related tasks)
    Permission.TASK_VIEW_OWN,
    Permission.TASK_COMPLETE,
    
    // Farmers (view and support)
    Permission.FARMER_VIEW,
    
    // Data (submit extension observations)
    Permission.DATA_SUBMIT,
    Permission.DATA_VIEW_OWN,
    
    // Reports (view only)
    Permission.REPORTS_VIEW,
    
    // Escalations
    Permission.ESCALATION_VIEW,
    Permission.ESCALATION_CREATE,
  ],
};

/**
 * Check if a role has a specific permission
 */
export function hasPermission(role: UserRole, permission: Permission): boolean {
  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes(permission);
}

/**
 * Check if a role has any of the specified permissions
 */
export function hasAnyPermission(role: UserRole, permissions: Permission[]): boolean {
  return permissions.some(p => hasPermission(role, p));
}

/**
 * Check if a role has all of the specified permissions
 */
export function hasAllPermissions(role: UserRole, permissions: Permission[]): boolean {
  return permissions.every(p => hasPermission(role, p));
}

/**
 * Get all permissions for a role
 */
export function getRolePermissions(role: UserRole): Permission[] {
  return ROLE_PERMISSIONS[role] || [];
}

/**
 * Role display names
 */
export const ROLE_DISPLAY_NAMES: Record<UserRole, string> = {
  ADMIN: "Administrator",
  TRIAL_OWNER: "Trial Owner",
  DATA_TEAM: "Data Team",
  FIELD_TRIALS_TEAM: "Field Trials Team",
  STATION_TEAM: "Station Team",
  LAB_TEAM: "Laboratory Team",
  INVENTORY_TEAM: "Inventory Team",
  HTE_TEAM: "High-touch Extension Team",
};

/**
 * Role descriptions
 */
export const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  ADMIN: "Full system access including user management and settings",
  TRIAL_OWNER: "Create and manage trials, assign tasks, oversee trial execution",
  DATA_TEAM: "Design data forms, validate submissions, generate reports",
  STATION_TEAM: "Execute station trials, submit station data, manage lab samples",
  FIELD_TRIALS_TEAM: "Manage field trials, recruit farmers, submit field data",
  LAB_TEAM: "Process and analyze lab samples, record results",
  INVENTORY_TEAM: "Manage trial materials, distribute inventory to teams",
  HTE_TEAM: "Provide farmer extension services, support trial implementation",
};
