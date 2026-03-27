
export type Vendor = {
  id: string;
  name: string;
  address: string;
  phone: string;
};

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  avatarUrl: string;
  phone: string;
};

export const mockVendors: Vendor[] = [
  { id: 'vendor-1', name: 'City Pharmacy', address: '123 Main St, Downtown', phone: '+919876543211' },
  { id: 'vendor-2', name: 'Wellness Drugstore', address: '456 Oak Ave, Suburbia', phone: '+919876543212' },
  { id: 'vendor-3', name: 'HealthFirst Meds', address: '789 Pine Ln, Uptown', phone: '+919876543213' },
];

export const mockDoctors: Doctor[] = [
  { id: 'doc-1', name: 'Dr. Priya Sharma', specialty: 'General Physician', avatarUrl: 'https://i.pravatar.cc/150?u=doc1', phone: '+919876543221' },
  { id: 'doc-2', name: 'Dr. Rohan Gupta', specialty: 'Cardiologist', avatarUrl: 'https://i.pravatar.cc/150?u=doc2', phone: '+919876543222' },
  { id: 'doc-3', name: 'Dr. Ananya Reddy', specialty: 'Dermatologist', avatarUrl: 'https://i.pravatar.cc/150?u=doc3', phone: '+919876543223' },
  { id: 'doc-4', name: 'Dr. Vikram Singh', specialty: 'Pediatrician', avatarUrl: 'https://i.pravatar.cc/150?u=doc4', phone: '+919876543224' },
];
