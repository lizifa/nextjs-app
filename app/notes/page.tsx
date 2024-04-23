import { createClient } from '@/utils/supabase/server'

// 获取帖子列表
async function getNotes(supabase: any) {
  const { data: notes } = await supabase.from('notes').select()
  return notes
}

// 新增帖子
async function addNote(supabase: any) {
  try {
    const data = { title: 'Your Title Here' };
    const { data: note, error } = await supabase.from('notes').insert(data).single();
    if (error) {
      console.error('Error adding note:', error.message);
      return;
    }

    console.log('Note added successfully:', note);
  } catch (error) {
    console.error('Error adding note:', error);
  }
}

// 删除指定 ID 的笔记
async function deleteNote(supabase: any, id: number) {
  try {
    const { data, error } = await supabase
      .from('notes')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    console.log('Note deleted successfully:', data);
  } catch (error) {
    console.error('Error deleting note:', error);
  }
}

// 更新指定 ID 的笔记标题
async function updateNoteTitle(supabase: any, id: number, newTitle: string) {
  try {
    const { data, error } = await supabase
      .from('notes')
      .update({ title: newTitle })
      .eq('id', id);

    if (error) {
      throw error;
    }

    console.log('Note title updated successfully:', data);
  } catch (error) {
    console.error('Error updating note title:', error);
  }
}



// 获取用户列表
async function getUsers(supabase: any) {
  const { data: notes } = await supabase.from('users').select()
  return notes
}

export default async function Page() {
  const supabase = createClient()
  const notes = await getNotes(supabase)
  // const users = await getUsers(supabase)
  // console.log(users)

  return (
    <div>
      <ul>
        {
          notes?.map(((item: any) => {
            return <li key={item.id}>{item.title}</li>
          }))
        }
      </ul>
    </div >
  )
}