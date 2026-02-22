import { useState } from "react";
import FormErrorHandling from "../components/FormErrorHandling";

export default function Validation() {
  const initialState = {
    personalInfo: { name: "", email: "", phone: "" },
    address: { country: "", city: "" },
    passwordValidate: { password: "", cnfrPassword: "" }
  };

  const [formData, setFormData] = useState(initialState);
  const [submit, setSubmit] = useState([]);
  const [errMsg, setErrMsg] = useState({});
  const [page, setPage] = useState(1);

  const totalPages = 3;

  // 🔹 Handle Input Change
  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // 🔹 Validation Functions
  const validateFirst = () => {
    const err = {};
    const { name, email, phone } = formData.personalInfo;

    if (!name) err.name = "Name Required";
    else if (name[0] !== name[0].toUpperCase())
      err.name = "Name should start with uppercase";

    if (!email) err.email = "Email required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      err.email = "Invalid email";

    if (!phone) err.phone = "Phone required";

    return err;
  };

  const validateSecond = () => {
    const err = {};
    const { country, city } = formData.address;

    if (!country) err.country = "Country required";
    if (!city) err.city = "City required";

    return err;
  };

  const validateThird = () => {
    const err = {};
    const { password, cnfrPassword } = formData.passwordValidate;

    if (!password || password.length < 8)
      err.password = "Password must be at least 8 characters";

    if (cnfrPassword !== password)
      err.cnfrPassword = "Passwords do not match";

    return err;
  };

  // 🔹 Central Validation Controller
  const validatePage = () => {
    if (page === 1) return validateFirst();
    if (page === 2) return validateSecond();
    if (page === 3) return validateThird();
  };

  // 🔹 Handle Next
  const handleNext = () => {
    const errors = validatePage();
    setErrMsg(errors);

    if (Object.keys(errors).length === 0) {
      setPage((prev) => prev + 1);
    }
  };

  // 🔹 Handle Back
  const handleBack = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  // 🔹 Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validatePage();
    setErrMsg(errors);

    if (Object.keys(errors).length === 0) {
      const finalData = {
        id: Date.now(),
        name: formData.personalInfo.name,
        email: formData.personalInfo.email,
        phone: formData.personalInfo.phone,
        country: formData.address.country,
        city: formData.address.city,
        password: formData.passwordValidate.password
      };

      setSubmit((prev) => [...prev, finalData]);
      setFormData(initialState);
      setErrMsg({});
      setPage(1);
    }
  };

  // 🔹 Form Configurations
  const forms = [
    [
      {
        name: "Name*",
        key: "name",
        type: "text",
        value: formData.personalInfo.name,
        onChange: (value) => handleChange("personalInfo", "name", value),
        placeholder: "Name..."
      },
      {
        name: "Email*",
        key: "email",
        type: "text",
        value: formData.personalInfo.email,
        onChange: (value) => handleChange("personalInfo", "email", value),
        placeholder: "Email..."
      },
      {
        name: "Phone*",
        key: "phone",
        type: "text",
        value: formData.personalInfo.phone,
        onChange: (value) => handleChange("personalInfo", "phone", value),
        placeholder: "Contact..."
      }
    ],
    [
      {
        name: "Country*",
        key: "country",
        type: "text",
        value: formData.address.country,
        onChange: (value) => handleChange("address", "country", value),
        placeholder: "Country..."
      },
      {
        name: "City*",
        key: "city",
        type: "text",
        value: formData.address.city,
        onChange: (value) => handleChange("address", "city", value),
        placeholder: "City..."
      }
    ],
    [
      {
        name: "Password*",
        key: "password",
        type: "password",
        value: formData.passwordValidate.password,
        onChange: (value) => handleChange("passwordValidate", "password", value),
        placeholder: "Password..."
      },
      {
        name: "Confirm Password*",
        key: "cnfrPassword",
        type: "password",
        value: formData.passwordValidate.cnfrPassword,
        onChange: (value) =>
          handleChange("passwordValidate", "cnfrPassword", value),
        placeholder: "Confirm Password..."
      }
    ]
  ];

  return (
    <div className="form-validation">
      <FormErrorHandling data={forms[page - 1]} error={errMsg} />

      <br />

      <button onClick={handleBack} disabled={page === 1}>
        BACK
      </button>

      <p>
        {page} of {totalPages}
      </p>

      {page < totalPages ? (
        <button onClick={handleNext}>NEXT</button>
      ) : (
        <button onClick={handleSubmit}>SUBMIT</button>
      )}
    </div>
  );
}