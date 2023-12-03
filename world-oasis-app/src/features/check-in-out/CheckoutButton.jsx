import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import ConfirmCheckOut from "../../ui/ConfirmCheckOut";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import { useCheckOut } from "./useCheckOut";
import toast from "react-hot-toast";

function CheckoutButton({ bookingId, icon = true }) {
  const { checkOut, isCheckingOut } = useCheckOut();

  return (
    <Modal>
      <Modal.Open opens="checkout">
        <Button
          icon={icon && <HiArrowUpOnSquare />}
          variation="primary"
          size="small"
        >
          Check out
        </Button>
      </Modal.Open>
      <Modal.Window name="checkout">
        <ConfirmCheckOut
          disabled={isCheckingOut}
          onConfirm={() =>
            checkOut(
              { status: "checked-out", bookingId },
              {
                onSuccess: () => {
                  toast.success(
                    `Booking #${bookingId} checked out successfully`
                  );
                },
              }
            )
          }
          resource={`Booking #${bookingId}`}
        />
      </Modal.Window>
    </Modal>
  );
}

export default CheckoutButton;
