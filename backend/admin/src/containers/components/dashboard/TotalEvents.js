import React, { memo } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import { indigo, green } from "@material-ui/core/colors";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

const TotalEvents = (props) => (
  <Card {...props}>
    <CardContent>
      <Grid container spacing={3} style={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="h6">
            TOTAL EVENTS
          </Typography>
          <Typography color="textPrimary" variant="h3">
            {props.count}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            style={{
              backgroundColor: indigo[600],
              height: 56,
              width: 56,
            }}
          >
            <AttachMoneyIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        style={{
          alignItems: "center",
          display: "flex",
          pt: 2,
        }}
      >
        <ArrowUpwardIcon style={{ color: green[900] }} />
        <Typography
          variant="body2"
          style={{
            color: green[900],
            mr: 1,
          }}
        >
          16%
        </Typography>
        <Typography color="textSecondary" variant="caption">
          Since last month
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

export default memo(TotalEvents);
