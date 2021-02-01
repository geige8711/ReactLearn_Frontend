import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import ExcelExporter from "../../components/admin/ExcelExporter";
import {
  listProducts,
  deleteProduct,
  createMultipleProducts,
} from "../../actions/productActions";
import readXlsxFile from "read-excel-file";
import { listCategories } from "../../actions/categoryActions";
import "./manageproduct.css";
import { DeleteAlert } from "../../components/DeleteAlert";

const ManageProduct = ({ history }) => {
  const dispatch = useDispatch();
  const [exportProducts, setExportProducts] = useState([]);
  const [categoryMap, setCategoryMap] = useState(new Map());
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  const { success: successDelete } = productDelete;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const productCreateMultiple = useSelector(
    (state) => state.productCreateMultiple
  );
  const { products: multipleProducts } = productCreateMultiple;

  useEffect(() => {
    if (userInfo && userInfo.isStaff) {
      dispatch(listProducts());
      dispatch(listCategories());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, successDelete]);

  const deleteHandler = (id) => {
    DeleteAlert({
      deleteHandler: () => {
        dispatch(deleteProduct(id));
      },
      deleteMessage: "Are you sure you want to delete this product?",
    });
  };
  const schema = {
    name: {
      prop: "name",
      type: String,
    },
    status: {
      prop: "status",
      type: String,
    },
    price: {
      prop: "price",
      type: String,
    },
    category: {
      prop: "category",
      type: String,
    },
    rating: {
      prop: "rating",
      type: String,
    },
    numReviews: {
      prop: "numReviews",
      type: String,
    },
    countInStock: {
      prop: "countInStock",
      type: String,
    },
  };
  const changeHandler = (e) => {
    e.preventDefault();
    const files = e.target.files;
    readXlsxFile(files[0], { schema }).then(({ rows, errors }) => {
      const newProductsList = rows.map((row) => {
        return {
          ...row,
          category: categoryMap.get(row.category),
          status: row.status === "Publish" ? true : false,
        };
      });
      console.log(newProductsList);
      dispatch(createMultipleProducts(newProductsList));
    });
  };

  useEffect(() => {
    dispatch(listProducts());
  }, [multipleProducts, dispatch]);

  useEffect(() => {
    if (products && products.length !== 0) {
      const exportProductsDataSet = products.map((product) => {
        return {
          name: product.name,
          status: product.status ? "Publish" : "Draft",
          price: product.price,
          category: product.category.name,
          rating: product.rating,
          numReviews: product.numReviews,
          countInStock: product.countInStock,
        };
      });
      setExportProducts(exportProductsDataSet);
    }
  }, [products]);

  useEffect(() => {
    if (categories && categories.length !== 0) {
      const temCategoryMap = new Map();
      categories.forEach((category) => {
        temCategoryMap.set(category.name, category._id);
      });
      setCategoryMap(temCategoryMap);
    }
  }, [categories]);

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
              <label htmlFor="upload" className="mr-3">
                <span className="btn btn-info">Import Products</span>
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
                dataSet={exportProducts}
                sheetName="Products"
                columns={[
                  "name",
                  "status",
                  "category",
                  "price",
                  "rating",
                  "numReviews",
                  "countInStock",
                ]}
                fileName="Products"
              >
                <button className="btn btn-info">Export Products</button>
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
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">Price</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Number of Reviews</th>
                    <th scope="col">Count In Stock</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} className="border">
                      <td>
                        <img
                          src={product.mainImage}
                          className="product-list-pic"
                          alt={product.name}
                        />
                      </td>
                      <td className="align-middle">{product.name}</td>
                      <td className="align-middle">{product.category.name}</td>
                      <td className="align-middle">{product.price}</td>
                      <td className="align-middle">{product.rating}</td>
                      <td className="align-middle">{product.numReviews}</td>
                      <td className="align-middle">{product.countInStock}</td>
                      <td className="px-3 align-middle">
                        <div className="d-flex justify-content-between">
                          <LinkContainer
                            to={`/admin/products/${product._id}/edit`}
                          >
                            <Button
                              variant="light"
                              className="btn-sm mr-3 mr-md-0"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </LinkContainer>
                          <Button
                            variant="danger"
                            className="btn-sm my-auto"
                            onClick={() => deleteHandler(product._id)}
                          >
                            <i className="fas fa-trash"></i>
                          </Button>
                        </div>
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

export default ManageProduct;
