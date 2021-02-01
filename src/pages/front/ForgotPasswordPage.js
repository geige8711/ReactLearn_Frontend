import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { forgotPasswordAction } from "../../actions/userActions";
import { USER_FORGOT_PASSWORD_RESET } from "../../constants/userConstants";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const forgotPassword = useSelector((state) => state.forgotPassword);
  const { loading, error, success } = forgotPassword;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPasswordAction(email));
  };

  useEffect(() => {
    dispatch({ type: USER_FORGOT_PASSWORD_RESET });
  }, [dispatch]);

  return (
    <FormContainer>
      <h1>Forgot password</h1>
      {error && <Message variant="danger">{error}</Message>}
      {success && (
        <Message variant="success">
          We sent you a link to reset your password, please check your email
        </Message>
      )}
      {loading && <Loader />}
      <Form onSubmit={submitHandler} className="mt-5">
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-5">
          Send password reset link
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ForgotPasswordPage;
