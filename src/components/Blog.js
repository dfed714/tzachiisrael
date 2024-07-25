import React, { useState, useEffect } from "react";
import client from "../client";
import imageUrlBuilder from "@sanity/image-url";
import { Link } from "react-router-dom";

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

export default function Blog() {
  const [postData, setPost] = useState([]);

  (function scrollUp() {
    window.scrollTo(0, 0);
  })();

  const filterData = (arr, key, value) => {
    return arr.filter((el) => el[key] === value);
  };

  useEffect(() => {
    client
      .fetch(
        `[*[_type == 'post'] {
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
          *[_type == 'banners'] {
            title, 
            mainImage{
              asset->{
                  _id, 
                  url
              }, 
              alt
            }  
          }, ]`
      )
      .then((data) => {
        data = data.sort(
          (a, b) => new Date(b?.publishedAt) - new Date(a?.publishedAt)
        );
        setPost(data);
      })
      .catch(console.error);
  }, []);

  return (
    <section className="blog">
      {postData[1] &&
        filterData(postData[1], "title", "Blog").map((el, index) => (
          <section className={`banner navy`} key={index}>
            <img
              src={el?.mainImage?.asset?.url}
              className="bannerImage"
              alt={el?.alt}
            />
          </section>
        ))}
      <section className="blogPosts">
        {postData.length > 0 &&
          postData[0].map((post, index) => (
            <Link
              to={"/post/" + post?.slug?.current}
              key={post?.slug?.current}
              className="thumbnail"
            >
              <img src={urlFor(post?.mainImage).url()} alt={post?.title} />
              <div className="text">
                <h1 className="title">{post?.title}</h1>
                <p className="snippet">{post?.snippet}</p>
              </div>
            </Link>
          ))}
      </section>
    </section>
  );
}
