"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

const MedicalRecordEdit: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    petName: "",
    ownerName: "",
    diagnosis: "",
    treatment: "",
    date: "",
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated Medical Record:", formData);
    router.push("/Medicalrecord"); // balik sa medical record page
  };

  return (
    <Container>
      <Title>Edit Medical Record</Title>
      <Form onSubmit={handleSubmit}>
        <Label>Pet Name</Label>
        <Input
          type="text"
          name="petName"
          value={formData.petName}
          onChange={handleChange}
          required
        />

        <Label>Owner Name</Label>
        <Input
          type="text"
          name="ownerName"
          value={formData.ownerName}
          onChange={handleChange}
          required
        />

        <Label>Diagnosis</Label>
        <Input
          type="text"
          name="diagnosis"
          value={formData.diagnosis}
          onChange={handleChange}
        />

        <Label>Treatment</Label>
        <Input
          type="text"
          name="treatment"
          value={formData.treatment}
          onChange={handleChange}
        />

        <Label>Date</Label>
        <Input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />

        <Label>Additional Notes</Label>
        <TextArea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
        />

        <Button type="submit">Save Changes</Button>
      </Form>
    </Container>
  );
};

export default MedicalRecordEdit;

const Container = styled.div`
  max-width: 500px;
  margin: 40px auto;
  padding: 20px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
`;

const Title = styled.h2`
  font-size: 28px;
  color: #34b89c;
  font-family: "Rozha One", serif;
  margin-bottom: 20px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-top: 10px;
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  padding: 10px;
  margin-top: 5px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  margin-top: 5px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
  resize: vertical;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 12px;
  background-color: #34b89c;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #2ea187;
  }
`;
