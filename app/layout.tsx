import './globals.css'

export const metadata = {
  title: 'Genie.AI',
  description: 'react nextjs',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="container" style={{ padding: '50px 0 100px 0' }}>
          {children}
        </div>
      </body>
    </html>
  )
}
