import { NextApiRequest, NextApiResponse } from 'next';
import env from '@/env';
import axios from 'axios';
const headers = { Authorization: `Bearer ${env.VENDOR_AUTH_CODE}`, Accept: 'application/json' }

// 生成产品列表
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
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
      res.status(200).json(list0);
    } catch (e) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
