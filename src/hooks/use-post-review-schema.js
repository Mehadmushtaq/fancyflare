import * as Yup from 'yup';

export const usePostReviewSchema = () => {
  return Yup.object().shape({
    email: Yup.string()
      .required('Email is required!')
      .email('invalid email!'),
    star: Yup.number().required('please give rating'),
    description: Yup.string().required('please provide feedback'),
    images: Yup.array()
  });
};
