import { NavLink } from "react-router-dom";
import client from "../client";
import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const [logo, setLogo] = useState(null);

  const hamburger = useRef(null);
  const xout = useRef(null);
  const mobMenu = useRef(null);
  const dtopNav = useRef(null);

  const showMenu = () => {
    mobMenu.current.classList.remove("slide-right");
    mobMenu.current.classList.add("slide-left");
    mobMenu.current.classList.remove("display-none");
    window.setTimeout(() => {
      if (mobMenu.current) {
        xout.current.classList.remove("display-none");
      }
    }, 150);
  };

  const hideMenu = () => {
    if (mobMenu.current) {
      mobMenu.current.classList.remove("slide-left");
      mobMenu.current.classList.add("slide-right");
      xout.current.classList.add("display-none");
      window.setTimeout(() => {
        if (mobMenu.current) {
          mobMenu.current.classList.add("display-none");
        }
      }, 450);
    }
  };

  if (mobMenu.current) {
    mobMenu.current.querySelectorAll("li").forEach((button) => {
      button.addEventListener("click", hideMenu);
    });
  }

  const location = useLocation();

  useEffect(() => {
    if (dtopNav.current) {
      [...dtopNav.current.children].forEach((link) => {
        link.classList.remove("bold");
        if (
          link.textContent === window.location.pathname.slice(1).toUpperCase()
        )
          link.classList.add("bold");
      });
    }
  }, [location]);

  useEffect(() => {
    client
      .fetch(
        `[
          *[_type == 'tzachi_logo'] {
            title,
            tzachi_logo_image{
              asset->{
                  _id, 
                  url
              }, 
              alt
            }  
          },
          *[_type == 'contactBlock'] {
            generalEmail,
          },
      ]`
      )
      .then((logo) => {
        setLogo(logo);
      })
      .catch(console.error);
  }, []);
  return (
    <nav className="navbar flex-row">
      <NavLink to="/">
        {logo &&
          logo[0].map((el, index) => (
            <img
              src={el.tzachi_logo_image.asset.url}
              key={index}
              alt={el.tzachi_logo_image.alt}
            />
          ))}
      </NavLink>
      <menu className="navlinks flex-row dtop-only" ref={dtopNav}>
        <li>
          <NavLink to="/">DONATE</NavLink>
        </li>
        <li>
          <NavLink to="/about">ABOUT</NavLink>
        </li>
        <li>
          <NavLink to="/programs">PROGRAMS</NavLink>
        </li>
        <li>
          <NavLink to="/volunteer">VOLUNTEER</NavLink>
        </li>
        <li>
          <NavLink to="/gallery">GALLERY</NavLink>
        </li>
        <li>
          <NavLink to="/blog">BLOG</NavLink>
        </li>
        <li>
          <NavLink to="/">MERCH</NavLink>
        </li>
        <li>
          <NavLink to="/contact">CONTACT</NavLink>
        </li>
      </menu>
      <div className="mob-menu mob-only display-none" ref={mobMenu}>
        <menu className="navlinks">
          <li>
            <NavLink to="/">DONATE</NavLink>
          </li>
          <li>
            <NavLink to="/about">ABOUT</NavLink>
          </li>
          <li>
            <NavLink to="/programs">PROGRAMS</NavLink>
          </li>
          <li>
            <NavLink to="/volunteer">VOLUNTEER</NavLink>
          </li>
          <li>
            <NavLink to="/gallery">GALLERY</NavLink>
          </li>
          <li>
            <NavLink to="/blog">BLOG</NavLink>
          </li>
          <li>
            <NavLink to="/">MERCH</NavLink>
          </li>
          <li>
            <NavLink to="/contact">CONTACT</NavLink>
          </li>
          <li>
            <ul className="flex-row g-spacer">
              <li>
                <a>
                  <img src="/images/insta.svg" alt="instagram link" />
                </a>
              </li>
              <li>
                <a>
                  <img src="/images/facebook.svg" alt="facebook link" />
                </a>
              </li>
              <li>
                <a>
                  <img src="/images/linkedin.svg" alt="linkedin link" />
                </a>
              </li>
            </ul>
          </li>
          {logo &&
            logo[1].map((el, index) => (
              <li key={index}>
                <a href={"mailto:" + el.generalEmail}>{el.generalEmail}</a>
              </li>
            ))}
        </menu>
      </div>
      <button className="hamburger mob-only" ref={hamburger} onClick={showMenu}>
        <i className="fa-solid fa-bars"></i>
      </button>
      <button className="xout display-none" ref={xout} onClick={hideMenu}>
        <i className="fa-solid fa-x"></i>
      </button>
    </nav>
  );
}
