import React, { useEffect, useState } from "react";
import Header from "../Header";
import "./index.css";
import { connect } from "react-redux";
import UpdateUserPopup from "../UpdateUserModal";
function UserList(props) {
  const [userList, setUserList] = useState([]);
  const [userEditInfo, setUserEditInfo] = useState([]);
  const [userEdit, userEditModal] = useState(false);
  const handleOnClickDelete = async (email) => {
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
      `http://localhost:3000/api/users/${email}`,
      requestOptions
    );
    window.location.reload();
  };
  const closeModal = () => {
    userEditModal(false);
  };
  const handleOnClickEditButton = (item) => {
    userEditModal(true);
    setUserEditInfo(item);
  };
  useEffect(() => {
    const fetchUser = async () => {
      const headers = {
        Authorization: `Bearer ${localStorage
          .getItem("accessToken")
          .slice(1, -1)}`,
      };
      let response = await fetch("http://localhost:3000/api/users", {
        headers,
      });
      let data = await response.json();
      setUserList(data);
    };
    fetchUser();
  }, []);
  return (
    <div>
      {userEdit && (
        <UpdateUserPopup userInfo={userEditInfo} closeModal={closeModal} />
      )}
      <Header />
      <h1 className="userlisttitle">USER LIST MANAGEMENT</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="userlistTableCon">
          <p style={{ color: "red" }}>* Red line contains your profile</p>
          <table className="userlistTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Username</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userList?.map((item) => {
                return item.email === props.UserStore.userInfo?.email ? (
                  <tr style={{ color: "red", fontWeight: "bolder" }}>
                    <td>{item.id}</td>
                    <td>{item.email}</td>
                    <td>{item.username}</td>
                    <td>
                      <button
                        className="editbutton"
                        onClick={() => handleOnClickEditButton(item)}
                      >
                        Edit your profile
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.email}</td>
                    <td>{item.username}</td>
                    <td>
                      <button
                        className="editbutton"
                        onClick={() => handleOnClickEditButton(item)}
                      >
                        <i className="fa-solid fa-eye"></i>
                      </button>{" "}
                      <button
                        className="deletebutton"
                        onClick={() => handleOnClickDelete(item.email)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
export default connect(mapStateToProps, mapDispatchToProps)(UserList);
