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

function UpdateAllthemesStoredOnDevice() {
  try {
    const primary = localStorage.getItem("--color-primary");
    const secondary = localStorage.getItem("--color-secondary");
    const primaryLight = localStorage.getItem("--color-primary-light");
    const secondaryLight = localStorage.getItem("--color-secondary-light");

    document.documentElement.style.setProperty("--color-primary", primary);
    document.documentElement.style.setProperty("--color-secondary", secondary);
    document.documentElement.style.setProperty(
      "--color-primary-light",
      primaryLight
    );
    document.documentElement.style.setProperty(
      "--color-secondary-light",
      secondaryLight
    );
    console.log("something ain't right");
  } catch (e) {
    console.log("No stored theme colors availaible");
  }
}
export { updateUserSchema, UpdateAllthemesStoredOnDevice };
export default userSchema;
