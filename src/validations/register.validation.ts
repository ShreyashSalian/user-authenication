import { checkSchema, Meta } from "express-validator";
import { trimInput } from "../utils/function";
import fs from "fs";

export const userValidation = () => {
  return checkSchema({
    fullName: {
      notEmpty: {
        errorMessage: "Please enter the fullname",
      },
      matches: {
        options: [/[a-zA-Z\s]+$/],
        errorMessage: "Please enter only string in fullName",
      },
      customSanitizer: {
        options: trimInput,
      },
    },
    userName: {
      notEmpty: {
        errorMessage: "Please enter the userName",
      },
      matches: {
        options: [/[a-zA-Z0-9\s@#]+$/],
        errorMessage: "Please enter only string in user name",
      },
      customSanitizer: {
        options: trimInput,
      },
    },
    gender: {
      notEmpty: {
        errorMessage: "Please enter the gender.",
      },
    },
    email: {
      notEmpty: {
        errorMessage: "Please enter the email",
      },
      isEmail: {
        errorMessage: "Please enter the valid email",
      },
      customSanitizer: {
        options: trimInput,
      },
    },
    password: {
      notEmpty: {
        errorMessage: "Please enter the password.",
      },
      matches: {
        options: [/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/],
        errorMessage:
          "Password must be at least 6 characters long, including a number and a special character.",
      },
      customSanitizer: {
        options: trimInput,
      },
    },
    confirmPassword: {
      notEmpty: {
        errorMessage: "Please enter the confirm password.",
      },
      customSanitizer: {
        options: trimInput,
      },
      custom: {
        options: (value: string, { req }: Meta): boolean => {
          if (value !== req.body.password) {
            throw new Error("Password and confirm password don't match.");
          }
          return true;
        },
      },
    },
    contactNumber: {
      notEmpty: {
        errorMessage: "Please enter the Contact Number",
      },
      matches: {
        // Regular expression for Indian mobile numbers
        options: [/^[6-9]\d{9}$/],
        errorMessage:
          "Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.",
      },
      customSanitizer: {
        options: trimInput,
      },
    },
  });
};
