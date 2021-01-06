import React from 'react';
import scrollTo from 'gatsby-plugin-smoothscroll'
import { motion } from 'framer-motion'

function TimelineNode({ top, title, sessionInView })
{
  const timelinePoints = {
    height: '2rem',
    width: '2rem',
    left: '.5rem',
    position: 'absolute',
    // backgroundColor: 'black',
    border: 'solid .25rem',
    borderRadius: '1rem',
    transform: 'translateY(-30px)',
    zIndex: 3
  }

  return (
    <button
      onClick={() => scrollTo(`#${title}`)}
      className="timeline p-0"
      style={{ ...timelinePoints, top: top }}
    >
      <motion.div
        className="timeline-node"
        style={{
          height: '1.5rem',
          width: '1.5rem',
          position: 'absolute',
          borderRadius: '1rem',
          zIndex: 4,
          transform: 'translateY(-50%)',
          outline: 'none'
        }}
        animate={{ opacity: sessionInView === title ? 1 : 0 }}
        transition={{ delay: 0.1 }}
      />
    </button>
  )
}

function VerticalTimeline({ sessionInView, foralEnd })
{
  return (
    <div style={{ position: 'sticky', top: '10%' }}>

      <div style={{ height: '75vh' }}>
        <img src={foralEnd} style={{ position: 'absolute', bottom: '95%', height: '3rem' }} alt='floral' />
        <TimelineNode title="engagement" sessionInView={sessionInView} top='12%' />
        <TimelineNode title="weddings" sessionInView={sessionInView} top='31%' />
        <TimelineNode title="maternity" sessionInView={sessionInView} top='50%' />
        <TimelineNode title="newborns" sessionInView={sessionInView} top='69%' />
        <TimelineNode title="family-photos" sessionInView={sessionInView} top='88%' />
        {/* <div onClick={() => scrollTo('#engagement')} className="timeline" style={{ ...timelinePoints, top: '12%', backgroundColor: sessionInView === "Engagement" ? 'white' : 'black' }} />
        <div onClick={() => scrollTo('#weddings')} className="timeline" style={{ ...timelinePoints, top: '31%', backgroundColor: sessionInView === "Weddings" ? 'white' : 'black' }} />
        <div onClick={() => scrollTo('#maternity')} className="timeline" style={{ ...timelinePoints, top: '50%', backgroundColor: sessionInView === "Maternity" ? 'white' : 'black' }} />
        <div onClick={() => scrollTo('#newborns')} className="timeline" style={{ ...timelinePoints, top: '69%', backgroundColor: sessionInView === "Newborns" ? 'white' : 'black' }} />
        <div onClick={() => scrollTo('#family-photos')} className="timeline" style={{ ...timelinePoints, top: '88%', backgroundColor: sessionInView === "Family Photos" ? 'white' : 'black' }} /> */}
        <div
          className='timeline'
          style={{ height: '90%', width: 0, borderLeft: '.125rem solid', position: 'absolute', top: '3%', left: '1.43rem', zIndex: 1 }}
        />
        <img src={foralEnd} style={{ position: 'absolute', top: '91%', height: '3rem', transform: 'rotate(180deg)' }} alt='floral' />
      </div>
    </div>
  );
}

export default VerticalTimeline;