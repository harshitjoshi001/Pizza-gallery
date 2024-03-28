import { Box, Button, Modal, Snackbar, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../redux/slices/pizzaSlice";
import { PizzaBases, PizzaSizes, PizzaTypes } from "../utils/utils";
import { CustomDropdown } from "./Dropdown";
import React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export const PlaceOrderModal = (props) => {
  const orders = useSelector((state) => state.pizzaSlice.orders);
  const { open, handleClose } = props;
  const [order, setOrder] = useState({});
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (Object.keys(order).length === 3) {
      if (orders.length <= 9) {
        dispatch(
          placeOrder({
            ...order,
            stage: "placed",
            order_id: Math.floor(Math.random() * 1000) + 1,
            stageTimeSpent: Date.now(),
            totalTimeSpent: 0,
          })
        );
        setOrder({});
        handleClose();
      } else {
        setSnackBarMessage("This Restaurant is not accepting orders for now");
        setOpenSnackBar(true);
      }
    } else {
      setOpenSnackBar(true);
      setSnackBarMessage("Please select pizza configurations");
    }
  };

  const handleChange = (e) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value,
    });
  };

  const action = (
    <React.Fragment>
      <Button
        color="secondary"
        size="small"
        onClick={() => openSnackBar(false)}
      >
        Cancel
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const renderSnackBar = () => {
    return (
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackBar(false)}
        message={snackBarMessage}
        action={action}
      />
    );
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={ModalStyle.style}>
          <Typography
            className="title"
            style={{ textAlign: "center", marginBottom: "20px !important" }}
          >
            Place Order
          </Typography>
          <CustomDropdown
            handleChange={handleChange}
            label="Select Type"
            items={PizzaTypes}
            name="type"
          />
          <CustomDropdown
            handleChange={handleChange}
            label="Select Size"
            items={PizzaSizes}
            name="size"
          />
          <CustomDropdown
            handleChange={handleChange}
            label="Select Base"
            items={PizzaBases}
            name="base"
          />
          <Box fullWidth>
            <Button onClick={handleSubmit} sx={submitBtn.style}>
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
      {renderSnackBar()}
    </>
  );
};

const ModalStyle = {
  style: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 5,
  },
};
const submitBtn = {
  style: {
    backgroundColor: "#fd9d04",
    width: "100%",
    padding: "10px",
    borderRadius: "10px",
    color: "#fff",
    fontSize: "18px",
    fontWeight: 600,
    marginTop: "20px",
  },
};
