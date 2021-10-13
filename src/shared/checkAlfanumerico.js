function checkAlfanumerio(value) {
  if (/[0-9]/gm.test(value) && /[A-Za-z]/gm.test(value)) {
    return true;
  }
  return false;
}

export function checkAlfanumerioOr(value) {
  if (/[0-9]/gm.test(value) || /[A-Za-z]/gm.test(value)) {
    return true;
  }
  return false;
}

export default checkAlfanumerio;
