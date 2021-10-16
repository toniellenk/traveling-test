import { isValid as isValidCpf } from '@fnando/cpf';
import { isValid as isValidCnpj } from '@fnando/cnpj';

function checkCpfInvalid(value: string) {
  if (value && !isValidCpf(value)) {
    return true;
  }
  return false;
}

function checkCnpjInvalid(value: string) {
  if (value && !isValidCnpj(value)) {
    return true;
  }
  return false;
}

export default function checkDocumento(type: any, value: any) {
  if (type === 'cnpj') {
    return checkCnpjInvalid(value);
  }

  if (type === 'cpf') {
    return checkCpfInvalid(value);
  }
}
