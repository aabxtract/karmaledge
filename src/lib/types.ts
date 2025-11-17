import { type ImagePlaceholder } from './placeholder-images';

export type User = {
  id: string;
  walletAddress: string;
  name: string;
  avatarUrl: string;
  auraLevel: number;
  shards: KarmaShard[];
};

export type Deed = {
  id: string;
  description: string;
  kindnessType: KindnessType;
  imageUrl?: string;
  imageHint?: string;
  submittedBy: string; // User ID
  verifications: number;
  isVerified: boolean;
  timestamp: string;
};

export type PopulatedDeed = Deed & { user: User };

export type KindnessType =
  | 'Help'
  | 'Charity'
  | 'Service'
  | 'Encouragement'
  | 'Community'
  | 'Environment';

export const kindnessTypes: KindnessType[] = [
  'Help',
  'Charity',
  'Service',
  'Encouragement',
  'Community',
  'Environment',
];

export type KarmaShard = {
  id: string;
  type: KindnessType;
};

export const AURA_LEVELS = [
  { level: 1, name: 'Initiate', color: 'soft blue', deedsRequired: 0 },
  { level: 2, name: 'Acolyte', color: 'violet glow', deedsRequired: 5 },
  { level: 3, name: 'Guardian', color: 'emerald', deedsRequired: 15 },
  { level: 4, name: 'Luminary', color: 'golden radiant', deedsRequired: 30 },
  { level: 5, name: 'Ascendant', color: 'white-light halo', deedsRequired: 50 },
];
