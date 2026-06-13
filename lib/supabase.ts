import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';

if (__DEV__ && (!SUPABASE_URL || !SUPABASE_ANON_KEY)) {
  console.warn(
    '[FeedFlow] Supabase credentials not set.\n' +
      'Add EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY to your .env file.'
  );
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// ------------- Typed helpers ---------------------------------------------------

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username: string;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          username?: string;
          avatar_url?: string | null;
          updated_at?: string;
        };
      };
      articles: {
        Row: {
          id: string;
          title: string;
          url: string;
          summary: string | null;
          image_url: string | null;
          source: string;
          category: string;
          published_at: string;
          created_at: string;
        };
        Insert: Omit<
          Database['public']['Tables']['articles']['Row'],
          'id' | 'created_at'
        >;
        Update: Partial<Database['public']['Tables']['articles']['Insert']>;
      };
      bookmarks: {
        Row: {
          id: string;
          user_id: string;
          article_id: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['bookmarks']['Row'], 'id' | 'created_at'>;
        Update: never;
      };
    };
  };
};
