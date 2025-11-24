import { supabase } from "@/integrations/supabase/client";

export type AppRole = 'admin' | 'user';

/**
 * Check if the current user has a specific role
 */
export async function checkUserRole(role: AppRole): Promise<boolean> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return false;

    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', role)
      .maybeSingle();

    if (error) {
      if (import.meta.env.DEV) {
        console.error('Error checking user role:', error);
      }
      return false;
    }

    return !!data;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Error in checkUserRole:', error);
    }
    return false;
  }
}

/**
 * Get all roles for the current user
 */
export async function getUserRoles(): Promise<AppRole[]> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return [];

    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id);

    if (error) {
      if (import.meta.env.DEV) {
        console.error('Error fetching user roles:', error);
      }
      return [];
    }

    return (data || []).map(row => row.role as AppRole);
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Error in getUserRoles:', error);
    }
    return [];
  }
}
