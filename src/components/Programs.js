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
            <img src={el.mainImage.asset.url} />
          </div>
        ))}
      {programData &&
        programData[1]
          .sort((a, b) => a.position - b.position)
          .map((el, index) => {
            let blockDirection = "imageRight";
            if (index % 2 === 0) {
              blockDirection = "imageLeft";
            }
            return (
              <div className="blocks" key={index}>
                <div className="programBlock" data-direction={blockDirection}>
                  <div className="text">
                    <p className="title">{el.title}</p>
                    <p className="paragraph">{el.text}</p>
                  </div>
                  <img src={el.blockImage.asset.url} />
                </div>
              </div>
            );
          })}
    </section>
  );
}
