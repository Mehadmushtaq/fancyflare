import * as Yup from 'yup';

export const usePaymentFormSchema = () => {
  return Yup.object().shape({
    name: Yup.string().required('name is required'),
    cardNumber: Yup.string()
      .matches(/^\d{16}$/, 'Invalid card number')
      .required('Card number is required'),
    expDate: Yup.string()
      .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid expiration date')
      .required('Expiration date is required'),
    cvv: Yup.string()
      .matches(/^\d{3}$/, 'Invalid CVV')
      .required('CVV is required'),
  });
};
