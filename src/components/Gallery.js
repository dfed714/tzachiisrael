import client from "../client";
import React, { useState, useEffect, useRef } from "react";

export default function Gallery() {
  const [galleryData, setGalleryData] = useState(null);

  (function scrollUp() {
    window.scrollTo(0, 0);
  })();

  const filterData = (arr, key, value) => {
    return arr.filter((el) => el[key] === value);
  };

  const modal = useRef();

  const modalToggle = (title, url) => {
    [...modal.current.children][0].textContent = title;
    [...modal.current.children][1].src = url;
    modal.current.classList.toggle("display-none");
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
    <section className="gallery">
      {galleryData &&
        filterData(galleryData[0], "title", "Gallery").map((el, index) => (
          <section className={`banner navy`} key={index}>
            <img
              src={el.mainImage.asset.url}
              className="bannerImage"
              alt={el.alt}
            />
          </section>
        ))}
      <section className="container">
        {galleryData &&
          galleryData[1].map((el, index) => {
            let marginRight = "";
            if ((index + 1) % 3 !== 0) {
              marginRight = "margin-right-spacer";
            }

            return (
              <img
                src={el.galleryImage.asset.url}
                className={`galleryImage ${marginRight}`}
                key={index}
                alt={el.imageTitle}
                onClick={() =>
                  modalToggle(el.imageTitle, el.galleryImage.asset.url)
                }
              />
            );
          })}
      </section>
      <div className="modal display-none" ref={modal}>
        <p className="title"></p>
        <img alt="" />
        <button className="closeModal button" onClick={modalToggle}>
          Close
        </button>
      </div>
    </section>
  );
}
