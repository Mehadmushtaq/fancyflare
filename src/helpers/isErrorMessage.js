import { getIn } from "formik";

export const isErrorMessage = (
  field,
  errors
) => getIn(errors, field);
