import { NextApiRequest, NextApiResponse } from 'next';
import { verifyPaddlePayload } from '@/utils/paddle/verifyPaddlePayload'
import { sendMsgToFS } from '@/utils/paddle/log'
import cors from '@/utils/cors';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({ message: 'POST request received2' });
}

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {

//   cors(req, res, async () => {
//     if (req.method === 'POST') {
//       const payload = req.body;
//       const signature = req.headers['x-paddle-signature'];

//       try {
//         // 验证签名，确保交易数据来自Paddle
//         const isVerified = await verifyPaddlePayload(payload, signature);
//         if (isVerified) {
//           // 处理交易，例如更新数据库状态等
//           switch (payload.event) {
//             // 订阅创建时的处理逻辑
//             case 'subscription_created':
//               sendMsgToFS(payload)
//               break
//             // 订单状态改变时的处理逻辑
//             case 'order_state_changed':
//               sendMsgToFS(payload)
//               break
//           }
//           // 返回200 OK响应表示成功处理
//           res.status(200).send('Webhook received');
//         } else {
//           // 如果签名验证失败，返回400 Bad Request
//           res.status(400).send('Invalid signature');
//         }
//       } catch (error) {
//         // 错误处理
//         console.error('Error processing Paddle webhook:', error);
//         res.status(500).send('Internal server error');
//       }
//     } else {
//       // 如果不是POST请求，返回405 Method Not Allowed
//       res.setHeader('Allow', 'POST');
//       res.status(405).end('Method Not Allowed');
//     }
//   });


// }
