import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { useInView } from 'react-intersection-observer'
import Img from 'gatsby-image'
const GalleryModal = ({ setModalActive, activeItem, handleDirectionClick }) =>
{
  return (
    <div className="modal is-active" style={{ position: 'fixed' }}>
      <motion.div
        onClick={() => setModalActive(false)}
        className="modal-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        className="modal-content is-clipped"
        initial={{ opacity: 0, y: 100, scale: 0.5 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 100, scale: 0.5 }}
      >
        {/* TODO animate left and right images */}
        {/* <div className="columns is-mobile is-gapless">

          <div className="column is-narrow is-flex">
            <button className="is-large mt-2 gallery-arrow" aria-label="left" onClick={() => handleDirectionClick(-1)}><FaAngleLeft /></button>
          </div>
          <div className="column">
            <PreviewCompatibleImage imageInfo={activeItem} borderRadius={0} />
          </div>

          <div className="column is-narrow">
            <button className="is-large mt-2 gallery-arrow" aria-label="right" onClick={() => handleDirectionClick(1)}><FaAngleRight /></button>
          </div>
        </div> */}
        <div >
          <PreviewCompatibleImage imageInfo={activeItem} borderRadius={0} style={{ maxHeight: '80vh' }} />
          <div className="is-flex is-justify-content-center" style={{ height: '69px' }}>
            <button className="is-large mt-2 gallery-arrow" aria-label="left" onClick={() => handleDirectionClick(-1)}><FaAngleLeft /></button>
            <button className="is-large mt-2 gallery-arrow" aria-label="right" onClick={() => handleDirectionClick(1)}><FaAngleRight /></button>
          </div>
        </div>
      </motion.div>

      <button className="modal-close is-large" aria-label="close" onClick={() => setModalActive(false)} style={{ position: 'fixed' }} />
    </div>
  )
}

function Gallery({ gallery, desktop = "one-quarter", tablet = "half", mobile = "full", aspectRatio = 16 / 9, objectPosition = 'center' })
{

  const [modalActive, setModalActive] = useState(false)
  const [modalPhotoIndex, setModalPhotoIndex] = useState(0)

  const [galleryRef, galleryInView] = useInView({ triggerOnce: true })

  const handleGalleryClick = (index) =>
  {
    setModalPhotoIndex(index)
    setModalActive(true)
  }

  const handleDirectionClick = (direction) =>
  {
    const maxIndex = gallery.length - 1
    if (direction === -1 && modalPhotoIndex === 0)
    {
      setModalPhotoIndex(maxIndex)
      return;
    }
    if (direction === 1 && modalPhotoIndex === maxIndex)
    {
      setModalPhotoIndex(0)
      return;
    }
    setModalPhotoIndex(modalPhotoIndex + direction)
  }

  const galleryVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  const galleryItemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }

  }

  return (
    <div ref={galleryRef}>
      <motion.div
        animate={galleryInView ? 'visible' : 'hidden'}
        variants={galleryVariants}
        initial='hidden'
      >

        {/* <h3 className='subtitle is-size-2 has-text-weight-bold has-text-centered is-family-secondary'>Gallery</h3> */}
        <div className='columns is-mobile is-multiline'>

          {gallery.map((photo, index) => (
            <div key={photo.photo.id} className={`column is-${desktop}-desktop is-${tablet}-tablet is-${mobile}-mobile`}>
              <motion.div
                variants={galleryItemVariants}
                // className='has-background-primary'
                style={{ width: '100%', cursor: 'pointer' }}
                whileHover={{ scale: 1.1 }}
                onClick={() => handleGalleryClick(index)}

              >
                {/* <PreviewCompatibleImage imageInfo={photo.photo} aspectRatio={aspectRatio} style={{ objectPosition: 'top' }} /> */}
                <Img fluid={{ ...photo.photo.childImageSharp.fluid, aspectRatio: aspectRatio }} style={{ borderRadius: '5px' }} imgStyle={{ objectPosition: `center ${objectPosition}` }} />
              </motion.div>
            </div>
          ))}
        </div>
      </motion.div>
      {/* Modal */}
      <AnimatePresence>
        {
          modalActive &&
          <GalleryModal
            setModalActive={setModalActive}
            activeItem={gallery[modalPhotoIndex].photo}
            handleDirectionClick={handleDirectionClick}
          />
        }

      </AnimatePresence>
    </div>
  );
}

export default Gallery;