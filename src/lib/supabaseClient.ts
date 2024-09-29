// lib/supabaseClient.ts
import { credentials } from "@/config";
import { createClient } from "@supabase/supabase-js";

// Replace with your actual Supabase project URL and public API key
const supabaseUrl = credentials.supabase_url as string;
const supabaseAnonKey = credentials.supabase_api as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
