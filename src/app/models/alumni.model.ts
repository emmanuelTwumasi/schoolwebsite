export interface Alumni {
  id: number;
  name: string;
  graduationYear: number;
  email: string;
  currentCity: string;
  profilePictureUrl?: string;
  major?: string;
  whatImDoingNow?: string;
  status: 'pending' | 'approved' | 'rejected'; // New field for membership status
  role: 'alumni' | 'admin'; // New field for user role
}
