import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

import ButtonText from "../../ui/ButtonText";
import Empty from "../../ui/Empty";
import useBookingDetails from "./useBookingDetails";
import BookingDataBox from "./BookingDataBox";
import { useMoveBack } from "../../hooks/useMoveBack";
import { HiArrowDownOnSquare } from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";
import CheckoutButton from "../check-in-out/CheckoutButton";
import { useDeleteBooking } from "./useDeleteBooking";
import toast from "react-hot-toast";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const moveBack = useMoveBack();
  const { booking, isLoading } = useBookingDetails();
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  if (isLoading) return <Spinner />;

  if (!booking && !isLoading)
    return (
      <>
        <Empty resource="booking" />
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </>
    );

  const { id, status } = booking;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading type="h1">Booking # {id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={() => navigate("/bookings")}>
          &larr; Back to bookings
        </ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button
            icon={<HiArrowDownOnSquare />}
            onClick={() => navigate(`/checkin/${bookingId}`)}
          >
            Checked In
          </Button>
        )}

        {status === "checked-in" && <CheckoutButton bookingId={id} />}
        <Modal>
          <Modal.Open opens="booking-delete">
            <Button variation="danger">Delete</Button>
          </Modal.Open>
          <Modal.Window name="booking-delete">
            <ConfirmDelete
              onConfirm={() => {
                deleteBooking(bookingId, {
                  onSettled: () => {
                    toast.success(`Booking #${bookingId} successfully deleted`);
                    navigate("/bookings");
                  },
                });
              }}
              disabled={isDeleting}
              resource={`Booking #${id}`}
            />
          </Modal.Window>
        </Modal>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
