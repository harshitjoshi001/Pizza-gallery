import { Box, Button, Typography } from "@mui/material";
import { memo, useEffect, useState } from "react";

const Card = ({ order, handleNext }) => {
  const [timer, setTimer] = useState(0);

  const checkDuration = () => {
    const { minutesDifference } = formatTimer();
    if (minutesDifference >= 3) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (order.stage !== "picked") {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [order.stage]);

  const formatTimer = () => {
    let timeDIff = Date.now() - order.stageTimeSpent;

    var secondsDifference = Math.floor((timeDIff / 1000) % 60);
    var minutesDifference = Math.floor((timeDIff / (1000 * 60)) % 60);
    return { minutesDifference, secondsDifference };
  };

  const getTime = () => {
    const { minutesDifference, secondsDifference } = formatTimer();
    return (
      ("0" + minutesDifference).slice(-2) +
      " min " +
      ("0" + secondsDifference).slice(-2) +
      " sec"
    );
  };

  return (
    <Box
      style={{
        ...CardStyle.container,
        backgroundColor:
          checkDuration() && order.stage !== "picked" ? "red" : "#fff",
      }}
    >
      <Typography className="title">Order {order.order_id}</Typography>
      {order.stage !== "picked" ? (
        <>
          <Typography style={CardStyle.Timer}>{getTime()}</Typography>
          <Button
            onClick={() => handleNext(timer)}
            style={CardStyle.nextButton}
          >
            Next
          </Button>
        </>
      ) : (
        <Typography>picked</Typography>
      )}
    </Box>
  );
};

export default memo(Card);

const CardStyle = {
  container: {
    height: 150,
    width: 200,
    borderRadius: 20,
    margin: 15,
    border: "1px solid #1c2117",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  nextButton: {
    backgroundColor: "#fd9d04",
    width: "80%",
    padding: "5px",
    borderRadius: "10px",
    color: "#fff",
    fontSize: "14px",
    fontWeight: 600,
    marginTop: "20px",
  },
  Timer: {
    color: "#2A6B41",
    marginTop: "15px",
    fontWeight: 600,
    fontSize: "16px",
  },
};
