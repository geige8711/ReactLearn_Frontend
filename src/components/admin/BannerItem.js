import React, { useState, useRef } from "react";
import { deleteBanner } from "../../actions/bannerActions";
import { useDispatch } from "react-redux";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Button, Container, Row } from "react-bootstrap";
import { updateBannerById } from "../../actions/bannerActions";
import { DeleteAlert } from "../DeleteAlert";

const BannerItem = ({ bannerId, imageUrl, linkTo, position, caption }) => {
  const dispatch = useDispatch();
  const form = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(imageUrl);

  const submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData(form.current);
    dispatch(updateBannerById(data, bannerId));
    setIsEditing(false);
  };

  const deleteHandler1 = (id) => {
    DeleteAlert({
      deleteHandler: () => {
        dispatch(deleteBanner(id));
      },
      deleteMessage: "Are you sure you want to delete this banner?",
    });
  };
  const changeHandler = (e) => {
    const photoFile = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(photoFile);
    reader.onloadend = (e) => {
      setPhotoUrl(reader.result);
    };
  };

  return (
    <form onSubmit={submitHandler} className="col-12 p-0" ref={form}>
      <Container fluid className="border border-info mb-2">
        <Row>
          <div className="col-12 col-lg-2 p-0">
            <label htmlFor="upload">
              <img className="img-fluid" src={photoUrl} alt="cap" />
              {isEditing && (
                <input
                  type="file"
                  id="upload"
                  className="d-none"
                  accept="image/*"
                  name="photo"
                  onChange={changeHandler}
                />
              )}
            </label>
          </div>
          <div className="col-12 col-lg-10">
            <div>
              <div className="h6 mb-0">LinkTo: </div>
              <div className={`${isEditing ? "d-none" : ""}`}>{linkTo}</div>
              <input
                type="text"
                name="linkTo"
                defaultValue={linkTo}
                className={`w-100 banner-input ${isEditing ? "" : "d-none"} `}
              />
            </div>
            <div className="my-2">
              <div className="h6 mb-0">Postion: </div>
              <div className={`${isEditing ? "d-none" : ""}`}>{position}</div>
              <input
                type="text"
                name="position"
                defaultValue={position}
                className={`w-100 banner-input ${isEditing ? "" : "d-none"} `}
              />
            </div>
            <div className="h6 mb-0">Caption:</div>
            <div className={`${isEditing ? "d-none" : ""}`}>{caption}</div>
            <input
              type="text"
              name="caption"
              defaultValue={caption}
              className={`w-100 banner-input ${isEditing ? "" : "d-none"} `}
            />
            <div className="mt-auto">
              <Button
                className={`btn-sm mb-1 mr-5 ${isEditing ? "" : "d-none"}`}
                type="submit"
              >
                Confirm
              </Button>

              <Button
                variant="info"
                className={`btn-sm mb-1 mr-5  ${isEditing ? "d-none" : ""}`}
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                <i className="fas fa-edit"></i>
              </Button>

              <Button
                variant="danger"
                className="btn-sm  mb-1"
                onClick={() => deleteHandler1(bannerId)}
              >
                <i className="fas fa-trash"></i>
              </Button>
            </div>
          </div>
        </Row>
      </Container>
    </form>
  );
};

export default BannerItem;
