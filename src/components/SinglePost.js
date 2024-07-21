import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";
import client from "../client";
import { NavLink } from "react-router-dom";

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

export default function SinglePost() {
  (function scrollUp() {
    window.scrollTo(0, 0);
  })();

  const [singlePost, setSinglePost] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    client
      .fetch(
        `*[slug.current == "${slug}"]{
      title, 
      _id, 
      slug,
      publishedAt, 
      readTime,
      mainImage{
        asset->{
          _id, 
          url
        }
      }, 
      body, 
      "name": author->name,
      "authorImage":author->image
    }`
      )
      .then((data) => setSinglePost(data[0]))
      .catch(console.error);
  }, [slug]);

  if (!singlePost)
    return (
      <section className="post-body">
        <h1>Loading...</h1>
      </section>
    );

  return (
    <section className="post-body">
      <img
        src={urlFor(singlePost.mainImage.asset).width(800).url()}
        alt=""
        className="thumbnail"
      />
      <h1 className="title">{singlePost.title}</h1>
      <div className="block-content">
        {singlePost.body.map((el, index) => (
          <BlockContent
            key={index}
            blocks={el}
            projectId={"8ab8bcjd"}
            dataset={"production"}
            imageOptions={{
              w: Number(el.size) ? Number(el.size) : 375,
            }}
          />
        ))}
      </div>
      <NavLink to="/blog" className="button">
        BACK
      </NavLink>
    </section>
  );
}
