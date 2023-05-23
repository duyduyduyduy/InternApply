import React, { useEffect, useState } from "react";
import Header from "../Header";
import "./index.scss";
import ComposePopUp from "../ComposePopup";
import handleTimeAll from "../HandleTimeFunction/HandleTimeFunction";
import ArticleContent from "../ArticleContent";
export default function HomePage() {
  const [shortCutData, setShortCut] = useState([]);
  const [compose, setCompose] = useState(false);
  const [selectedContent, setSelected] = useState(undefined);
  useEffect(() => {
    const fetchShortCutData = async () => {
      const headers = {
        Authorization: `Bearer ${localStorage
          .getItem("accessToken")
          .slice(1, -1)}`,
      };
      let response = await fetch("http://localhost:3000/api/articles", {
        headers,
      });
      let data = await response.json();
      setShortCut(data.articles);
    };
    fetchShortCutData();
  }, []);
  const closePopUp = () => {
    setCompose(false);
  };

  return (
    <div>
      <Header />
      {compose && <ComposePopUp closePopUp={closePopUp} />}
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>
        ARTICLE HOME PAGE
      </h1>
      <div className="homepageContainer">
        <div className="homePageMainSize">
          <div className="LeftHomeSide">
            <i
              onClick={() => setCompose(true)}
              className="fa-regular fa-pen-to-square"
            ></i>
            {selectedContent && <ArticleContent content={selectedContent} />}
          </div>
          <div className="RightHomeSide">
            <h3>ARTICLE SHORTCUT LIST</h3>
            {shortCutData?.map((item) => {
              return (
                <div className="NewsShortcut" onClick={() => setSelected(item)}>
                  <img src="https://firebasestorage.googleapis.com/v0/b/chat-1f6fe.appspot.com/o/download.png?alt=media&token=e9190b12-e725-48ae-b137-ede26cbcbafe" />
                  <div>
                    <h4>{item.title}</h4>
                    <p>
                      {item.body.length <= 74
                        ? item.body
                        : item.body.slice(0, 74) + "..."}
                    </p>
                  </div>
                  <i className="fa-solid fa-angle-right"></i>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
