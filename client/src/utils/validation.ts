import * as Yup from "yup";

const Validation = {
  loginSchema: Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  }),

  registerSchema: Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Password is required"),
    email: Yup.string().email().required("Email is required"),
  }),
};

export default Validation;
