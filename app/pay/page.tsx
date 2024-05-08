'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { initializePaddle, Paddle } from '@paddle/paddle-js';
import env from '@/env';

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

const get_products = async (cb = (list: IProduct[]) => { }) => {
  const res = await axios({
    method: 'POST',
    url: '/api/get_products'
  })
  cb(res?.data)
}

export default function Page() {
  const [products, setProducts] = useState<IProduct[]>([])
  const [paddle, setPaddle] = useState<Paddle>();

  useEffect(() => {
    get_products(setProducts)
  }, [])

  useEffect(() => {
    initializePaddle({ environment: 'sandbox', token: env.PADDLE_CLIENT_TOKEN }).then(
      (paddleInstance: Paddle | undefined) => {
        if (paddleInstance) {
          setPaddle(paddleInstance);
        }
      },
    );
  }, []);

  const openCheckout = async (product: IProduct) => {
    const { priceInfo = {} } = product
    const items = [
      {
        priceId: priceInfo.id,
        quantity: 1
      }
    ];

    const customer = {
      email: "sam@example.com",
      address: {
        countryCode: "US",
        postalCode: "10021"
      }
    };

    paddle?.Checkout?.open({
      customer,
      items,
    });
  };

  return (
    <div >
      {
        products.map((item: any) => {
          return (
            <div key={item.id}>
              <button onClick={() => openCheckout(item)}>
                Sign up now {item.id}
              </button>
            </div>
          )
        })
      }
    </div >
  );
} 
