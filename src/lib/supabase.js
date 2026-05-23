import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const isConfigured = supabaseUrl && 
                     supabaseUrl !== 'https://your-supabase-project.supabase.co' &&
                     supabaseAnonKey && 
                     supabaseAnonKey !== 'your-supabase-anon-key-here'

let supabase = null

if (isConfigured) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey)
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error)
  }
} else {
  console.warn(
    'Supabase is not configured or is using placeholder credentials.\n' +
    'The application will run in LOCAL DEMO mode using in-memory mock data.\n' +
    'To connect to your real database, update VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
  )
}

export { supabase, isConfigured }
