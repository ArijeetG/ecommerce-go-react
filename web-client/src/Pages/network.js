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

export const fetchItems = async (token) => {
  console.log({ token });
  const request = await axios.get(
    process.env.REACT_APP_BACKEND_URL + "shop/get-items",
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return request.data;
};
