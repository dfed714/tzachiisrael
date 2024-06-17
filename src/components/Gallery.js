import client from "../client";
import React, { useState, useEffect } from "react";

export default function Gallery() {
  const [galleryData, setGalleryData] = useState(null);

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
          *[_type == 'galleryBlock'] {
            imageTitle,
            galleryImage {
              asset->{
                _id,
                url,
              }
            }
          }
        ]`
      )
      .then((galleryData) => {
        setGalleryData(galleryData);
      })
      .catch(console.error);
  }, []);
  return (
    <main className="gallery">
      {galleryData &&
        filterData(galleryData[0], "title", "Gallery").map((el, index) => (
          <section className={`banner navy`} key={index}>
            <img src={el.mainImage.asset.url} className="bannerImage" />
          </section>
        ))}
      <section className="container">
        {galleryData &&
          galleryData[1].map((el, index) => {
            let marginRight = "";
            if ((index + 1) % 3 != 0) {
              marginRight = "margin-right-spacer";
            }

            return (
              <img
                src={el.galleryImage.asset.url}
                className={`galleryImage ${marginRight}`}
                key={index}
              />
            );
          })}
      </section>
    </main>
  );
}
