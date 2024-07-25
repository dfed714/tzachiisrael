import client from "../client";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Volunteer() {
  const [volunteerData, setVolunteerData] = useState(null);

  const filterData = (arr, key, value) => {
    return arr.filter((el) => el[key] === value);
  };

  (function scrollUp() {
    window.scrollTo(0, 0);
  })();

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
          *[_type == 'volunteerBlock'] {
            title, 
            text,
            button,
            buttonLink, 
            blockImage{
              asset->{
                  _id, 
                  url
              }, 
              alt
            }
          },
          *[_type == 'form'] {
          slug
          },
      ]`
      )
      .then((volunteerData) => {
        setVolunteerData(volunteerData);
      })
      .catch(console.error);
  }, []);

  const getForm = (label) => {
    console.log(volunteerData[2][0].slug.current);
    return (
      <Link
        to={"/form/" + volunteerData[2][0].slug.current}
        key={volunteerData[2][0].slug.current}
        className="button"
      >
        <p>{label}</p>
      </Link>
    );
  };

  return (
    <section className="volunteer">
      {volunteerData &&
        filterData(volunteerData[0], "title", "Volunteer").map((el, index) => {
          return (
            <section className="banner" key={index}>
              <img src={el.mainImage.asset.url} alt={el.mainImage.alt} />
            </section>
          );
        })}
      <section className="blocks">
        {volunteerData &&
          volunteerData[1].map((el, index) => {
            return (
              <div className="volunteerBlock" key={index}>
                <img
                  src={el?.blockImage?.asset?.url}
                  alt={el?.blockImage?.alt}
                />

                <div className="text brown">
                  <h1>{el?.title}</h1>
                  <h2>{el?.text}</h2>
                  {getForm(el?.button)}
                </div>
              </div>
            );
          })}
      </section>
    </section>
  );
}
