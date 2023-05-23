import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
function Header(props) {
  const [userModal, serUserModal] = useState(false);
  const nav = useNavigate();
  const handleOnClickSignOut = () => {
    localStorage.removeItem("accessToken");
    window.location.reload();
  };
  useEffect(() => {
    const fetchUserProfile = async () => {
      const headers = {
        Authorization: `Bearer ${localStorage
          .getItem("accessToken")
          .slice(1, -1)}`,
      };
      let response = await fetch("http://localhost:3000/api/user", { headers });
      let data = await response.json();
      props.updateuserInfo(data?.user);
    };
    fetchUserProfile();
  }, []);
  return (
    <div>
      <div className="HeaderContainer">
        <div className="lefthandHeader">
          <img
            alt="hjljflkd"
            src="https://c1.wallpaperflare.com/preview/1021/862/549/newspaper-le-monde-background-old.jpg"
          />
          <div style={{ cursor: "pointer" }} onClick={() => nav("/")}>
            <h2>ENVIRONMENTAL ENGINEERING PROGRAM</h2>
            <h4>UNIVERSITY OF TECHNOLOGY</h4>
          </div>
        </div>
        <div
          className="righthandHeader"
          onMouseEnter={() => serUserModal(true)}
          onMouseLeave={() => serUserModal(false)}
        >
          <i className="fa-solid fa-user"></i>
          <span>{props.UserStore?.userInfo?.email}</span>
          <i className="fa-solid fa-angle-down"></i>
          {userModal && (
            <div className="userModal">
              <p onClick={() => nav("/user-list")}>User List</p>
              <p onClick={handleOnClickSignOut}>Sign Out</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state, ownProps) => {
  return {
    UserStore: state.UserStore,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateuserInfo: (data) => {
      dispatch({
        type: "UPDATE_USER_INFO",
        payload: data,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
