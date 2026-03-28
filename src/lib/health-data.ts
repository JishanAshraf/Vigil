
export type Vendor = {
  id: string;
  name: string;
  address: string;
  phone: string;
  city: string;
  colony: string;
};

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  phone: string;
  city: string;
  colony: string;
};

export const mockVendors: Vendor[] = [
  { id: 'vendor-1', name: 'Apollo Pharmacy', address: '123 Arera Colony', phone: '+919876543211', city: 'Bhopal', colony: 'Arera Colony' },
  { id: 'vendor-2', name: 'Wellness Forever', address: '456 MP Nagar', phone: '+919876543212', city: 'Bhopal', colony: 'MP Nagar' },
  { id: 'vendor-7', name: 'Frank Ross Pharmacy', address: '789 Kolar Road', phone: '+919876543217', city: 'Bhopal', colony: 'Kolar Road' },
  { id: 'vendor-8', name: 'City Medical Store', address: '101 Berasia Road', phone: '+919876543218', city: 'Bhopal', colony: 'Berasia Road' },
  { id: 'vendor-3', name: 'Indore Medicos', address: '789 Vijay Nagar', phone: '+919876543213', city: 'Indore', colony: 'Vijay Nagar' },
  { id: 'vendor-4', name: 'HealthFirst Medicals', address: '101 MG Road', phone: '+919876543214', city: 'Indore', colony: 'MG Road' },
  { id: 'vendor-9', name: 'Shreeji Medicos', address: '45 Palace Colony', phone: '+919876543219', city: 'Indore', colony: 'Palace Colony' },
  { id: 'vendor-10', name: 'Get Well Pharmacy', address: '56 Annapurna Road', phone: '+919876543220', city: 'Indore', colony: 'Annapurna Road' },
  { id: 'vendor-5', name: 'Gwalior Pharma', address: '212 Lashkar', phone: '+919876543215', city: 'Gwalior', colony: 'Lashkar' },
  { id: 'vendor-11', name: 'Lashkar Medicos', address: '55 City Center', phone: '+919876543225', city: 'Gwalior', colony: 'City Center' },
  { id: 'vendor-6', name: 'Jabalpur Health Store', address: '333 Civic Center', phone: '+919876543216', city: 'Jabalpur', colony: 'Civic Center' },
  { id: 'vendor-12', name: 'Narmada Pharmacy', address: '77 Russel Chowk', phone: '+919876543226', city: 'Jabalpur', colony: 'Russel Chowk' },
  { id: 'vendor-13', name: 'Mahakal Medicals', address: '88 Mahakal Marg', phone: '+919876543227', city: 'Ujjain', colony: 'Mahakal Marg' },
  { id: 'vendor-14', name: 'Ujjain Pharma', address: '99 Freeganj', phone: '+919876543228', city: 'Ujjain', colony: 'Freeganj' },
];

export const mockDoctors: Doctor[] = [
  // Bhopal
  { id: 'doc-1', name: 'Dr. Priya Sharma', specialty: 'General Physician', phone: '+919876543231', city: 'Bhopal', colony: 'Arera Colony' },
  { id: 'doc-3', name: 'Dr. Ananya Reddy', specialty: 'Dermatologist', phone: '+919876543233', city: 'Bhopal', colony: 'MP Nagar' },
  { id: 'doc-8', name: 'Dr. Sameer Khan', specialty: 'Cardiologist', phone: '+919876543238', city: 'Bhopal', colony: 'Kolar Road' },
  { id: 'doc-11', name: 'Dr. Aarav Singh', specialty: 'Pediatrician', phone: '+919876543241', city: 'Bhopal', colony: 'Arera Colony' },
  { id: 'doc-12', name: 'Dr. Ishaan Mishra', specialty: 'Orthopedic Surgeon', phone: '+919876543242', city: 'Bhopal', colony: 'MP Nagar' },
  { id: 'doc-26', name: 'Dr. Aditi Singh', specialty: 'General Physician', phone: '+919876543256', city: 'Bhopal', colony: 'Kolar Road' },
  { id: 'doc-27', name: 'Dr. Rajesh Verma', specialty: 'Cardiologist', phone: '+919876543257', city: 'Bhopal', colony: 'Arera Colony' },
  { id: 'doc-28', name: 'Dr. Neha Jain', specialty: 'Dermatologist', phone: '+919876543258', city: 'Bhopal', colony: 'MP Nagar' },
  { id: 'doc-29', name: 'Dr. Alok Tiwari', specialty: 'Pediatrician', phone: '+919876543259', city: 'Bhopal', colony: 'Kolar Road' },
  { id: 'doc-30', name: 'Dr. Pooja Rao', specialty: 'Orthopedic Surgeon', phone: '+919876543260', city: 'Bhopal', colony: 'Arera Colony' },

  // Indore
  { id: 'doc-2', name: 'Dr. Rohan Gupta', specialty: 'Cardiologist', phone: '+919876543232', city: 'Indore', colony: 'Vijay Nagar' },
  { id: 'doc-4', name: 'Dr. Vikram Singh', specialty: 'Pediatrician', phone: '+919876543234', city: 'Indore', colony: 'MG Road' },
  { id: 'doc-7', name: 'Dr. Kavita Joshi', specialty: 'Dermatologist', phone: '+919876543237', city: 'Indore', colony: 'Palace Colony' },
  { id: 'doc-13', name: 'Dr. Diya Verma', specialty: 'General Physician', phone: '+919876543243', city: 'Indore', colony: 'Vijay Nagar' },
  { id: 'doc-14', name: 'Dr. Kabir Yadav', specialty: 'Orthopedic Surgeon', phone: '+919876543244', city: 'Indore', colony: 'MG Road' },
  { id: 'doc-31', name: 'Dr. Sanjay Kumar', specialty: 'General Physician', phone: '+919876543261', city: 'Indore', colony: 'Palace Colony' },
  { id: 'doc-32', name: 'Dr. Meenakshi Iyer', specialty: 'Cardiologist', phone: '+919876543262', city: 'Indore', colony: 'Vijay Nagar' },
  { id: 'doc-33', name: 'Dr. Ashok Menon', specialty: 'Dermatologist', phone: '+919876543263', city: 'Indore', colony: 'MG Road' },
  { id: 'doc-34', name: 'Dr. Sneha Desai', specialty: 'Pediatrician', phone: '+919876543264', city: 'Indore', colony: 'Palace Colony' },
  { id: 'doc-35', name: 'Dr. Rahul Nair', specialty: 'Orthopedic Surgeon', phone: '+919876543265', city: 'Indore', colony: 'Vijay Nagar' },

  // Gwalior
  { id: 'doc-5', name: 'Dr. Sunita Patel', specialty: 'General Physician', phone: '+919876543235', city: 'Gwalior', colony: 'Lashkar' },
  { id: 'doc-15', name: 'Dr. Shanaya Kumar', specialty: 'Cardiologist', phone: '+919876543245', city: 'Gwalior', colony: 'City Center' },
  { id: 'doc-16', name: 'Dr. Advik Sharma', specialty: 'Dermatologist', phone: '+919876543246', city: 'Gwalior', colony: 'Lashkar' },
  { id: 'doc-17', name: 'Dr. Myra Gupta', specialty: 'Pediatrician', phone: '+919876543247', city: 'Gwalior', colony: 'City Center' },
  { id: 'doc-18', name: 'Dr. Reyansh Patil', specialty: 'Orthopedic Surgeon', phone: '+919876543248', city: 'Gwalior', colony: 'Lashkar' },
  { id: 'doc-36', name: 'Dr. Ritu Sharma', specialty: 'General Physician', phone: '+919876543266', city: 'Gwalior', colony: 'City Center' },
  { id: 'doc-37', name: 'Dr. Manish Sisodia', specialty: 'Cardiologist', phone: '+919876543267', city: 'Gwalior', colony: 'Lashkar' },
  { id: 'doc-38', name: 'Dr. Preeti Agarwal', specialty: 'Dermatologist', phone: '+919876543268', city: 'Gwalior', colony: 'City Center' },
  { id: 'doc-39', name: 'Dr. Girish Pandey', specialty: 'Pediatrician', phone: '+919876543269', city: 'Gwalior', colony: 'Lashkar' },
  { id: 'doc-40', name: 'Dr. Bhavna Soni', specialty: 'Orthopedic Surgeon', phone: '+919876543270', city: 'Gwalior', colony: 'City Center' },

  // Jabalpur
  { id: 'doc-6', name: 'Dr. Arjun Mehta', specialty: 'Orthopedic Surgeon', phone: '+919876543236', city: 'Jabalpur', colony: 'Civic Center' },
  { id: 'doc-10', name: 'Dr. Raj Kumar', specialty: 'General Physician', phone: '+919876543240', city: 'Jabalpur', colony: 'Russel Chowk' },
  { id: 'doc-19', name: 'Dr. Anika Singh', specialty: 'Cardiologist', phone: '+919876543249', city: 'Jabalpur', colony: 'Civic Center' },
  { id: 'doc-20', name: 'Dr. Vihaan Reddy', specialty: 'Dermatologist', phone: '+919876543250', city: 'Jabalpur', colony: 'Russel Chowk' },
  { id: 'doc-21', name: 'Dr. Zara Khan', specialty: 'Pediatrician', phone: '+919876543251', city: 'Jabalpur', colony: 'Civic Center' },
  { id: 'doc-41', name: 'Dr. Deepak Dubey', specialty: 'General Physician', phone: '+919876543271', city: 'Jabalpur', colony: 'Russel Chowk' },
  { id: 'doc-42', name: 'Dr. Swati Mishra', specialty: 'Cardiologist', phone: '+919876543272', city: 'Jabalpur', colony: 'Civic Center' },
  { id: 'doc-43', name: 'Dr. Harish Patel', specialty: 'Dermatologist', phone: '+919876543273', city: 'Jabalpur', colony: 'Russel Chowk' },
  { id: 'doc-44', name: 'Dr. Geeta Choudhary', specialty: 'Pediatrician', phone: '+919876543274', city: 'Jabalpur', colony: 'Civic Center' },
  { id: 'doc-45', name: 'Dr. Anand Shrivastava', specialty: 'Orthopedic Surgeon', phone: '+919876543275', city: 'Jabalpur', colony: 'Russel Chowk' },

  // Ujjain
  { id: 'doc-9', name: 'Dr. Meera Iyer', specialty: 'Pediatrician', phone: '+919876543239', city: 'Ujjain', colony: 'Mahakal Marg' },
  { id: 'doc-22', name: 'Dr. Sai Joshi', specialty: 'General Physician', phone: '+919876543252', city: 'Ujjain', colony: 'Freeganj' },
  { id: 'doc-23', name: 'Dr. Vivaan Mehta', specialty: 'Cardiologist', phone: '+919876543253', city: 'Ujjain', colony: 'Mahakal Marg' },
  { id: 'doc-24', name: 'Dr. Kiara Iyer', specialty: 'Dermatologist', phone: '+919876543254', city: 'Ujjain', colony: 'Freeganj' },
  { id: 'doc-25', name: 'Dr. Ayaan Kumar', specialty: 'Orthopedic Surgeon', phone: '+919876543255', city: 'Ujjain', colony: 'Mahakal Marg' },
  { id: 'doc-46', name: 'Dr. Nitin Joshi', specialty: 'General Physician', phone: '+919876543276', city: 'Ujjain', colony: 'Freeganj' },
  { id: 'doc-47', name: 'Dr. Sarika Maheshwari', specialty: 'Cardiologist', phone: '+919876543277', city: 'Ujjain', colony: 'Mahakal Marg' },
  { id: 'doc-48', name: 'Dr. Pankaj Rathore', specialty: 'Dermatologist', phone: '+919876543278', city: 'Ujjain', colony: 'Freeganj' },
  { id: 'doc-49', name: 'Dr. Vandana Malviya', specialty: 'Pediatrician', phone: '+919876543279', city: 'Ujjain', colony: 'Mahakal Marg' },
  { id: 'doc-50', name: 'Dr. Yogesh Yadav', specialty: 'Orthopedic Surgeon', phone: '+919876543280', city: 'Ujjain', colony: 'Freeganj' },
];
