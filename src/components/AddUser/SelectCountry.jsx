import { Box, InputLabel, MenuItem, Select } from "@mui/material";
import { ErrorMessage } from "formik";
import React, { useEffect, useState } from "react";

const SelectCountry = ({ value, update }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => { 
    var requestOptions = {
      method: "GET",
      headers: {
        "X-CSCAPI-KEY":
          "M24xdGxjOXRWV2FySjI1c3h0RG13WkxhYXlKYU9PTm1hSVZvRGxtVg==",
      },
      redirect: "follow",
    };

    fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
      .then((response) => response.json())
      .then((result) => setCountries(result))
      .catch((error) => {
        // toast
        console.log("error", error);
      });
  }, []);
  return (
    <Box sx={{ mb: 2 }}>
      <InputLabel id="country-label">Select Country</InputLabel>
      <Select
        labelId="country-label"
        id="country"
        value={value}
        label="Select Country"
        onChange={(e) => {
          console.log(e.target.value);
          update("country", e.target.value);
        }}
        sx={{ width: "100%" }}
      >
        <MenuItem value="" disabled>
          Select Country
        </MenuItem>
        {countries.map((country) => (
          <MenuItem key={country.iso2} value={country.iso2}>
            {country.name}
          </MenuItem>
        ))}
      </Select>
      <ErrorMessage name="country" component="div" style={{ color: "red" }} />
    </Box>
  );
};

export default SelectCountry;
