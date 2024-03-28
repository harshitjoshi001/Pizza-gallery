import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeStage } from "../redux/slices/pizzaSlice";
import { orderSteps } from "../utils/utils";
import Card from "./Card";

export const StageSection = () => {
  const [placedOrders, setPlacedOrders] = useState([]);
  const [makingOrders, setMakingOrders] = useState([]);
  const [readyOrders, setReadyOrders] = useState([]);
  const [pickedOrders, setPickedOrders] = useState([]);

  const orders = useSelector((state) => state.pizzaSlice.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    const categorizeItems = () => {
      const picked = [];
      const making = [];
      const ready = [];
      const placed = [];

      orders.forEach((item) => {
        switch (item.stage) {
          case "picked":
            picked.push(item);
            break;
          case "making":
            making.push(item);
            break;
          case "ready":
            ready.push(item);
            break;
          case "placed":
            placed.push(item);
            break;
          default:
            break;
        }
      });

      setPlacedOrders(placed);
      setMakingOrders(making);
      setPickedOrders(picked);
      setReadyOrders(ready);
    };
    categorizeItems();
  }, [orders]);

  const handleNext = (orderId, timer) => {
    let Orders = JSON.parse(JSON.stringify(orders));
    const order = orders.find((Order) => Order.order_id === orderId);
    debugger;
    const updatedOrder = {
      ...order,
      stage: orderSteps[orderSteps.indexOf(order.stage) + 1],
      totalTimeSpent: order.totalTimeSpent + timer,
      stageTimeSpent: Date.now(),
    };
    debugger;
    const index = orders.findIndex((order) => order.order_id === orderId);
    Orders[index] = updatedOrder;
    dispatch(changeStage(Orders));
  };

  const OrderStage = ({ stage, orders }) => {
    return (
      <Box style={stagingStyles.stageContainer}>
        <Typography style={stagingStyles.stage}>{stage}</Typography>
        {orders.map((order) => {
          return (
            <Card
              order={order}
              handleNext={(timer) => handleNext(order.order_id, timer)}
            />
          );
        })}
      </Box>
    );
  };

  return (
    <>
      <Box className="container bg-white">
        <Typography className="title" variant="h4" style={{ margin: "10px" }}>
          Staging Section
        </Typography>
        <Grid container spacing={2} mt={2}>
          <Grid xs={3} item>
            <OrderStage stage="Order Placed" orders={placedOrders} />
          </Grid>
          <Grid xs={3} item>
            <OrderStage stage="Order In Making" orders={makingOrders} />
          </Grid>
          <Grid xs={3} item>
            <OrderStage stage="Order Ready" orders={readyOrders} />
          </Grid>
          <Grid xs={3} item>
            <OrderStage stage="Order Picked" orders={pickedOrders} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

const stagingStyles = {
  stageContainer: {
    border: "2px solid #1c2117",
    borderRadius: "10px",
    minHeight: 100,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  stage: {
    textAlign: "center",
    fontWeight: 10,
    margin: 20,
    fontSize: "18px",
    fontWeight: 600,
  },
};
