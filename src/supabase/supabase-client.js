import { createClient } from "@supabase/supabase-js";
import useSupabaseKey from "../hooks/useSupabaseKey";
import useSupabaseUrl from "../hooks/useSupabaseUrl";


const supabaseUrl = useSupabaseUrl();
const supabasekey = useSupabaseKey();

const supabase = createClient(supabaseUrl, supabasekey);

export default supabase;