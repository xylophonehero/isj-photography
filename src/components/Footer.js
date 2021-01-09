import React from 'react'
import PropTypes from 'prop-types'
// import { graphql, StaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import { FaAngleDoubleUp, FaRegEnvelope } from 'react-icons/fa'
import scrollTo from 'gatsby-plugin-smoothscroll';
import logo from '../img/isjlogo.svg'
import Facebook from '../img/social/facebook.svg'
import Instagram from '../img/social/instagram.svg'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import PreviewCompatibleImage from './PreviewCompatibleImage'
// import PreviewCompatibleImage from './PreviewCompatibleImage'

// import logo from '../img/logo.svg'
// import facebook from '../img/social/facebook.svg'
// import instagram from '../img/social/instagram.svg'
// import twitter from '../img/social/twitter.svg'
// import vimeo from '../img/social/vimeo.svg'

// const Footer = class extends React.Component
const Footer = ({ data }) =>
{

  const [footerRef, footerInView] = useInView({
    triggerOnce: true
  })
  const images = data?.allInstaNode.edges

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
      <div className="content has-text-centered has-text-black-ter">
        <div className="container  has-text-black">
          <div style={{ maxWidth: '100vw' }} className="columns">
            <div className="column is-3">
              <img src={logo} alt="isj-photography" style={{ width: '100%', maxWidth: '250px' }} />
              <a href="mailto:isjphoto@hotmail.co.uk" style={{ display: 'block' }}>
                <FaRegEnvelope size="1rem" /> isjphoto@hotmail.co.uk
              </a>
              <div className="is-flex is-justify-content-center">
                <a
                  className="navbar-item"
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="icon">
                    <img src={Facebook} alt="Facebook" />
                  </span>
                </a>
                <a
                  className="navbar-item"
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="icon">
                    <img src={Instagram} alt="Instagram" />
                  </span>
                </a>
              </div>
              {/* <section className="menu">
                <ul className="menu-list">
                  <li>
                    <Link to="/" className="navbar-item">
                      Home
                      </Link>
                  </li>
                  <li>
                    <Link className="navbar-item" to="/about">
                      About
                      </Link>
                  </li>
                  <li>
                    <Link className="navbar-item" to="/products">
                      Products
                      </Link>
                  </li>
                  <li>
                    <Link className="navbar-item" to="/contact/examples">
                      Form Examples
                      </Link>
                  </li>
                  <li>
                    <a
                      className="navbar-item"
                      href="/admin/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Admin
                      </a>
                  </li>
                </ul>
              </section> */}
            </div>
            {!!data && <div className="column is-9">
              <motion.div className="columns is-multiline is-mobile"
                animate={footerInView ? 'visible' : ''}
                initial="hidden"
                variants={variants}
              >
                {images.map((item, index) => (
                  <motion.a
                    key={item.node.id}
                    className={`column is-one-third-tablet is-half-mobile is-one-fifth-desktop ${index === 5 && "is-hidden-desktop"}`}
                    href={`https://www.instagram.com/p/${item.node.id}/`}
                    rel="noopener noreferrer"
                    target="_blank"
                    variants={imageVariants}
                  >
                    {/* {item.node.localFile.childImageSharp.fixed} */}
                    {/* <PreviewCompatibleImage imageInfo={item.node.localFile} /> */}
                    <Img
                      fluid={{ ...item.node.localFile.childImageSharp.fluid, aspectRatio: 1 }}
                      alt={item.node.id}

                    />
                  </motion.a>
                ))}
              </motion.div>
            </div>}
            {/* <div className="column is-4">
                <section>
                  <ul className="menu-list">
                    <li>
                      <Link className="navbar-item" to="/blog">
                        Latest Stories
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/contact">
                        Contact
                      </Link>
                    </li>
                  </ul>
                </section>
              </div>
              <div className="column is-4 social">
                <a title="facebook" href="https://facebook.com">
                  <img
                    src={facebook}
                    alt="Facebook"
                    style={{ width: '1em', height: '1em' }}
                  />
                </a>
                <a title="twitter" href="https://twitter.com">
                  <img
                    className="fas fa-lg"
                    src={twitter}
                    alt="Twitter"
                    style={{ width: '1em', height: '1em' }}
                  />
                </a>
                <a title="instagram" href="https://instagram.com">
                  <img
                    src={instagram}
                    alt="Instagram"
                    style={{ width: '1em', height: '1em' }}
                  />
                </a>
                <a title="vimeo" href="https://vimeo.com">
                  <img
                    src={vimeo}
                    alt="Vimeo"
                    style={{ width: '1em', height: '1em' }}
                  />
                </a>
              </div> */}
          </div>
          <p className="is-size-7">Website built by <a href="https://nickworrall.co.uk" rel="noopener noreferrer" target="_blank">Nick Worrall</a></p>
        </div>
      </div>
    </footer>
  )

}

Footer.propTypes = {
  data: PropTypes.shape({
    allInstaNode: PropTypes.shape({
      edges: PropTypes.array
    })
  })
}

export default Footer

// export default () => (
//   <StaticQuery
//     query={graphql`
//       query Footer {
//         allInstaNode(limit: 6, sort: {order: DESC, fields: timestamp}) {
//           edges {
//             node {
//               id
//               localFile {
//                 childImageSharp {
//                   fluid(maxWidth: 250, quality: 100) {
//                     ...GatsbyImageSharpFluid
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     `}
//     render={data => <Footer data={data} />}
//   />
// )