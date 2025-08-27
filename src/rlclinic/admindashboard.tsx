'use client';

import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { useRouter } from "next/navigation";
import { auth, db } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { collection, getDocs, addDoc } from "firebase/firestore";

// Global Styles
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Rozha+One&display=swap');
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #E6F4F1;
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
  bookedByAdmin?: boolean;
}

interface ClientType {
  id: string;
  email: string;
  name?: string;
}

// Styled component interfaces
interface ToggleButtonProps {
  $active?: boolean;
}

interface AppointmentCardProps {
  $delay: number;
  $borderLeftColor: string;
}

const Admindashboard: React.FC = () => {
  const router = useRouter();
  const [appointments, setAppointments] = useState<AppointmentType[]>([]);
  const [todaysAppointments, setTodaysAppointments] = useState<AppointmentType[]>([]);
  const [clients, setClients] = useState<ClientType[]>([]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState("");
  const [petName, setPetName] = useState("");
  const [petBirthday, setPetBirthday] = useState("");
  const [petColor, setPetColor] = useState("");
  const [petType, setPetType] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [petGender, setPetGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"today" | "all">("today");
  const [isMounted, setIsMounted] = useState(false);

  const timeSlots = [
    "8:00 AM–8:30 AM", "8:30 AM–9:00 AM", "9:00 AM–9:30 AM", "9:30 AM–10:00 AM",
    "10:00 AM–10:30 AM", "10:30 AM–11:00 AM", "11:00 AM–11:30 AM", "11:30 AM–12:00 PM",
    "1:00 PM–1:30 PM", "1:30 PM–2:00 PM", "2:00 PM–2:30 PM", "2:30 PM–3:00 PM",
    "3:00 PM–3:30 PM", "3:30 PM–4:00 PM", "4:00 PM–4:30 PM", "4:30 PM–5:00 PM", 
    "5:00 PM–5:30 PM", "5:30 PM–6:00 PM"
  ];

  useEffect(() => { setIsMounted(true); }, []);

  const handleLogout = async () => {
    try { await signOut(auth); router.push("/login"); }
    catch (error) { alert("Logout failed: " + (error as Error).message); }
  };

  const fetchAppointments = async () => {
    try {
      const snapshot = await getDocs(collection(db, "appointments"));
      const data: AppointmentType[] = [];
      snapshot.forEach(doc => {
        const docData = doc.data();
        data.push({
          id: doc.id,
          clientName: docData.clientName || "",
          petName: docData.petName || "",
          birthday: docData.birthday || "",
          color: docData.color || "",
          petType: docData.petType || "",
          petBreed: docData.petBreed || "",
          gender: docData.gender || "",
          date: docData.date || "",
          timeSlot: docData.timeSlot || "",
          status: docData.status || "Pending",
          bookedByAdmin: docData.bookedByAdmin || false
        });
      });
      setAppointments(data.sort((a,b)=>a.date.localeCompare(b.date)));
      const today = new Date().toISOString().split('T')[0];
      setTodaysAppointments(data.filter(appt => appt.date === today));
    } catch (error) { console.error("Error fetching appointments:", error); }
  };

  const fetchClients = async () => {
    try {
      const snapshot = await getDocs(collection(db, "users"));
      const data: ClientType[] = [];
      snapshot.forEach(doc => {
        const docData = doc.data();
        data.push({ id: doc.id, email: docData.email || "", name: docData.name || "" });
      });
      setClients(data);
    } catch (error) { console.error("Error fetching clients:", error); }
  };

  useEffect(() => { fetchAppointments(); fetchClients(); }, []);

  const handleBookAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient || !petName.trim() || !appointmentDate || !appointmentTime) {
      alert("Please fill all required fields."); return;
    }
    setIsLoading(true);
    try {
      const isTaken = appointments.some(
        appt => appt.date === appointmentDate && appt.timeSlot === appointmentTime && appt.status !== "Cancelled"
      );
      if (isTaken) { alert("This time slot is already taken."); return; }
      await addDoc(collection(db, "appointments"), {
        clientName: selectedClient,
        petName: petName.trim(),
        birthday: petBirthday,
        color: petColor,
        petType, petBreed, gender: petGender,
        date: appointmentDate,
        timeSlot: appointmentTime,
        status: "Confirmed",
        bookedByAdmin: true,
        createdAt: new Date().toISOString(),
      });
      alert("Appointment booked successfully!");
      setShowBookingModal(false); resetForm(); fetchAppointments();
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment. Please try again.");
    } finally { setIsLoading(false); }
  };

  const resetForm = () => {
    setSelectedClient(""); setPetName(""); setPetBirthday(""); setPetColor("");
    setPetType(""); setPetBreed(""); setPetGender(""); setAppointmentDate(""); setAppointmentTime("");
  };

  const statusColor = (status?: string) => {
    switch(status){
      case "Confirmed": return "#28a745";
      case "Cancelled": return "#dc3545";
      case "Pet Registered": return "#007bff";
      case "Booked by Admin": return "#17a2b8";
      default: return "#ffc107";
    }
  };

  const displayedAppointments = viewMode === "today" ? todaysAppointments : appointments;
  if(!isMounted) return null;

  return (
    <>
      <GlobalStyle />
      <PageContainer>
        <HeaderBar>
          <BrandSection>
            <ClinicName>RL Clinic</ClinicName>
            <Tagline>Fursure Care - Admin Dashboard</Tagline>
          </BrandSection>
          <UserSection>
            <AdminBadge>Administrator</AdminBadge>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </UserSection>
        </HeaderBar>

        <Content>
          <CardsGrid>
            <Card onClick={()=>router.push("/manageappointment")}><CardIcon>📅</CardIcon><CardTitle>Manage Appointments</CardTitle><CardDesc>View, confirm, or cancel client appointments</CardDesc></Card>
            <Card onClick={()=>setShowBookingModal(true)}><CardIcon>➕</CardIcon><CardTitle>Book Appointment</CardTitle><CardDesc>Schedule an appointment for a client</CardDesc></Card>
            <Card onClick={()=>router.push("/medicalrecord")}><CardIcon>📖</CardIcon><CardTitle>Medical Records</CardTitle><CardDesc>Access and update pet medical history</CardDesc></Card>
            <Card onClick={()=>router.push("/vaccination")}><CardIcon>💉</CardIcon><CardTitle>Vaccination</CardTitle><CardDesc>Track and manage pet vaccination schedules</CardDesc></Card>
            <Card onClick={()=>router.push("/suggestion")}><CardIcon>💡</CardIcon><CardTitle>Suggestions</CardTitle><CardDesc>View client feedback & suggestions</CardDesc></Card>
          </CardsGrid>

          <AppointmentsSection>
            <SectionHeader>
              <SectionTitle>{viewMode==="today"?"Today's Appointments":"All Appointments"}</SectionTitle>
              <ViewToggle>
                <ToggleButtonStyled $active={viewMode==="today"} onClick={()=>setViewMode("today")}>Today</ToggleButtonStyled>
                <ToggleButtonStyled $active={viewMode==="all"} onClick={()=>setViewMode("all")}>All</ToggleButtonStyled>
              </ViewToggle>
              <RefreshButton onClick={fetchAppointments}>Refresh</RefreshButton>
            </SectionHeader>

            {displayedAppointments.length===0 ? (
              <NoAppointments>{viewMode==="today"?"No appointments for today.":"No appointments yet."}</NoAppointments>
            ) : (
              displayedAppointments.map((appt,index)=>{
                const borderColor=statusColor(appt.status);
                return (
                  <AppointmentCard key={appt.id} $delay={index*0.1} $borderLeftColor={borderColor}>
                    <InfoRow><strong>Owner:</strong> {appt.clientName}</InfoRow>
                    <InfoRow><strong>Pet:</strong> {appt.petName||"-"}</InfoRow>
                    <InfoRow><strong>Date:</strong> {appt.date} | <strong>Time:</strong> {appt.timeSlot}</InfoRow>
                    <InfoRow><strong>Type:</strong> {appt.petType||"-"} | <strong>Breed:</strong> {appt.petBreed||"-"}</InfoRow>
                    <StatusLabel style={{backgroundColor:borderColor}}>{appt.status||"Pending"}{appt.bookedByAdmin&&" (by Admin)"}</StatusLabel>
                  </AppointmentCard>
                );
              })
            )}
          </AppointmentsSection>

          {showBookingModal && (
            <ModalOverlay onClick={()=>setShowBookingModal(false)}>
              <ModalContent onClick={(e)=>e.stopPropagation()}>
                <ModalHeader>
                  <ModalTitle>Book Appointment for Client</ModalTitle>
                  <CloseButton onClick={()=>setShowBookingModal(false)}>×</CloseButton>
                </ModalHeader>
                <Form onSubmit={handleBookAppointment}>
                  <FormGroup>
                    <Label>Select Client *</Label>
                    <Select value={selectedClient} onChange={(e)=>setSelectedClient(e.target.value)} required disabled={isLoading}>
                      <option value="">Choose a client</option>
                      {clients.map(client=><option key={client.id} value={client.email}>{client.name||client.email}</option>)}
                    </Select>
                  </FormGroup>

                  <FormGroup>
                    <Label>Pet Name *</Label>
                    <Input type="text" value={petName} onChange={(e)=>setPetName(e.target.value)} placeholder="Enter pet name" required disabled={isLoading} />
                  </FormGroup>

                  <FormGroup>
                    <Label>Pet Type</Label>
                    <Select value={petType} onChange={(e)=>setPetType(e.target.value)} disabled={isLoading}>
                      <option value="">Select pet type</option>
                      <option value="Dog">Dog</option>
                      <option value="Cat">Cat</option>
                      <option value="Bird">Bird</option>
                      <option value="Other">Other</option>
                    </Select>
                  </FormGroup>

                  <FormGroup>
                    <Label>Breed</Label>
                    <Input type="text" value={petBreed} onChange={(e)=>setPetBreed(e.target.value)} placeholder="Enter breed" disabled={isLoading} />
                  </FormGroup>

                  <FormGroup>
                    <Label>Gender</Label>
                    <Select value={petGender} onChange={(e)=>setPetGender(e.target.value)} disabled={isLoading}>
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </Select>
                  </FormGroup>

                  <FormGroup>
                    <Label>Birthday</Label>
                    <Input type="date" value={petBirthday} onChange={(e)=>setPetBirthday(e.target.value)} disabled={isLoading} />
                  </FormGroup>

                  <FormGroup>
                    <Label>Color/Markings</Label>
                    <Input type="text" value={petColor} onChange={(e)=>setPetColor(e.target.value)} placeholder="Enter color/markings" disabled={isLoading} />
                  </FormGroup>

                  <FormGroup>
                    <Label>Appointment Date *</Label>
                    <Input type="date" value={appointmentDate} onChange={(e)=>setAppointmentDate(e.target.value)} min={new Date().toISOString().split('T')[0]} required disabled={isLoading} />
                  </FormGroup>

                  <FormGroup>
                    <Label>Time Slot *</Label>
                    <Select value={appointmentTime} onChange={(e)=>setAppointmentTime(e.target.value)} required disabled={isLoading}>
                      <option value="">Select a time slot</option>
                      {timeSlots.map(slot=><option key={slot} value={slot}>{slot}</option>)}
                    </Select>
                  </FormGroup>

                  <ButtonGroup>
                    <CancelButton type="button" onClick={()=>setShowBookingModal(false)} disabled={isLoading}>Cancel</CancelButton>
                    <SubmitButton type="submit" disabled={isLoading || !selectedClient || !petName.trim() || !appointmentDate || !appointmentTime}>{isLoading?"Booking...":"Book Appointment"}</SubmitButton>
                  </ButtonGroup>
                </Form>
              </ModalContent>
            </ModalOverlay>
          )}

        </Content>
      </PageContainer>
    </>
  );
};

/* Styled Components */

const PageContainer = styled.div`
  display: flex; 
  flex-direction: column; 
  min-height: 100vh;
`;

const HeaderBar = styled.header`
  display: flex; 
  justify-content: space-between; 
  padding: 16px; 
  background: #fff; 
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
`;

const BrandSection = styled.div``;

const ClinicName = styled.h1`
  margin: 0; 
  font-size: 24px;
`;

const Tagline = styled.p`
  margin: 0; 
  font-size: 14px; 
  color: #666;
`;

const UserSection = styled.div`
  display: flex; 
  align-items: center; 
  gap: 12px;
`;

const AdminBadge = styled.span`
  background: #17a2b8; 
  color: white; 
  padding: 4px 8px; 
  border-radius: 12px; 
  font-size: 12px;
`;

const LogoutButton = styled.button`
  padding: 6px 12px; 
  border: none; 
  border-radius: 8px; 
  cursor: pointer; 
  background: #dc3545; 
  color: white; 
  font-weight: bold;
`;

const Content = styled.div`
  padding: 16px; 
  flex: 1;
`;

const CardsGrid = styled.div`
  display: grid; 
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); 
  gap: 16px; 
  margin-bottom: 24px;
`;

const Card = styled.div`
  background: white; 
  padding: 16px; 
  border-radius: 12px; 
  cursor: pointer; 
  box-shadow: 0 2px 8px rgba(0,0,0,0.1); 
  transition: transform 0.2s; 
  
  &:hover {
    transform: translateY(-4px);
  }
`;

const CardIcon = styled.div`
  font-size: 28px; 
  margin-bottom: 8px;
`;

const CardTitle = styled.h3`
  margin: 0; 
  font-size: 16px;
`;

const CardDesc = styled.p`
  margin: 0; 
  font-size: 12px; 
  color: #555;
`;

const AppointmentsSection = styled.div``;

const SectionHeader = styled.div`
  display: flex; 
  align-items: center; 
  justify-content: space-between; 
  margin-bottom: 12px; 
  flex-wrap: wrap; 
  gap: 8px;
`;

const SectionTitle = styled.h3`
  margin: 0;
`;

const ViewToggle = styled.div`
  display: flex; 
  background: #f1f1f1; 
  border-radius: 8px; 
  overflow: hidden;
`;

const ToggleButtonStyled = styled.button<ToggleButtonProps>`
  border: none; 
  padding: 8px 16px; 
  cursor: pointer; 
  transition: all 0.2s; 
  border-radius: 12px;
  background: ${props => props.$active ? '#6bc1e1' : 'transparent'};
  color: ${props => props.$active ? 'white' : '#333'};
  font-weight: ${props => props.$active ? 'bold' : 'normal'};
  
  &:hover {
    background: ${props => props.$active ? '#5aa9cb' : '#e5e5e5'};
  }
`;

const RefreshButton = styled.button`
  padding: 6px 12px; 
  border: none; 
  border-radius: 8px; 
  cursor: pointer; 
  background: #6bc1e1; 
  color: white; 
  font-weight: bold;
`;

const AppointmentCard = styled.div<AppointmentCardProps>`
  animation: ${fadeInUp} 0.4s ease forwards;
  animation-delay: ${props => props.$delay}s;
  opacity: 0;
  margin-bottom: 12px; 
  padding: 12px; 
  border-left: 6px solid ${props => props.$borderLeftColor}; 
  background: white; 
  border-radius: 8px;
`;

const InfoRow = styled.p`
  margin: 4px 0;
`;

const StatusLabel = styled.span`
  padding: 2px 6px; 
  border-radius: 6px; 
  color: white; 
  font-size: 12px;
`;

const NoAppointments = styled.p`
  color: #666;
`;

const ModalOverlay = styled.div`
  position: fixed; 
  top: 0; 
  left: 0; 
  right: 0; 
  bottom: 0; 
  background: rgba(0,0,0,0.5); 
  display: flex; 
  justify-content: center; 
  align-items: center;
`;

const ModalContent = styled.div`
  background: white; 
  padding: 16px; 
  border-radius: 12px; 
  width: 100%; 
  max-width: 500px;
`;

const ModalHeader = styled.div`
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  margin-bottom: 12px;
`;

const ModalTitle = styled.h3`
  margin: 0;
`;

const CloseButton = styled.button`
  border: none; 
  background: none; 
  font-size: 20px; 
  cursor: pointer;
`;

const Form = styled.form`
  display: flex; 
  flex-direction: column; 
  gap: 12px;
`;

const FormGroup = styled.div`
  display: flex; 
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 4px; 
  font-size: 14px;
`;

const Input = styled.input`
  padding: 6px 8px; 
  border: 1px solid #ccc; 
  border-radius: 8px;
`;

const Select = styled.select`
  padding: 6px 8px; 
  border: 1px solid #ccc; 
  border-radius: 8px;
`;

const ButtonGroup = styled.div`
  display: flex; 
  justify-content: flex-end; 
  gap: 8px;
`;

const CancelButton = styled.button`
  padding: 6px 12px; 
  border: none; 
  border-radius: 8px; 
  cursor: pointer; 
  background: #ccc; 
  color: #333;
`;

const SubmitButton = styled.button`
  padding: 6px 12px; 
  border: none; 
  border-radius: 8px; 
  cursor: pointer; 
  background: #28a745; 
  color: white; 
  font-weight: bold;
`;

export default Admindashboard;