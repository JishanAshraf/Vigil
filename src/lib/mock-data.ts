import type { Alert, User } from './types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const findImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

const users: User[] = [
  { id: 'user-1', name: 'Alice Johnson', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
  { id: 'user-2', name: 'Bob Williams', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026705d' },
  { id: 'user-3', name: 'Charlie Brown', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026706d' },
];

export const mockAlerts: Alert[] = [
  {
    id: 'alert-1',
    user: users[0],
    isAnonymous: false,
    timestamp: '2 hours ago',
    category: 'Pothole',
    images: [{ url: findImage('pothole-1')?.imageUrl!, hint: findImage('pothole-1')?.imageHint! }],
    description: 'There\'s a massive pothole at the intersection of Main St & 5th Ave. It\'s a danger to cyclists and could damage cars.',
    location: 'Near Main St & 5th Ave',
    status: 'Reported',
  },
  {
    id: 'alert-2',
    user: users[1],
    isAnonymous: true,
    timestamp: '1 day ago',
    category: 'Graffiti',
    images: [{ url: findImage('graffiti-1')?.imageUrl!, hint: findImage('graffiti-1')?.imageHint! }],
    description: 'Someone spray-painted graffiti on the new community mural in the park. It\'s a shame to see it defaced.',
    location: 'Community Park',
    status: 'Authorities Notified',
  },
  {
    id: 'alert-3',
    user: users[2],
    isAnonymous: false,
    timestamp: '3 days ago',
    category: 'Lost Pet',
    images: [{ url: findImage('lost-pet-1')?.imageUrl!, hint: findImage('lost-pet-1')?.imageHint! }],
    description: 'Our golden retriever, Buddy, went missing yesterday. He is very friendly and was last seen near Oak Street. He has a blue collar.',
    location: 'Near Oak Street',
    status: 'Resolved',
  },
    {
    id: 'alert-4',
    user: users[0],
    isAnonymous: false,
    timestamp: '5 hours ago',
    category: 'Illegal Dumping',
    images: [{ url: findImage('dumping-1')?.imageUrl!, hint: findImage('dumping-1')?.imageHint! }],
    description: 'An old couch and several bags of trash were dumped in the alley behind the grocery store. It\'s attracting pests.',
    location: 'Alley behind Grove Mart',
    status: 'Reported',
  },
    {
    id: 'alert-5',
    user: users[1],
    isAnonymous: false,
    timestamp: '16 hours ago',
    category: 'Suspicious Activity',
    images: [{ url: findImage('suspicious-activity-1')?.imageUrl!, hint: findImage('suspicious-activity-1')?.imageHint! }],
    description: 'A white van without any markings has been parked on Elm Street for three days straight. It seems suspicious as I\'ve never seen it before.',
    location: 'Elm Street',
    status: 'Authorities Notified',
  },
];
