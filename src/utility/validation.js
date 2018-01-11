const validate = (val, rules, connectedValue) => {
  let isValid = true
  for (rule in rules){
    switch (rule) {
      case 'isEmail':
        isValid = isValid && emailValidator(val);
        break;
      case 'minLength':
        isValid = isValid && minLengthValidator(val, rules[rule]);
        break;
      case 'equalTo':
        isValid = isValid && equalToValidator(val, connectedValue[rule]);
        break;
      case 'notEmpty':
        isValid = isValid && notEmptyValidator(val)
        break;
      default:
        isValid = true;

    }
  }
  return isValid;
}

const emailValidator = val => {
  return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(val)
}

const minLengthValidator = (val, minLength) => {
  return val.length >= minLength
}

const notEmptyValidator = val => {
  console.log('val', val);
  return val.trim() !== "";
}

const equalToValidator = (val, checkValue) => {
  return val === checkValue
}

export default validate;
