import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  username: string;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

export type FanStory = {
  id: string;
  author_id: string;
  title: string;
  description: string | null;
  content: string;
  category: string;
  cover_image_url: string | null;
  view_count: number;
  created_at: string;
  updated_at: string;
};

export type StoryComment = {
  id: string;
  story_id: string;
  author_id: string;
  content: string;
  vote_count: number;
  created_at: string;
  updated_at: string;
};

export type ChatMessage = {
  id: string;
  author_id: string;
  content: string;
  created_at: string;
};

export type StoryLike = {
  id: string;
  story_id: string;
  user_id: string;
  created_at: string;
};
