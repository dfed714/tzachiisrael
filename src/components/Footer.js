import client from "../client";
import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function Footer() {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    client
      .fetch(
        `[
          *[_type == 'footerLogo'] {
            title,
            footerLogoImage{
              asset->{
                  _id,
                  url
              },
              alt
            }
          },
        ]`
      )
      .then((footerData) => {
        setFooterData(footerData);
      })
      .catch(console.error);
  }, []);

  return (
    <footer className="footer">
      <section className="footer-logo">
        {footerData &&
          footerData[0].map((el, index) => (
            <img
              src={el.footerLogoImage.asset.url}
              className="footerLogoImage"
              key={index}
            />
          ))}
      </section>

      <section className="content">
        <div className="top">
          <div className="left">
            <menu>
              <li>
                <NavLink to="/">SITE MAP</NavLink>
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
            </menu>
            <menu>
              <li>
                <NavLink to="/gallery">GALLERY</NavLink>
              </li>
              <li>
                <NavLink to="/blog">BLOG</NavLink>
              </li>
              <li>
                <NavLink to="/">MERCH</NavLink>
              </li>
            </menu>
          </div>
          <div className="right">
            <form>
              <label htmlFor="subscribe-input">
                Subscribe to receive our newsletter
              </label>
              <div className="newsletter-input flex-row">
                <input type="text" id="subscribe-input"></input>
                <button type="submit">SUBSCRIBE</button>
              </div>
            </form>
            <div className="donate-mail">
              <a>
                <button>DONATE</button>
              </a>
              <a>
                <img src="/images/mail.png" alt="mail link" />
              </a>
            </div>
          </div>
        </div>
        <div className="bottom">
          <div className="left">
            <div className="addresses">
              <p>
                US OFFICE: TZACHIISRAELFUND 1150 S. Cedar Crest Blvd. Suite 200,
                Allentown, PA 18103 | 501c3 99-0607155
              </p>
              <p>
                Israel Office: TZACHIISRAEL HaZayit 13, Hashmonaim, Israel
                7312700 | Seif 46 580783413
              </p>
            </div>
          </div>
          <div className="right">
            <menu>
              <a>
                <img src="/images/insta.svg" alt="instagram link" />
              </a>
              <a>
                <img src="/images/facebook.svg" alt="facebook link" />
              </a>
              <a>
                <img src="/images/linkedin.svg" alt="linkedin link" />
              </a>
            </menu>
          </div>
        </div>
      </section>
    </footer>
  );
}
