import { check, checkSchema } from "express-validator";
import { trimInput } from "../utils/function";

export const loginValidation = () => {
  return checkSchema({
    userNameOrEmail: {
      notEmpty: {
        errorMessage: "Please enter the valid email or userName to login.",
      },
      customSanitizer: {
        options: trimInput,
      },
    },
    password: {
      notEmpty: {
        errorMessage: "Please enter the password.",
      },
    },
  });
};
