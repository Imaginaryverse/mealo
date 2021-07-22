export const validatePassword = (pwd, confirmPwd) => {
  if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(pwd)) {
    return {
      valid: false,
      message:
        'Password must be at least 8 characters long and include a lowercase character, an uppercase character and a digit',
    };
  }

  if (pwd !== confirmPwd) {
    return {
      valid: false,
      message: 'Passwords are not matching',
    };
  }

  return {
    valid: true,
    message: 'OK',
  };
};
