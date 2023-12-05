import { DisplayType } from "./index";
import { Grid, Card, Form, Label, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { rateMovie, rateTvShow } from "./mutation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface DisplayData {
  id: number;
  overview: string;
  poster_path: string;
  title?: string; // movie
  name?: string; // tvShow
  vote_average: number;
  release_date?: string; // movie
  first_air_date?: string; // tvShow
  rating: string;
}
interface Props {
  data: DisplayData[];
  displayType: DisplayType;
  isRated?: boolean;
}
export const ColumnDisplay = (props: Props) => {
  const { data, displayType, isRated } = props;
  const [rating, setRating] = useState<number>(0);

  const OnSuccess = () => {
    toast.success("Successfully Rated!");
  };
  const OnError = () => {
    toast.error("Something went wrong!");
  };

  const { mutate: rateMovieMutation } = useMutation({
    mutationKey: ["rateMovie"],
    mutationFn: (id: number) => rateMovie(id, rating),
    onSuccess: OnSuccess,
    onError: OnError,
  });
  const { mutate: rateTvShowMutation } = useMutation({
    mutationKey: ["rateTvShow"],
    mutationFn: (id: number) => rateTvShow(id, rating),
    onSuccess: OnSuccess,
    onError: OnError,
  });

  const rate =
    displayType === DisplayType.Movies ? rateMovieMutation : rateTvShowMutation;
  return (
    <Grid
      columns={3}
      stackable
      centered
      verticalAlign="top"
      padded="vertically"
    >
      {data.map((displayData: DisplayData) => (
        <Grid.Column key={displayData.id}>
          <Card.Group>
            <Link
              to={`${displayType === DisplayType.Movies ? "movie" : "tvshow"}/${
                displayData.id
              }`}
            >
              <Card
                style={{ height: 800 }}
                fluid
                image={`https://image.tmdb.org/t/p/original/${displayData.poster_path}`}
                header={
                  DisplayType.Movies === displayType
                    ? displayData.title
                    : displayData.name
                }
                meta={
                  displayType === DisplayType.Movies
                    ? `Release Date: ${displayData.release_date}`
                    : `First Air Date: ${displayData.first_air_date}`
                }
                description={`${displayData.overview.slice(0, 280)}...`}
              />
              {isRated && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Label
                    active
                    circular
                    size="large"
                  >{`Your Rating: ${displayData.rating}`}</Label>
                </div>
              )}
            </Link>

            <Form style={{ margin: "10px auto" }}>
              <Form.Group>
                <Form.Field>
                  <Form.Input
                    type="number"
                    min="0"
                    max="10"
                    step="0.5"
                    onChange={(e) => setRating(Number(e.target.value))}
                    action={{
                      color: "violet",
                      labelPosition: "right",
                      icon: "star",
                      content: "Rate",
                      onClick: () => rate(displayData.id),
                    }}
                  />
                </Form.Field>
              </Form.Group>
            </Form>
          </Card.Group>
        </Grid.Column>
      ))}
    </Grid>
  );
};
