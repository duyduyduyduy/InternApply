import React, { useEffect, useState } from "react";
import "./index.scss";
import Loader from "../Loader";
export default function CommentPopUp(props) {
  const { closePopup, content } = props;
  const [cmtArray, setCmtArray] = useState([]);
  const [cmt, setCmt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage
        .getItem("accessToken")
        .slice(1, -1)}`,
    };
    fetch(
      `http://localhost:3000/api/articles/${content.slug}/comments`,
      headers
    )
      .then((res) => res.json())
      .then((data) => setCmtArray(data.comments));
  }, [content]);

  const handleOnchangeAddCmt = async (e) => {
    if (e.key === "Enter" && cmt !== "") {
      setIsLoading(true);
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage
            .getItem("accessToken")
            .slice(1, -1)}`,
        },
        body: JSON.stringify({
          body: cmt,
        }),
      };
      let response = await fetch(
        `http://localhost:3000/api/articles/${content?.slug}/comments`,
        requestOptions
      );
      setCmt("");
      const headers = {
        Authorization: `Bearer ${localStorage
          .getItem("accessToken")
          .slice(1, -1)}`,
      };
      fetch(
        `http://localhost:3000/api/articles/${content.slug}/comments`,
        headers
      )
        .then((res) => res.json())
        .then((data) => {
          setCmtArray(data.comments);
          setIsLoading(false);
        });
    }
  };
  const handleDeleteCmnt = async (id, slug) => {
    setIsLoading(true);
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
      `http://localhost:3000/api/articles/${slug}/comments/${id}`,
      requestOptions
    );
    const headers = {
      Authorization: `Bearer ${localStorage
        .getItem("accessToken")
        .slice(1, -1)}`,
    };
    fetch(
      `http://localhost:3000/api/articles/${content.slug}/comments`,
      headers
    )
      .then((res) => res.json())
      .then((data) => {
        setCmtArray(data.comments);
        setIsLoading(false);
      });
  };
  return (
    <div className="CommentPopUpContainer">
      <div className="CommentPopUp">
        {isLoading && <Loader />}
        <i onClick={closePopup} className="fa-solid fa-x"></i>
        <div className="commentTitle">
          <h3>COMMENT</h3>
        </div>
        <div className="commentContent">
          {cmtArray?.map((item) => {
            return (
              <div className="cmtBorder">
                <i
                  onClick={() => handleDeleteCmnt(item?.id, content?.slug)}
                  className="fa-solid fa-x"
                ></i>
                <img src={item?.author?.image} />
                <div>
                  <p style={{ fontWeight: "bolder" }}>
                    {item?.author?.username}
                  </p>
                  <p
                    style={{ fontSize: "13px", marginTop: "5px" }}
                    className="cmtcontent"
                  >
                    {item?.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="addComment">
          <input
            value={cmt}
            onChange={(e) => setCmt(e.target.value)}
            onKeyDown={handleOnchangeAddCmt}
            placeholder="Enter to add comment"
          />
        </div>
      </div>
    </div>
  );
}
