/* eslint-disable prettier/prettier */
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { GetAWSAppConfigWhitelabelProfiles } from '@/providers/remote-config/AWSAppConfig'
import fs from 'fs'
import { format } from 'date-fns'
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    template: '%s | devstore',
    default: 'devstore',
  },
}

const OneMinute = 60

export const revalidate = OneMinute
 

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const whitelabelsFromAppConfig = Object.entries(await GetAWSAppConfigWhitelabelProfiles());
 
  whitelabelsFromAppConfig.forEach( ([key, value]) => {
    const whitelabel = key.split('.')[0]
    fs.writeFileSync(`./public/themes/_local_${whitelabel}.layout.css`, value as unknown as string)
  });

  fs.writeFileSync('./public/themes/_local_appConfig_.lastUpdate.json', JSON.stringify({ lastUpdate: format(new Date(), 'yyyy-MM-dd HH:mm:ss') }) )

  return (
    <html className={inter.variable} lang="pt">
      <body className="bg-zinc-950 text-zinc-50 antialiased">{children}</body>
    </html>
  )
}
