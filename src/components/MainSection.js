import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import "../Styles/Mainsection.css";

import { useDispatch, useSelector } from "react-redux";

import Paper from "@mui/material/Paper";
import { PlaceOrderModal } from "./PlaceOrderModal";
import { useState } from "react";
import { cancelOrder } from "../redux/slices/pizzaSlice";

export const MainSection = () => {
  const orders = useSelector((state) => state.pizzaSlice.orders);
  const pickedOrders = useSelector((state) => state.pizzaSlice.pickedOrders);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  const renderOrders = () => {
    if (orders.length || pickedOrders.length) {
      const OrdersList = [...orders, ...pickedOrders];
      return OrdersList.map((order) => {
        return (
          <TableRow
            key={"name"}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell scope="row">{order.order_id}</TableCell>
            <TableCell>{order.stage}</TableCell>
            <TableCell>{formatTimer(order.totalTimeSpent)}</TableCell>
            <TableCell>
              {order.stage !== "ready" && order.stage !== "picked" && (
                <Button
                  className="cancel-btn"
                  onClick={() => handleCancel(order.order_id, order.stage)}
                >
                  Cancel
                </Button>
              )}
            </TableCell>
          </TableRow>
        );
      });
    }
    return (
      <TableRow
        key={"name"}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell colSpan={4} scope="row">
          No orders taken yet
        </TableCell>
      </TableRow>
    );
  };

  const handleCancel = (orderId, stage) => {
    if (stage !== "ready" && stage !== "picked") {
      const remainingOrders = orders.filter(
        (order) => order.order_id !== orderId
      );
      dispatch(cancelOrder(remainingOrders));
      return;
    }
  };

  const formatTimer = (timer) => {
    const minutes = Math.floor(timer / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timer % 60).toString().padStart(2, "0");
    return `${minutes} min ${seconds} sec`;
  };

  return (
    <Box className="container">
      <Box className="btn-container">
        <Typography className="title" variant="h4" style={{ margin: "10px" }}>
          Main Section
        </Typography>
        <Button
          style={{ textTransform: "capitalize" }}
          onClick={() => setOpenModal(true)}
          className="place-order-button"
        >
          Place Order
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table className="order-table" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Stage</TableCell>
              <TableCell>Total Time Spent(time from order placed)</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderOrders()}</TableBody>
        </Table>
      </TableContainer>
      <PlaceOrderModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
      />
    </Box>
  );
};
