import { object, string, date, ref } from "yup";

const userSchema = object().shape({
  firstName: string().required("Please type in your first name."),
  lastName: string().required("Please type in your last name."),
  date: date().required("Please choose your date of birth."),
  gender: string().required("Please select your gender."),
  email: string().email().required("Please type in your email."),
  password: string().min(10).max(20).required("Please type in your password."),
  confirmPassword: string().oneOf(
    [ref("password"), null],
    "Passwords must match"
  ),
});

const updateUserSchema = object().shape({
  firstName: string("Please type in your first name."),
  lastName: string("Please type in your last name."),
  date: date("Please choose your date of birth."),
  gender: string("Please select your gender."),
  email: string().email("Please type in your email."),
});
export { updateUserSchema };
export default userSchema;
