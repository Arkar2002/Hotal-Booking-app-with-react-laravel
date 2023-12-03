import { useContextProvider } from "../../context/ContextProvider";
import { useLogin } from "./useLogin";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import toast from "react-hot-toast";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm() {
  const navigate = useNavigate();
  const { token, setToken } = useContextProvider();
  const { login, isPending } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email && !password) return toast.error("Please Fill out all fields");
    const user = { email, password };
    login(user, {
      onSuccess: (data) => {
        setToken(data.token);
        navigate("/dashboard");
        toast.success(`Welcome ${data.name}`);
      },
      onSettled: () => {
        setPassword("");
      },
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address" orientation="vertical">
        <Input
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRow>
      <FormRow label="Password" orientation="vertical">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRow>
      <FormRow orientation="vertical">
        <Button size="large">{isPending ? <SpinnerMini /> : "Login"}</Button>
      </FormRow>
    </Form>
  );
}

export default LoginForm;
