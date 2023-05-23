import React, { useState } from "react";
import "./index.css";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../Firebase/Firebase";
import { connect } from "react-redux";
import Loader from "../Loader";
function UpdateUserPopup(props) {
  const { closeModal, userInfo } = props;
  const [bio, setBio] = useState(userInfo.bio);
  const [imageURL, setImageURL] = useState(userInfo.image);
  const [isloading, setIsLoading] = useState(false);
  const handleOnChangeImage = async (e) => {
    setIsLoading(true);
    const storageRef = ref(storage, `avatar/${userInfo.email}`);
    await uploadBytesResumable(storageRef, e.target.files[0]).then(() => {
      getDownloadURL(storageRef)
        .then((downloadURL) => {
          setImageURL(downloadURL);
        })
        .then(setIsLoading(false));
    });
  };
  const handOnClickSave = async () => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage
          .getItem("accessToken")
          .slice(1, -1)}`,
      },
      body: JSON.stringify({
        username: userInfo.username,
        email: userInfo.email,
        bio: bio,
        image: imageURL,
      }),
    };
    let response = await fetch(
      "http://localhost:3000/api/user",
      requestOptions
    );
    let data = await response.json();
    window.location.reload();
  };
  return (
    <div className="updateUserPopupContainer">
      <div className="updateContainer">
        {isloading && <Loader />}
        <i onClick={closeModal} className="fa-solid fa-x"></i>
        {userInfo.email === props.UserStore.userInfo?.email ? (
          <h2>USER INFORMATION UPDATE</h2>
        ) : (
          <h2>DETAIL USER INFORMATION </h2>
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <input
            onChange={handleOnChangeImage}
            style={{ display: "none" }}
            id="file"
            className="doctorAvatar"
            type="file"
          />
          {userInfo.image === "" && imageURL === "" ? (
            <img
              alt="fhsdjkh"
              src="https://media.istockphoto.com/id/1016744004/vi/vec-to/%E1%BA%A3nh-ch%E1%BB%97-d%C3%A0nh-s%E1%BA%B5n-cho-h%E1%BB%93-s%C6%A1-h%C3%ACnh-b%C3%B3ng-m%C3%A0u-x%C3%A1m-kh%C3%B4ng-c%C3%B3-%E1%BA%A3nh.jpg?s=612x612&w=0&k=20&c=74k3Y5Mp89Yi68vLNjg8lgpGA0Fez1r2Nc5C-6EoMJU="
            />
          ) : (
            <img alt="fhsdjkh" src={imageURL} />
          )}{" "}
          {userInfo.email === props.UserStore.userInfo?.email && (
            <label htmlFor="file" className="addAvatar">
              <span>Change your avatar </span>
              <i className="fa-solid fa-upload"></i>
            </label>
          )}
        </div>
        <p>Email:</p>
        <input value={userInfo.email} disabled />
        <p>Username:</p>
        <input value={userInfo.username} disabled />
        <p>Bio: </p>
        <textarea
          value={bio}
          disabled={!(userInfo.email === props.UserStore.userInfo?.email)}
          onChange={(e) => setBio(e.target.value)}
        ></textarea>
        {userInfo.email === props.UserStore.userInfo?.email && (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button onClick={handOnClickSave} className="SaveButton">
              Save
            </button>
          </div>
        )}
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
export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserPopup);
