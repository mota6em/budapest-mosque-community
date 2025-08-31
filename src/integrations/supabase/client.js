// src/integrations/supabase/client.js
import { createClient } from "@supabase/supabase-js";

const viteEnv =
  typeof import.meta !== "undefined" && import.meta && import.meta.env
    ? import.meta.env
    : undefined;

const SUPABASE_URL =
  (viteEnv && viteEnv.VITE_SUPABASE_URL) ||
  process.env.REACT_APP_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "";

const SUPABASE_ANON_KEY =
  (viteEnv && viteEnv.VITE_SUPABASE_ANON_KEY) ||
  process.env.REACT_APP_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "";

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // eslint-disable-next-line no-console
  console.warn(
    "Missing Supabase env. Set VITE_/REACT_APP_/NEXT_PUBLIC_ SUPABASE_URL & SUPABASE_ANON_KEY."
  );
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
