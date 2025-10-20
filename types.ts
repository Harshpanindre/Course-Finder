
export enum Difficulty {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
  Mixed = 'Mixed',
}

export enum Price {
  Free = 'Free',
  Paid = 'Paid',
  Subscription = 'Subscription',
}

export enum Duration {
  Short = '< 5 hours',
  Medium = '1-4 weeks',
  Long = '3+ months',
}

export interface Course {
  id: string;
  title: string;
  provider: string;
  company?: string;
  price: Price;
  rating: number; // e.g., 4.7
  enrollment: number; // e.g., 150000
  difficulty: Difficulty;
  duration: Duration;
  url: string;
  subjects: string[];
  summary: string;
  categories: string[];
  jobRoles: string[];
}

export interface Filters {
  price: Price[];
  popularity: 'highest-rated' | 'most-enrolled';
  platforms: string[];
  difficulty: Difficulty[];
  duration: Duration[];
  companies: string[];
  showWishlisted: boolean;
  jobRoles: string[];
}
