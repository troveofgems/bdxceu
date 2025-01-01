import React, { useEffect } from "react";
import { Table, Button, Col, Container, Row } from "react-bootstrap";
import {
  formatDate,
  formattedList,
  getLastFourCharacters,
} from "../../utils/field.formatters";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useFetchUserOrdersQuery } from "../../redux/slices/orderSlice";
import { Preloader } from "../../components/shared/Preloader/Preloader";
import { formatToUsd } from "../../assets/js/printing.utils";
import { useNavigate } from "react-router-dom";

const OrdersScreen = () => {
  const {
    data: orders,
    isLoading: loadingOrders,
    refetch,
    error: ordersError,
  } = useFetchUserOrdersQuery();
  const navigate = useNavigate();

  function isWithin24Hours(givenDate) {
    // Get current date/time
    const now = new Date();

    // Convert given date string to Date object
    const date = new Date(givenDate);

    // Calculate difference in milliseconds
    const differenceInMs = now.getTime() - date.getTime();

    // Check if difference is less than or equal to 24 hours (86400000 ms)
    const isWithin24Hours = differenceInMs <= 86400000;

    return isWithin24Hours;
  }

  useEffect(() => {
    console.log("Orders? ", orders);
    refetch();
  }, [loadingOrders]);

  const handleFetchOrderById = async (orderId) => {
    try {
      return navigate(`/orders/${orderId}`);
    } catch (err) {
      console.error(err);
    }
  };

  return loadingOrders ? (
    <Preloader />
  ) : (
    <div className={"userScreenContent"}>
      <h1 className={"mb-4"}>Your Orders</h1>
      <Table striped hover responsive className={"table-sm"}>
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Payment Method</th>
            <th>Course Name</th>
            <th>Payment Status</th>
            <th>Course Cost</th>
            <th>Total Payment</th>
            <th>Paid</th>
            <th>Created On</th>
            <th>Paid At</th>
          </tr>
        </thead>
        <tbody>
          {orders?.data?.length > 0 &&
            orders?.data?.map((order) => (
              <tr key={order._id}>
                <td>{order.paymentResult.orderId}</td>
                <td>{order.paymentMethod}</td>
                <td>{order.productName}</td>
                <td>{order.paymentResult.status}</td>
                <td>{formatToUsd(order.itemPrice)}</td>
                <td>{formatToUsd(order.totalPrice)}</td>
                <td>{order.isPaid === true ? "Success" : "Failure"}</td>
                <td>{formatDate(order.createdAt)}</td>
                <td>{formatDate(order.paidAt)}</td>
                <td>
                  {isWithin24Hours(order.createdAt) && (
                    <Button
                      variant={"danger"}
                      className={"btn-sm mx-2"}
                      onClick={() => {}}
                    >
                      <span className={"mx-2"}>Request Refund</span>
                    </Button>
                  )}
                  <Button
                    variant={"light"}
                    className={"btn-sm"}
                    onClick={() => handleFetchOrderById(order._id)}
                  >
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {(orders?.data?.length === 0 || orders === undefined) && (
        <h4 className={"text-center mt-3"}>No Orders Yet!</h4>
      )}
    </div>
  );
};

export default OrdersScreen;
