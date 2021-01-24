import React from 'react';
import { motion } from 'framer-motion'

export function SlideX({ children, amount, transitionProps, animateCondition = true, className, style })
{
  const defaultTransitionProps = {
    delay: 0.2,
    duration: 1
  }
  const tProps = transitionProps || defaultTransitionProps

  const variants = {
    hidden: { opacity: 0, x: amount },
    visible: {
      opacity: 1, x: 0,
      transition: tProps
    }
  }


  return (
    <div style={amount !== 0 ? { overflowX: 'hidden' } : {}}>
      <motion.div
        initial="hidden"
        animate={animateCondition ? "visible" : "hidden"}
        variants={variants}
        style={style}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

