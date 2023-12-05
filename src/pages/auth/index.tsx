import { Grid, Header, Form, Segment, Button } from "semantic-ui-react";
import { useQuery } from "@tanstack/react-query";
import { mutationLogin } from "./mutations";
import { useNavigate } from "react-router-dom";
export const Auth = () => {
  //   const { data, mutate } = useMutation({
  //     mutationKey: ["login"],
  //     mutationFn: () => mutationLogin(),
  //   });
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["loginQuery"],
    queryFn: mutationLogin,
  });
  if (isLoading) {
    console.log("isLoading");
  }
  if (isError) {
    console.log("isError" + error);
  }

  const navigate = useNavigate();
  const handleLogin = async () => {
    // await mutate();
    console.log(data);
    localStorage.setItem("guest_session_id", data.guest_session_id);
    navigate("/");
  };
  return (
    <Grid textAlign="center" verticalAlign="middle" style={{ height: "100vh" }}>
      <Grid.Column textAlign="center">
        <Header as="h2" color="violet">
          Welcome! Login by registring as a Guest Bellow.
        </Header>
        <Form size="large">
          <Segment stacked>
            <Button color="violet" size="large" fluid onClick={handleLogin}>
              Login
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};
