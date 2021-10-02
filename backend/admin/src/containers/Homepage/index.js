import React, { memo, useEffect, useState } from "react";

import { Helmet } from "react-helmet";
import { Box, Container, Grid } from "@material-ui/core";
import TotalPages from "../components/dashboard/TotalPages";
import Sales from "../components/dashboard/Sales";
import TotalEvents from "../components/dashboard/TotalEvents";
import TotalOrders from "../components/dashboard/TotalOrders";
import TrafficByDevice from "../components/dashboard/TrafficByDevice";
import axios from "axios";

const HomePage = ({ global: { plugins }, history: { push } }) => {
  const [pagesCount, setPagesCount] = useState(0);
  const [eventsCount, setEventsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  useEffect(() => {
    //TODO use host stated in .env instead
    let fetchPagesCount = async () => {
      let result = await axios.get("http://localhost:1337/pages/count");
      if (result.status == 200) {
        setPagesCount(result.data);
      } else {
        alert("Request failed");
      }
    };
    let fetchEventsCount = async () => {
      let result = await axios.get("http://localhost:1337/events/count");
      if (result.status == 200) {
        setEventsCount(result.data);
      } else {
        alert("Request failed");
      }
    };
    let fetchOrdersCount = async () => {
      let result = await axios.get("http://localhost:1337/orders/count");
      if (result.status == 200) {
        setOrdersCount(result.data);
      } else {
        alert("Request failed");
      }
    };
    fetchPagesCount();
    fetchEventsCount();
    fetchOrdersCount();
  }, []);
  return (
    <>
      <Helmet>
        <title>Dashboard | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={4} sm={6} xl={4} xs={12}>
              <TotalPages count={pagesCount} />
            </Grid>
            <Grid item lg={4} sm={6} xl={4} xs={12}>
              <TotalEvents count={eventsCount} />
            </Grid>
            <Grid item lg={4} sm={6} xl={4} xs={12}>
              <TotalOrders style={{ height: "100%" }} count={ordersCount} />
            </Grid>
            <Grid item lg={12} md={20} xl={20} xs={12}>
              <Sales />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default memo(HomePage);
