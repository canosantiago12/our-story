import { createClient } from "@supabase/supabase-js";

const globalForSupabase = globalThis as unknown as { supabase: ReturnType<typeof createClient> };

// ✅ Prevent multiple Supabase instances in development mode
export const supabase =
  globalForSupabase.supabase ||
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

if (process.env.NODE_ENV !== "production") globalForSupabase.supabase = supabase;
