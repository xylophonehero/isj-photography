import { graphql, Link } from 'gatsby';
import { kebabCase } from 'lodash';
import React from 'react';
import { Title } from '../components/Styled'
import Content, { HTMLContent } from '../components/Content';
import { motion } from 'framer-motion'
import Layout from '../components/Layout'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'


function WeddingGalleryTemplate({
  title,
  content,
  contentComponent,
  albums
})
{


  const PageContent = contentComponent || Content
  // const AlbumTitles = [
  // "Simply You",
  // "Those Moments",
  // "Little Details",
  // "The Prep",
  // "Down on the Dancefloor",
  // "The Ceremony"
  // ]
  return (

    <>
      <section className="section">
        <div className="container">
          <Title>{title}</Title>
          <hr />
          <PageContent content={content} className="has-text-centered is-size-5" />

        </div>
      </section>
      <section className="section ">
        <div className="container">
          <div className="columns is-centered is-multiline">
            {albums.map(album => (
              <div key={album.node.title} className="column is-one-third-desktop is-half-tablet">
                <Link to={`/galleries/wedding/${kebabCase(album.node.title)}`}>
                  <motion.div
                    className="card"
                    whileHover={{ scale: 1.1 }}
                    style={{ originY: 0, position: 'relative' }}
                  >
                    <div className="card-image" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
                      <PreviewCompatibleImage imageInfo={album.node.cover.photo} borderRadius={0} aspectRatio={4 / 3} />
                    </div>
                    <div style={{ backgroundColor: 'rgba(0,0,0,0.3)', height: '100%', position: 'absolute', width: '100%', top: 0 }}>
                      <h3
                        className='subtitle is-2 is-family-secondary has-text-white p-2'
                        style={{
                          position: 'absolute',
                          bottom: '10%',
                          left: '10%',
                          // backgroundColor: 'rgba(0,0,0,0.4)'
                          // transform: 'translate(-50%, -50%)',
                        }}
                      >
                        {album.node.title}
                      </h3>
                    </div>
                  </motion.div>
                </Link>
              </div>))}
          </div>
        </div>
      </section>
      <div className="hero has-background-white-ter">
        <div className="hero-body has-text-centered">
          <p className="is-size-4 pb-3">Contact me to chat about your photoshoot.</p>
          <Link to="/contact"><button className="button is-primary">Contact me</button></Link>
        </div>
      </div>
    </>

  );
}

const WeddingGallery = ({ data }) =>
{

  const markdown = data.markdownRemark

  const allAlbums = data.allGooglePhotosAlbum.edges
  const albums = allAlbums.filter(x => markdown.frontmatter.albums.includes(x.node.title))

  return (
    <Layout>
      <WeddingGalleryTemplate
        title={markdown.frontmatter.title}
        content={markdown.html}
        contentComponent={HTMLContent}
        albums={albums}
      />
    </Layout>
  )
}


export default WeddingGallery;

export const pageQuery = graphql`
  query WeddingGallery($id: String!) {
    markdownRemark(id: { eq: $id }){
      html
      frontmatter{
        title
        albums
      }
    }
    allGooglePhotosAlbum {
      edges {
        node {
          title
          cover {
            photo {
              childImageSharp {
                fluid(maxWidth: 1024, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  } 
`