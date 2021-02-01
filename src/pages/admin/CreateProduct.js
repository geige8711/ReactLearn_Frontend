import React, { useState, useRef, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listCategories } from "../../actions/categoryActions";
import { createProduct } from "../../actions/productActions";
import Loader from "../../components/Loader";
import "./createproduct.css";
import { PRODUCT_CREATE_RESET } from "../../constants/productConstants";

const CreateProduct = ({ history }) => {
  const dispatch = useDispatch();
  const form = useRef(null);
  const [photoUrl, setPhotoUrl] = useState("");
  const [photoUrl1, setPhotoUrl1] = useState("");
  const [photoUrl2, setPhotoUrl2] = useState("");
  const [photoUrl3, setPhotoUrl3] = useState("");
  const [photoUrl4, setPhotoUrl4] = useState("");
  const [photoUrl5, setPhotoUrl5] = useState("");
  const [photoUrl6, setPhotoUrl6] = useState("");
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, categories } = categoryList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productCreate = useSelector((state) => state.productCreate);
  const { success } = productCreate;

  useEffect(() => {
    if (userInfo && userInfo.isStaff) {
      dispatch(listCategories());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  useEffect(() => {
    if (success) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      history.push("/admin/manage-product");
    }
  }, [success, history, dispatch]);
  const submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData(form.current);
    dispatch(createProduct(data));
  };

  const changeHandler = (e) => {
    const photoFile = e.target.files[0];
    const targetName = e.target.name;
    console.log(targetName);
    const reader = new FileReader();
    reader.readAsDataURL(photoFile);
    reader.onloadend = (e) => {
      if (targetName === "mainImage") {
        setPhotoUrl(reader.result);
      }
      if (targetName === "photo1") {
        setPhotoUrl1(reader.result);
      }
      if (targetName === "photo2") {
        setPhotoUrl2(reader.result);
      }
      if (targetName === "photo3") {
        setPhotoUrl3(reader.result);
      }
      if (targetName === "photo4") {
        setPhotoUrl4(reader.result);
      }
      if (targetName === "photo5") {
        setPhotoUrl5(reader.result);
      }
      if (targetName === "photo6") {
        setPhotoUrl6(reader.result);
      }
    };
  };

  return (
    <Container fluid className="border border-white p-0">
      <div className="m-1 m-md-3 border create-user-form">
        <form ref={form} className="mt-3" onSubmit={submitHandler}>
          <Container fluid>
            <div className="form-group col-12 col-md-10 col-lg-8 col-xl-6 mx-auto">
              <label htmlFor="inputName">Product Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                id="inputName"
                placeholder="Product Name"
              />
            </div>
            <div className="form-group col-12 col-md-10 col-lg-8 col-xl-6 mx-auto">
              <label htmlFor="inputPrice">Price</label>
              <input
                type="text"
                name="price"
                className="form-control"
                id="inputPrice"
                placeholder="Price"
              />
            </div>
            <div className="form-group col-12 col-md-10 col-lg-8 col-xl-6 mx-auto">
              <label htmlFor="inputCateogry">Category</label>
              {loading ? (
                <Loader />
              ) : (
                <select
                  defaultValue={categories[0]}
                  id="inputCateogry"
                  name="category"
                  className="form-control"
                >
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className="form-group col-12 col-md-10 col-lg-8 col-xl-6 mx-auto">
              <label htmlFor="inputStatus">Status</label>
              <select
                defaultValue="0"
                id="inputStatus"
                name="status"
                className="form-control"
              >
                <option value="0">Draft</option>
                <option value="1">Publish</option>
              </select>
            </div>
            <div className="col-12 col-md-10 col-lg-8 col-xl-6 mx-auto">
              <label htmlFor="upload1">
                Product Featured Image
                <div className="mt-3 user-profile-pic border border-success justify-content-center d-flex">
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt=""
                      className="img-thumbnail align-self-center"
                    />
                  ) : (
                    <i className="far fa-image align-self-center"></i>
                  )}
                </div>
                <input
                  type="file"
                  id="upload1"
                  className="d-none"
                  accept="image/*"
                  name="mainImage"
                  onChange={changeHandler}
                />
              </label>
            </div>
            <div className="col-12 col-md-10 col-lg-8 col-xl-6 mx-auto">
              <div>Product Secondary Images</div>
              <div className="d-flex flex-wrap align-items-center">
                <label htmlFor="upload2">
                  <div className="mt-3 product-secondary-pic border border-success justify-content-center d-flex mr-2">
                    {photoUrl1 ? (
                      <img
                        src={photoUrl1}
                        alt=""
                        className="img-thumbnail align-self-center"
                      />
                    ) : (
                      <i className="far fa-image align-self-center"></i>
                    )}
                  </div>
                  <input
                    type="file"
                    id="upload2"
                    className="d-none"
                    accept="image/*"
                    name="photo1"
                    onChange={changeHandler}
                  />
                </label>
                <label htmlFor="upload3">
                  <div className="mt-3 product-secondary-pic border border-success justify-content-center d-flex mr-2">
                    {photoUrl2 ? (
                      <img
                        src={photoUrl2}
                        alt=""
                        className="img-thumbnail align-self-center"
                      />
                    ) : (
                      <i className="far fa-image align-self-center"></i>
                    )}
                  </div>
                  <input
                    type="file"
                    id="upload3"
                    className="d-none"
                    accept="image/*"
                    name="photo2"
                    onChange={changeHandler}
                  />
                </label>
                <label htmlFor="upload4">
                  <div className="mt-3 product-secondary-pic border border-success justify-content-center d-flex mr-2">
                    {photoUrl3 ? (
                      <img
                        src={photoUrl3}
                        alt=""
                        className="img-thumbnail align-self-center"
                      />
                    ) : (
                      <i className="far fa-image align-self-center"></i>
                    )}
                  </div>
                  <input
                    type="file"
                    id="upload4"
                    className="d-none"
                    accept="image/*"
                    name="photo3"
                    onChange={changeHandler}
                  />
                </label>
                <label htmlFor="upload5">
                  <div className="mt-3 product-secondary-pic border border-success justify-content-center d-flex mr-2">
                    {photoUrl4 ? (
                      <img
                        src={photoUrl4}
                        alt=""
                        className="img-thumbnail align-self-center"
                      />
                    ) : (
                      <i className="far fa-image align-self-center"></i>
                    )}
                  </div>
                  <input
                    type="file"
                    id="upload5"
                    className="d-none"
                    accept="image/*"
                    name="photo4"
                    onChange={changeHandler}
                  />
                </label>
                <label htmlFor="upload6">
                  <div className="mt-3 product-secondary-pic border border-success justify-content-center d-flex mr-2">
                    {photoUrl5 ? (
                      <img
                        src={photoUrl5}
                        alt=""
                        className="img-thumbnail align-self-center"
                      />
                    ) : (
                      <i className="far fa-image align-self-center"></i>
                    )}
                  </div>
                  <input
                    type="file"
                    id="upload6"
                    className="d-none"
                    accept="image/*"
                    name="photo5"
                    onChange={changeHandler}
                  />
                </label>
                <label htmlFor="upload7">
                  <div className="mt-3 product-secondary-pic border border-success justify-content-center d-flex mr-2">
                    {photoUrl6 ? (
                      <img
                        src={photoUrl6}
                        alt=""
                        className="img-thumbnail align-self-center"
                      />
                    ) : (
                      <i className="far fa-image align-self-center"></i>
                    )}
                  </div>
                  <input
                    type="file"
                    id="upload7"
                    className="d-none"
                    accept="image/*"
                    name="photo6"
                    onChange={changeHandler}
                  />
                </label>
              </div>
            </div>
            <div className="form-group col-12 col-md-10 col-lg-8 col-xl-6 mx-auto">
              <label htmlFor="description">Product Description</label>
              <textarea
                className="form-control"
                id="description"
                rows="5"
                name="description"
              ></textarea>
            </div>
            <div className="form-group col-12 col-md-10 col-lg-8 col-xl-6 mx-auto mt-5">
              <button
                type="submit"
                className="btn btn-info w-100 font-weight-bold"
              >
                Create Product
              </button>
            </div>
          </Container>
        </form>
      </div>
    </Container>
  );
};

export default CreateProduct;
