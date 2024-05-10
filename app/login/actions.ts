"use server";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
const supabase = createClient();
const createTable = `
CREATE TABLE public.users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::TEXT, now()) NOT NULL,
  last_login TIMESTAMP WITH TIME ZONE
);
`
// 创建用户表public.users
async function createUsersTable() {
  const { error } = await supabase
    .from('sql')
    .insert({
      query: createTable
    });

  if (error) {
    console.error('Error creating users table:', error.message);
  }
}

// 检查表是否存在,该表位于public
async function checkTableNameExists(tableName: string) {
  const { data, error } = await supabase
    .from('information_schema.tables')
    .select('table_name')
    .eq('table_schema', 'public')
    .eq('table_name', tableName);

  if (error) {
    console.error('Error checking table exists:', error.message);
    return false;
  }

  // 如果返回的数据不为空，则表存在
  return data.length > 0;
}

// 检查用户名是否已存在的函数
export async function checkUserExists(email: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email);

  // 当前注册用户不存在
  if (error) {
    return false;
  }
  // 用户存在
  return data.length > 0;
}

// 更新用户的登录信息
async function updateUserLoginInfo(email: string) {
  const { data, error } = await supabase
    .from('users')
    .update({ last_login: new Date() })
    .eq('email', email);

  if (error) {
    console.error('Error updating user login info:', error.message);
  }
}

async function checkOrCreateUser(email: string) {
  const hasTable = await checkTableNameExists('users')
  // 如果不存在用户表，则创建用户表
  if (!hasTable) {
    await createUsersTable();
  }

  // 检查用户是否存在
  const hasUser = await checkUserExists(email)

  // 如果用户不存在，则创建用户
  if (!hasUser) {
    await createUser(email);
  } else {
    await updateUserLoginInfo(email)
  }
}

// 创建用户
async function createUser(email: string) {
  const { data, error } = await supabase
    .from('users')
    .insert([{ email }]);

  if (error) {
    console.error('Error creating user:', error.message);
  }
}

export const signIn = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();
  const params = { email, password, }
  // 先判断用户表和用户是否存在
  await checkOrCreateUser(email);
  const { error } = await supabase.auth.signInWithPassword(params);

  if (error) {
    return redirect("/login?message=Could not authenticate user");
  }
  return redirect("/protected");
};

export const signUp = async (formData: FormData) => {  //550083126@qq.com nnknknbjvvhvhvkk
  const origin = headers().get("origin");
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const hasUser = await checkUserExists(email)
  if (hasUser) {
    console.log('当前用户已存在，请登录')
    return
  }

  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });


  console.log(error, data, 'signup')

  if (error) {
    return redirect(`/login?message=Could not authenticate user`);
  }

  return redirect("/login?message=Check email to continue sign in process");
};