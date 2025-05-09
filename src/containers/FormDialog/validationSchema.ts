import { validate as validateCPF } from 'gerador-validador-cpf';
import * as yup from 'yup';

const normalizeNumber = (value?: string) =>
  value?.replace(/\D/g, '') || '';

export const validationSchema = yup.object({
  name: yup.string().required('Campo obrigatório'),
  phone: yup.string().required('Campo obrigatório'),
  cpf: yup
    .string()
    .required('Campo obrigatório')
    .transform(normalizeNumber)
    .matches(/^\d{11}$/, 'CPF incompleto')
    .test(
      'cpf',
      'CPF inválido',
      value => !!value && validateCPF(value),
    ),
  cep: yup.string().required('Campo obrigatório'),
  address: yup.string().required('Campo obrigatório'),
});
