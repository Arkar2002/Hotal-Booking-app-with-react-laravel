import { useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import { useContextProvider } from "../context/ContextProvider";
import Spinner from "./Spinner";
import styled from "styled-components";
const FullPage = styled.div`
  height: 100dvh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ProtectedRoute({ children }) {
  const { token, setToken } = useContextProvider();
  const { data: user, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, isLoading, user, navigate, setToken]);

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  return user && children;
}

export default ProtectedRoute;
