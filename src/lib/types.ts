export type User = {
  id: string;
  name: string;
  avatarUrl?: string;
};

export type Comment = {
  id: string;
  user: User;
  timestamp: string;
  text: string;
};

export type Alert = {
  id: string;
  user: User;
  isAnonymous: boolean;
  timestamp: string;
  category: string;
  images: { url: string; hint: string }[];
  description: string;
  location: string;
  status: 'Reported' | 'Authorities Notified' | 'Resolved';
  comments: Comment[];
};
