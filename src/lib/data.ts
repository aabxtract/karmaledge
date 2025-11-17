import type { User, Deed, KarmaShard, KindnessType } from './types';
import { PlaceHolderImages } from './placeholder-images';

const generateShards = (count: number, type: KindnessType): KarmaShard[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${type.toLowerCase()}-${i + 1}`,
    type: type,
  }));
};

export const users: User[] = [
  {
    id: 'user-1',
    walletAddress: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
    name: 'Aria',
    avatarUrl: 'https://picsum.photos/seed/avatar1/100/100',
    auraLevel: 4,
    shards: [
      ...generateShards(10, 'Help'),
      ...generateShards(8, 'Community'),
      ...generateShards(7, 'Encouragement'),
      ...generateShards(5, 'Environment'),
      ...generateShards(2, 'Charity'),
      ...generateShards(1, 'Service'),
    ],
  },
  {
    id: 'user-2',
    walletAddress: '0x456...def',
    name: 'Kai',
    avatarUrl: 'https://picsum.photos/seed/avatar2/100/100',
    auraLevel: 2,
    shards: [
      ...generateShards(3, 'Help'),
      ...generateShards(4, 'Service'),
    ],
  },
];

export const deeds: Deed[] = [
  {
    id: 'deed-1',
    description: 'Helped a neighbor carry their groceries up three flights of stairs.',
    kindnessType: 'Help',
    imageUrl: PlaceHolderImages.find(p => p.id === 'deed-1')?.imageUrl,
    imageHint: PlaceHolderImages.find(p => p.id === 'deed-1')?.imageHint,
    submittedBy: 'user-1',
    verifications: 5,
    isVerified: true,
    timestamp: '2024-05-20T10:00:00Z',
  },
  {
    id: 'deed-2',
    description: 'Organized a weekend cleanup at the local park. We collected over 10 bags of trash.',
    kindnessType: 'Community',
    submittedBy: 'user-1',
    verifications: 2,
    isVerified: false,
    timestamp: '2024-05-19T14:30:00Z',
  },
  {
    id: 'deed-3',
    description: 'Donated to a local animal shelter to help them buy new supplies.',
    kindnessType: 'Charity',
    imageUrl: PlaceHolderImages.find(p => p.id === 'deed-2')?.imageUrl,
    imageHint: PlaceHolderImages.find(p => p.id === 'deed-2')?.imageHint,
    submittedBy: 'user-2',
    verifications: 8,
    isVerified: true,
    timestamp: '2024-05-18T09:15:00Z',
  },
  {
    id: 'deed-4',
    description: 'Spent the afternoon volunteering at a community garden, helping to plant new seedlings for the season.',
    kindnessType: 'Environment',
    imageUrl: PlaceHolderImages.find(p => p.id === 'deed-3')?.imageUrl,
    imageHint: PlaceHolderImages.find(p => p.id === 'deed-3')?.imageHint,
    submittedBy: 'user-1',
    verifications: 12,
    isVerified: true,
    timestamp: '2024-05-17T16:00:00Z',
  },
  {
    id: 'deed-5',
    description: 'Left a positive and encouraging comment on a friend\'s project they were feeling insecure about.',
    kindnessType: 'Encouragement',
    submittedBy: 'user-2',
    verifications: 4,
    isVerified: true,
    timestamp: '2024-05-16T20:00:00Z',
  },
  {
    id: 'deed-6',
    description: 'Offered my seat to an elderly person on a crowded bus.',
    kindnessType: 'Help',
    submittedBy: 'user-1',
    verifications: 3,
    isVerified: true,
    timestamp: '2024-05-15T08:45:00Z',
  },
];
