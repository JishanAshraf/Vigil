
export type Vendor = {
  id: string;
  name: string;
  address: string;
  phone: string;
  city: string;
};

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  phone: string;
};

export const mockVendors: Vendor[] = [
  { id: 'vendor-1', name: 'Apollo Pharmacy', address: '123 Arera Colony', phone: '+919876543211', city: 'Bhopal' },
  { id: 'vendor-2', name: 'Wellness Forever', address: '456 MP Nagar', phone: '+919876543212', city: 'Bhopal' },
  { id: 'vendor-3', name: 'Indore Medicos', address: '789 Vijay Nagar', phone: '+919876543213', city: 'Indore' },
  { id: 'vendor-4', name: 'HealthFirst Medicals', address: '101 MG Road', phone: '+919876543214', city: 'Indore' },
  { id: 'vendor-5', name: 'Gwalior Pharma', address: '212 Lashkar', phone: '+919876543215', city: 'Gwalior' },
  { id: 'vendor-6', name: 'Jabalpur Health Store', address: '333 Civic Center', phone: '+919876543216', city: 'Jabalpur' },
];

export const mockDoctors: Doctor[] = [
  { id: 'doc-1', name: 'Dr. Priya Sharma', specialty: 'General Physician', phone: '+919876543221' },
  { id: 'doc-2', name: 'Dr. Rohan Gupta', specialty: 'Cardiologist', phone: '+919876543222' },
  { id: 'doc-3', name: 'Dr. Ananya Reddy', specialty: 'Dermatologist', phone: '+919876543223' },
  { id: 'doc-4', name: 'Dr. Vikram Singh', specialty: 'Pediatrician', phone: '+919876543224' },
];
