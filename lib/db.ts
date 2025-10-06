// Type-safe Supabase client
import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database.types';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export type Supa = ReturnType<typeof createClient<Database>>;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper to get typed table
export function getTable<T extends keyof Database['public']['Tables']>(tableName: T) {
  return supabase.from(tableName as string);
}
