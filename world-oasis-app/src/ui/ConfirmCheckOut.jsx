import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmCheckOut = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmCheckOut({ resource, onConfirm, disabled, closeModal }) {
  async function handleConfirmClick() {
    await onConfirm?.();
    await closeModal();
  }

  return (
    <StyledConfirmCheckOut>
      <Heading type="h3">Checkout {resource}</Heading>
      <p>
        Are you sure you want to checkout this {resource} permanently? This
        action cannot be undone.
      </p>

      <div>
        <Button variation="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button onClick={handleConfirmClick} disabled={disabled}>
          Check Out
        </Button>
      </div>
    </StyledConfirmCheckOut>
  );
}

export default ConfirmCheckOut;
