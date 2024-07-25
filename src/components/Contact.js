import client from "../client";
import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function Contact() {
  const [contactData, setContactData] = useState(null);

  (function scrollUp() {
    window.scrollTo(0, 0);
  })();

  const filterData = (arr, key, value) => {
    return arr.filter((el) => el[key] === value);
  };

  useEffect(() => {
    client
      .fetch(
        `[
          *[_type == 'banners'] {
            title, 
            headline, 
            slogan, 
            button, 
            buttonLink, 
            mainImage{
              asset->{
                  _id, 
                  url
              }, 
              alt
            }  
          },
          *[_type == 'contactBlock'] {
            usOffice, 
            israelOffice,
            generalEmail,
            specificEmail,
            blockImage{
              asset->{
                  _id, 
                  url
              }, 
              alt
            }
          },
      ]`
      )
      .then((contactData) => {
        setContactData(contactData);
      })
      .catch(console.error);
  }, []);
  return (
    <section className="contact">
      {contactData &&
        filterData(contactData[0], "title", "Contact").map((el, index) => {
          return (
            <section className="banner" key={index}>
              <img src={el?.mainImage?.asset?.url} alt={el?.mainImage?.alt} />
            </section>
          );
        })}
      {contactData &&
        contactData[1].map((el, index) => {
          return (
            <section className="contactBlock gold" key={index}>
              <img src={el?.blockImage?.asset?.url} alt={el?.blockImage?.alt} />
              <div className="text">
                <h1>CONTACT US</h1>
                <div className="addresses">
                  <div>
                    <p>United States Office</p>
                    <p>{el?.usOffice}</p>
                  </div>
                  <div>
                    <p>Israel Office</p>
                    <p>{el?.israelOffice}</p>
                  </div>
                </div>
                <div className="addresses">
                  <div>
                    <p>General Inquiries</p>
                    <p>{el?.generalEmail}</p>
                  </div>
                  <div>
                    <p>Specific Inquiries</p>
                    <p>{el?.specificEmail}</p>
                  </div>
                </div>
                <menu>
                  <NavLink
                    to="https://www.instagram.com/tzachi.israel/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src="/images/insta_gold.svg" alt="instagram link" />
                  </NavLink>
                  <NavLink
                    to="https://www.linkedin.com/company/tzachi-israel/?originalSubdomain=il"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src="/images/linkedin_gold.svg" alt="linkedin link" />
                  </NavLink>
                  <NavLink
                    to="https://www.facebook.com/profile.php?id=61558093857037&mibextid=qi2Omg&rdid=EX3bZz6uU2MjyK1C"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src="/images/facebook_gold.svg" alt="facebook link" />
                  </NavLink>
                </menu>
              </div>
            </section>
          );
        })}
    </section>
  );
}
