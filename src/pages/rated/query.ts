export const fetchRatedMovies = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/guest_session/${localStorage.getItem(
      "guest_session_id"
    )}/rated/movies?language=en-US&page=1&sort_by=created_at.asc/rated/movies?language=en-US&page=1&sort_by=created_at.asc&api_key=${
      import.meta.env.VITE_API_KEY
    }`,
    {
      // headers: {
      //   Authorization:
      //     "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYWUwMjE1NDAzZWE1NTc1OTcwZDdhYTg1ZWI2NjM4ZiIsInN1YiI6IjY1NjljOGY2ZDM5OWU2MDExYmNmYTZjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ucI6d4ilV6EU3R3oAZZINuf0NNmW3CvLi07MkvJiNao",
      // },
    }
  );
  return res.json();
};
export const fetchRatedTvShows = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/guest_session/${localStorage.getItem(
      "guest_session_id"
    )}/rated/tv?language=en-US&page=1&sort_by=created_at.asc&api_key=${
      import.meta.env.VITE_API_KEY
    }`,
    {
      // headers: {
      //   Authorization:
      //     "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYWUwMjE1NDAzZWE1NTc1OTcwZDdhYTg1ZWI2NjM4ZiIsInN1YiI6IjY1NjljOGY2ZDM5OWU2MDExYmNmYTZjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ucI6d4ilV6EU3R3oAZZINuf0NNmW3CvLi07MkvJiNao",
      // },
    }
  );
  return res.json();
};
