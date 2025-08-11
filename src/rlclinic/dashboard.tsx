"use client";

import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useRouter } from "next/navigation";
import { auth } from "../firebaseConfig"; 
import { signOut } from "firebase/auth";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Rozha+One&display=swap');
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #E6F4F1;
    margin: 0;
    padding: 0;
  }
`;

const Dashboard: React.FC = () => {
  const router = useRouter(); 
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login"); 
    } catch (error) {
      alert("Logout failed: " + (error as Error).message);
    }
  };

  return (
    <>
      <GlobalStyle />
      <DashboardWrapper>
        <Sidebar>
          <ClinicName>RL CLINIC</ClinicName>
          <NavItem>👤 Profile</NavItem>
          <NavItem onClick={() => router.push("/schedule")}>
            📅 Appointments
          </NavItem>
          <NavItem onClick={() => router.push("/medicalrecord")}>
            🩺 Medical Records
          </NavItem>
          <NavItem>💉 Vaccination</NavItem>
        </Sidebar>
        <MainContent>
          <HeaderBar>
            <DashboardTitle>Welcome</DashboardTitle>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <ProfileIcon>👤</ProfileIcon>
              <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            </div>
          </HeaderBar>
          <CardsContainer>
            <Card onClick={() => router.push("/schedule")}>
              <CardIcon>📅</CardIcon>
              <CardTitle>Appointments Today</CardTitle>
            </Card>
            <Card onClick={() => router.push("/medicalrecord")}>
              <CardIcon>🩺</CardIcon>
              <CardTitle>Your Medical Records</CardTitle>
            </Card>
            <Card>
              <CardIcon>💉</CardIcon>
              <CardTitle>Your Vaccination Records</CardTitle>
            </Card>
          </CardsContainer>
        </MainContent>
      </DashboardWrapper>
    </>
  );
};

const LogoutButton = styled.button`
  background-color: #34b89c;
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: bold;
  padding: 8px 16px;
  cursor: pointer;
  font-family: 'Rozha One', serif;
  font-size: 14px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2a8f78;
  }
`;

const DashboardWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #e6f4f1;
`;

const Sidebar = styled.div`
  background: linear-gradient(180deg, #6bc1e1 0%, #34b89c 100%);
  width: 250px;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
`;

const ClinicName = styled.h1`
  font-family: "Rozha One", serif;
  font-size: 24px;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const NavItem = styled.button<{ active?: boolean }>`
  background: ${({ active }) => (active ? "#ffffffcc" : "#ffffff")};
  color: ${({ active }) => (active ? "#333" : "#3da9c8")};
  border: none;
  padding: 14px 20px;
  width: 100%;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  text-align: left;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  &:hover {
    background-color: #eaf7fc;
    transform: translateY(-2px);
  }
`;

const MainContent = styled.div`
  overflow-y: auto;
  max-height: 100vh;
  flex: 1;
  padding: 40px;
  background: linear-gradient(180deg, #e6f4f1 0%, #ffffff 100%);
`;

const HeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const DashboardTitle = styled.h2`
  font-size: 34px;
  color: #34b89c;
  font-weight: bold;
  font-family: "Rozha One", serif;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  background: linear-gradient(to right, #6bc1e1, #34b89c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ProfileIcon = styled.div`
  background-color: #ffffff;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
  cursor: pointer;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 25px;
`;

const Card = styled.div`
  background: linear-gradient(145deg, #6bc1e1, #34b89c);
  color: white;
  padding: 26px;
  border-radius: 14px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: transform 0.2s ease;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
  }
`;

const CardIcon = styled.div`
  font-size: 30px;
  margin-bottom: 10px;
`;

const CardTitle = styled.p`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 6px;
  color: white;
`;

export default Dashboard;