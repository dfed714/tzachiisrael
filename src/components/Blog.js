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
          publishedAt}]`
      )
      .then((data) => {
        data = data.sort(
          (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
        );
        setPost(data);
      })
      .catch(console.error);
  }, []);

  return (
    <section className="blog">
      {postData.length > 0 &&
        postData[0].map((post, index) => (
          <Link to={"/post/" + post.slug.current} key={post.slug.current}>
            <img
              src={urlFor(post.mainImage).width(200).url()}
              alt={post.title}
            />
            <h1>{post.title}</h1>
            <p>{post.snippet}</p>
          </Link>
        ))}
    </section>
  );
}
