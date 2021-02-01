import React, { useState, useRef, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  updateProductById,
  getProductDetails,
} from "../../actions/productActions";
import { listCategories } from "../../actions/categoryActions";
import { PRODUCT_UPDATE_RESET } from "../../constants/productConstants";
import { uploadFileHandler } from "../../actions/uploadHelper";

const EditProduct = ({ history, match }) => {
  const dispatch = useDispatch();
  const productId = match.params.id;
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

  const productDetails = useSelector((state) => state.productDetails);
  const {
    loading: detailLoading,
    error: detailError,
    product,
  } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { success: successUpdate } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/manage-product");
    } else {
      if (userInfo && userInfo.isStaff) {
        dispatch(listCategories());
        dispatch(getProductDetails(productId));
      } else {
        history.push("/login");
      }
    }
  }, [dispatch, productId, history, successUpdate, userInfo]);

  useEffect(() => {
    if (product && product._id === productId) {
      setPhotoUrl(product.mainImage);
      if (product.secondaryImages.length >= 1) {
        setPhotoUrl1(product.secondaryImages[0]);
      }
      if (product.secondaryImages.length >= 2) {
        setPhotoUrl2(product.secondaryImages[1]);
      }
      if (product.secondaryImages.length >= 3) {
        setPhotoUrl3(product.secondaryImages[2]);
      }
      if (product.secondaryImages.length >= 4) {
        setPhotoUrl4(product.secondaryImages[3]);
      }
      if (product.secondaryImages.length >= 5) {
        setPhotoUrl5(product.secondaryImages[4]);
      }
      if (product.secondaryImages.length >= 6) {
        setPhotoUrl6(product.secondaryImages[5]);
      }
    }
  }, [product, productId, history]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = new FormData(form.current);
    if (data.get("mainImage").size !== 0) {
      const result = (await uploadFileHandler(data.get("mainImage"))).replace(
        "\\",
        "/"
      );
      data.append("mainImage", result);
    } else {
      if (photoUrl) {
        data.append("mainImage", photoUrl);
      }
    }
    const results = [];
    if (data.get("photo1").size !== 0) {
      results.push(
        (await uploadFileHandler(data.get("photo1"))).replace("\\", "/")
      );
    } else {
      if (photoUrl1) {
        results.push(photoUrl1);
      }
    }
    if (data.get("photo2").size !== 0) {
      results.push(
        (await uploadFileHandler(data.get("photo2"))).replace("\\", "/")
      );
    } else {
      if (photoUrl2) {
        results.push(photoUrl2);
      }
    }
    if (data.get("photo3").size !== 0) {
      results.push(
        (await uploadFileHandler(data.get("photo3"))).replace("\\", "/")
      );
    } else {
      if (photoUrl3) {
        results.push(photoUrl3);
      }
    }
    if (data.get("photo4").size !== 0) {
      results.push(
        (await uploadFileHandler(data.get("photo4"))).replace("\\", "/")
      );
    } else {
      if (photoUrl4) {
        results.push(photoUrl4);
      }
    }
    if (data.get("photo5").size !== 0) {
      results.push(
        (await uploadFileHandler(data.get("photo5"))).replace("\\", "/")
      );
    } else {
      if (photoUrl5) {
        results.push(photoUrl5);
      }
    }
    if (data.get("photo6").size !== 0) {
      results.push(
        (await uploadFileHandler(data.get("photo6"))).replace("\\", "/")
      );
    } else {
      if (photoUrl6) {
        results.push(photoUrl6);
      }
    }
    if (results.length !== 0) {
      data.append("secondaryImages", results);
    }
    dispatch(updateProductById(data, productId));
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
    <Container fluid className="border border-white">
      {detailLoading ? (
        <Loader />
      ) : detailError ? (
        <Message variant="danger">{detailError}</Message>
      ) : (
        <div className="m-3 border create-user-form">
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
                  defaultValue={product.name}
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
                  defaultValue={product.price}
                />
              </div>
              <div className="form-group col-12 col-md-10 col-lg-8 col-xl-6 mx-auto">
                <label htmlFor="inputStock">Count In Stock</label>
                <input
                  type="text"
                  name="countInStock"
                  className="form-control"
                  id="inputStock"
                  placeholder="Count In Stock"
                  defaultValue={product.countInStock}
                />
              </div>
              <div className="form-group col-12 col-md-10 col-lg-8 col-xl-6 mx-auto">
                <label htmlFor="inputCateogry">Category</label>
                {loading ? (
                  <Loader />
                ) : (
                  <select
                    id="inputCateogry"
                    name="category"
                    className="form-control"
                    defaultValue={product.category._id}
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
                  defaultValue={product.status ? "1" : "0"}
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
                <div className="d-flex align-items-center">
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
                  defaultValue={product.description}
                ></textarea>
              </div>
              <div className="form-group col-12 col-md-10 col-lg-8 col-xl-6 mx-auto mt-5">
                <button
                  type="submit"
                  className="btn btn-info w-100 font-weight-bold"
                >
                  Update Product
                </button>
              </div>
            </Container>
          </form>
        </div>
      )}
    </Container>
  );
};

export default EditProduct;
