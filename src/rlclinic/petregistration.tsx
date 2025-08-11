"use client";
import React from "react";
import styled from "styled-components";

const Petregister = () => {
    return (
        <Wrapper>
            <FormContainer>
                
                <Heading>Pet Registration</Heading>

                <form className="form">
                    <p className="message"></p>

                    <label>
                        <input
                            required
                            type="text"
                            name="name"
                            className="input"
                            placeholder=" "
                        />
                        <span>Pet Name</span>
                    </label>

                    <label>
                        <input
                            required
                            type="text"
                            name="birthday"
                            className="input"
                            placeholder=" "
                        />
                        <span>Date of Birth</span>
                    </label>

                    <label>
                        <input
                            required
                            type="text"
                            name="color"
                            className="input"
                            placeholder=" "
                        />
                        <span>Color</span>
                    </label>

                    <label>
                        <input
                            required
                            type="text"
                            name="petType"
                            className="input"
                            placeholder=" "
                        />
                        <span>Pet Type</span>
                    </label>

                    <label>
                        <input
                            required
                            type="text"
                            name="petBreed"
                            className="input"
                            placeholder=" "
                        />
                        <span>Pet Breed</span>
                    </label>

                    <div className="gender-wrapper">
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                required
                            />
                            <span>Male</span>
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                required
                            />
                            <span>Female</span>
                        </label>
                    </div>

                    <button className="Next" type="submit">Register</button>
                </form>
            </FormContainer>
        </Wrapper>
    );
};

export default Petregister;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e6f4f1;
`;

const FormContainer = styled.div`
  background: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  max-height: 90vh;
  overflow-y: auto;
  max-width: 400px;
  width: 100%;
  position: relative;

  .form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .form label {
    position: relative;
  }

  .input {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 10px;
    outline: none;
    background: none;
  }

  .input + span {
    position: absolute;
    top: 12px;
    left: 12px;
    color: #888;
    font-size: 0.9em;
    transition: all 0.3s ease;
    pointer-events: none;
  }

  .input:focus + span,
  .input:not(:placeholder-shown) + span {
    top: 30px;
    font-size: 0.7em;
    color: #0077ff;
    font-weight: bold;
  }

  .gender-wrapper {
    display: flex;
    justify-content: flex-end;
    gap: 20px;
    font-size: 14px;
  }

  .gender-wrapper label {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .gender-wrapper input[type="radio"] {
    transform: scale(1.2);
    accent-color: royalblue;
  }

  .Next {
    padding: 12px;
    background-color: royalblue;
    border: none;
    border-radius: 10px;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  .Next:hover {
    background-color: #3256c1;
  }
`;

const Heading = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: royalblue;
  margin-bottom: 10px;
  text-align: center;
`;

