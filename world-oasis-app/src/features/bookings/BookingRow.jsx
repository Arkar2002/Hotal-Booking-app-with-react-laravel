import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  HiTrash,
  HiEye,
  HiArrowUpOnSquare,
  HiArrowDownOnSquare,
} from "react-icons/hi2";

import Tag from "../../ui/Tag";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import { format, isToday } from "date-fns";
import { formatDistanceFromNow, formateCurrency } from "../../utils/helper";
import { useDeleteBooking } from "./useDeleteBooking";
import toast from "react-hot-toast";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    cabin: { name: cabinName },
    guest: { name: guestName, email: guestEmail },
    startDate,
    endDate,
    status,
    totalPrice,
    numNights,
  },
}) {
  const navigate = useNavigate();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row role="row">
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{guestEmail}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} nights in stay
        </span>
        <span>
          {format(new Date(startDate), "dd-MMM-yyyy")} &mdash;{" "}
          {format(new Date(endDate), "dd-MMM-yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status}</Tag>

      <Amount>{formateCurrency(totalPrice)}</Amount>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              See Details
            </Menus.Button>

            {status === "unconfirmed" && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                Check in
              </Menus.Button>
            )}
            {status === "checked-in" && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => navigate(`/bookings/${bookingId}`)}
              >
                Check Out
              </Menus.Button>
            )}
            <Modal.Open opens={"booking-delete"}>
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>
        <Modal.Window name={"booking-delete"}>
          <ConfirmDelete
            disabled={isDeleting}
            onConfirm={() => {
              deleteBooking(bookingId, {
                onSuccess: () => {
                  toast.success(`Booking #${bookingId} successfully deleted`);
                },
              });
              navigate("/bookings");
            }}
            resource={` booking(${guestName})`}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
