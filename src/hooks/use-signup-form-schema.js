import * as Yup from "yup";

export const useRegisterFormSchema = () => {
  return Yup.object().shape({
    firstName: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("firstName is required"),
    lastName: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
    email: Yup.string()
      .required("Email is required!")
      .email("Email is invalid!"),
    password: Yup.string().required("Password is required!"),
  });
};
