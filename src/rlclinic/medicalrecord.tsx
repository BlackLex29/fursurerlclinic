"use client";
import React from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";



const MedicalRecord: React.FC = () => {
  const router = useRouter();

  return (
    <PageContainer>
      <Card>
        <Title>Pet Medical Record</Title>

        {/* Pet Info */}
        <SectionTitle>Pet Information</SectionTitle>
        <InfoRow>
          <Label>Name:</Label>
          <Value>Buddy</Value>
        </InfoRow>
        <InfoRow>
          <Label>Breed:</Label>
          <Value>Golden Retriever</Value>
        </InfoRow>
        <InfoRow>
          <Label>Age:</Label>
          <Value>3 Years</Value>
        </InfoRow>

        {/* Owner Info */}
        <SectionTitle>Owner Information</SectionTitle>
        <InfoRow>
          <Label>Name:</Label>
          <Value>John Doe</Value>
        </InfoRow>
        <InfoRow>
          <Label>Contact:</Label>
          <Value>09123456789</Value>
        </InfoRow>

        {/* Medical History */}
        <SectionTitle>Medical History</SectionTitle>
        <InfoRow>
          <Label>Last Check-up:</Label>
          <Value>July 20, 2025</Value>
        </InfoRow>
        <InfoRow>
          <Label>Diagnosis:</Label>
          <Value>Healthy</Value>
        </InfoRow>
        <InfoRow>
          <Label>Next Appointment:</Label>
          <Value>August 15, 2025</Value>
        </InfoRow>

        {/* Navigation */}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button onClick={() => router.push("/editmed  ")}>
            Edit Medical Record
          </Button>
        </div>
      </Card>
    </PageContainer>
  );
};

export default MedicalRecord;
const PageContainer = styled.div`
  padding: 40px;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const Card = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  color: #34b89c;
  margin-bottom: 16px;
  text-align: center;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 12px;
  color: #2c3e50;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
`;

const Label = styled.span`
  font-weight: 600;
  color: #555;
`;

const Value = styled.span`
  color: #333;
`;

const Button = styled.button`
  background: #34b89c;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;

  &:hover {
    background: #2ea187;
  }
`;
