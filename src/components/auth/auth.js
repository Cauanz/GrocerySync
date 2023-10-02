import { supabase } from './supabase/client';

export const isAuthenticated = () => {
   const user = supabase.auth.user();
   return Boolean(user);
}