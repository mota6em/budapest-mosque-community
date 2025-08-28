import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hmkvzbyafjauexftqywt.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhta3Z6YnlhZmphdWV4ZnRxeXd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxNTI0NDEsImV4cCI6MjA3MTcyODQ0MX0.Vy1bjpyC0pfbHQvycMFpRWsHiOAS0mLxAdBeS_8bmjw";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Missing Supabase environment variables. Please check your .env file."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Helper functions for common operations
export const auth = {
  // Sign in with email and password
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  // Sign up with email and password
  signUp: async (email, password, userData = {}) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
      },
    });
    return { data, error };
  },

  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  // Get current user
  getCurrentUser: async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    return { user, error };
  },

  // Get current session
  getCurrentSession: async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    return { session, error };
  },

  // Listen to auth changes
  onAuthStateChange: (callback) => {
    return supabase.auth.onAuthStateChange(callback);
  },
};

// Database helper functions
export const db = {
  // Generic query function
  query: async (table, query = {}) => {
    console.log('🔍 Debug - Table:', table);
    console.log('🔍 Debug - Query params:', query);
    
    let supabaseQuery = supabase.from(table);

    // Always select all columns for now
    supabaseQuery = supabaseQuery.select('*');
    
    if (query.where) {
      console.log('🔍 Debug - Adding where conditions:', query.where);
      Object.entries(query.where).forEach(([column, value]) => {
        supabaseQuery = supabaseQuery.eq(column, value);
      });
    }

    // REMOVE ORDER BY FOR NOW - just comment it out
    // if (query.orderBy) {
    //   console.log('🔍 Debug - Adding order:', query.orderBy);
    //   supabaseQuery = supabaseQuery.order(query.orderBy.column, {
    //     ascending: query.orderBy.ascending ?? true,
    //   });
    // }

    if (query.limit) {
      console.log('🔍 Debug - Adding limit:', query.limit);
      supabaseQuery = supabaseQuery.limit(query.limit);
    }

    console.log('🔍 Debug - About to execute query...');
    const { data, error } = await supabaseQuery;
    
    console.log('🔍 Debug - Query result:');
    console.log('  - Data:', data);
    console.log('  - Error:', error);
    console.log('  - Data length:', data?.length);
    
    return { data, error };
  },

  // Insert data
  insert: async (table, data) => {
    const { data: result, error } = await supabase
      .from(table)
      .insert(data)
      .select();
    return { data: result, error };
  },

  // Update data
  update: async (table, data, where) => {
    let supabaseQuery = supabase.from(table).update(data);

    if (where) {
      Object.entries(where).forEach(([column, value]) => {
        supabaseQuery = supabaseQuery.eq(column, value);
      });
    }

    const { data: result, error } = await supabaseQuery.select();
    return { data: result, error };
  },

  // Delete data
  delete: async (table, where) => {
    let supabaseQuery = supabase.from(table).delete();

    if (where) {
      Object.entries(where).forEach(([column, value]) => {
        supabaseQuery = supabaseQuery.eq(column, value);
      });
    }

    const { data, error } = await supabaseQuery;
    return { data, error };
  },
};
