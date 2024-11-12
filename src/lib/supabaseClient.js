import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://penvqldhtzlnffwdjwcp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBlbnZxbGRodHpsbmZmd2Rqd2NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE0MjkxNDgsImV4cCI6MjA0NzAwNTE0OH0.dgQ_DLeB-XFI6x8YoK1sGLaCy6zOFIl3lkS30T0n3Yo',
)
