import Spinner from "../../ui/Spinner";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";

import BookingDataBox from "../bookings/BookingDataBox";
import { useMoveBack } from "../../hooks/useMoveBack";

import styled from "styled-components";
import useBookingDetails from "../bookings/useBookingDetails";
import Empty from "../../ui/Empty";
import { useEffect, useState } from "react";
import { useSettings } from "../settings/useSettings";
import { formateCurrency } from "../../utils/helper";
import { useCheckIn } from "./useCheckIn";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Box = styled.div`
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const [confirmPaid, setIsPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking, isLoading } = useBookingDetails();
  const { data: { breakfastPrice } = {}, isLoading: isSettingsLoading } =
    useSettings();
  const { checkIn, isCheckingIn } = useCheckIn();

  useEffect(() => {
    if (booking) {
      setIsPaid(booking.isPaid);
      setAddBreakfast(booking.hasBreakfast);
    }
  }, [booking]);

  if (isLoading && isSettingsLoading) return <Spinner />;

  if (!booking && !isLoading && !isSettingsLoading)
    return <Empty resource="Booking" />;

  const {
    id: bookingId,
    guest,
    cabinId,
    startDate,
    endDate,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    status,
  } = booking;

  const optionalBreakfastPrice = numNights * numGuests * breakfastPrice;

  function handleCheckIn() {
    const checkInData = {
      cabinId,
      startDate,
      endDate,
      numNights,
      numGuests,
      hasBreakfast: addBreakfast,
      isPaid: confirmPaid,
      _method: "PATCH",
    };
    checkIn(checkInData, {
      onSuccess: () => {
        toast.success(`Booking ${bookingId} checked in successfully`);
        navigate(`/bookings/${bookingId}`);
      },
    });
  }

  return (
    <>
      <Row type="horizontal">
        <Heading type="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={() => navigate("/bookings")}>
          &larr; Back to bookings
        </ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            onChange={() => {
              setAddBreakfast((breakfast) => !breakfast);
            }}
            id="breakfast"
            disabled={isCheckingIn}
          >
            Want to add breakfast for{" "}
            {formateCurrency(numGuests * numNights * breakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          id="confirm"
          checked={confirmPaid}
          onChange={() => setIsPaid((confirmPaid) => !confirmPaid)}
          disabled={isCheckingIn || confirmPaid}
        >
          I confirm that <strong>{guest.name}</strong> has paid the total amount
          of{" "}
          {!addBreakfast
            ? formateCurrency(totalPrice)
            : `${formateCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formateCurrency(totalPrice)} + ${formateCurrency(
                optionalBreakfastPrice
              )})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        {confirmPaid && status === "unconfirmed" && (
          <Button disabled={isCheckingIn} onClick={handleCheckIn}>
            Check in booking #{bookingId}
          </Button>
        )}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
