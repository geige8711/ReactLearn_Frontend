import React, { useRef, useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "./createbanner.css";
import { useDispatch, useSelector } from "react-redux";
import { createBanner } from "../../actions/bannerActions";
import { BANNER_CREATE_RESET } from "../../constants/bannerConstants";
import { useAlert } from "react-alert";
import { options } from "../../components/AlertTemplate";

const CreateBanner = ({ history }) => {
  const form = useRef(null);
  const dispatch = useDispatch();
  const [photoUrl, setPhotoUrl] = useState("");
  const bannerCreate = useSelector((state) => state.bannerCreate);
  const { success } = bannerCreate;
  const alert = useAlert();

  const submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData(form.current);
    dispatch(createBanner(data));
  };
  const changeHandler = (e) => {
    const photoFile = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(photoFile);
    reader.onloadend = (e) => {
      setPhotoUrl(reader.result);
    };
  };
  useEffect(() => {
    if (success) {
      alert.success("You Created a Banner Successfully!", options);
      dispatch({ type: BANNER_CREATE_RESET });
      history.push("/admin/manage-banner");
    }
  }, [success, history, dispatch, alert]);
  return (
    <Container fluid className="border border-white p-0">
      <div className="m-1 m-md-3 border create-user-form">
        <form ref={form} className="mt-3" onSubmit={submitHandler}>
          <Container fluid>
            <div className="d-flex justify-content-center">
              <label htmlFor="upload">
                <div className="mt-3 banner-pic border justify-content-center d-flex">
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt=""
                      className="img-fluid img-thumbnail"
                    />
                  ) : (
                    <i className="far fa-image align-self-center"></i>
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
            <div className="form-group mt-2 mt-md-5 col-12 col-md-10 col-lg-8 col-xl-6 mx-auto">
              <label htmlFor="inputLinkTo" className="font-weight-bold">
                Link To
              </label>
              <input
                type="text"
                name="linkTo"
                className="form-control"
                id="inputLinkTo"
                placeholder="Link To"
              />
            </div>
            <div className="form-group col-12 col-md-10 col-lg-8 col-xl-6 mx-auto">
              <label htmlFor="bannerCaption" className="font-weight-bold">
                Banner Caption
              </label>
              <textarea
                className="form-control"
                id="bannerCaption"
                rows="5"
                name="bannerCaption"
              ></textarea>
            </div>
            <div className="form-group col-12 col-md-10 col-lg-8 col-xl-6 mx-auto mt-5">
              <button
                type="submit"
                className="btn btn-info w-100 font-weight-bold"
              >
                Create Banner
              </button>
            </div>
          </Container>
        </form>
      </div>
    </Container>
  );
};

export default CreateBanner;
