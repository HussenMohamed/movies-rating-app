import {
  Segment,
  Header,
  Loader,
  Grid,
  GridRow,
  GridColumn,
  Image,
  List,
  ListItem,
  ListHeader,
  Label,
  Accordion,
  Card,
} from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchTvShowDetails } from "./query";

export const TvShow = () => {
  const { id } = useParams<string>();
  const TvShowId: number = +id;
  if (!id) {
    return <div>Invalid Movie ID</div>;
  } else {
    console.log(`There is already an id ${id}`);
    console.log(TvShowId);
  }

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["movieDetails"],
    queryFn: () => {
      return fetchTvShowDetails(TvShowId);
    },
  });
  if (isLoading) {
    console.log("Movie Loading");
    return <Loader active />;
  }

  if (isError) {
    console.log("Movie Error " + error.message);
  }

  console.log(data);
  return (
    <div style={{ marginTop: 50 }}>
      <Segment>
        <Header>{data.name}</Header>
        <Grid columns={2} divided textAlign="left" style={{ marginTop: 20 }}>
          <GridRow>
            <GridColumn width={6}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
                  size="medium"
                  centered
                />
              </div>
            </GridColumn>
            <GridColumn width={10}>
              <List>
                <ListItem>
                  <ListHeader>Is The TV Show For Adults:</ListHeader>
                  {data.adult ? "Yes" : "No"}
                </ListItem>
                <ListItem>
                  <ListHeader>Language:</ListHeader>
                  {data.original_language}
                </ListItem>
                <ListItem>
                  <ListHeader>Episodes Run Time:</ListHeader>
                  {data.episode_run_time}
                </ListItem>
                <ListItem>
                  <ListHeader>Genres:</ListHeader>
                  {data.genres.map((genre: any) => (
                    <Label key={genre.id} style={{ marginTop: 3 }}>
                      {genre.name}
                    </Label>
                  ))}
                </ListItem>
                <ListItem>
                  <ListHeader>Popularity: </ListHeader>
                  {data.popularity}
                </ListItem>
                <ListItem>
                  <ListHeader>Created By: </ListHeader>
                  {data.created_by
                    .map((creator: any) => creator.name)
                    .join(", ")}
                </ListItem>
                <ListItem>
                  <ListHeader>Production Companies</ListHeader>
                  {data.production_companies.map((company: any) => (
                    <List.Item>{company.name}</List.Item>
                  ))}
                </ListItem>
                <ListItem>
                  <ListHeader>Networks: </ListHeader>
                  {data.networks.map((network: any) => (
                    <Image
                      key={network.id}
                      src={`https://image.tmdb.org/t/p/original/${network.logo_path}`}
                      size="small"
                      style={{ marginRight: 10 }}
                    />
                  ))}
                </ListItem>
                <ListItem>
                  <ListHeader>First Air Date</ListHeader>
                  {data.first_air_date}
                </ListItem>
                <ListItem>
                  <ListHeader>Number Of Episodes: </ListHeader>
                  {data.number_of_episodes}
                </ListItem>
                <ListItem>
                  <ListHeader>Number Of Seasons: </ListHeader>
                  {data.number_of_seasons}
                </ListItem>
                <ListItem>
                  <List.Header>Seasons:</List.Header>
                  <List.Description>
                    <Accordion
                      style={{
                        maxHeight: "200px",
                        overflowY: "scroll",
                        margin: "10px 0",
                      }}
                      defaultActiveIndex={0}
                      panels={data.seasons.map((season: any) => ({
                        key: season.id,
                        title: `Season ${season.season_number} `,
                        content: {
                          content: (
                            <Card
                              style={{ height: "70px" }}
                              meta={season.air_date}
                              description={`${season.episode_count} episodes`}
                            />
                          ),
                        },
                      }))}
                      styled
                    />
                  </List.Description>
                </ListItem>
                <ListItem>
                  <ListHeader>Voting Average </ListHeader>
                  {data.vote_average}
                </ListItem>
              </List>
            </GridColumn>
          </GridRow>
        </Grid>
      </Segment>
    </div>
  );
};
