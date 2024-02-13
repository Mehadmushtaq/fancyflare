import * as Yup from 'yup';

export const useAddressFormSchema = () => {
  const phoneRegExp = /^(\+92|0)(\d{10})$/;

  return Yup.object().shape({
    first_name: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name is required'),
    last_name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Last name is required'),
    address_line_01: Yup.string().required('Address line 1 is required'),
    address_Line_02: Yup.string(),
    city: Yup.string().required('City is required'),
    state: Yup.string(),
    zip_code: Yup.string().required('Zipcode is required'),
    contact_number: Yup.string()
      .matches(phoneRegExp, 'Invalid phone number')
      .required('Contact number is required'),
  });
};
