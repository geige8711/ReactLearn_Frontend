import React, { useState, useRef, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { updateUserProfile, getUserDetails } from "../../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../../constants/userConstants";

const EditUser = ({ match, history }) => {
  const userId = match.params.id;

  const [photoUrl, setPhotoUrl] = useState("");
  const dispatch = useDispatch();
  const form = useRef(null);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success: successUpdate } = userUpdateProfile;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      history.push("/admin/manage-user");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      }
    }
  }, [user, dispatch, userId, history, successUpdate]);

  useEffect(() => {
    dispatch(getUserDetails(userId));
  }, [dispatch, userId]);

  const changeHandler = (e) => {
    const photoFile = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(photoFile);
    reader.onloadend = (e) => {
      setPhotoUrl(reader.result);
    };
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData(form.current);
    dispatch(updateUserProfile(data, userId));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Container fluid className="border border-white">
          <div className="m-3 border create-user-form">
            <form ref={form} className="mt-3" onSubmit={submitHandler}>
              <Container fluid>
                <div className="d-flex justify-content-center">
                  <label htmlFor="upload">
                    <div className="mt-3 user-profile-pic rounded-circle border border-success justify-content-center d-flex">
                      {photoUrl ? (
                        <img
                          src={photoUrl}
                          alt=""
                          className="img-fluid img-thumbnail rounded-circle"
                        />
                      ) : user.photo ? (
                        <img
                          src={`data:${user.photo.contentType};base64,${user.photo.data}`}
                          alt=""
                          className="img-fluid img-thumbnail rounded-circle"
                        />
                      ) : (
                        <i className="far fa-user align-self-center"></i>
                      )}
                    </div>
                    <input
                      type="file"
                      id="upload"
                      className="d-none"
                      accept="image/*"
                      name="photo"
                      onChange={changeHandler}
                    />
                  </label>
                </div>
                <div className="form-group col-12 col-md-10 col-lg-8 col-xl-6 mx-auto">
                  <label htmlFor="inputGender">Gender</label>
                  <select
                    defaultValue={user.gender}
                    id="inputGender"
                    name="gender"
                    className="form-control"
                  >
                    <option value="Mr.">Mr.</option>
                    <option value="Ms.">Ms.</option>
                  </select>
                </div>
                <div className="form-group col-12 col-md-10 col-lg-8 col-xl-6 mx-auto">
                  <label htmlFor="inputName">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    defaultValue={user.name}
                    id="inputName"
                    placeholder="Full Name"
                  />
                </div>
                <div className="form-group col-12 col-md-10 col-lg-8 col-xl-6 mx-auto">
                  <label htmlFor="inputEmail">Email</label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={user.email}
                    className="form-control"
                    id="inputEmail"
                    placeholder="Email"
                  />
                </div>
                <div className="form-group col-12 col-md-10 col-lg-8 col-xl-6 mx-auto">
                  <label htmlFor="inputPassword">Password</label>
                  <input
                    type="text"
                    name="password"
                    className="form-control"
                    id="inputPassword"
                    placeholder="Reset A New Password"
                  />
                </div>
                <div className="form-group col-12 col-md-10 col-lg-8 col-xl-6 mx-auto">
                  <label htmlFor="inputPhoneNumber">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputPhoneNumber"
                    name="phoneNumber"
                    defaultValue={user.phoneNumber}
                    placeholder="Phone Number"
                  />
                </div>
                <div className="form-group col-12 col-md-10 col-lg-8 col-xl-6 mx-auto">
                  <label htmlFor="inputAddress">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputAddress"
                    name="address"
                    defaultValue={user.address}
                    placeholder="1234 Main St"
                  />
                </div>
                <div className="form-group col-12 col-md-10 col-lg-8 col-xl-6 mx-auto row px-0">
                  <div className="form-group col-12 col-md-6">
                    <label htmlFor="inputCity">City</label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputCity"
                      name="city"
                      defaultValue={user.city}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="inputState">State</label>
                    <select
                      id="inputState"
                      name="state"
                      defaultValue={user.state}
                      className="form-control"
                    >
                      <option value="New South Wales">New South Wales</option>
                      <option value="Queensland">Queensland</option>
                      <option value="South Australia">South Australia</option>
                      <option value="Tasmania">Tasmania</option>
                      <option value="Victoria">Victoria</option>
                      <option value="Western Australia">
                        Western Australia
                      </option>
                    </select>
                  </div>
                  <div className="form-group col-md-2">
                    <label htmlFor="inputZip">Zip</label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputZip"
                      name="zip"
                      defaultValue={user.zip}
                    />
                  </div>
                </div>
                <div className="form-group col-12 col-md-10 col-lg-8 col-xl-6 mx-auto">
                  <label htmlFor="about">About</label>
                  <textarea
                    className="form-control"
                    id="about"
                    rows="5"
                    name="about"
                    defaultValue={user.about}
                  ></textarea>
                </div>
                <div className="form-group col-12 col-md-10 col-lg-8 col-xl-6 mx-auto mt-5">
                  <button
                    type="submit"
                    className="btn btn-info w-100 font-weight-bold"
                  >
                    Update User
                  </button>
                </div>
              </Container>
            </form>
          </div>
          {successUpdate && (
            <Message variant="success">update user successfully</Message>
          )}
        </Container>
      )}
    </>
  );
};

export default EditUser;
