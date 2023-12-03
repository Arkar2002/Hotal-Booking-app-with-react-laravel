import styled from "styled-components";
import Heading from "./Heading";
import Button from "./Button";
import { useContextProvider } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";

const StyledConfirmLogout = styled.div`
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

function ConfirmLogout({ closeModal, disabled }) {
  const navigate = useNavigate();
  const { setToken } = useContextProvider();

  function handleConfirmClick() {
    setToken(null);
    navigate("/login");
  }

  return (
    <StyledConfirmLogout>
      <Heading type="h3">Log out</Heading>
      <p>Are you sure you want to log out.</p>

      <div>
        <Button variation="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button
          variation="danger"
          onClick={handleConfirmClick}
          disabled={disabled}
        >
          Log Out
        </Button>
      </div>
    </StyledConfirmLogout>
  );
}

export default ConfirmLogout;
