export type LeadStatus = "new" | "contacted" | "booked" | "cancelled";

export interface AppointmentLead {
  id: string;
  name: string;
  phone: string;
  service: string;
  status: LeadStatus;
  createdAt: string;
}

export interface CreateLeadInput {
  name: string;
  phone: string;
  service: string;
}
