import { useContextProvider } from "../context/ContextProvider";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

function DarkModeToggle() {
  const { isDarkMode, setIsDarkMode } = useContextProvider();

  return (
    <ButtonIcon onClick={() => setIsDarkMode((dark) => !dark)}>
      {isDarkMode ? <HiOutlineMoon /> : <HiOutlineSun />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
