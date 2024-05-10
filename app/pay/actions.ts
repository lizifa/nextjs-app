'use server'
import axios from 'axios';
import env from '@/env';

const headers = { Authorization: `Bearer ${env.VENDOR_AUTH_CODE}`, Accept: 'application/json' }

export async function get_products() {
  try {
    const url = `${env.PADDLE_URL}/products?status=active`
    const res0 = await axios({ method: 'GET', url, headers })
    const res1 = await axios({ method: 'GET', url: `${env.PADDLE_URL}/prices`, headers })
    const list1 = res1?.data?.data || []
    const list0 = res0?.data?.data || []
    list0.forEach((product: any) => {
      const priceInfo = list1.find((item: any) => item.product_id === product.id)
      Object.assign(product, { priceInfo })
    });
    return list0
  } catch (e) {
    return []
  }
}