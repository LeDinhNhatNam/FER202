import movie1 from '../images/movie1.jpg';
import movie2 from '../images/movie2.jpg';
import movie4 from '../images/movie4.jpg';
import movie5 from '../images/movie5.jpg';
import movie8 from '../images/movie8.jpg';

export const movies = [
  {
    id: 1,
    title: 'Galactic Wars',
    description: 'Epic space battles decide the fate of a fractured galaxy as rival factions clash for control.',
    poster: movie1,
    genre: 'Sci-Fi',
    year: 2022,
    country: 'USA', 
    duration: 132,
    showtimes: ['10:00', '14:30', '18:00', '21:30']
  },
  {
    id: 2,
    title: 'Laugh Out Loud',
    description: 'A feel-good comedy about friendship, failure, and second chances in a small town.',
    poster: movie2,
    genre: 'Comedy',
    year: 2021,
    country: 'UK',
    duration: 105,
    showtimes: ['11:00', '15:45', '19:15']
  },
  {
    id: 3,
    title: 'Deep Blue',
    description: 'A gripping survival drama set far from shore when a voyage goes wrong.',
    poster: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVlcCUyMGJsdWV8ZW58MHx8MHx8&ixlib=rb-4.0.3&w=800&q=80',
    genre: 'Drama',
    year: 2019,
    country: 'Australia',
    duration: 118,
    showtimes: ['12:30', '16:00', '20:45']
  },
  {
    id: 4,
    title: 'Haunted House',
    description: 'A teen dares to spend one night in a house with a dark past—and uncovers the truth.',
    poster: movie4,
    genre: 'Horror',
    year: 2020,
    country: 'Canada',
    duration: 98,
    showtimes: ['13:15', '17:30', '21:00']
  },
  {
    id: 5,
    title: 'City of Love',
    description: 'Two strangers meet in a sleepless city and rewrite their plans for life and love.',
    poster: movie5,
    genre: 'Romance',
    year: 2018,
    country: 'France',
    duration: 110,
    showtimes: ['11:30', '15:00', '19:45']
  },
  {
    id: 6,
    title: 'The Time Traveler',
    description: 'A brilliant scientist discovers a way to bend time—at a cost no one could foresee.',
    poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
    genre: 'Sci-Fi',
    year: 2023,
    country: 'USA',
    duration: 124,
    showtimes: ['14:00', '18:30', '22:15']
  },
  {
    id: 7,
    title: 'Street Runner',
    description: 'An ex-courier is forced back into the fast lane for one last job across the neon city.',
    poster: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
    genre: 'Action',
    year: 2021,
    country: 'Japan',
    duration: 102,
    showtimes: ['12:00', '16:45', '20:30']
  },
  {
    id: 8,
    title: 'Hidden Truth',
    description: 'A reporter unravels a conspiracy that powerful people will do anything to keep buried.',
    poster: movie8,
    genre: 'Thriller',
    year: 2022,
    country: 'Germany',
    duration: 115,
    showtimes: ['13:45', '17:15', '21:45']
  },
  {
    id: 9,
    title: 'Kingdom of Ash',
    description: 'A fallen prince must unite rival clans to reclaim a cursed land and his destiny.',
    poster: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
    genre: 'Comedy',
    year: 2020,
    country: 'New Zealand',
    duration: 141,
    showtimes: ['10:30', '14:15', '18:45', '22:30']
  }
];

export const allGenres = [
  'All', 'Action', 'Animation', 'Comedy',  'Drama',
  'Fantasy', 'Horror', 'Romance', 'Sci-Fi', 'Thriller'
];
