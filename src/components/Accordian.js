import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import { FaAngleDown } from 'react-icons/fa'
import { Transform } from '../components/Transform'
// import variables from './variables.scss'

function AccordianItem({ itemData, index, expanded, setExpanded })
{
  const isOpen = index === expanded

  return (
    <div className="card mb-5">
      <motion.header
        className="card-header"
        initial={false}
        animate={{ backgroundColor: isOpen ? "#BB8556" : "#F2ECE7" }}
        onClick={() => setExpanded(isOpen ? false : index)}
        onKeyDown={e => e.keyCode === 13 && setExpanded(isOpen ? false : index)}
        style={{ cursor: 'pointer', outline: 'none' }}
        role="button"
        tabIndex={0}
      >
        <h4 className="card-header-title m-0 is-size-5">{itemData.question}</h4>
        <p className="card-header-icon">
          <motion.span
            className="icon"
            initial={false}
            animate={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
            transition={{ duration: 0.8 }}
          >
            <FaAngleDown />
          </motion.span>
        </p>
      </motion.header>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <motion.div
              variants={{ collapsed: { opacity: 0 }, open: { opacity: 1 } }}
              transition={{ duration: 0.8 }}
              className="content-placeholder card-content"
            >
              <div className="content is-size-6"><p dangerouslySetInnerHTML={{ __html: Transform(itemData.answer) }} /></div>
            </motion.div>

          </motion.section>
        )}
      </AnimatePresence>
    </div>
  )
}


function Accordian({ data })
{
  const [expanded, setExpanded] = useState(-1)

  return (
    <div>
      {data.map((item, index) => (
        <AccordianItem
          key={item.question}
          index={index}
          expanded={expanded}
          setExpanded={setExpanded}
          itemData={item}
        />
      ))}
    </div>
  );
}

export default Accordian;