import { createClient } from '@/utils/supabase/server'

export default async function Page() {
  const supabase = createClient()
  const res = await supabase.from('notes').select()
  const { data: notes } = res
  console.log(res)

  return <pre>{JSON.stringify(notes, null, 2)}</pre>
}