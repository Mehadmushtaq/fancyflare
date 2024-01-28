import { useAuthContext } from "../context";
import { AxiosClient } from "../services";
import { useToast } from "./useToast";
import { transformError } from "../helpers";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export const useRegisterSubmit = () => {
  const toast = useToast();
  const { authenticateUser } = useAuthContext();
  const onSubmit = async (values, actions) => {
    try {
      const result = await AxiosClient.post("auth/register", values);
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
