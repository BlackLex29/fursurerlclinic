"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

const ForgotPassword: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email.");
      return;
    }

    
    setMessage(`Password reset link sent to ${email}`);
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  };

  return (
    <Wrapper>
      <Card>
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit">Send Reset Link</Button>
        </form>
        {message && <Message>{message}</Message>}
        <Back onClick={() => router.push("/login")}>Back to Login</Back>
      </Card>
    </Wrapper>
  );
};

export default ForgotPassword;

// Styled Components
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f4f7fb;
`;

const Card = styled.div`
  background: white;
  padding: 30px;
  border-radius: 15px;
  width: 350px;
  text-align: center;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);

  h2 {
    margin-bottom: 20px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: royalblue;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background: dodgerblue;
  }
`;

const Back = styled.p`
  margin-top: 15px;
  color: royalblue;
  cursor: pointer;
  font-size: 14px;
`;

const Message = styled.p`
  margin-top: 10px;
  color: green;
  font-size: 14px;
`;
