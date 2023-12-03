import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import TodayItem from "../dashboard/TodayItem";
// import TodayItem from "../dashboard/TodayItem";

const StyledToday = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
  overflow: auto;
`;

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

function TodayActivity({ todayCheckInOut }) {
  return (
    <StyledToday>
      <Row type="horizontal">
        <Heading type="h2">Today</Heading>
      </Row>
      {todayCheckInOut.length > 0 ? (
        <TodayList>
          {todayCheckInOut.map((activity) => (
            <TodayItem key={activity.id} stay={activity} />
          ))}
        </TodayList>
      ) : (
        <NoActivity>There is no activity today</NoActivity>
      )}
    </StyledToday>
  );
}

export default TodayActivity;
