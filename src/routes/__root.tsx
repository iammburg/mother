/// <reference types="vite/client" />
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
  useRouterState,
} from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import * as React from 'react'
import { AppNavbar } from '~/components/AppNavbar.js'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary.js'
import { NotFound } from '~/components/NotFound.js'
import { navigationItems } from '~/constants/navigation.js'
import appCss from '~/styles/app.css?url'
import { seo } from '~/utils/seo.js'
import { useAppSession } from '~/utils/session.js'

const fetchUser = createServerFn({ method: 'GET' }).handler(async () => {
  // We need to auth on the server so we have access to secure cookies
  const session = await useAppSession()

  if (!session.data.userEmail) {
    return null
  }

  return {
    email: session.data.userEmail,
  }
})

export const Route = createRootRoute({
  beforeLoad: async () => {
    const user = await fetchUser()

    return {
      user,
    }
  },
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title: 'TOSS TB | Ibu Hamil Bebas TBC',
        description:
          'TOSS TB membantu edukasi dan deteksi dini TBC pada ibu hamil.',
      }),
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: '' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap',
      },
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})

function RootComponent() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })
  const normalizedPathname = normalizePath(pathname)
  const showMainNavigation = navigationItems.some(
    (item) => normalizePath(item.href) === normalizedPathname,
  )

  return (
    <RootDocument>
      {showMainNavigation ? <AppNavbar /> : null}
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

function normalizePath(path: string) {
  return path.length > 1 ? path.replace(/\/+$/, '') : path
}
