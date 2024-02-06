import { useAuthContext } from "../context";
import { AxiosClient } from "../services";
import { useToast } from "./useToast";
import { transformError } from "../helpers";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
};

export const useLoginSubmit = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const { authenticateUser } = useAuthContext();
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    try {
      setLoading(true);
      const result = await AxiosClient.post("api/user/login", values);

      if (result?.data?.error_code === 11) {
        toast.error("Invalid email or password");
      } else {
        authenticateUser(result?.data?.result);
        navigate("/");
      }
    } catch (err) {
      toast.error(transformError(err).message);
      actions.setSubmitting(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    initialValues,
    onSubmit,
    loading,
  };
};
