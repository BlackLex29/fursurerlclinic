"use client";

import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { useRouter } from "next/navigation";
import { auth, db } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Rozha+One&display=swap');
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #F7F9FC;
    margin: 0;
    padding: 0;
  }
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(25px); }
  to { opacity: 1; transform: translateY(0); }
`;

interface AppointmentType {
  id: string;
  clientName: string;
  petName?: string;
  birthday?: string;
  color?: string;
  petType?: string;
  petBreed?: string;
  gender?: string;
  date: string;
  timeSlot: string;
  status?: string;
}

const AdminDashboard: React.FC = () => {
  const router = useRouter();
  const [appointments, setAppointments] = useState<AppointmentType[]>([]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      alert("Logout failed: " + (error as Error).message);
    }
  };

  const fetchAppointments = async () => {
    try {
      const snapshot = await getDocs(collection(db, "appointments"));
      const data: AppointmentType[] = [];
      snapshot.forEach((doc) => {
        const docData = doc.data() as Omit<AppointmentType, "id">;
data.push({ id: doc.id, ...docData });
      });
      setAppointments(data.sort((a, b) => a.date.localeCompare(b.date))); // sort by date
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const statusColor = (status?: string) => {
    switch (status) {
      case "Confirmed":
        return "#28a745"; // green
      case "Cancelled":
        return "#dc3545"; // red
      case "Pet Registered":
        return "#007bff"; // blue
      default:
        return "#ffc107"; // yellow
    }
  };

  return (
    <>
      <GlobalStyle />
      <MainWrapper>
        <HeaderBar>
          <DashboardTitle>RL CLINIC - Admin Dashboard</DashboardTitle>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <ProfileIcon>🛡️</ProfileIcon>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </div>
        </HeaderBar>

        <CardsContainer>
          <Card onClick={() => router.push("/manage-users")} delay={0}>
            <CardIcon>👥</CardIcon>
            <CardTitle>User Management</CardTitle>
            <CardDesc>Manage all registered users and their roles.</CardDesc>
          </Card>

          <Card onClick={() => router.push("/manageappointment")} delay={0.1}>
            <CardIcon>📅</CardIcon>
            <CardTitle>Appointments</CardTitle>
            <CardDesc>View, confirm, or cancel client appointments.</CardDesc>
          </Card>

          <Card onClick={() => router.push("/reports")} delay={0.2}>
            <CardIcon>📊</CardIcon>
            <CardTitle>Reports</CardTitle>
            <CardDesc>Generate daily, weekly, and monthly reports.</CardDesc>
          </Card>

          <Card onClick={() => router.push("/settings")} delay={0.3}>
            <CardIcon>⚙️</CardIcon>
            <CardTitle>System Settings</CardTitle>
            <CardDesc>Configure clinic system preferences.</CardDesc>
          </Card>
        </CardsContainer>

        <AppointmentsSection>
          <SectionTitle>Recent Appointments</SectionTitle>
          {appointments.length === 0 ? (
            <NoAppointments>No appointments yet.</NoAppointments>
          ) : (
            appointments.map((appt, index) => {
              const borderColor = statusColor(appt.status);
              return (
                <AppointmentCard
                  key={appt.id}
                  delay={index * 0.1}
                  borderLeftColor={borderColor}
                >
                  <InfoRow>
                    <strong>Owner:</strong> {appt.clientName}
                  </InfoRow>
                  <InfoRow>
                    <strong>Pet:</strong> {appt.petName || "-"}
                  </InfoRow>
                  <InfoRow>
                    <strong>Type/Breed:</strong> {appt.petType || "-"} / {appt.petBreed || "-"}
                  </InfoRow>
                  <InfoRow>
                    <strong>Color:</strong> {appt.color || "-"}
                  </InfoRow>
                  <InfoRow>
                    <strong>Gender:</strong> {appt.gender || "-"}
                  </InfoRow>
                  <InfoRow>
                    <strong>Date:</strong> {appt.date} | <strong>Time:</strong> {appt.timeSlot}
                  </InfoRow>
                  <StatusLabel style={{ backgroundColor: borderColor }}>
                    {appt.status || "Pending"}
                  </StatusLabel>
                </AppointmentCard>
              );
            })
          )}
        </AppointmentsSection>
      </MainWrapper>
    </>
  );
};

// Styled Components
const MainWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 40px;
  background: linear-gradient(180deg, #f7f9fc 0%, #ffffff 100%);
`;

const HeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

const DashboardTitle = styled.h2`
  font-size: 28px;
  color: #ff5e62;
  font-weight: bold;
  font-family: "Rozha One", serif;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
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

const LogoutButton = styled.button`
  background-color: #d9534f;
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: bold;
  padding: 8px 16px;
  cursor: pointer;
  font-family: 'Rozha One', serif;
  font-size: 14px;
  &:hover {
    background-color: #c9302c;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-bottom: 40px;
`;

const Card = styled.div<{ delay: number }>`
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  opacity: 0;
  animation: ${fadeInUp} 0.6s forwards;
  animation-delay: ${(props) => props.delay}s;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-4px);
  }
`;

const CardIcon = styled.div`
  font-size: 36px;
  margin-bottom: 12px;
`;

const CardTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
`;

const CardDesc = styled.p`
  font-size: 14px;
  color: #555;
  margin: 0;
`;

const AppointmentsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const SectionTitle = styled.h3`
  font-size: 22px;
  font-weight: bold;
  color: #ff5e62;
  margin-bottom: 15px;
`;

const AppointmentCard = styled.div<{ delay: number; borderLeftColor: string }>`
  background: #fff;
  color: #333;
  padding: 18px 22px;
  border-radius: 14px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  opacity: 0;
  animation: ${fadeInUp} 0.6s ease forwards;
  animation-delay: ${(props) => props.delay}s;
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-left: 6px solid ${(props) => props.borderLeftColor};
  cursor: default;

  &:hover {
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }
`;

const InfoRow = styled.p`
  margin: 0;
  font-size: 14px;
`;

const StatusLabel = styled.span`
  align-self: flex-start;
  padding: 4px 10px;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  font-size: 12px;
  margin-top: 6px;
`;

const NoAppointments = styled.p`
  font-size: 16px;
  color: #555;
  text-align: center;
`;

export default AdminDashboard;