import { Card } from '../types/game';

export const cards: Card[] = [
  {
    id: '1',
    text: 'Most likely to become a famous artist',
    category: 'Creative'
  },
  {
    id: '2',
    text: 'Most likely to start a successful business',
    category: 'Business'
  },
  {
    id: '3',
    text: 'Most likely to travel the world',
    category: 'Adventure'
  },
  {
    id: '4',
    text: 'Most likely to become a famous scientist',
    category: 'Academic'
  },
  {
    id: '5',
    text: 'Most likely to write a bestselling book',
    category: 'Creative'
  },
  {
    id: '6',
    text: 'Most likely to become a professional athlete',
    category: 'Sports'
  },
  {
    id: '7',
    text: 'Most likely to become a famous chef',
    category: 'Culinary'
  },
  {
    id: '8',
    text: 'Most likely to become a famous musician',
    category: 'Creative'
  },
  {
    id: '9',
    text: 'Most likely to become a famous actor',
    category: 'Entertainment'
  },
  {
    id: '10',
    text: 'Most likely to become a famous politician',
    category: 'Politics'
  },
  {
    id: '11',
    text: 'Most likely to become a famous doctor',
    category: 'Medical'
  },
  {
    id: '12',
    text: 'Most likely to become a famous lawyer',
    category: 'Legal'
  },
  {
    id: '13',
    text: 'Most likely to become a famous teacher',
    category: 'Education'
  },
  {
    id: '14',
    text: 'Most likely to become a famous engineer',
    category: 'Technical'
  },
  {
    id: '15',
    text: 'Most likely to become a famous journalist',
    category: 'Media'
  }
];

export const getRandomCards = (count: number): Card[] => {
  const shuffled = [...cards].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}; 