export const mutationLogin = async () => {
  const res = await fetch(
    "https://api.themoviedb.org/3/authentication/guest_session/new",
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYWUwMjE1NDAzZWE1NTc1OTcwZDdhYTg1ZWI2NjM4ZiIsInN1YiI6IjY1NjljOGY2ZDM5OWU2MDExYmNmYTZjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ucI6d4ilV6EU3R3oAZZINuf0NNmW3CvLi07MkvJiNao",
      },
    }
  );
  return res.json();
};
