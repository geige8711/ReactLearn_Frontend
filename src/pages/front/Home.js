import React, { useState, useEffect } from "react";
import MyCarousel from "../../components/MyCarousel";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import { listCategories } from "../../actions/categoryActions";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

const Home = ({ history }) => {
  const dispatch = useDispatch();
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortValue, setSortValue] = useState("Select");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });

  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      dispatch(listCategories());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  const clearFilterSortHandler = () => {
    setSortValue("Select");
  };

  return (
    <div>
      <MyCarousel />
      <div className="row">
        <div className="col-3">
          <div className="text-uppercase my-5 ml-3 font-weight-bold text-center filter-title">
            <button
              className="text-uppercase clear-fliter border-0 py-1 px-2"
              onClick={clearFilterSortHandler}
            >
              clear
            </button>
            filter & sort
          </div>
          <div className="d-flex ml-3 align-items-center justify-content-between">
            <div className="text-uppercase font-weight-bold">sort by</div>
            <div className="horizontal-line"></div>
          </div>
          <div
            className={`d-flex ml-3 my-3 align-items-center`}
            onClick={() => {
              setIsSortOpen(!isSortOpen);
            }}
          >
            <div className="">{sortValue}</div>
            <i
              className={`fas fa-chevron-down ml-auto ${
                isSortOpen ? "open" : ""
              }`}
            ></i>
          </div>
          <div
            className={`ml-3 ${isSortOpen ? "" : "d-none"}`}
            onChange={(e) => {
              setSortValue(e.target.value);
            }}
          >
            <div className="p-0 my-3">
              <label htmlFor="myRadioId3" className="radio">
                <input
                  type="radio"
                  name="sortField"
                  id="myRadioId3"
                  className="radio__input"
                  value="Newest to Oldest"
                  checked={sortValue === "Newest to Oldest"}
                />
                <div className="radio__radio mr-4"></div>
                Newest to Oldest
              </label>
            </div>
            <div className="p-0 my-3">
              <label htmlFor="myRadioId1" className="radio">
                <input
                  type="radio"
                  name="sortField"
                  id="myRadioId1"
                  className="radio__input"
                  value="Price[Low to High]"
                  checked={sortValue === "Price[Low to High]"}
                />
                <div className="radio__radio mr-4"></div>
                Price[Low to High]
              </label>
            </div>
            <div className="p-0 my-3">
              <label htmlFor="myRadioId2" className="radio">
                <input
                  type="radio"
                  name="sortField"
                  id="myRadioId2"
                  className="radio__input"
                  value="Price[High to Low]"
                  checked={sortValue === "Price[High to Low]"}
                />
                <div className="radio__radio mr-4"></div>
                Price[High to Low]
              </label>
            </div>
          </div>
          <div className="d-flex ml-3 align-items-center justify-content-between">
            <div className="text-uppercase font-weight-bold">filter by</div>
            <div className="horizontal-line"></div>
          </div>
          <div
            className={`d-flex ml-3 my-3 align-items-center`}
            onClick={() => {
              setIsCategoryOpen(!isCategoryOpen);
            }}
          >
            <div className="">Category</div>
            <i
              className={`fas fa-chevron-down ml-auto ${
                isCategoryOpen ? "open" : ""
              }`}
            ></i>
          </div>
          <div
            className={`ml-3 ${isCategoryOpen ? "" : "d-none"}`}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          >
            <div className="checkbox-container mb-3">
              <input type="checkbox" name="allCategories" id="checkAll" />
              <label htmlFor="checkAll">All Categories</label>
            </div>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              categories.map((category) => (
                <div className="checkbox-container mb-3" key={category._id}>
                  <input
                    type="checkbox"
                    name={category.name}
                    id={category._id}
                  />
                  <label htmlFor={category._id}>{category.name}</label>
                </div>
              ))
            )}
          </div>
          <div
            className={`d-flex ml-3 my-3 align-items-center`}
            onClick={() => {
              setIsPriceOpen(!isPriceOpen);
            }}
          >
            <div className="">Price</div>
            <i
              className={`fas fa-chevron-down ml-auto ${
                isPriceOpen ? "open" : ""
              }`}
            ></i>
          </div>
          <div
            className={`ml-3 my-3 ${isPriceOpen ? "" : "d-none"}`}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          >
            <div className="d-flex flex-wrap justify-content-between">
              <label className="minPriceField price-field">
                <span className="minPrice price-filter ml-3 mt-2">
                  Min.price
                </span>
                <input
                  type="text"
                  name="minPrice"
                  value={priceRange.min}
                  className="pt-4 pl-3 price-input"
                  onChange={(e) => {
                    setPriceRange({ ...priceRange, min: e.target.value });
                  }}
                />
              </label>
              <label className="maxPriceField price-field">
                <span className="maxPrice price-filter ml-3 mt-2">
                  Max.price
                </span>
                <input
                  type="text"
                  name="maxPrice"
                  value={priceRange.max}
                  onChange={(e) => {
                    setPriceRange({ ...priceRange, max: e.target.value });
                  }}
                  className="pt-4 pl-3 price-input"
                />
              </label>
            </div>
            <div className="mx-5 my-3">
              <InputRange
                formatLabel={null}
                maxValue={100}
                minValue={0}
                value={priceRange}
                onChange={(value) => {
                  setPriceRange(value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-9 result-area bg-info">result</div>
      </div>
    </div>
  );
};

export default Home;
