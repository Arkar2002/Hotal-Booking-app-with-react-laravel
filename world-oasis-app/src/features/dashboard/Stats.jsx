import {
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineBanknotes,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formateCurrency } from "../../utils/helper";

function Stats({ dashboardData, numDay }) {
  // Stat 1
  const bookingCount = dashboardData.getBookingsAfterDate.length;

  // Stat 2
  const sales = dashboardData.getBookingsAfterDate
    .filter((booking) => booking.isPaid)
    .reduce((acc, cur) => acc + cur.totalPrice, 0);

  // Stat 3
  const checkedInCount = dashboardData.getBookingsAfterDate.filter(
    (booking) => booking.status === "checked-in"
  ).length;

  // Stat 4
  const occupancyRate = dashboardData.getBookingsAfterDate
    .filter(
      (booking) =>
        booking.status === "checked-in" || booking.status === "checked-out"
    )
    .reduce(
      (acc, cur) => acc + cur.numNights / (numDay * dashboardData.cabinCount),
      0
    );

  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title="Bookings"
        color="blue"
        value={bookingCount}
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        title="Sales"
        color="green"
        value={formateCurrency(sales)}
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        title="Check ins"
        color="indigo"
        value={checkedInCount}
      />
      <Stat
        icon={<HiOutlineChartBar />}
        title="Occupancy rate"
        color="yellow"
        value={Math.round(occupancyRate * 100) + "%"}
      />
    </>
  );
}

export default Stats;
