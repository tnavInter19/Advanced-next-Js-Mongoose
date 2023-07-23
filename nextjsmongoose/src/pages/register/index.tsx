import { AuthApi, RegisterUserRequest } from "@/generated-api";
import React, { useState } from "react";

function registartion() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const registrationSchema: any = {
    username: {
      required: "Username is required",
    },
    email: {
      required: "Email is required",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Invalid email address",
      },
    },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must be at least 8 characters long",
      },
    },
  };

  const validateField = (fieldName: string, value: string) => {
    const fieldValidation = registrationSchema[fieldName];
    let errorMessage = "";

    if (fieldValidation.required && !value.trim()) {
      errorMessage = fieldValidation.required;
    } else if (
      fieldValidation.pattern &&
      !fieldValidation.pattern.value.test(value)
    ) {
      errorMessage = fieldValidation.pattern.message;
    } else if (
      fieldValidation.minLength &&
      value.length < fieldValidation.minLength.value
    ) {
      errorMessage = fieldValidation.minLength.message;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: errorMessage,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUsername(name === "username" ? value : username);
    setEmail(name === "email" ? value : email);
    setPassword(name === "password" ? value : password);

    // Perform real-time validation on every keystroke
    validateField(name, value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Perform final validation when the field loses focus
    validateField(name, value);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!username) {
      newErrors["username"] = "Username is required";
    }

    if (!email) {
      newErrors["email"] = "Email is required";
    } else if (!isValidEmail(email)) {
      newErrors["email"] = "Invalid email address";
    }

    if (!password) {
      newErrors["password"] = "Password is required";
    } else if (password.length < 8) {
      newErrors["password"] = "Password must be at least 8 characters long";
    }

    setErrors(newErrors);
  };

  const canSubmitForm: boolean =
    username !== "" && email !== "" && password !== "";
  const isValidEmail = (email: string) => {
    // Basic email validation regex, you can use a more robust one if needed
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Final validation on form submission
    // for (const field in registrationSchema) {
    //   if (Object.prototype.hasOwnProperty.call(registrationSchema, field)) {
    //     const value = (this as any)[field];
    //     validateField(field, value);
    //   }
    // }

    validateForm();

    // If there are errors, prevent form submission
    if (Object.keys(errors).length > 0) {
      return;
    }

    // If form is valid, perform your registration logic here
    // Your API call for registration would go here
    var data: RegisterUserRequest = {
      name: username,
      email: email,
      password: password,
    };

    new AuthApi()
      .registerUser(data)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error.response.data.msg);
        setMessage(error.response.data.msg);
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        className="w-full max-w-sm p-4 bg-white rounded shadow"
        onSubmit={handleFormSubmit}
      >
        <div className="mb-4">
          <label htmlFor="username" className="block mb-1 font-medium">
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500 ${
              errors["username"] ? "border-red-500" : ""
            }`}
            placeholder="Enter your username"
          />
          {errors["username"] && (
            <p className="text-red-500 text-sm">{errors["username"]}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-medium">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500 ${
              errors["email"] ? "border-red-500" : ""
            }`}
            placeholder="Enter your email"
          />
          {errors["email"] && (
            <p className="text-red-500 text-sm">{errors["email"]}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 font-medium">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500 ${
              errors["password"] ? "border-red-500" : ""
            }`}
            placeholder="Enter your password"
          />
          {errors["password"] && (
            <p className="text-red-500 text-sm">{errors["password"]}</p>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
          >
            Register
          </button>
        </div>

        {message && <p className="text-center mt-4">{message}</p>}
      </form>
    </div>
  );
}

export default registartion;