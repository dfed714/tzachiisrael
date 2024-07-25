import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import client from "../client";

export default function Form() {
  (function scrollUp() {
    window.scrollTo(0, 0);
  })();

  const [form, setForm] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    client
      .fetch(
        `*[slug.current == "${slug}"]{
      title, 
      _id, 
      slug,
      formLink, 
    }`
      )
      .then((data) => setForm(data))
      .catch(console.error);
  }, [slug]);

  if (!form)
    return (
      <section className="post-body">
        <div className="text">
          <h1>Loading...</h1>
        </div>
      </section>
    );

  return (
    <section className="form-body navy">
      {form &&
        form.map((el, index) => {
          return (
            <div className="formContainer" key={index}>
              <h1>{el.title}</h1>
              <iframe
                src={
                  el.formLink.slice(0, el.formLink.indexOf("viewform?")) +
                  "viewform?embedded=true"
                }
                title="formIFrame"
                className="formIFrame"
              ></iframe>
            </div>
          );
        })}
    </section>
  );
}
