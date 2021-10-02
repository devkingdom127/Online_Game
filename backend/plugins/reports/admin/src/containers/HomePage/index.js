import React, { memo } from "react";
import Demo from "./demo";
import { Box, Container, Grid } from "@material-ui/core";
import User from "./Users";

const HomePage = () => {
  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100%",
        py: 3,
      }}
    >
      <Container maxWidth={false}>
        <User />
      </Container>
    </Box>
  );
};

export default memo(HomePage);
