import { Container, Header, Loader, Menu, Segment } from "semantic-ui-react";
import { useState } from "react";
import { DisplayType } from "../home";
import { useQuery } from "@tanstack/react-query";
import { fetchRatedMovies, fetchRatedTvShows } from "./query";
import { ColumnDisplay } from "../home/column-display";
import { Navigate } from "react-router-dom";
export const Rated = () => {
  const [activeTabs, setActiveTaps] = useState<DisplayType>(DisplayType.Movies);

  const { isLoading: isLoadingRatedMovies, data: ratedMovies } = useQuery({
    queryKey: ["RatedMovies"],
    queryFn: fetchRatedMovies,
  });
  const { isLoading: isLoadingRatedTvShows, data: ratedTvShows } = useQuery({
    queryKey: ["RatedTvShows"],
    queryFn: fetchRatedTvShows,
  });
  if (!localStorage.getItem("guest_session_id")) {
    return <Navigate to={"/auth"} />;
  }
  if (isLoadingRatedMovies) {
    console.log("Movie Loading");
    return <Loader active />;
  }

  if (isLoadingRatedTvShows) {
    console.log("Tv Show Loading");
    return <Loader active />;
  }

  return (
    <Container>
      <Menu pagination pointing secondary style={{ marginTop: 50 }}>
        <Menu.Item
          name="Movies"
          active={activeTabs === DisplayType.Movies}
          onClick={() => setActiveTaps(DisplayType.Movies)}
        />
        <Menu.Item
          name="TvShows"
          active={activeTabs === DisplayType.TvShows}
          onClick={() => setActiveTaps(DisplayType.TvShows)}
        />
      </Menu>
      <Segment>
        {activeTabs === DisplayType.Movies ? (
          <div>
            <Header as={"h2"}>Rated Movies</Header>
            <ColumnDisplay
              data={ratedMovies.results}
              displayType={DisplayType.Movies}
              isRated
            />
          </div>
        ) : (
          <div>
            <Header as={"h2"}>Rated Tv Shows</Header>
            <ColumnDisplay
              data={ratedTvShows.results}
              displayType={DisplayType.TvShows}
              isRated
            />
          </div>
        )}
      </Segment>
    </Container>
  );
};
