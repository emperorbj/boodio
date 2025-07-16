
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mbmzapssbiheqhyyqppq.supabase.co'
const supabaseKey = 'sb_secret_dKPK8Q6MtrdSzlYfZe7X8A_nFRzrun5'
export const supabase = createClient(supabaseUrl, supabaseKey)