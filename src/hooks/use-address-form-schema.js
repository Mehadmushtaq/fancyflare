import * as Yup from 'yup';

export const useAddressFormSchema = () => {
  const phoneRegExp = /^(\+92|0)(\d{10})$/;

  return Yup.object().shape({
    firstName: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name is required'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Last name is required'),
    addressLine1: Yup.string().required('Address line 1 is required'),
    addressLine2: Yup.string(),
    city: Yup.string().required('City is required'),
    state: Yup.string(),
    zipcode: Yup.string().required('Zipcode is required'),
    contactNumber: Yup.string()
      .matches(phoneRegExp, 'Invalid phone number')
      .required('Contact number is required'),
  });
};
