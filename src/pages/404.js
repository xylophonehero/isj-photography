import { Link } from 'gatsby'
import React from 'react'
import Layout from '../components/Layout'
import { Subtitle } from '../components/Styled'


const NotFoundPage = () => (
  <Layout>
    <div className="has-text-centered section content" style={{ minHeight: '55vh' }}>
      <Subtitle>NOT FOUND</Subtitle>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      <Link to="/">Back to Home</Link>
    </div>
  </Layout>
)

export default NotFoundPage
