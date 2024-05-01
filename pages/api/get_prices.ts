import { NextApiRequest, NextApiResponse } from 'next';
import env from '@/env';
import axios from 'axios';
const headers = { Authorization: `Bearer ${env.VENDOR_AUTH_CODE}`, Accept: 'application/json' }

// 获取商品价格
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    let products = []
    try {
      const res0 = await axios({ method: 'GET', url: `${env.PADDLE_URL}/prices`, headers })
      products = res0?.data?.data || []
      res.status(200).json(products);
    } catch (e) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
