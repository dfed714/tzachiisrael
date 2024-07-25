import client from "../client";
import React, { useState, useEffect } from "react";
export default function Programs() {
  const [programData, setProgamData] = useState(null);

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
          *[_type == 'programBlock'] {
          position,
          title, 
          text, 
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
      .then((data) => {
        setProgamData(data);
      })
      .catch(console.error);
  }, []);

  return (
    <section className="program">
      {programData &&
        filterData(programData[0], "title", "Programs").map((el, index) => (
          <div className="banner" key={index}>
            <img src={el?.mainImage?.asset?.url} alt={el?.mainImage?.alt} />
          </div>
        ))}
      <div className="blocks">
        {programData &&
          programData[1]
            .sort((a, b) => a?.position - b?.position)
            .map((el, index) => {
              let blockDirection = "imageRight";
              if (index % 2 === 0) {
                blockDirection = "imageLeft";
              }
              let colors = ["gold", "green", "brown"];
              return (
                <div
                  className={`programBlock ${colors[index]}`}
                  key={index}
                  data-direction={blockDirection}
                >
                  <div className="text">
                    <h1>{el?.title}</h1>
                    <p className="paragraph">{el?.text}</p>
                  </div>
                  <img
                    src={el?.blockImage?.asset?.url}
                    alt={el?.blockImage?.alt}
                  />
                </div>
              );
            })}
      </div>
    </section>
  );
}
