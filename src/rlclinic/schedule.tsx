"use client";
import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useRouter } from "next/navigation";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Rozha+One&display=swap');
`;

const Appointment: React.FC = () => {
  const router = useRouter();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  const timeSlots = [
    "8:00 AM–8:30 AM", "9:00 AM–9:30 AM", "10:00 AM–10:30 AM",
    "11:00 AM–11:30 AM", "1:00 PM–1:30 PM",
    "2:00 PM–2:30 PM", "3:00 PM–3:30 PM", "4:00 PM–4:30 PM", "5:00 PM–5:30 PM"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) {
      alert("Please select a time slot.");
      return;
    }
    alert(`Appointment booked on ${selectedDate} at ${selectedSlot}`);
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <FormBox onSubmit={handleSubmit}>
          <HeaderCover>
            <ProfileIcon>
              <span>👤</span>
            </ProfileIcon>
            
            <Title>Appointment</Title>
          </HeaderCover>

          <InnerContent>
            <TypeBox>Consultation Appointment</TypeBox>

            <SectionTitle>Select Slot</SectionTitle>
            <SlotGrid>
              {timeSlots.map((slot) => (
                <SlotButton
                  key={slot}
                  type="button"
                  className={selectedSlot === slot ? "selected" : ""}
                  onClick={() => setSelectedSlot(slot)}
                >
                  {slot}
                </SlotButton>
              ))}
            </SlotGrid>

            <SectionTitle>Select Date</SectionTitle>
            <DateInput
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              required
            />

            <ButtonGroup>
              <Cancel type="button" onClick={() => router.push("/dashboard")}>
                Cancel
              </Cancel>
              <Next type="submit">Next</Next>
            </ButtonGroup>
          </InnerContent>
        </FormBox>
      </Wrapper>
    </>
  );
};

export default Appointment;

// Styled Components
const Wrapper = styled.div`
  min-height: 100vh;
  background-color: #e6f4f1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 10px;
`;

const FormBox = styled.form`
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const HeaderCover = styled.div`
  background-color: #6bc1e1;
  padding: 30px 20px 20px;
  position: relative;
  text-align: center;
`;

const ProfileIcon = styled.div`
  position: absolute;
  top: 15px;
  right: 20px;
  background: white;
  color: #6bc1e1;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
  cursor: pointer;

  &:hover {
    background-color: #f0fbff;
  }
`;


const Title = styled.h2`
  font-family: 'Rozha One', serif;
  font-size: 36px;
  font-weight: normal;
  color: white;
  margin-top: 10px;
`;

const InnerContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px;
`;

const TypeBox = styled.div`
  background-color: #f4f4f4;
  padding: 10px 20px;
  text-align: center;
  font-weight: bold;
  border: 1px solid #ccc;
  border-radius: 10px;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
`;

const SlotGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 10px;
`;

const SlotButton = styled.button`
  padding: 10px;
  border-radius: 10px;
  border: 1px solid black;
  background: white;
  cursor: pointer;
  font-size: 14px;
  transition: 0.2s;

  &.selected {
    background-color: #cceeff;
    border-color: #0077cc;
    font-weight: bold;
  }

  &:hover {
    background-color: #e8f4ff;
  }
`;

const DateInput = styled.input`
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 14px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const Cancel = styled.button`
  flex: 1;
  padding: 12px;
  background: white;
  color: red;
  border: 1px solid red;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: #ffeaea;
  }
`;

const Next = styled.button`
  flex: 1;
  padding: 12px;
  background: royalblue;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #3256c1;
  }
`;
  