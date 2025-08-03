import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const signUp = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`
      }
    });
    return { data, error };
  } catch (err) {
    return { 
      data: null, 
      error: { 
        message: 'Unable to connect to authentication service. Please check your connection or try again later.',
        name: 'ConnectionError'
      } 
    };
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  } catch (err) {
    return { 
      data: null, 
      error: { 
        message: 'Unable to connect to authentication service. Please check your connection or try again later.',
        name: 'ConnectionError'
      } 
    };
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (err) {
    return { 
      error: { 
        message: 'Unable to connect to authentication service. Please check your connection or try again later.',
        name: 'ConnectionError'
      } 
    };
  }
};

export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  } catch (err) {
    return { 
      user: null, 
      error: { 
        message: 'Unable to connect to authentication service. Please check your connection or try again later.',
        name: 'ConnectionError'
      } 
    };
  }
};