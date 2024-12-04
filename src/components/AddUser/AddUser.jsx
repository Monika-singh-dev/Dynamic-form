import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import PaymentDetails from "./PaymentDetails";
import SelectCountry from "./SelectCountry";
import { userContext } from "../../store/userContext";
import "./AddUser.css"
import { Link, useNavigate } from "react-router-dom"; 

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  country: Yup.string().required("Country is required"),
  // paymentMethod: Yup.string().required("Payment method is required"),
  upiId: Yup.string().when("paymentMethod", {
    is: "UPI",
    then: Yup.string().required("UPI ID is required"),
  }),
  bankAccount: Yup.string().when("paymentMethod", {
    is: "Bank Details",
    then: Yup.string().required("Bank Account Number is required"),
  }),
  ifsc: Yup.string().when("paymentMethod", {
    is: "Bank Details",
    then: Yup.string().required("IFSC Code is required"),
  }),
  cardNumber: Yup.string().when("paymentMethod", {
    is: "Card",
    then: Yup.string().required("Card Number is required"),
  }),
});

const Adduser = () => {
  const navigate = useNavigate();
  const { setUsers } = useContext(userContext);
  const [progress, setProgress] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  let initialValues = {
    name: "",
    email: "",
    country: "",
    paymentMethod: "",
    upiId: "",
    bankAccount: "",
    ifsc: "",
    cardNumber: "",
  };

  const handleProgress = (values) => {
    let updatedValues = { ...initialValues };
    let data = { ...values };

    if (values.paymentMethod === "upi") {
      delete updatedValues.bankAccount;
      delete updatedValues.ifsc;
      delete updatedValues.cardNumber;
      data.bankAccount = "";
      data.ifsc = "";
      data.cardNumber = "";
    } else if (values.paymentMethod === "bank") {
      delete updatedValues.upiId;
      delete updatedValues.cardNumber;
      data.cardNumber = "";
      data.upiId = "";
    } else if (values.paymentMethod === "card") {
      delete updatedValues.bankAccount;
      delete updatedValues.ifsc;
      delete updatedValues.upiId;
      data.bankAccount = "";
      data.ifsc = "";
      data.upiId = "";
    }

    const totalFields = Object.keys(updatedValues).length;

    const filledFields = Object.keys(data).filter(
      (key) =>
        data[key] !== "" &&
        data[key] !== null &&
        !(typeof data[key] === "object" && Object.keys(data[key]).length === 0)
    ).length;

    setProgress((filledFields / totalFields) * 100);
  };

  const handleSubmit = (values) => {
    console.log(values);

    setUsers((prev) => [...prev, { id: crypto.randomUUID(), ...values }]);
    setIsSubmitted(true);
    // navigate("/");
    setTimeout(() => {
      alert("Form Submitted Successfully!");
      setIsSubmitted(false);
      navigate("/home");
    }, 1000); //redirect after 1 second
  };

  return (
    <Box sx={{ width: "60%", margin: "auto", mt: 5 }}>
      <Typography variant="h4" gutterBottom className="form-heading">
        DYNAMIC FORM FOR USERS DETAILS!
      </Typography>
      <LinearProgress variant="determinate" value={progress} sx={{ mb: 3 }} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validate={handleProgress}
      >
        {({ values, setFieldValue }) => (
          <Form className="form-container">
            {/* Name */}
            <Box sx={{ mb: 2 }} className="form-group">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <Field name="name" type="text" className="custom-field" />

              <ErrorMessage
                name="name"
                component="div"
                className="error-message"
              />
            </Box>

            {/* Email */}
            <Box sx={{ mb: 2 }} className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <Field name="email" type="email" className="custom-field" />

              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
            </Box>

            <SelectCountry value={values.country} update={setFieldValue} />

            <PaymentDetails
              value={values.paymentMethod}
              update={setFieldValue}
            />
            <div className="form-actions">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="submit-button"
              >
                Submit
              </Button>
              <Link to="/home">
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ ml: 2 }}
                  className="home-button"
                >
                  Home
                </Button>
              </Link>
            </div>
            {isSubmitted && (
              <div className="success-message">
                ✔️ Form Submitted Successfully!
              </div>
            )}
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Adduser;
