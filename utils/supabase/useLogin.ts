import { createClient } from "@/utils/supabase/server";

export default async () => {
  const supabase = createClient();
  const kkk = await supabase.auth.getUser()
  console.log(kkk)
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return { isLogin: user, user }
}