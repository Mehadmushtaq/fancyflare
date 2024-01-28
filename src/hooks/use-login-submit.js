import { useAuthContext } from "../context";
import { AxiosClient } from "../services";
import { useToast } from "./useToast";
import { transformError } from "../helpers";

const initialValues = {
  email: "",
  password: "",
};

export const useLoginSubmit = () => {
  const toast = useToast();
  const { authenticateUser } = useAuthContext();
  const onSubmit = async (values, actions) => {
    try {
      const result = await AxiosClient.post("auth/login", values);
      authenticateUser(result?.data?.access_token);
    } catch (err) {
      toast.error(transformError(err).message);
      actions.setSubmitting(false);
    }
  };

  return {
    initialValues,
    onSubmit,
  };
};
