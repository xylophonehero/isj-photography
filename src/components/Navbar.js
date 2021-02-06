import React, { useState } from 'react'
import { Link } from 'gatsby'
// import github from '../img/github-icon.svg'
import logo from '../img/isjlogo.svg'
import Facebook from '../img/social/facebook.inline.svg'
import Instagram from '../img/social/instagram.inline.svg'
// import { ReactComponent as AltFacebook } from '../img/social/instagram.svg'
// import { set } from 'lodash'


const Navbar = () =>
{


  const [active, setActive] = useState(false);

  return (
    <nav
      className="navbar is-transparent has-background-light"
      role="navigation"
      aria-label="main-navigation"
    >
      <div className="container">
        <div className="navbar-brand has-background-light">
          <Link to="/" className="navbar-item" title="Logo">
            <img src={logo} alt="isj-photography" />
          </Link>
          {/* Hamburger menu */}
          <div
            className={`navbar-burger burger ${active && 'is-active'}`}
            data-target="navMenu"
            onClick={() => setActive(!active)}
            role="button"
            tabIndex='0'
            onKeyDown={e => { e.keyCode === 13 && setActive(!active) }}
            style={{ height: '100px', width: '100px', outline: 'none' }}
          >
            <span />
            <span />
            <span />
          </div>
        </div>
        <div
          id="navMenu"
          className={`navbar-menu ${active && 'is-active'}`}
        >
          <div className={`navbar-start  is-uppercase`}>
            <div className="navbar-item is-hoverable has-dropdown">
              <Link className="navbar-link" to="/about">
                About
              </Link>
              <div className="navbar-dropdown">
                <Link className="navbar-item" to="/about/studio">
                  My studio
                </Link>
              </div>
            </div>

            {/* <div className="navbar-item"> */}
            <Link className="navbar-item" to="/galleries">
              Galleries
                </Link>
            {/* <div className="navbar-dropdown">
                <Link className="navbar-item" to="/galleries/engagement">
                  Engagement
                </Link>
                <Link className="navbar-item" to="/galleries/wedding">
                  Wedding
                </Link>
                <Link className="navbar-item" to="/galleries/maternity">
                  Maternity
                </Link>
                <Link className="navbar-item" to="/galleries/newborn">
                  Newborn
                </Link>
                <Link className="navbar-item" to="/galleries/family">
                  Family
                </Link>
                <Link className="navbar-item" to="/galleries/sitters">
                  Sitters
                </Link>
                <Link className="navbar-item" to="/galleries/cake-smash">
                  Cake Smash
                </Link>
                <Link className="navbar-item" to="/galleries/headshots">
                  Headshots
                </Link>
                <Link className="navbar-item" to="/galleries/hair-and-makeup">
                  Hair and Makeup
                </Link>
              </div> */}
            {/* </div> */}
            <div className="navbar-item is-hoverable has-dropdown">
              <Link className="navbar-link" to="/sessions">
                Sessions
                </Link>
              <div className="navbar-dropdown">
                <Link className="navbar-item" to="/sessions/engagement">
                  Engagement
                </Link>
                <Link className="navbar-item" to="/sessions/wedding">
                  Wedding
                </Link>
                <Link className="navbar-item" to="/sessions/maternity">
                  Maternity
                </Link>
                <Link className="navbar-item" to="/sessions/newborn">
                  Newborn
                </Link>
                <Link className="navbar-item" to="/sessions/family">
                  Family
                </Link>
                <Link className="navbar-item" to="/sessions/sitters">
                  Sitters
                </Link>
                <Link className="navbar-item" to="/sessions/cake-smash">
                  Cake Smash
                </Link>
                <Link className="navbar-item" to="/sessions/hair-and-makeup">
                  Hair and Makeup
                </Link>
              </div>
            </div>
            <Link className="navbar-item" to="/wall-art">
              Wall Art
              </Link>
            <Link className="navbar-item" to="/testimonials">
              Testimonials
              </Link>
            <Link className="navbar-item" to="/blog">
              Blog
              </Link>
            <Link className="navbar-item" to="/contact">
              Contact
              </Link>
          </div>
          <div className="navbar-end has-text-centered">
            <a
              className="navbar-item"
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="icon is-medium">
                <Facebook />

              </span>
              {/* <span className="icon">
                <img src={Facebook} alt="Facebook" style={{ maxWidth: '2rem' }} />
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
              {/* <span className="icon">
                <img src={Instagram} alt="Instagram" style={{ maxWidth: '2rem' }} />
              </span> */}
              {/* <AltFacebook /> */}
            </a>
          </div>
        </div>
      </div>
    </nav>
  )

}

export default Navbar
