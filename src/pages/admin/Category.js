import React, { useState, useEffect } from "react";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Container, Table, Button } from "react-bootstrap";
import "./category.css";
import CategoryModalForm from "../../components/admin/CategoryModalForm";
import { deleteCategory, listCategories } from "../../actions/categoryActions";
import { useDispatch, useSelector } from "react-redux";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  OPEN_CATEGORY_UPDATE,
  CLOSE_CATEGORY_UPDATE,
} from "../../constants/categoryConstants";
import { DeleteAlert } from "../../components/DeleteAlert";

const Category = ({ history }) => {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);

  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;
  const categoryDelete = useSelector((state) => state.categoryDelete);
  const { success } = categoryDelete;
  const categoryUpdate = useSelector((state) => state.categoryUpdate);
  const { success: updateSuccess } = categoryUpdate;
  const categoryCreate = useSelector((state) => state.categoryCreate);
  const { success: createSuccess } = categoryCreate;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const deleteHandler = (id) => {
    DeleteAlert({
      deleteHandler: () => {
        dispatch(deleteCategory(id));
      },
      deleteMessage:
        "Are you sure you want to delete this category? The relevent products will be deleted too!",
    });
  };

  useEffect(() => {
    if (userInfo && userInfo.isStaff) {
      dispatch(listCategories());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, success, updateSuccess, createSuccess]);

  return (
    <Container fluid className="border border-white p-0">
      <div className="m-1 m-md-3 border create-user-form">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <div className="d-flex justify-content-end m-3">
              <button
                className="btn btn-info"
                onClick={() => setModalShow(true)}
              >
                Create Category
              </button>
            </div>
            <div className="container-fluid">
              <Table
                striped
                bordered
                hover
                responsive
                className="table-sm table-borderless col-12 col-md-8 mx-auto"
              >
                <thead>
                  <tr className="border">
                    <th scope="col" className="col-8">
                      Name
                    </th>
                    <th scope="col" className="col-4">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr key={category._id} className="border">
                      <td>{category.name}</td>
                      <td className="px-3 d-flex justify-content-start">
                        <Button
                          variant="light"
                          className="btn-sm mr-5"
                          onClick={() => {
                            setModalShow(true);
                            dispatch({
                              type: OPEN_CATEGORY_UPDATE,
                              payload: {
                                id: category._id,
                                name: category.name,
                              },
                            });
                          }}
                        >
                          <i className="fas fa-edit"></i>
                        </Button>
                        <Button
                          variant="danger"
                          className="btn-sm"
                          onClick={() => deleteHandler(category._id)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </>
        )}
      </div>
      <CategoryModalForm
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          dispatch({ type: CLOSE_CATEGORY_UPDATE });
        }}
      />
    </Container>
  );
};

export default Category;
