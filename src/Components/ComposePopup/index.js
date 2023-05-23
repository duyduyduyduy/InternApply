import React, { useState } from "react";
import "./index.scss";
export default function ComposePopUp(props) {
  const { closePopUp } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [err, setErr] = useState(false);
  const handleOnClickSave = async () => {
    if (title === "" || description === "" || body === "") {
      setErr(true);
    } else {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage
            .getItem("accessToken")
            .slice(1, -1)}`,
        },
        body: JSON.stringify({
          title: title,
          description: description,
          body: body,
          tagList: ["string"],
        }),
      };
      let response = await fetch(
        "http://localhost:3000/api/articles",
        requestOptions
      );
      let data = await response.json();
      window.location.reload();
    }
  };
  return (
    <div className="updateUserPopupContainer">
      <div className="updateContainer">
        <i onClick={closePopUp} className="fa-solid fa-x"></i>
        <p>Title:</p>
        <input onChange={(e) => setTitle(e.target.value)} />
        <p>Description:</p>
        <input onChange={(e) => setDescription(e.target.value)} />
        <p>Body: </p>
        <textarea onChange={(e) => setBody(e.target.value)}></textarea>
        {err && <p style={{ color: "red" }}>* Missing content</p>}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button onClick={handleOnClickSave} className="SaveButton">
            Compose
          </button>
        </div>
      </div>
    </div>
  );
}
