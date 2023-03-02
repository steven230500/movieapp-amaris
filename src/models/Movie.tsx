interface Movie {
  id: number;
  name: string;
  title: string;
  overview: string;
  vote_average: number;
  release_date: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

export default Movie;
