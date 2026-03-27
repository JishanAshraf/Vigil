
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
  city: string;
};

export const mockVendors: Vendor[] = [
  { id: 'vendor-1', name: 'Apollo Pharmacy', address: '123 Arera Colony', phone: '+919876543211', city: 'Bhopal' },
  { id: 'vendor-2', name: 'Wellness Forever', address: '456 MP Nagar', phone: '+919876543212', city: 'Bhopal' },
  { id: 'vendor-7', name: 'Frank Ross Pharmacy', address: '789 Kolar Road', phone: '+919876543217', city: 'Bhopal' },
  { id: 'vendor-8', name: 'City Medical Store', address: '101 Berasia Road', phone: '+919876543218', city: 'Bhopal' },
  { id: 'vendor-3', name: 'Indore Medicos', address: '789 Vijay Nagar', phone: '+919876543213', city: 'Indore' },
  { id: 'vendor-4', name: 'HealthFirst Medicals', address: '101 MG Road', phone: '+919876543214', city: 'Indore' },
  { id: 'vendor-9', name: 'Shreeji Medicos', address: '45 Palace Colony', phone: '+919876543219', city: 'Indore' },
  { id: 'vendor-10', name: 'Get Well Pharmacy', address: '56 Annapurna Road', phone: '+919876543220', city: 'Indore' },
  { id: 'vendor-5', name: 'Gwalior Pharma', address: '212 Lashkar', phone: '+919876543215', city: 'Gwalior' },
  { id: 'vendor-11', name: 'Lashkar Medicos', address: '55 City Center', phone: '+919876543225', city: 'Gwalior' },
  { id: 'vendor-6', name: 'Jabalpur Health Store', address: '333 Civic Center', phone: '+919876543216', city: 'Jabalpur' },
  { id: 'vendor-12', name: 'Narmada Pharmacy', address: '77 Russel Chowk', phone: '+919876543226', city: 'Jabalpur' },
  { id: 'vendor-13', name: 'Mahakal Medicals', address: '88 Mahakal Marg', phone: '+919876543227', city: 'Ujjain' },
  { id: 'vendor-14', name: 'Ujjain Pharma', address: '99 Freeganj', phone: '+919876543228', city: 'Ujjain' },
];

export const mockDoctors: Doctor[] = [
  { id: 'doc-1', name: 'Dr. Priya Sharma', specialty: 'General Physician', phone: '+919876543231', city: 'Bhopal' },
  { id: 'doc-2', name: 'Dr. Rohan Gupta', specialty: 'Cardiologist', phone: '+919876543232', city: 'Indore' },
  { id: 'doc-3', name: 'Dr. Ananya Reddy', specialty: 'Dermatologist', phone: '+919876543233', city: 'Bhopal' },
  { id: 'doc-4', name: 'Dr. Vikram Singh', specialty: 'Pediatrician', phone: '+919876543234', city: 'Indore' },
  { id: 'doc-5', name: 'Dr. Sunita Patel', specialty: 'General Physician', phone: '+919876543235', city: 'Gwalior' },
  { id: 'doc-6', name: 'Dr. Arjun Mehta', specialty: 'Orthopedic Surgeon', phone: '+919876543236', city: 'Jabalpur' },
  { id: 'doc-7', name: 'Dr. Kavita Joshi', specialty: 'Dermatologist', phone: '+919876543237', city: 'Indore' },
  { id: 'doc-8', name: 'Dr. Sameer Khan', specialty: 'Cardiologist', phone: '+919876543238', city: 'Bhopal' },
  { id: 'doc-9', name: 'Dr. Meera Iyer', specialty: 'Pediatrician', phone: '+919876543239', city: 'Ujjain' },
  { id: 'doc-10', name: 'Dr. Raj Kumar', specialty: 'General Physician', phone: '+919876543240', city: 'Jabalpur' },
  
  // Adding more doctors to cover all city/specialty combinations
  { id: 'doc-11', name: 'Dr. Aarav Singh', specialty: 'Pediatrician', phone: '+919876543241', city: 'Bhopal' },
  { id: 'doc-12', name: 'Dr. Ishaan Mishra', specialty: 'Orthopedic Surgeon', phone: '+919876543242', city: 'Bhopal' },
  { id: 'doc-13', name: 'Dr. Diya Verma', specialty: 'General Physician', phone: '+919876543243', city: 'Indore' },
  { id: 'doc-14', name: 'Dr. Kabir Yadav', specialty: 'Orthopedic Surgeon', phone: '+919876543244', city: 'Indore' },
  { id: 'doc-15', name: 'Dr. Shanaya Kumar', specialty: 'Cardiologist', phone: '+919876543245', city: 'Gwalior' },
  { id: 'doc-16', name: 'Dr. Advik Sharma', specialty: 'Dermatologist', phone: '+919876543246', city: 'Gwalior' },
  { id: 'doc-17', name: 'Dr. Myra Gupta', specialty: 'Pediatrician', phone: '+919876543247', city: 'Gwalior' },
  { id: 'doc-18', name: 'Dr. Reyansh Patil', specialty: 'Orthopedic Surgeon', phone: '+919876543248', city: 'Gwalior' },
  { id: 'doc-19', name: 'Dr. Anika Singh', specialty: 'Cardiologist', phone: '+919876543249', city: 'Jabalpur' },
  { id: 'doc-20', name: 'Dr. Vihaan Reddy', specialty: 'Dermatologist', phone: '+919876543250', city: 'Jabalpur' },
  { id: 'doc-21', name: 'Dr. Zara Khan', specialty: 'Pediatrician', phone: '+919876543251', city: 'Jabalpur' },
  { id: 'doc-22', name: 'Dr. Sai Joshi', specialty: 'General Physician', phone: '+919876543252', city: 'Ujjain' },
  { id: 'doc-23', name: 'Dr. Vivaan Mehta', specialty: 'Cardiologist', phone: '+919876543253', city: 'Ujjain' },
  { id: 'doc-24', name: 'Dr. Kiara Iyer', specialty: 'Dermatologist', phone: '+919876543254', city: 'Ujjain' },
  { id: 'doc-25', name: 'Dr. Ayaan Kumar', specialty: 'Orthopedic Surgeon', phone: '+919876543255', city: 'Ujjain' },
];
