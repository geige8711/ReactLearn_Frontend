import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import {
  createCategory,
  updateCategoryById,
} from "../../actions/categoryActions";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_CATEGORY_UPDATE } from "../../constants/categoryConstants";

const CategoryModalForm = ({ show, onHide }) => {
  const categoryUpdateOpen = useSelector((state) => state.categoryUpdateOpen);
  const { id, name } = categoryUpdateOpen;
  const [categoryNewName, setCategoryNewName] = useState(name);
  const dispatch = useDispatch();
  const updateCategoryHandler = (name, id) => {
    dispatch(updateCategoryById(name, id));
    onHide();
    setCategoryNewName("");
  };

  const createCategoryHandler = (name) => {
    dispatch(createCategory(name));
    onHide();
    setCategoryNewName("");
  };
  useEffect(() => {
    setCategoryNewName(name);
  }, [name]);

  return (
    <Modal
      show={show}
      onHide={() => {
        onHide();
        dispatch({ type: CLOSE_CATEGORY_UPDATE });
        setCategoryNewName("");
      }}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="border border-0">
        <Modal.Title id="contained-modal-title-vcenter">
          {name ? "Update Category Name" : "Create New Category"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          placeholder="Enter new category name"
          className="border border-top-0 border-left-0 border-right-0 w-100 category-input"
          value={categoryNewName}
          onChange={(e) => {
            setCategoryNewName(e.target.value);
          }}
        />
      </Modal.Body>
      <Modal.Footer className="border border-0">
        {name ? (
          <Button
            className="mr-4"
            onClick={() => updateCategoryHandler(categoryNewName, id)}
          >
            Update
          </Button>
        ) : (
          <Button
            className="mr-4"
            onClick={() => createCategoryHandler(categoryNewName)}
          >
            Create
          </Button>
        )}
        <Button
          onClick={() => {
            onHide();
            dispatch({ type: CLOSE_CATEGORY_UPDATE });
            setCategoryNewName("");
          }}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CategoryModalForm;
