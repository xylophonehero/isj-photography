import React, { useState } from 'react'
import { Link } from 'gatsby'
import github from '../img/github-icon.svg'
import logo from '../img/logo.svg'
// import { set } from 'lodash'

const Navbar = () =>
{


  const [active, setActive] = useState(false);



  return (
    <nav
      className="navbar is-transparent"
      role="navigation"
      aria-label="main-navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item" title="Logo">
            <img src={logo} alt="Kaldi" style={{ width: '88px' }} />
          </Link>
          {/* Hamburger menu */}
          <div
            className={`navbar-burger burger ${active && 'is-active'}`}
            data-target="navMenu"
            onClick={() => setActive(!active)}
            role="button"
            tabIndex='0'
            onKeyDown={() => setActive(!active)}
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
          <div className="navbar-start has-text-centered">
            <Link className="navbar-item" to="/about">
              About
              </Link>
            <Link className="navbar-item" to="/products">
              Products
              </Link>
            <Link className="navbar-item" to="/blog">
              Blog
              </Link>
            <Link className="navbar-item" to="/contact">
              Contact
              </Link>
            <Link className="navbar-item" to="/blank">
              Blank
              </Link>
            <Link className="navbar-item" to="/contact/examples">
              Form Examples
              </Link>
          </div>
          <div className="navbar-end has-text-centered">
            <a
              className="navbar-item"
              href="https://github.com/netlify-templates/gatsby-starter-netlify-cms"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="icon">
                <img src={github} alt="Github" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  )

}

export default Navbar
