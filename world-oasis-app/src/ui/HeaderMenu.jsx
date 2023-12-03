import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import DarkModeToggle from "./DarkModeToggle";
import Modal from "./Modal";
import ConfirmLogout from "./ConfirmLogout";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

function HeaderMenu() {
  return (
    <StyledHeaderMenu>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Modal>
          <Modal.Open opens={"logout"}>
            <ButtonIcon>
              <HiArrowRightOnRectangle />
            </ButtonIcon>
          </Modal.Open>
          <Modal.Window name={"logout"}>
            <ConfirmLogout />
          </Modal.Window>
        </Modal>
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
