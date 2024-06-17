import client from "../client";
import React, { useState, useEffect } from "react";

export default function About() {
  const [aboutData, setAboutData] = useState(null);

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
          *[_type == 'aboutBlock'] {
          position,
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
        *[_type == 'teamMembers'] {
          name, 
          role,
          memberImage{
            asset->{
                _id, 
                url
            }, 
            alt
          }
        }, 
      ]`
      )
      .then((aboutData) => {
        setAboutData(aboutData);
      })
      .catch(console.error);
  }, []);

  return (
    <main className="about">
      {aboutData &&
        filterData(aboutData[0], "title", "About").map((el, index) => (
          <section className="banner" key={index}>
            <img src={el.mainImage.asset.url} />
          </section>
        ))}
      {aboutData &&
        aboutData[1]
          .sort((a, b) => a.position - b.position)
          .map((el, index) => {
            let colors = ["gold", "green", "brown"];
            return (
              <section className={`blocks ${colors[index]}`}>
                <div className="aboutBlock" key={index}>
                  <img src={el.blockImage.asset.url} />

                  <div className="text">
                    <p className="title">{el.title}</p>
                    <p className="paragraph">{el.text}</p>
                  </div>
                </div>
              </section>
            );
          })}
      <div className="section-split brown">
        <h1 className="title">OUR TEAM</h1>
        <hr />
      </div>
      <section className="teamMembers">
        {aboutData &&
          aboutData[2]
            .sort((a, b) => a.position - b.position)
            .map((el, index) => {
              return (
                <div className="teamMember" key={index}>
                  <img src={el.memberImage.asset.url} />
                  <p className="name">{el.name}</p>
                  <p className="role">{el.role}</p>
                </div>
              );
            })}
      </section>
    </main>
  );
}
