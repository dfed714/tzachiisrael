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
          *[_type == 'contactBlock'] {
            generalEmail,
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
              alt={el.footerLogoImage.alt}
            />
          ))}
      </section>

      <section className="content">
        <div className="top">
          <div className="left">
            <menu>
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
                <NavLink
                  to="https://tzachiisrael.myshopify.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  MERCH
                </NavLink>
              </li>
            </menu>
          </div>
          <div className="right">
            <form
              name="Tzachi-Israel-Subscribe-Form"
              method="POST"
              data-netlify="true"
              className="form"
              onSubmit="submit"
            >
              <input
                type="hidden"
                name="form-name"
                value="Tzachi-Israel-Subscribe-Form"
              />
              <label htmlFor="subscribe-input">
                Subscribe to receive our newsletter
              </label>
              <div className="newsletter-input flex-row">
                <input
                  type="email"
                  name="email"
                  id="subscribe-input"
                  required
                ></input>
                <button type="submit">SUBSCRIBE</button>
              </div>
            </form>
            <div className="donate-mail">
              <NavLink
                to="https://secure.usaepay.com/interface/epayform/BSqPfjIzmGEc14U4cZ8mP0n2YTmyrZg9"
                target="_blank"
                rel="noreferrer"
              >
                <button>DONATE</button>
              </NavLink>
              {footerData &&
                footerData[1].map((el, index) => (
                  <a href={"mailto:" + el.generalEmail} key={index}>
                    <img src="/images/mail.png" alt="mail link" />
                  </a>
                ))}
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
              <NavLink
                to="https://www.instagram.com/tzachi.israel/"
                target="_blank"
                rel="noreferrer"
              >
                <img src="/images/insta.svg" alt="instagram link" />
              </NavLink>
              <NavLink
                to="https://www.linkedin.com/company/tzachi-israel/?originalSubdomain=il"
                target="_blank"
                rel="noreferrer"
              >
                <img src="/images/linkedin.svg" alt="linkedin link" />
              </NavLink>
              <NavLink
                to="https://www.facebook.com/profile.php?id=61558093857037&mibextid=qi2Omg&rdid=EX3bZz6uU2MjyK1C"
                target="_blank"
                rel="noreferrer"
              >
                <img src="/images/facebook.svg" alt="facebook link" />
              </NavLink>
            </menu>
          </div>
        </div>
      </section>
    </footer>
  );
}
