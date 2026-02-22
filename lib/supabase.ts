import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wxdagnvlotoonpbtungx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4ZGFnbnZsb3Rvb25wYnR1bmd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3MDk1MTMsImV4cCI6MjA4NzI4NTUxM30.gNrVv7Wdlx714A4fkOCxGvUGswhurcXf_E31l7wkFM0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})