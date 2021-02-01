import React, { useEffect } from "react";
import "./managebanner.css";
import { useDispatch, useSelector } from "react-redux";
import { listBanners } from "../../actions/bannerActions";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import BannerItem from "../../components/admin/BannerItem";
import { Container } from "react-bootstrap";

const ManageBanner = ({ history }) => {
  const dispatch = useDispatch();
  const bannerList = useSelector((state) => state.bannerList);
  const { loading, error, banners } = bannerList;
  const bannerDelete = useSelector((state) => state.bannerDelete);
  const { success } = bannerDelete;
  const bannerUpdate = useSelector((state) => state.bannerUpdate);
  const { success: updateSuccess } = bannerUpdate;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isStaff) {
      dispatch(listBanners());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, success, updateSuccess]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Container fluid className="border border-white p-0">
          <div className="m-1 m-lg-3">
            {banners.map((banner, index) => (
              <BannerItem key={index} bannerId={banner._id} {...banner} />
            ))}
          </div>
        </Container>
      )}
    </>
  );
};

export default ManageBanner;
