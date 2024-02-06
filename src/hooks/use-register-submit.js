import { useState } from "react";
import { useToast } from "./useToast";
import { AxiosClient } from "../services";
import { transformError } from "../helpers";
import { useNavigate } from "react-router-dom";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export const useRegisterSubmit = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values, actions) => {
    const user = {
      name: values.firstName + " " + values.lastName,
      email: values.email,
      password: values.password,
    };
    try {
      setLoading(true);
      const result = await AxiosClient.post("api/user/post", user);
      if (result.data.error_code === 3)
        toast.error("Email Already Registered! Login now");
      else navigate("/login");
    } catch (err) {
      toast.error(transformError(err).message);
      actions.setSubmitting(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    initialValues,
    onSubmit,
  };
};
