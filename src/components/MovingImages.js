// import React, { useState, useLayoutEffect } from 'react'
// import Img from 'gatsby-image'
// import { StaticQuery, graphql } from 'gatsby'
// // import PropTypes from 'prop-types';

// const MovingImages = ({ data }) =>
// {
//   const { blurbs: images } = data.markdownRemark.frontmatter.intro
//   images.sort(() => Math.random() - 0.5)
//   const [moveImage, setMoveImage] = useState(false)

//   useLayoutEffect(() =>
//   {
//     setMoveImage(true)
//   }, [])


//   const createStyle = (index) =>
//   {
//     var width = 0
//     var height = 0

//     if (typeof window !== 'undefined')
//     {
//       width = window.innerWidth
//       height = window.innerHeight
//     }


//     const animate = {
//       width: '300px',
//       position: 'absolute',
//       transform: moveImage ? `translate(${width * (index % 4 === 1 ? -0.5 : index % 4 === 3 ? 0.5 : 0)}px,${height * (index % 4 === 0 ? -0.5 : index % 4 === 2 ? 0.5 : 0)}px)` : `translate(0px, 0px)`,

//       left: (index + 1) % 4 > 1 ? '70%' : '10%',
//       top: index % 4 > 1 ? '10%' : '70%',
//       transition: `transform 30s linear ${index * 1}s`
//     }
//     console.log(index, animate.left, animate.top, animate.transform)
//     return animate
//   }

//   return (
//     <div style={{ width: '100vw', height: '100vh', position: 'absolute', top: 0 }}>
//       {images.sort().map((image, index) => (
//         <div key={image.image.id} style={createStyle(index)}>
//           <Img
//             style={{ animation: `opacity 30s both ${index * 1}s` }}
//             fluid={image.image.childImageSharp.fluid}
//           />
//         </div>
//       ))}
//     </div>
//   )
// }

// export default () =>
// {
//   return (
//     <StaticQuery
//       query={
//         graphql`
//         query GetImages {
//           markdownRemark(frontmatter: {templateKey: {eq: "index-page"} }) {
//             frontmatter {
//               intro {
//                 blurbs {
//                   image {
//                     id
//                     childImageSharp {
//                       fluid(maxWidth: 300) {
//                         ...GatsbyImageSharpFluid
//                       }
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       `}
//       render={data => <MovingImages data={data} />}
//     />
//   )

// }
