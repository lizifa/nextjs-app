'use client'
import { useEffect, useState } from 'react';
import env from '@/env';
import { get_products } from './actions';
import Script from 'next/script'
import { createClient } from "@/utils/supabase/client";
import { useRouter } from 'next/navigation'

export default function Page() {
  const supabase = createClient();
  const router = useRouter()

  const [products, setProducts] = useState<IProduct[]>([])

  useEffect(() => {
    const init = async () => {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return router.push("/login");
      }
      const list: IProduct[] = await get_products()
      setProducts(list)
    }
    init()
    console.log(supabase.auth.getUser())
  }, [])

  const openCheckout = async (product: IProduct) => {
    const { priceInfo = {} } = product
    const items = [
      {
        priceId: priceInfo.id,
        quantity: 1
      }
    ];

    window?.Paddle?.Checkout?.open({
      items,
      customer: {
        email: "550083126@qq.com",
        address: {
          countryCode: "US",
          postalCode: "10021"
        }
      }
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
