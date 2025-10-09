import movie1 from '../images/movie1.jpg';
import movie2 from '../images/movie2.jpg';

export const carouselMovies = [
  {
    id: 1,
    title: 'Galactic Wars',
    description:
      'Epic space battles decide the fate of a fractured galaxy as rival factions clash for control.',
    poster: movie1,
    genre: 'Sci-Fi',
    year: 2022,
    country: 'USA',
    duration: 132
  },
  {
    id: 2,
    title: 'Laugh Out Loud',
    description:
      'A feel-good comedy about friendship, failure, and second chances in a small town.',
    poster: movie2,
    genre: 'Comedy',
    year: 2021,
    country: 'UK',
    duration: 105
  },
  {
    id: 3,
    title: 'Deep Blue',
    description:
      'A gripping survival drama set far from shore when a voyage goes wrong.',
    poster:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVlcCUyMGJsdWV8ZW58MHx8MHx8&ixlib=rb-4.0.3&w=800&q=80',
    genre: 'Drama',
    year: 2019,
    country: 'Australia',
    duration: 118
  }
];
