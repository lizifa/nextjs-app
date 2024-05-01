'use server'
import { createClient } from '@/utils/supabase/server'

export async function useHooks() {
  const supabase = createClient()

  // 获取帖子列表
  async function getNotesLists() {
    const { data: notes } = await supabase.from('notes').select('*')
    return notes
  }

  // 新增帖子
  async function createNodes() {
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
  async function deleteNotes(id: number) {
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
  async function updateNotes(id: number, newTitle: string) {
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

  // 获取帖子列表
  async function getNotesDetail() {
    const { data: notes } = await supabase.from('notes').select('*')
    return notes
  }

  return {
    getNotesLists,
    createNodes,
    deleteNotes,
    updateNotes,
    getNotesDetail
  }
}
