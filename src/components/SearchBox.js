import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <Form onSubmit={submitHandler} className="">
      <Form.Group controlId="formHorizontalEmail" className="m-0">
        <InputGroup>
          <Form.Control
            type="text"
            name="q"
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search Products..."
          ></Form.Control>
          <InputGroup.Append>
            <Button type="submit" variant="outline-success" className="">
              Search
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form.Group>
    </Form>
  );
};

export default SearchBox;
