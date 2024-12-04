import { Box, InputLabel, MenuItem, Select } from "@mui/material";
import { ErrorMessage, Field } from "formik";
import React from "react";

// Payment methods
const paymentMethods = [
  { value: "upi", label: "UPI" },
  { value: "bank", label: "Bank Details" },
  { value: "card", label: "Card" }, 
];

const PaymentDetails = ({ value, update }) => {
  return (
    <>
      {/* Payment Method */}
      <Box sx={{ mb: 2 }}>
        <InputLabel id="paymentMethod-label">Payment Method</InputLabel>
        {/* <label htmlFor="paymentMethod">Payment</label> */}
        <Select
          labelId="paymentMethod-label"
          id="paymentMethod"
          value={value}
          label="Payment Method"
          onChange={(e) => {
            const method = e.target.value;
            update("paymentMethod", method);
          }}
          sx={{ width: "100%" }}
        >
          <MenuItem value="" disabled>
            Select Method
          </MenuItem>
          {paymentMethods.map((method) => (
            <MenuItem key={method.value} value={method.value}>
              {method.label}
            </MenuItem>
          ))}
        </Select>
        <ErrorMessage
          name="paymentMethod"
          component="div"
          style={{ color: "red" }}
        />
      </Box>

      {/* UPI Field */}
      {value === "upi" && (
        <Box sx={{ mb: 2 }}>
          <label htmlFor="upiId">UPI ID</label>
          <Field name="upiId" type="text" className="custom-field" />
          <ErrorMessage name="upiId" component="div" style={{ color: "red" }} />
        </Box>
      )}

      {/* Bank Details Fields */}
      {value === "bank" && (
        <>
          <Box sx={{ mb: 2 }}>
            <label htmlFor="bankAccount">Bank Account Number</label>
            <Field name="bankAccount" type="number" className="custom-field" />
            <ErrorMessage
              name="bankAccount"
              component="div"
              style={{ color: "red" }}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <label htmlFor="ifsc">IFSC Code</label>
            <Field name="ifsc" type="text" className="custom-field" />
            <ErrorMessage
              name="ifsc"
              component="div"
              style={{ color: "red" }}
            />
          </Box>
        </>
      )}

      {/* Card Field */}
      {value === "card" && (
        <Box sx={{ mb: 2 }}>
          <label htmlFor="cardNumber">Card Number</label>
          <Field name="cardNumber" type="number" className="custom-field" />
          <ErrorMessage
            name="cardNumber"
            component="div"
            style={{ color: "red" }}
          />
        </Box>
      )}
    </>
  );
};

export default PaymentDetails;
