import {
  email,
  password,
  firstName,
  emailEdit,
  firstNameEdit,
  adminPassword,
  newPassword,
  confirmPassword
} from "../fields";

const signUp = [email, password, firstName];
const changePassword = [password,newPassword,confirmPassword];
const forgotPassword=[password,confirmPassword]
const adminCreateUser = [email, password, firstName];
const adminChangePassword = [adminPassword];
const editUser = [emailEdit, firstNameEdit];

const eMail = [email];

export const userValidation = {
  signUp,
  changePassword,
  editUser,
  forgotPassword
};

export const adminValidation = {
  adminCreateUser,
  adminChangePassword
};

export const mailValidation = {
  eMail
};
