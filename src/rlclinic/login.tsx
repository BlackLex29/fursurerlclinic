"use client";

import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useRouter } from "next/navigation";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Rozha+One&display=swap');
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Rozha One', serif;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f9f9f9;
`;

const Logo = styled.h1`
  font-family: 'Rozha One', serif;
  font-size: 40px;
  color: #34B89C;
  margin-bottom: 20px;
`;

const Form = styled.form`
  background: #fff;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  width: 320px;
  max-width: 90%;
`;

const Label = styled.label`
  position: relative;
  display: block;
  margin-bottom: 20px;

  .input {
    width: 100%;
    padding: 14px 14px 14px 14px;
    border: 2px solid #34B89C;
    border-radius: 10px;
    outline: none;
    font-size: 15px;
    background: transparent;
    transition: border-color 0.2s ease;
  }

  .input:focus {
    border-color: #2a8f78;
  }

  span {
    position: absolute;
    left: 14px;
    top: 14px;
    font-size: 14px;
    color: #888;
    background: #fff;
    padding: 0 4px;
    transition: 0.2s;
  }

  .input:focus + span,
  .input:not(:placeholder-shown) + span {
    top: -8px;
    left: 10px;
    font-size: 12px;
    color: #34B89C;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 14px;
  background-color: #34B89C;
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s ease;
  margin-top: 10px;

  &:hover {
    background-color: #2a8f78;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/dashboard");  
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard"); // redirect sa dashboard pag successful login
    } catch (error) {
      alert((error as Error).message);
    }
    setLoading(false);
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Logo>FurSureCare</Logo>
        <Form onSubmit={handleLogin}>
          <Label>
            <input
              type="email"
              className="input"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span>Email</span>
          </Label>
          <Label>
            <input
              type="password"
              className="input"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span>Password</span>
          </Label>
          <Button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default LoginPage;
  