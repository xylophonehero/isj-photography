import React, { useState, useEffect } from 'react'
// import PropTypes from 'prop-types'
// import { graphql, StaticQuery } from 'gatsby'
// import Img from 'gatsby-image'
import { FaAngleDoubleUp, FaRegEnvelope } from 'react-icons/fa'
import scrollTo from 'gatsby-plugin-smoothscroll';
import logo from '../img/isjlogo.svg'
import Facebook from '../img/social/facebook.inline.svg'
import Instagram from '../img/social/instagram.inline.svg'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IconContext } from 'react-icons/lib';
// import PreviewCompatibleImage from './PreviewCompatibleImage'

const Footer = () =>
{

  const [footerRef, footerInView] = useInView({
    triggerOnce: true
  })

  const [instagram, setInstagram] = useState([])

  useEffect(() =>
  {
    try
    {
      const fetchInstagram = async () =>
      {
        const endpoint = 'https://graph.instagram.com'
        const userId = '17841401783616660'
        const fields = 'id,media_url,permalink'
        const token = process.env.GATSBY_INSTAGRAM_TOKEN
        const limit = 6
        const url = `${endpoint}/${userId}/media/?fields=${fields}&access_token=${token}&limit=${limit}`

        const { data: posts } = await fetch(url, {
          method: 'GET',
        }).then(data => data.json())

        setInstagram(posts)
      }
      fetchInstagram()
    }
    catch (e)
    {
      console.error(e)
    }
  }, [])

  // const images = data?.allInstagramContent.edges

  const variants = {
    hiddden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.4
      }
    }
  }

  const imageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  return (
    <footer className="footer has-background-light has-text-black-ter is-relative" ref={footerRef}>
      {/* <div className="content has-text-centered">
          <img
            src={logo}
            alt="Kaldi"
            style={{ width: '14em', height: '10em' }}
          />
        </div> */}
      <button className="back-to-top has-background-light box has-text-dark" onClick={() => scrollTo('#top')} style={{ outline: 'none' }}>
        <FaAngleDoubleUp />
      </button>
      <div className="has-text-centered has-text-black-ter">
        <div className="container  has-text-black">
          <div style={{ maxWidth: '100vw' }} className="columns">
            <div className="column is-3">
              <img src={logo} alt="isj-photography" style={{ width: '100%', maxWidth: '250px' }} />
              <a href="mailto:sayhi@isjphotography.com" style={{ display: 'block' }}>
                <span className="icon-text">
                  <IconContext.Provider value={{ size: '1rem', className: 'mr-2' }}>
                    <FaRegEnvelope />
                  </IconContext.Provider>
                  <span> sayhi@isjphotography.com</span>
                </span>
              </a>
              <div className="is-flex is-justify-content-center">
                <a
                  className="navbar-item"
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="icon is-medium">
                    <Facebook />

                  </span>{/* <span className="icon">
                    <img src={Facebook} alt="Facebook" />
                  </span> */}
                </a>
                <a
                  className="navbar-item"
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="icon is-medium">
                    <Instagram />

                  </span>
                </a>
              </div>
            </div>
            {/* {!!data && <div className="column is-9">
              <motion.div className="columns is-multiline is-mobile"
                animate={footerInView ? 'visible' : ''}
                initial="hidden"
                variants={variants}
              >
                {images.map((item, index) => (
                  <motion.a
                    key={item.node.id}
                    className={`column is-one-third-tablet is-half-mobile is-one-fifth-desktop ${index === 5 && "is-hidden-desktop"}`}
                    href={item.node.permalink}
                    rel="noopener noreferrer"
                    target="_blank"
                    variants={imageVariants}
                  >
                    <PreviewCompatibleImage imageInfo={item.node.localImage} aspectRatio={1} />
                  </motion.a>
                ))}
              </motion.div>
            </div>} */}
            {!!instagram && <div className="column is-9">
              <motion.div className="columns is-multiline is-mobile"
                animate={footerInView ? 'visible' : ''}
                initial="hidden"
                variants={variants}
              >
                {instagram.map((item, index) => (
                  <motion.a
                    key={item.id}
                    className={`column is-one-third-tablet is-half-mobile is-one-fifth-desktop ${index === 5 && "is-hidden-desktop"}`}
                    href={item.permalink}
                    rel="noopener noreferrer"
                    target="_blank"
                    variants={imageVariants}
                  >
                    <figure className="image is-square">
                      <img src={item.media_url} alt="" style={{ objectFit: 'cover', borderRadius: '5px' }} />
                    </figure>
                    {/* <img src={item.url} style={{ borderRadius: '5px' }} /> */}
                  </motion.a>
                ))}
              </motion.div>
            </div>}
          </div>
          <div className="columns">
            <div className="column">
              <p>&#169; 2021 ISJ Photography</p>
            </div>
            <div className="column">
              <p className="is-size-6">Website built by <a href="https://nickworrall.co.uk" rel="noopener noreferrer" target="_blank">Nick Worrall</a></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )

}

// Footer.propTypes = {
//   data: PropTypes.shape({
//     allInstaNode: PropTypes.shape({
//       edges: PropTypes.array
//     })
//   })
// }

export default Footer

// export default () => (
//   <StaticQuery
//     query={graphql`
//       query Footer {
//         allInstagramContent(limit: 6, sort: {order: DESC, fields: timestamp}) {
//           edges {
//             node {
//               id
//               localImage {
//                 childImageSharp {
//                   fluid(maxWidth: 250, quality: 100) {
//                     ...GatsbyImageSharpFluid
//                   }
//                 }
//               }
//               permalink
//             }
//           }
//         }
//       }
//     `}
//     render={data => <Footer data={data} />}
//   />
// )