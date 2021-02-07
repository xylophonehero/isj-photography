import React from 'react'
import { Helmet } from 'react-helmet'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import './all.scss'
import useSiteMetadata from './SiteMetadata'
import { withPrefix } from 'gatsby'

const TemplateWrapper = ({ children }) =>
{
  const { title, description, siteUrl } = useSiteMetadata()
  return (
    <div id="top">
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix('/')}img/apple-touch-icon.png`}
        />
        <link
          rel="android-chrome"
          sizes="192x192"
          href={`${withPrefix('/')}img/android-chrome-192x192.png`}
        />
        <link
          rel="android-chrome"
          sizes="512x512"
          href={`${withPrefix('/')}img/android-chrome-512x512.png`}
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/favicon-32x32.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/favicon-16x16.png`}
          sizes="16x16"
        />

        <link
          rel="mask-icon"
          href={`${withPrefix('/')}img/safari-pinned-tab.svg`}
          color="#E0AA7B"
        />
        <meta name="theme-color" content="#E0AA7B" />

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={siteUrl} />
        <meta
          property="og:image"
          content={`${siteUrl}/img/og-image.png`}
        />
        <meta name="google-site-verification" content="E3zCdlggV3AvPhJXGBBCA9TBQQ1-0ca6YXJuHpr2w54" />
        {typeof window !== 'undefined' && <script type="text/javascript">
          {document.addEventListener('contextmenu', (e) =>
          {
            if (e.target.tagName === 'IMG')
            {
              e.preventDefault()
              e.stopPropagation()
            }
          })}
        </script>}
      </Helmet>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  )
}

export default TemplateWrapper
