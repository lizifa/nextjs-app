import { NextApiRequest, NextApiResponse } from 'next';
import env from '@/env';
import axios from 'axios';
const headers = { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' }
// 生成支付链接
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const {
      product_id = '',
      title = '',
      webhook_url = '',
      prices = '',
      recurring_prices = '',
      trial_days = '',
      custom_message = '',
      coupon_code = '',
      discountable = '',
      image_url = '',
      return_url = '',
      quantity_variable = '',
      quantity = '',
      expires = '',
      marketing_consent = '',
      customer_email = '',
      customer_country = '',
      customer_postcode = '',
      is_recoverable = '',
      passthrough = '',
      vat_number = '',
      vat_company_name = '',
      vat_street = '',
      vat_city = '',
      vat_state = '',
      vat_country = '',
      vat_postcode = '', } = req.body;
    const vendor_id = env.VENDOR_ID
    const vendor_auth_code = env.VENDOR_AUTH_CODE

    try {
      const data = {
        vendor_id,
        vendor_auth_code,
        product_id,
        title,
        webhook_url,
        prices,
        recurring_prices,
        trial_days,
        custom_message,
        coupon_code,
        discountable,
        image_url,
        return_url,
        quantity_variable,
        quantity,
        expires,
        marketing_consent,
        customer_email,
        customer_country,
        customer_postcode,
        is_recoverable,
        passthrough,
        vat_number,
        vat_company_name,
        vat_street,
        vat_city,
        vat_state,
        vat_country,
        vat_postcode,
      }
      const url = `${env.PADDLE_URL}/2.0/product/generate_pay_link`
      const res0 = await axios({ method: req.method, url, headers, data, });
      const checkoutUrl = res0?.data?.response?.url
      res.status(200).json({ checkoutUrl });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
