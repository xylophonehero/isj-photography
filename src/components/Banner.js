import React from 'react';
import { Link } from 'gatsby'
import { FaArrowRight } from 'react-icons/fa';

function Banner({ backgroundColor })
{
  return (
    <div className={`hero has-background-${backgroundColor}`}>
      <div className="hero-body has-text-centered">
        <p className="is-size-4 pb-3">Contact me to chat about your photoshoot.</p>
        <Link to="/contact">
          <button className="button is-primary">
            <span className="mr-2">Let's Go</span>
            <FaArrowRight />
          </button></Link>
      </div>
    </div>
  );
}

export default Banner;