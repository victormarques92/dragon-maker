import * as yup from 'yup';

export const validationSchema = yup.object({
  name: yup.string().required('Campo obrigatório'),
  email: yup
    .string()
    .email('Digite um e-mail válido')
    .required('Campo obrigatório'),
  password: yup.string().required('Campo obrigatório'),
});
