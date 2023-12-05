import axios from "axios";

export const fetchTvShowDetails = async (id: number) => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYWUwMjE1NDAzZWE1NTc1OTcwZDdhYTg1ZWI2NjM4ZiIsInN1YiI6IjY1NjljOGY2ZDM5OWU2MDExYmNmYTZjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ucI6d4ilV6EU3R3oAZZINuf0NNmW3CvLi07MkvJiNao",
      },
    }
  );
  console.log(res);
  console.log(res.data);
  return res.data;
};
