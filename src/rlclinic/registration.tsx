"use client";
import React from "react";
import styled from "styled-components";

const Registration = () => {
    return (
        <Wrapper>
            <FormContainer>
                
                <Heading>Registration</Heading>

                <form className="form">
                    <p className="message"></p>

                    <div className="input-row">
                        <label>
                            <input
                                required
                                type="text"
                                name="name"
                                className="input"
                                placeholder=" "
                            />
                            <span>Name</span>
                        </label>

                        <label>
                            <input
                                required
                                type="text"
                                name="LastName"
                                className="input"
                                placeholder=" "
                            />
                            <span>LastName</span>
                        </label>
                    </div>

                    <div className="input-row">
                        <label>
                            <input
                                required
                                type="text"
                                name="Phone Number"
                                className="input"
                                placeholder=" "
                            />
                            <span>Phone Number</span>
                        </label>

                        <label>
                            <input
                                required
                                type="text"
                                name="Age"
                                className="input"
                                placeholder=" "
                            />
                            <span>Age</span>
                        </label>
                    </div>

                    {/* Gender Section - Now below Age */}
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

                    <button className="Next" type="submit">Next</button>

                    
                </form>
            </FormContainer>
        </Wrapper>
    );
};

export default Registration;

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
  max-width: 500px;
  width: 100%;
  position: relative;

  .form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .input-row {
    display: flex;
    gap: 15px;
    justify-content: space-between;
  }

  .input-row label {
    flex: 1;
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
    justify-content: flex-end; /* align to right side */
    gap: 20px;
    font-size: 14px;
    margin-top: -10px;
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

