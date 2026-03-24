
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
};

export const mockVendors: Vendor[] = [
  { id: 'vendor-1', name: 'City Pharmacy', address: '123 Main St, Downtown', phone: '(555) 111-2222' },
  { id: 'vendor-2', name: 'Wellness Drugstore', address: '456 Oak Ave, Suburbia', phone: '(555) 333-4444' },
  { id: 'vendor-3', name: 'HealthFirst Meds', address: '789 Pine Ln, Uptown', phone: '(555) 555-6666' },
];

export const mockDoctors: Doctor[] = [
  { id: 'doc-1', name: 'Dr. Emily Carter', specialty: 'General Physician', avatarUrl: 'https://i.pravatar.cc/150?u=doc1' },
  { id: 'doc-2', name: 'Dr. Ben Jacobs', specialty: 'Cardiologist', avatarUrl: 'https://i.pravatar.cc/150?u=doc2' },
  { id: 'doc-3', name: 'Dr. Olivia Chen', specialty: 'Dermatologist', avatarUrl: 'https://i.pravatar.cc/150?u=doc3' },
  { id: 'doc-4', name: 'Dr. Samuel Rodriguez', specialty: 'Pediatrician', avatarUrl: 'https://i.pravatar.cc/150?u=doc4' },
];
