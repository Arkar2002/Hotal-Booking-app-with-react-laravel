import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../../ui/Button";
import { Flag } from "../../ui/Flag";
import Tag from "../../ui/Tag";
import CheckoutButton from "../check-in-out/CheckoutButton";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
  /* &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  } */
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ stay }) {
  const { id, status, guest, numNights } = stay;

  const statusToAction = {
    unconfirmed: {
      action: "arriving",
      tag: "green",
      button: (
        <Button
          variation="primary"
          size="small"
          as={Link}
          to={`/checkin/${id}`}
        >
          Check in
        </Button>
      ),
    },
    "checked-in": {
      action: "departing",
      tag: "blue",
      button: <CheckoutButton icon={false} bookingId={id} />,
    },

    "checked-out": {
      action: "CheckOut",
      tag: "blue",
      button: "",
    },
  };

  return (
    <StyledTodayItem>
      <Tag type={statusToAction[status]?.tag}>
        {statusToAction[status].action}
      </Tag>
      <Flag src={guest.countryFlag} alt={`Flag of ${guest.nationality}`} />
      <Guest>{guest.name}</Guest>
      <div>{numNights} nights</div>

      {statusToAction[status].button}
    </StyledTodayItem>
  );
}

export default TodayItem;
