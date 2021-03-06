export const accAdd = (num1: number, num2: number): number => {
  const digits1 = getDecimalDigits(num1);
  const digits2 = getDecimalDigits(num2);
  const diff = Math.abs(digits1 - digits2);
  return (
    (convertFloatToInteger(num1) * pow10(digits1 > digits2 ? 0 : diff) +
      convertFloatToInteger(num2) * pow10(digits2 > digits1 ? 0 : diff)) /
    pow10(Math.max(digits1, digits2))
  );
};

export const accSub = (num1: number, num2: number): number => {
  return accAdd(num1, -num2);
};

export const accMul = (num1: number, num2: number): number => {
  let digits = 0;
  digits += getDecimalDigits(num1);
  digits += getDecimalDigits(num2);
  num1 = convertFloatToInteger(num1);
  num2 = convertFloatToInteger(num2);
  return (num1 * num2) / pow10(digits);
};

export const accDiv = (num1: number, num2: number): number => {
  const digits1 = getDecimalDigits(num1);
  const digits2 = getDecimalDigits(num2);
  num1 = convertFloatToInteger(num1);
  num2 = convertFloatToInteger(num2);
  return (num1 / num2) * pow10(digits2 - digits1);
};

const getDecimalDigits = (num: number): number => {
  try {
    return String(num).split(".")[1].length;
  } catch (e) {
    return 0;
  }
};

const convertFloatToInteger = (num: number): number => {
  return Number(String(num).replace(".", ""));
};

const pow10 = (power: number): number => {
  return Math.pow(10, power);
};
