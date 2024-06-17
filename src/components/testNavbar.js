import { NavLink } from "react-router-dom";
import client from "../client";
import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const [logo, setLogo] = useState(null);

  const menu = useRef(null);
  const hamburger = useRef(null);
  const closeMenu = useRef(null);
  const header = useRef(null);
  const mobMenu = useRef(null);
  const dtopNav = useRef(null);

  let scrolling = [];

  const setScrolling = function () {
    scrolling.push(window.scrollY);
    if (scrolling.length > 2) {
      scrolling = scrolling.slice(scrolling.length - 2);
    }
  };

  window.addEventListener("scroll", function () {
    setScrolling();
    if (window.scrollY > 160) {
      if (scrolling[1] > scrolling[0]) {
        document.querySelector(".header-mob").style.transform =
          "translateY(-100%)";
      } else {
        document.querySelector(".header-mob").style.transform =
          "translateY(0%)";
      }
    } else {
      document.querySelector(".header-mob").style.transform = "translateY(0%)";
    }
  });
  const hamburgerFunc = function () {
    if (menu.current.classList.contains("display-none")) {
      menu.current.classList.remove("display-none");
      menu.current.classList.remove("slide-out");
      menu.current.classList.add("slide-in");
    } else {
      menu.current.classList.remove("slide-in");
      menu.current.classList.add("slide-out");
      setTimeout(function () {
        menu.current.classList.add("display-none");
      }, 450);
    }
  };

  const navLinkFunc = function () {
    window.scrollTo(0, 0);
    hamburgerFunc();
  };

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
    <>
      <header>
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
        </nav>
        <div className="header-mob" ref={header}>
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
          <button
            className="hamburger"
            aria-label="Menu Button"
            onClick={hamburgerFunc}
            ref={hamburger}
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </header>
      <section className="menu display-none slide-in" ref={menu}>
        <header className="header-menu">
          <button
            className="close-menu"
            onClick={hamburgerFunc}
            ref={closeMenu}
          >
            <i className="fa-solid fa-x"></i>
          </button>
        </header>
        <nav>
          <menu className="menu-nav">
            <li>
              <NavLink to="/" exact="true">
                DONATE
              </NavLink>
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
              <menu className="menu-socials">
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
              </menu>
            </li>
            {logo &&
              logo[1].map((el, index) => (
                <li key={index}>
                  <a href={"mailto:" + el.generalEmail}>{el.generalEmail}</a>
                </li>
              ))}
          </menu>
        </nav>
      </section>
    </>
  );
}
