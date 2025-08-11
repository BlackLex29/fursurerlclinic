"use client";

import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig"; // Adjust path if needed

// Global styles: reset & background
const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: "Poppins", sans-serif;
    background-color: #dff7f1;
  }
`;

// Wrapper to center content
const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Main container card
const Container = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 30px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

// Form styling
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

// Name fields in a row
const NameRow = styled.div`
  display: flex;
  gap: 10px;
  label {
    flex: 1;
  }
`;

// Label with floating label effect
const Label = styled.label`
  position: relative;
  display: block;
  .input {
    width: 100%;
    padding: 12px;
    border: 2px solid #bbb;
    border-radius: 8px;
    outline: none;
    font-size: 14px;
    background: transparent;
    transition: border-color 0.2s;
  }

  .input:focus {
    border-color: #34B89C;
  }

  span {
    position: absolute;
    left: 12px;
    top: 12px;
    font-size: 14px;
    color: #888;
    transition: 0.2s;
    pointer-events: none;
  }

  /* Animate label to float when input is focused or has text */
  .input:focus + span,
  .input:not(:placeholder-shown) + span {
    top: -8px;
    left: 8px;
    font-size: 12px;
    color: #34B89C;
    background: #fff;
    padding: 0 4px;
  }
`;

// Submit button
const Button = styled.button`
  padding: 12px;
  background-color: #34B89C;
  color: #fff;
  font-weight: bold;
  border: 2px solid #34B89C;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  margin-top: 10px;

  &:hover:enabled {
    background-color: #2e9a80;
    border-color: #2e9a80;
  }

  &:disabled {
    background-color: #95a5a6;
    border-color: #95a5a6;
    cursor: not-allowed;
  }
`;

// Message text
const Message = styled.p`
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
`;

// Error message
const ErrorText = styled.p`
  color: #c0392b;
  font-size: 14px;
  margin: -8px 0 8px;
`;

// Sign-in prompt
const Signin = styled.p`
  font-size: 14px;
  margin-top: 10px;

  .link {
    color: #34B89C;
    cursor: pointer;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        createdAt: new Date().toISOString(),
      });

      router.push("/login");
    } catch (error) {
      console.error("Register error:", error);
      if ((error as Error).message) {
        const errMsg = (error as Error).message;
        switch (errMsg) {
          case "auth/email-already-in-use":
            setError("Email is already in use. Try logging in.");
            break;
          case "auth/invalid-email":
            setError("Invalid email address.");
            break;
          case "auth/weak-password":
            setError("Password too weak. Use at least 6 chars + special character.");
            break;
          default:
            setError(errMsg || "Registration failed.");
        }
      } else {
        setError("Registration failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Container>
          <h1>Register</h1>
          <Form onSubmit={handleSubmit}>
            <Message>Signup now and get full access to our app.</Message>
            {error && <ErrorText>{error}</ErrorText>}

            <NameRow>
              <Label>
                <input
                  required
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="input"
                  placeholder=" "
                />
                <span>Firstname</span>
              </Label>
              <Label>
                <input
                  required
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="input"
                  placeholder=" "
                />
                <span>Lastname</span>
              </Label>
            </NameRow>

            <Label>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input"
                placeholder=" "
              />
              <span>Email</span>
            </Label>

            <Label>
              <input
                required
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input"
                placeholder=" "
                pattern={`^(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$`}
                title="Password must contain at least 6 characters and one special character."
              />
              <span>Password</span>
            </Label>

            <Button type="submit" disabled={loading}>
              {loading ? "Loading..." : "Register"}
            </Button>

            <Signin>
              Already have an account?{" "}
              <span className="link" onClick={() => router.push("/login")}>Signin</span>
            </Signin>
          </Form>
        </Container>
      </Wrapper>
    </>
  );
};  