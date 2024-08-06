import * as yup from "yup";

export const registerUserSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
});

export const loginUserSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
});

// Custom validation to check if a URL points to a genuine image
const isGenuineImage = async (url) => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    const contentType = response.headers.get("Content-Type");
    return contentType && contentType.startsWith("image");
  } catch (error) {
    return false;
  }
};

export const InputUrlSchema = yup.object().shape({
  imageUrl: yup
    .string()
    .url("The input must be a valid URL")
    .test(
      "is-genuine-image",
      "The URL must point to an image",
      async (value) => {
        if (!value) return false;
        return await isGenuineImage(value);
      }
    )
    .required("This field is required"),
});
