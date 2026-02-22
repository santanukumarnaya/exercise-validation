import { useReducer } from "react";

/* ================================
   1️⃣ INITIAL STATE
   - Holds everything related to the form
   - One single source of truth
================================ */

const initialState = {
  formData: {
    personalInfo: { name: "", email: "", phone: "" },
    address: { country: "", city: "" },
    passwordValidate: { password: "", cnfrPassword: "" }
  },
  page: 1,
  errMsg: {},
  submit: []
};

/* ================================
   2️⃣ REDUCER FUNCTION
   - Controls how state changes
   - Only way to modify state
================================ */

const reducer = (state, action) => {
  switch (action.type) {
    // Update any input field
    case "UPDATE_FIELD":
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.section]: {
            ...state.formData[action.section],
            [action.field]: action.value
          }
        }
      };

    // Set validation errors
    case "SET_ERRORS":
      return {
        ...state,
        errMsg: action.payload
      };

    // Go to next page
    case "NEXT_PAGE":
      return {
        ...state,
        page: state.page + 1
      };

    // Go to previous page
    case "PREV_PAGE":
      return {
        ...state,
        page: state.page - 1
      };

    // Submit form and reset
    case "SUBMIT_FORM":
      return {
        ...state,
        submit: [...state.submit, action.payload],
        formData: initialState.formData,
        errMsg: {},
        page: 1
      };

    default:
      return state;
  }
};

/* ================================
   3️⃣ MAIN COMPONENT
================================ */

export default function Validation() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { formData, page, errMsg } = state;

  const totalPages = 3;

  /* ================================
     4️⃣ HANDLE INPUT CHANGE
  ================================== */

  const handleChange = (section, field, value) => {
    dispatch({
      type: "UPDATE_FIELD",
      section,
      field,
      value
    });
  };

  /* ================================
     5️⃣ VALIDATION FUNCTIONS
  ================================== */

  const validateFirst = () => {
    const err = {};
    const { name, email, phone } = formData.personalInfo;

    if (!name) err.name = "Name Required";
    else if (name[0] !== name[0].toUpperCase())
      err.name = "First letter must be uppercase";

    if (!email) err.email = "Email Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      err.email = "Invalid email format";

    if (!phone) err.phone = "Phone Required";

    return err;
  };

  const validateSecond = () => {
    const err = {};
    const { country, city } = formData.address;

    if (!country) err.country = "Country Required";
    if (!city) err.city = "City Required";

    return err;
  };

  const validateThird = () => {
    const err = {};
    const { password, cnfrPassword } = formData.passwordValidate;

    if (!password || password.length < 8)
      err.password = "Password must be 8+ characters";

    if (cnfrPassword !== password)
      err.cnfrPassword = "Passwords do not match";

    return err;
  };

  // Decide which validation to run
  const validatePage = () => {
    if (page === 1) return validateFirst();
    if (page === 2) return validateSecond();
    if (page === 3) return validateThird();
  };

  /* ================================
     6️⃣ NAVIGATION FUNCTIONS
  ================================== */

  const handleNext = () => {
    const errors = validatePage();
    dispatch({ type: "SET_ERRORS", payload: errors });

    if (Object.keys(errors).length === 0) {
      dispatch({ type: "NEXT_PAGE" });
    }
  };

  const handleBack = () => {
    if (page > 1) {
      dispatch({ type: "PREV_PAGE" });
    }
  };

  /* ================================
     7️⃣ HANDLE SUBMIT
  ================================== */

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validatePage();
    dispatch({ type: "SET_ERRORS", payload: errors });

    if (Object.keys(errors).length === 0) {
      const finalData = {
        id: Date.now(),
        ...formData.personalInfo,
        ...formData.address,
        password: formData.passwordValidate.password
      };

      dispatch({ type: "SUBMIT_FORM", payload: finalData });
    }
  };

  /* ================================
     8️⃣ FORM CONFIGURATION
     - Dynamic field rendering
  ================================== */

  const forms = [
    [
      { label: "Name*", section: "personalInfo", field: "name" },
      { label: "Email*", section: "personalInfo", field: "email" },
      { label: "Phone*", section: "personalInfo", field: "phone" }
    ],
    [
      { label: "Country*", section: "address", field: "country" },
      { label: "City*", section: "address", field: "city" }
    ],
    [
      { label: "Password*", section: "passwordValidate", field: "password", type: "password" },
      { label: "Confirm Password*", section: "passwordValidate", field: "cnfrPassword", type: "password" }
    ]
  ];

  /* ================================
     9️⃣ JSX RENDER
  ================================== */

  return (
    <div style={{ width: "300px", margin: "auto" }}>
      <h3>Multi Step Form</h3>

      {forms[page - 1].map((item) => (
        <div key={item.field} style={{ marginBottom: "10px" }}>
          <label>{item.label}</label>
          <input
            type={item.type || "text"}
            value={formData[item.section][item.field]}
            onChange={(e) =>
              handleChange(item.section, item.field, e.target.value)
            }
            style={{ width: "100%", padding: "5px" }}
          />
          {errMsg[item.field] && (
            <p style={{ color: "red", fontSize: "12px" }}>
              {errMsg[item.field]}
            </p>
          )}
        </div>
      ))}

      <div style={{ marginTop: "10px" }}>
        <button onClick={handleBack} disabled={page === 1}>
          BACK
        </button>

        {page < totalPages ? (
          <button onClick={handleNext}> NEXT </button>
        ) : (
          <button onClick={handleSubmit}> SUBMIT </button>
        )}
      </div>

      <p>
        Page {page} of {totalPages}
      </p>
    </div>
  );
}