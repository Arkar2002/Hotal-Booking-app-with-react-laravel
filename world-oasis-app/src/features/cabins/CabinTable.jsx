import Table from "../../ui/Table";
import Spinner from "../../ui/Spinner";
import { useCabins } from "./useCabins";
import CabinRow from "./CabinRow";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const {
    data: {
      data: cabins,
      meta: { from, to, total, last_page: lastPage } = {},
    } = {},
    isLoading,
  } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  // filter
  const currentFilterValue = searchParams.get("discount") || "all";

  let filterdCabins = [];

  if (currentFilterValue === "all") filterdCabins = cabins;
  else if (currentFilterValue === "no-discount")
    filterdCabins = cabins.filter((cabin) => cabin.discountPrice !== 0);
  else filterdCabins = cabins.filter((cabin) => cabin.discountPrice === 0);

  // sortby

  const currentSortbyValue = searchParams.get("sortby") || "name-asc";
  const [field, direction] = currentSortbyValue.split("-");
  const filterDirection = direction === "asc" ? 1 : -1;

  filterdCabins = filterdCabins
    .slice()
    .sort((a, b) => (a[field] - b[field]) * filterDirection);

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={filterdCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
        <Table.Footer>
          <Pagination from={from} to={to} total={total} lastPage={lastPage} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default CabinTable;
