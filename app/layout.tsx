import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Sans_KR, Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
})

const plexKR = IBM_Plex_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plex-kr',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'NY Route | 뉴욕 반경 2km 명소 및 최적 동선 추천',
  description:
    '뉴욕 여행 동선 최적화 서비스 NY Route. 입력한 장소 기준 반경 2km 이내 명소 3곳과 최적 도보 이동 동선을 추천합니다.',
  keywords: ['뉴욕 여행', 'NYC', 'NY Route', '뉴욕 명소', '2km 동선', '뉴욕 도보 코스', 'Urban Velocity', '타임스퀘어', '센트럴파크'],
  authors: [{ name: 'NY Route Team' }],
  openGraph: {
    title: 'NY Route | Urban Velocity NYC Route Finder',
    description: '가고 싶은 뉴욕 여행지를 입력하고 반경 2km 명소 3곳과 최적 동선을 확인하세요.',
    type: 'website',
    locale: 'ko_KR',
    siteName: 'NY Route',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NY Route | 뉴욕 반경 2km 최적 동선 추천',
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
    { media: '(prefers-color-scheme: light)', color: '#fbf8ff' },
    { media: '(prefers-color-scheme: dark)', color: '#12131a' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={`${montserrat.variable} ${plexKR.variable}`}>
      <body className="antialiased font-sans bg-background text-foreground selection:bg-primary/20 selection:text-primary">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
