import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

const PreviewCompatibleImage = ({ imageInfo, style, borderRadius = 5, aspectRatio }) =>
{
  const imageStyle = { ...style, borderRadius: `${borderRadius}px` }
  const { alt = '', childImageSharp, image } = imageInfo
  if (!!image && !!image.childImageSharp)
  {
    return (
      !!aspectRatio ?
        <Img imgStyle={imageStyle} fluid={{ ...image.childImageSharp.fluid, aspectRatio: aspectRatio }} alt={alt} /> :
        <Img imgStyle={imageStyle} fluid={image.childImageSharp.fluid} alt={alt} />
    )
  }

  if (!!childImageSharp)
  {
    return (
      !!aspectRatio ?
        <Img imgStyle={imageStyle} fluid={{ ...childImageSharp.fluid, aspectRatio: aspectRatio }} alt={alt} /> :
        <Img imgStyle={imageStyle} fluid={childImageSharp.fluid} alt={alt} />
    )
  }

  if (!!image && typeof image === 'string')
    return <img style={imageStyle} src={image} alt={alt} />

  return null
}

PreviewCompatibleImage.propTypes = {
  imageInfo: PropTypes.shape({
    alt: PropTypes.string,
    childImageSharp: PropTypes.object,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    style: PropTypes.object,
  }).isRequired,
  borderRadius: PropTypes.number
}

export default PreviewCompatibleImage
