'use client'
import { useEffect, useState } from 'react';
import env from '@/env';
import { get_products } from './actions';
import Script from 'next/script'

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


export default function Page() {
  const [products, setProducts] = useState<IProduct[]>([])

  useEffect(() => {
    const init = async () => {
      const list: IProduct[] = await get_products()
      setProducts(list)
    }
    init()
  }, [])

  const openCheckout = async (product: IProduct) => {
    const { priceInfo = {} } = product
    const items = [
      {
        priceId: priceInfo.id,
        quantity: 1
      }
    ];

    // define customer details
    let customer = {
      email: "sam@example.com",
      address: {
        countryCode: "US",
        postalCode: "10021"
      }
    };

    window?.Paddle?.Checkout?.open({
      items,
      customer
    });
  };

  return (
    <div >
      <Script
        id="paddle-js"
        src="./js/paddle.js"
        onLoad={() => {
          window?.Paddle?.Environment.set(env.PADDLE_ENV);
          window?.Paddle?.Initialize({
            token: env.PADDLE_CLIENT_TOKEN,
          });
        }}
      />
      <div className="checkout-container">
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
      </div>
    </div >
  );
} 
