import {isValid as isValidCpf} from '@fnando/cpf';
import {isValid as isValidCnpj} from '@fnando/cnpj';

function checkCpfInvalid(value :any) {
  if (value && !isValidCpf(value)) {
    return true;
  }
  return false;
}

function checkCnpjInvalid(value: any) {
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
