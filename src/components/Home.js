import client from "../client";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [homeData, setHomeData] = useState(null);

  const [slideIndex, setSlideIndex] = useState(0);

  const slider = useRef();
  const slideDistance = `var(--slideDistance)`;

  if (slider.current) {
    slider.current.style.transform = `translateX(calc(${slideIndex} * ${slideDistance}))`;
  }

  const goToPreviousSlide = () => {
    const slides = [...slider.current.children];
    let curSlide = slides[slideIndex + 1];
    let prevSlide = slides[slideIndex];
    if (slideIndex >= 0) {
      prevSlide.classList.add("active-height");
      setSlideIndex(slideIndex - 1);
      curSlide.classList.remove("active-height");
    }
  };

  const goToNextSlide = () => {
    const slides = [...slider.current.children];
    let curSlide = slides[slideIndex + 2];
    let prevSlide = slides[slideIndex + 1];
    if (slideIndex < slides.length - 2) {
      prevSlide.classList.remove("active-height");
      setSlideIndex(slideIndex + 1);
      curSlide.classList.add("active-height");
    }
  };

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
          *[_type == 'slogan'] {
            title, 
            sloganImage{
              asset->{
                  _id, 
                  url
              }, 
              alt
            }  
          },
          *[_type == 'homeBlock'] {
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
        *[_type =='homeSlider'] {
          imageTitle, 
          sliderImage {
            asset->{
              url,
              id,
            }
          }
        },
        *[_type == 'post'] {
            title, 
            slug, 
            snippet, 
            author, 
            mainImage{
              asset->{
                  _id, 
                  url
              }, 
              alt
            }, 
            publishedAt
          },
      ]`
      )
      .then((homeData) => {
        setHomeData(homeData);
      })
      .catch(console.error);
  }, []);

  return (
    <section className="home">
      {homeData &&
        filterData(homeData[0], "title", "Home").map((el, index) => (
          <section className={`banner navy`} key={index}>
            <img
              src={el.mainImage.asset.url}
              alt={el.mainImage.asset.alt}
              className="bannerImage"
            />
            <div className="text">
              {homeData &&
                homeData[1].map((slogan, i) => {
                  return (
                    <img
                      src={slogan.sloganImage.asset.url}
                      alt={slogan.sloganImage.asset.url}
                      key={i}
                      className="sloganImage"
                    />
                  );
                })}
              <a href={el.buttonLink} target="_blank" rel="noreferrer">
                <button className="button">{el.button}</button>
              </a>
            </div>
          </section>
        ))}
      <section className="blocks">
        {homeData &&
          homeData[2]
            .sort((a, b) => a?.position - b?.position)
            .map((el, index) => {
              let blockDirection = "imageRight";
              let colors = ["gold", "brown", "green"];
              if (index % 2 === 0) {
                blockDirection = "imageLeft";
              }
              return (
                <div
                  className="homeBlock"
                  key={index}
                  data-direction={blockDirection}
                >
                  <div className={`text ${colors[index]}`}>
                    <h1>{el?.title}</h1>
                    <p>{el?.text}</p>
                    <a href={el?.buttonLink}>
                      <button className="button">{el?.button}</button>
                    </a>
                  </div>
                  <img
                    src={el?.blockImage?.asset?.url}
                    alt={el?.blockImage?.asset?.url}
                  />
                </div>
              );
            })}
      </section>
      <section className="slider navy">
        <div className="slider-images" ref={slider}>
          {homeData &&
            homeData[3].map((el, index) => {
              let slide = 1;
              let activeHeight = "";
              let activeSlide = `url(${el?.sliderImage?.asset?.url})`;
              if (index === slide) {
                activeHeight = "active-height";
              }
              return (
                <div
                  key={index}
                  className={`slider-image ${activeHeight}`}
                  style={{
                    backgroundImage: `${activeSlide}`,
                  }}
                ></div>
              );
            })}
        </div>
        <a href="/gallery">
          <button className="button">GALLERY</button>
        </a>
        <img
          src="../images/triangle.png"
          className="prevSlide dtop-only"
          onClick={goToPreviousSlide}
          alt="Previous Slide"
        />
        <img
          src="../images/triangle.png"
          className="nextSlide dtop-only"
          onClick={goToNextSlide}
          alt="Next Slide"
        />
      </section>
      <div className="section-split navy">
        <h1 className="title">WHAT'S NEW?</h1>
        <hr />
      </div>
      <section className="blogPosts">
        {homeData &&
          homeData[4].slice(0, 3).map((post, index) => (
            <div>
              <Link
                to={"/post/" + post?.slug?.current}
                key={post?.slug?.current}
                className="thumbnail"
              >
                <h1 className="title">{post?.title}</h1>
                <p className="snippet">{post?.snippet}</p>
                <button className="button navy">LEARN MORE</button>
              </Link>
            </div>
          ))}
      </section>
    </section>
  );
}
