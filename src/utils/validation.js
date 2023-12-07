const rgEmail = new RegExp([
  '^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)',
  '(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])',
  '(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
].join('|'));
const rgMobilePhone = /^((?:\+62|62)|0)[8]{1}[0-9]{6,12}$/;
const lgPassword = (v) => v && v.length >= 8;
const numbers = /^[0-9]+$/;

export const isEmail = value => rgEmail.test(value);
export const isMobilePhone = value => rgMobilePhone.test(value);
export const isNumber = value => numbers.test(value);
export const isPassword = value => lgPassword(value);
