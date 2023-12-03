import styled from "styled-components";
import Stats from "./Stats";
import Spinner from "../../ui/Spinner";
import { useDashboard } from "./useDashboard";
import { useSearchParams } from "react-router-dom";
import TodayActivity from "../check-in-out/TodayActivity";
import SalesChart from "./SalesChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const [searchParams] = useSearchParams();
  const numDay = Number(searchParams.get("last")) || 7;
  const { data, isLoading } = useDashboard();

  if (isLoading) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats dashboardData={data} numDay={numDay} />
      <TodayActivity todayCheckInOut={data?.todayCheckInOut} />
      <div></div>
      <SalesChart
        bookings={data.getBookingsAfterDate.filter((booking) => booking.isPaid)}
        numDays={numDay}
      />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
