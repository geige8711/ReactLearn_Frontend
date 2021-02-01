import React, { useEffect } from "react";
import "./myCarousel.css";
import { Carousel } from "react-bootstrap";
import { listBanners } from "../actions/bannerActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";

const MyCarousel = () => {
  const nextIcon = <i className="fas fa-arrow-right carousel-icon"></i>;
  const prevIcon = <i className="fas fa-arrow-left carousel-icon"></i>;

  const bannerList = useSelector((state) => state.bannerList);
  const { banners, loading, error } = bannerList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listBanners());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Carousel prevIcon={prevIcon} nextIcon={nextIcon}>
          {banners.map((banner, index) => (
            <Carousel.Item key={index}>
              <a href={banner.linkTo}>
                <img
                  className="d-block w-100 img-carousel"
                  src={banner.imageUrl}
                  alt="First slide"
                />
              </a>
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>{banner.caption}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </>
  );
};

export default MyCarousel;
