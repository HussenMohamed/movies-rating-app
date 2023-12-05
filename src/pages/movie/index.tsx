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
} from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchMovieDetails } from "./query";

export const Movie = () => {
  const { id } = useParams<string>();
  const movieId: number = +id;
  if (!id) {
    return <div>Invalid Movie ID</div>;
  } else {
    console.log(`There is already an id ${id}`);
    console.log(movieId);
  }

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["movieDetails"],
    queryFn: () => {
      return fetchMovieDetails(movieId);
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
        <Header>{data.title}</Header>
        <Grid
          stackable
          columns={2}
          divided
          textAlign="left"
          style={{ marginTop: 20 }}
        >
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
                  <ListHeader>Is The Movie For Adults:</ListHeader>
                  {data.adult ? "Yes" : "No"}
                </ListItem>
                <ListItem>
                  <ListHeader>Language:</ListHeader>
                  {data.original_language}
                </ListItem>
                <ListItem>
                  <ListHeader>Genres:</ListHeader>
                  {data.genres.map((genre: any) => (
                    <Label key={genre.id}>{genre.name}</Label>
                  ))}
                </ListItem>
                <ListItem>
                  <ListHeader>Popularity: </ListHeader>
                  {data.popularity}
                </ListItem>
                <ListItem>
                  <ListHeader>Production Companies</ListHeader>
                  {data.production_companies.map((company: any) => (
                    <List.Item>{company.name}</List.Item>
                  ))}
                </ListItem>
                <ListItem>
                  <ListHeader>Production Countries</ListHeader>
                  {data.production_countries.map((company: any) => (
                    <List.Item>{company.name}</List.Item>
                  ))}
                </ListItem>
                <ListItem>
                  <ListHeader>Release Date: </ListHeader>
                  {data.release_date}
                </ListItem>
                <ListItem>
                  <ListHeader>Revenue </ListHeader>
                  {data.revenue}
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
