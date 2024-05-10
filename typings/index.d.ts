interface Window {
  Paddle?: any; // 使用 'any' 类型是因为不知道 'Paddle' 的具体类型
}


interface IProduct {
  id: string
  name: string
  tax_category: string
  type: 'custom' | 'standard'
  description: string | null
  image_url: string | null
  custom_data: object | null
  status: 'active' | 'archived',
  import_meta: object | null,
  created_at: string,
  updated_at: string
  [propname: string]: any
}