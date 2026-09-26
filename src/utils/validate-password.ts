export interface PasswordValidationRules {
  length: boolean;
  lowercase: boolean;
  uppercase: boolean;
  number: boolean;
  special: boolean;
}

export const validatePassword = (password: string): PasswordValidationRules => {
  return {
    // At least 8 characters long
    length: password.length >= 8,
    // At least one lowercase letter
    lowercase: /(?=.*[a-z])/.test(password),
    // At least one uppercase letter
    uppercase: /(?=.*[A-Z])/.test(password),
    // At least one number (0-9)
    number: /(?=.*\d)/.test(password),
    // At least one special character (!@#$%^&*)
    special: /(?=.*[!@#$%^&*])/.test(password),
  };
};
