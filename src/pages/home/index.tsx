import { Button } from "semantic-ui-react";
import { useState } from "react";
import { ColumnDisplay } from "./column-display";
import { fetchMovies, fetchTvShows } from "./query";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";

export enum DisplayType {
  Movies = "movies",
  TvShows = "tvshows",
}
export const Home = () => {
  const [displayType, setDisplayType] = useState<DisplayType>(
    DisplayType.Movies
  );
  const {
    data: movieData,
    isLoading: movieIsloading,
    isError: movieIsError,
    error: movieError,
  } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });
  const {
    data: TvShowData,
    isLoading: TvShowIsloading,
    isError: TvShowIsError,
    error: TvShowError,
  } = useQuery({
    queryKey: ["Tvshows"],
    queryFn: fetchTvShows,
  });
  if (!localStorage.getItem("guest_session_id")) {
    return <Navigate to={"/auth"} />;
  }
  if (movieIsloading || TvShowIsloading) {
    return <span>Loading...</span>;
  }
  if (movieIsError) {
    return <span>Error: {movieError.message}</span>;
  }
  if (TvShowIsError) {
    return <span>Error: {TvShowError.message}</span>;
  }
  return (
    <div style={{ marginTop: 50, height: "auto" }}>
      <Button.Group>
        <Button
          color={displayType === DisplayType.Movies ? "blue" : undefined}
          onClick={() => setDisplayType(DisplayType.Movies)}
        >
          Movies
        </Button>
        <Button
          color={displayType === DisplayType.TvShows ? "blue" : undefined}
          onClick={() => setDisplayType(DisplayType.TvShows)}
        >
          TV Shows
        </Button>
      </Button.Group>
      <div style={{ marginTop: 20 }}>
        {displayType === DisplayType.Movies ? (
          <ColumnDisplay
            data={movieData.results}
            displayType={DisplayType.Movies}
          ></ColumnDisplay>
        ) : (
          <ColumnDisplay
            data={TvShowData.results}
            displayType={DisplayType.TvShows}
          ></ColumnDisplay>
        )}
      </div>
    </div>
  );
};

{
  /* {displayType === DisplayType.Movies ? (
          <ColumnDisplay
            data={movieData.results}
            displayType={DisplayType.Movies}
          >
        ) : (
          <ColumnDisplay
            data={TvShowData.results}
            displayType={DisplayType.TvShows}
          >
        )}; */
}
