import React, { useState } from "react";
import handleTimeAll from "../HandleTimeFunction/HandleTimeFunction";
import CommentPopUp from "../CommentPopUp";

export default function ArticleContent(props) {
  const { content } = props;
  const [cmtPop, setCmtPopup] = useState(false);
  const CreatedTimeObject = handleTimeAll(content?.created);
  const UpdatedTimeObject = handleTimeAll(content?.updated);
  const deleteArticle = async (slug) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage
          .getItem("accessToken")
          .slice(1, -1)}`,
      },
    };
    let response = await fetch(
      `http://localhost:3000/api/articles/${slug}`,
      requestOptions
    );
    window.location.reload();
  };
  const closePopup = () => {
    setCmtPopup(false);
  };
  return (
    <div className="ArticleContent">
      {cmtPop && <CommentPopUp content={content} closePopup={closePopup} />}
      <h2>{content?.title}</h2>
      <button
        onClick={() => deleteArticle(content?.slug)}
        className="deletebutton"
      >
        Delete the article
      </button>
      <button className="viewcmtbutton" onClick={() => setCmtPopup(true)}>
        View Comment
      </button>
      <div className="authorInfo">
        <img src={content?.author?.image} />
        <div>
          <p style={{ marginBottom: "5px" }}>
            Authored by{" "}
            <span style={{ fontWeight: "bolder" }}>
              {content?.author?.email}
            </span>
          </p>
          <p className="created">
            Created at {CreatedTimeObject?.day},{CreatedTimeObject?.date} /
            {CreatedTimeObject?.month} / {CreatedTimeObject?.year},
            {CreatedTimeObject?.hour}:{CreatedTimeObject?.minute}
          </p>
          <p className="updated">
            Updated at {UpdatedTimeObject?.day},{UpdatedTimeObject?.date} /
            {UpdatedTimeObject?.month} / {UpdatedTimeObject?.year},
            {UpdatedTimeObject?.hour}:{UpdatedTimeObject?.minute}
          </p>
        </div>
      </div>
      <p className="maincontentarticle">{content?.body}</p>
    </div>
  );
}
