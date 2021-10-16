export default function checkAlfanumerio(value: string) {
  if (/[0-9]/gm.test(value) && /[A-Za-z]/gm.test(value)) {
    return true;
  }
  return false;
}

export function checkAlfanumerioOr(value: string) {
  if (/[0-9]/gm.test(value) || /[A-Za-z]/gm.test(value)) {
    return true;
  }
  return false;
}
