import React, { useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import ExcelExporter from "../../components/admin/ExcelExporter";
import {
  listUsers,
  deleteUser,
  createMultipleUsers,
} from "../../actions/userActions";
import { DeleteAlert } from "../../components/DeleteAlert";
import "./manageuser.css";
import readXlsxFile from "read-excel-file";

const ManageUser = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  const userCreateMultiple = useSelector((state) => state.userCreateMultiple);
  const { users: multipleUsers } = userCreateMultiple;

  useEffect(() => {
    if (userInfo && userInfo.isStaff) {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, successDelete]);

  const deleteHandler = (id) => {
    DeleteAlert({
      deleteHandler: () => {
        dispatch(deleteUser(id));
      },
      deleteMessage: "Are you sure you want to delete this user?",
    });
  };
  const schema = {
    name: {
      prop: "name",
      type: String,
    },
    email: {
      prop: "email",
      type: String,
    },
    phoneNumber: {
      prop: "phoneNumber",
      type: String,
    },
    city: {
      prop: "city",
      type: String,
    },
    state: {
      prop: "state",
      type: String,
    },
    zip: {
      prop: "zip",
      type: String,
    },
  };
  const changeHandler = (e) => {
    e.preventDefault();

    const files = e.target.files;
    readXlsxFile(files[0], { schema }).then(({ rows, errors }) => {
      dispatch(createMultipleUsers(rows));
    });
  };

  useEffect(() => {
    dispatch(listUsers());
  }, [multipleUsers, dispatch]);

  return (
    <Container fluid className="border border-white p-0">
      <div className="m-1 m-md-3 border create-user-form">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <div className="d-flex justify-content-between m-3">
              <label htmlFor="upload">
                <span className="btn btn-info">Import Users</span>
                <input
                  type="file"
                  id="upload"
                  className="d-none"
                  accept=".xlsx, .xls, .csv"
                  name="photo"
                  onChange={changeHandler}
                />
              </label>
              <ExcelExporter
                dataSet={users}
                sheetName="Users"
                columns={[
                  "name",
                  "email",
                  "phoneNumber",
                  "city",
                  "state",
                  "zip",
                ]}
                fileName="Users"
              >
                <button className="btn btn-info">Export Users</button>
              </ExcelExporter>
            </div>
            <div className="container-fluid">
              <Table
                striped
                bordered
                hover
                responsive
                className="table-sm table-borderless"
              >
                <thead>
                  <tr className="border">
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">City</th>
                    <th scope="col">State</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border">
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phoneNumber}</td>
                      <td>{user.city}</td>
                      <td>{user.state}</td>
                      <td className="px-3 d-flex justify-content-between">
                        <LinkContainer to={`/admin/users/${user._id}/edit`}>
                          <Button variant="light" className="btn-sm">
                            <i className="fas fa-edit"></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant="danger"
                          className="btn-sm ml-2 ml-xl-0"
                          onClick={() => deleteHandler(user._id)}
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
    </Container>
  );
};

export default ManageUser;
