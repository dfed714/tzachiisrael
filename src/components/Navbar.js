import { NavLink } from "react-router-dom";
import client from "../client";
import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const [logo, setLogo] = useState(null);

  const menu = useRef(null);
  const hamburger = useRef(null);
  const closeMenu = useRef(null);
  const dtopNav = useRef(null);
  const mobNav = useRef(null);

  (function scrollUp() {
    window.scrollTo(0, 0);
  })();

  let scrolling = [];

  const setScrolling = function () {
    scrolling.push(window.scrollY);
    if (scrolling.length > 2) {
      scrolling = scrolling.slice(scrolling.length - 2);
    }
  };

  if (mobNav.current) {
    window.addEventListener("scroll", function () {
      setScrolling();
      if (window.scrollY > 75) {
        if (scrolling[1] > scrolling[0]) {
          mobNav.current.style.transform = "translateY(-7.5rem)";
        } else {
          mobNav.current.style.transform = "translateY(0)";
        }
      } else {
        mobNav.current.style.transform = "translateY(0)";
      }
    });
  }

  const hamburgerFunc = function () {
    if (menu.current && window.innerWidth < 1150) {
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
    }
  };

  const location = useLocation();

  useEffect(() => {
    if (dtopNav.current) {
      [...dtopNav.current.children].forEach((link) => {
        link.classList.remove("bold");
        console.log(window.location.pathname);
        if (
          link.textContent === window.location.pathname.slice(1).toUpperCase()
        ) {
          link.classList.add("bold");
        }
        if (
          window.location.pathname.includes("/form/") &&
          link.textContent === "JOIN"
        ) {
          link.classList.add("bold");
        } else if (
          window.location.pathname.includes("/post/") &&
          link.textContent === "BLOG"
        ) {
          link.classList.add("bold");
        }
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
    <header className="page-header">
      <nav className="navbar dtop-only">
        <NavLink to="/">
          {logo &&
            logo[0].map((el, index) => (
              <img
                src={el?.tzachi_logo_image?.asset?.url}
                key={index}
                alt={el?.tzachi_logo_image?.alt}
              />
            ))}
        </NavLink>
        <ul className="navlinks" ref={dtopNav}>
          <li>
            <NavLink
              to="https://secure.merchpay.com/tzachi-israel/"
              target="_blank"
              rel="noreferrer"
            >
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
            <NavLink to="/join">JOIN</NavLink>
          </li>
          <li>
            <NavLink to="/gallery">GALLERY</NavLink>
          </li>
          <li>
            <NavLink to="/blog">BLOG</NavLink>
          </li>
          <li>
            <NavLink to="/contact">CONTACT</NavLink>
          </li>
        </ul>
      </nav>
      <div className="navbar mob-only" ref={mobNav}>
        <NavLink to="/">
          {logo &&
            logo[0].map((el, index) => (
              <img
                src={el?.tzachi_logo_image?.asset?.url}
                key={index}
                alt={el?.tzachi_logo_image?.alt}
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
      <div className="menu display-none" ref={menu}>
        <header className="header-menu">
          <button
            className="close-menu"
            onClick={hamburgerFunc}
            ref={closeMenu}
          >
            <i className="fa-solid fa-x"></i>
          </button>
        </header>
        <nav className="menu-nav">
          <ul className="menu-navlinks">
            <li>
              <NavLink to="/" exact="true" onClick={hamburgerFunc}>
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink
                to="https://secure.merchpay.com/tzachi-israel/"
                target="_blank"
                rel="noreferrer"
                onClick={hamburgerFunc}
              >
                DONATE
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" onClick={hamburgerFunc}>
                ABOUT
              </NavLink>
            </li>
            <li>
              <NavLink to="/programs" onClick={hamburgerFunc}>
                PROGRAMS
              </NavLink>
            </li>
            <li>
              <NavLink to="/join" onClick={hamburgerFunc}>
                JOIN
              </NavLink>
            </li>
            <li>
              <NavLink to="/gallery" onClick={hamburgerFunc}>
                GALLERY
              </NavLink>
            </li>
            <li>
              <NavLink to="/blog" onClick={hamburgerFunc}>
                BLOG
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" onClick={hamburgerFunc}>
                CONTACT
              </NavLink>
            </li>
            <li>
              <menu className="menu-socials">
                <li onClick={hamburgerFunc}>
                  <NavLink
                    to="https://www.instagram.com/tzachi.israel/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src="/images/insta.svg" alt="instagram link" />
                  </NavLink>
                </li>
                <li onClick={hamburgerFunc}>
                  <NavLink
                    to="https://www.facebook.com/profile.php?id=61558093857037&mibextid=qi2Omg&rdid=EX3bZz6uU2MjyK1C"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src="/images/facebook.svg" alt="facebook link" />
                  </NavLink>
                </li>
                <li onClick={hamburgerFunc}>
                  <NavLink
                    to="https://www.linkedin.com/company/tzachi-israel/?originalSubdomain=il"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src="/images/linkedin.svg" alt="linkedin link" />
                  </NavLink>
                </li>
              </menu>
            </li>
            {logo &&
              logo[1].map((el, index) => (
                <li key={index}>
                  <a href={"mailto:" + el?.generalEmail}>{el?.generalEmail}</a>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
