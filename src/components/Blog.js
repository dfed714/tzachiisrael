import React, { useState, useEffect, useRef } from "react";
import client from "../client";
import imageUrlBuilder from "@sanity/image-url";
import { Link } from "react-router-dom";

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

export default function Blog() {
  const [postData, setPost] = useState([]);
  const [filteredPostData, setFilteredPostData] = useState([]);
  const [hasResults, setHasResults] = useState(true);

  const searchBarInput = useRef();

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
        setFilteredPostData(data); // Initialize with all posts
      })
      .catch(console.error);
  }, []);

  const searchFunc = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
    const searchTerm = searchBarInput?.current?.value?.toUpperCase();
    const filteredPosts = postData[0]?.filter((post) => {
      return (
        post?.title?.toUpperCase().includes(searchTerm) ||
        post?.snippet?.toUpperCase().includes(searchTerm)
      );
    });

    if (filteredPosts.length > 0) {
      setHasResults(true);
      setFilteredPostData([filteredPosts, postData[1]]);
    } else {
      setHasResults(false);
      setFilteredPostData([]); // Clear the filtered posts
    }
  };

  const getBlogPosts = () => {
    const posts =
      filteredPostData.length > 0 &&
      filteredPostData[0]
        .map((post, index) => {
          if (
            post &&
            post?.slug &&
            post?.slug?.current &&
            post?.mainImage &&
            post?.mainImage?.asset &&
            post?.mainImage?.asset?.url &&
            post?.title
          ) {
            return (
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
            );
          } else {
            console.log("Error");
            return null;
          }
        })
        .filter(Boolean); // Filter out any null values

    return posts;
  };

  return (
    <section className="blog">
      {postData[1] &&
        postData[1]
          .filter((el) => el.title === "Blog")
          .map((el, index) => (
            <section className={`banner navy`} key={index}>
              <img
                src={el?.mainImage?.asset?.url}
                className="bannerImage"
                alt={el?.alt}
              />
            </section>
          ))}
      <form className="searchBar">
        <input
          ref={searchBarInput}
          onChange={searchFunc}
          onKeyDown={searchFunc}
          className="searchBarInput"
          type="text"
          placeholder="Search"
        ></input>
      </form>
      <section className="blogPosts">
        {hasResults ? getBlogPosts() : <h1>No Results Found</h1>}
      </section>
    </section>
  );
}
