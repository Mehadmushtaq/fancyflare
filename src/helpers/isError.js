import { getIn } from "formik";
import { isErrorMessage } from "./isErrorMessage";

export const isError = (
  field,
  errros,
  touched
) => getIn(touched, field) && Boolean(isErrorMessage(field, errros));
