export const validatePassword = (pwd, confirmPwd) => {
  if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(pwd)) {
    return {
      valid: false,
      message:
        'password must be at least 8 characters long and include one lowercase character, one uppercase character and one digit',
    };
  }

  if (pwd !== confirmPwd) {
    return {
      valid: false,
      message: 'passwords are not matching',
    };
  }

  return {
    valid: true,
    message: 'OK',
  };
};
