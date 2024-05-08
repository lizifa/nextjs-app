
const envs = {
  development: {
    PADDLE_CLIENT_TOKEN: 'test_70b5b30ccbd43975702fd2769e1',
    PADDLE_APPKEY: '834368554b37f4a89e700805d7634d6ca50a11fcaa87ba91d3',
    PADDLE_ENV: 'sandbox',
    PADDLE_URL: 'https://sandbox-api.paddle.com',
    VENDOR_AUTH_CODE: 'f9c090558417c2581df5e3128a84740c78755de3ede9180a6a',
    VENDOR_ID: 18869,
    NEXT_PUBLIC_SUPABASE_ENV: 'development',
    NEXT_PUBLIC_SUPABASE_URL: 'https://acrdcxeguuvjeulsduvx.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjcmRjeGVndXV2amV1bHNkdXZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM3NTg5MzEsImV4cCI6MjAyOTMzNDkzMX0.pSr2_CPUEVtjOoYh2GflfN_BKnkiVp6yrwfGTkthsik'
  },
  production: {

    PADDLE_CLIENT_TOKEN: 'test_70b5b30ccbd43975702fd2769e1',
    PADDLE_APPKEY: '834368554b37f4a89e700805d7634d6ca50a11fcaa87ba91d3',
    PADDLE_ENV: 'production',
    PADDLE_URL: 'https://sandbox-api.paddle.com',
    VENDOR_AUTH_CODE: 'f9c090558417c2581df5e3128a84740c78755de3ede9180a6a',
    VENDOR_ID: 18869,
    NEXT_PUBLIC_SUPABASE_ENV: 'production',
    NEXT_PUBLIC_SUPABASE_URL: 'https://acrdcxeguuvjeulsduvx.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjcmRjeGVndXV2amV1bHNkdXZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM3NTg5MzEsImV4cCI6MjAyOTMzNDkzMX0.pSr2_CPUEVtjOoYh2GflfN_BKnkiVp6yrwfGTkthsik'
  },
  preview: {
    PADDLE_CLIENT_TOKEN: 'test_70b5b30ccbd43975702fd2769e1',
    PADDLE_APPKEY: '834368554b37f4a89e700805d7634d6ca50a11fcaa87ba91d3',
    PADDLE_ENV: 'sandbox',
    PADDLE_URL: 'https://sandbox-api.paddle.com',
    VENDOR_AUTH_CODE: 'f9c090558417c2581df5e3128a84740c78755de3ede9180a6a',
    VENDOR_ID: 18869,
    NEXT_PUBLIC_SUPABASE_ENV: 'preview',
    NEXT_PUBLIC_SUPABASE_URL: 'https://acrdcxeguuvjeulsduvx.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjcmRjeGVndXV2amV1bHNkdXZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM3NTg5MzEsImV4cCI6MjAyOTMzNDkzMX0.pSr2_CPUEVtjOoYh2GflfN_BKnkiVp6yrwfGTkthsik'
  }
}
const defaultEnv = (process.env.VERCEL_ENV || 'development')
//@ts-ignore
export default envs[defaultEnv]