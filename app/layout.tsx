import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Archivo, IBM_Plex_Sans_KR } from 'next/font/google'
import './globals.css'

const _archivo = Archivo({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
})

const _plexKR = IBM_Plex_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'NYC 2km Spot & Route Finder | 뉴욕 반경 2km 명소 및 최적 동선 추천',
  description:
    '입력한 장소 기준 반경 2km 이내 뉴욕 대표 명소 3곳과 최적 도보 이동 동선을 추천하는 여행 가이드 서비스입니다.',
  keywords: ['뉴욕 여행', 'NYC', '뉴욕 명소', '2km 동선', '뉴욕 도보 코스', '타임스퀘어', '센트럴파크', '뉴욕 여행 일정'],
  authors: [{ name: 'NYC 2km Finder Team' }],
  openGraph: {
    title: 'NYC 2km Spot & Route Finder',
    description: '가고 싶은 뉴욕 여행지를 입력하고 반경 2km 명소 3곳과 최적 동선을 확인하세요.',
    type: 'website',
    locale: 'ko_KR',
    siteName: 'NYC 2km Spot & Route Finder',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NYC 2km Spot & Route Finder',
    description: '뉴욕 반경 2km 이내 명소 3곳 및 최적 동선 추천 가이드',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f5f7' },
    { media: '(prefers-color-scheme: dark)', color: '#16181f' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className="bg-background">
      <body className="antialiased font-sans">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
