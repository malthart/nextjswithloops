import { Html, Head, Main, NextScript } from 'next/document'
import { Analytics } from '@vercel/analytics/react';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <title>
        NextJS with Loops
      </title>
      <meta
        name="description"
        content="Lead generation & e-mail automation-ready boilerplate built with NextJS, Tailwind & Loops."
        key="desc"
      />
      <body>
        <Analytics />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
