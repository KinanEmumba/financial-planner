export const emailValidator = (value: string) => {
  if (!/^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/.test(value))
    return "Invalid email address";
  return false;
};

export const passwordValidator = (value: string) => {
  if (value.length < 8)
    return "Password must be atleast 8 characters";
  return false;
};

export const amountValidator = (value: string) => {
  if (isNaN(parseFloat(value)))
    return "Invalid amount. Amount must be a number";
  return false;
};