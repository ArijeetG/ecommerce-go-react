import axios from "axios";

export const loginSubmit = async (email, password) => {
  const request = await axios.post(
    process.env.REACT_APP_BACKEND_URL + "auth/login",
    {
      email,
      password,
    }
  );
  return request.data;
};

export const signupSubmit = async (name, email, password) => {
  console.log(process.env.REACT_APP_BACKEND_URL);
  const request = await axios.post(
    process.env.REACT_APP_BACKEND_URL + "auth/register",
    {
      email,
      password,
      name,
      role: "user",
    }
  );
  return request.data;
};
