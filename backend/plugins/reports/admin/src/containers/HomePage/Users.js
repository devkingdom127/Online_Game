import React, { memo, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  colors,
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import axios from "axios";

const Users = (props) => {
  const theme = useTheme();
  const [month, setMonth] = useState(0);
  const [count, setCount] = useState(0);
  const [userLoaded, setUserLoaded] = useState(false);
  let monthArray = [];
  let countArray = [];

  let fetchReportData = async () => {
    let result = await axios.get(
      "http://localhost:1337/users-permissions/users/report"
    );
    return result;
  };
  useEffect(() => {
    (async () => {
      setUserLoaded(false);
      let res = await fetchReportData();
      if (res.status == 200) {
        let reports = res.data;
        var bar = new Promise((resolve, reject) => {
          reports.forEach((element, index, array) => {
            monthArray.push(element._id.month);
            countArray.push(element.count);
            if (index === array.length - 1) resolve();
          });
        });

        bar.then(() => {
          setCount(countArray);
          setUserLoaded(true);
          console.log(countArray);
          // setMonth(monthArray)
        });
      } else {
        alert("Request failed");
      }
    })();
  }, []);

  const data = {
    datasets: [
      {
        backgroundColor: colors.indigo[500],
        data: count,
        label: "This year",
      },
      {
        backgroundColor: colors.grey[200],
        data: [1, 9, 3, 5, 20],
        label: "Last year",
      },
    ],
    labels: ["Jan", "Feb", "March", "April", "May"],
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          barThickness: 12,
          maxBarThickness: 10,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: theme.palette.text.secondary,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0,
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider,
          },
        },
      ],
    },
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: "index",
      titleFontColor: theme.palette.text.primary,
    },
  };

  return (
    <div>
      {userLoaded ? (
        <div>
          <Card {...props}>
            <CardHeader
              // action={
              //   <Button
              //     endIcon={<ArrowDropDownIcon />}
              //     size="small"
              //     variant="text"
              //   >
              //     Last 7 days
              //   </Button>
              // }
              title="Latest Users"
            />
            <Divider />
            <CardContent>
              <Box
                style={{
                  height: 400,
                  position: "relative",
                }}
              >
                <Line data={data} options={options} />
              </Box>
            </CardContent>
            <Divider />
            <Box
              style={{
                display: "flex",
                justifyContent: "flex-end",
                p: 2,
              }}
            >
              <Button
                color="primary"
                endIcon={<ArrowRightIcon />}
                size="small"
                variant="text"
              >
                Overview
              </Button>
            </Box>
          </Card>
        </div>
      ) : (
        <p>No user found</p>
      )}
    </div>
  );
};

export default memo(Users);
