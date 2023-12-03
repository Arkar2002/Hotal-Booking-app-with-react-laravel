import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useUpdateUserPassword } from "./useUpdateUserPassword";
import toast from "react-hot-toast";

function UpdatePasswordForm() {
  const { register, handleSubmit, getValues, formState, reset } = useForm();
  const { errors } = formState;
  const { updateUserPassword, isUpdating } = useUpdateUserPassword();

  function onSubmit(data) {
    updateUserPassword(data, {
      onSuccess: (data) => {
        if (data?.status !== "fail")
          toast.success("Password changed successfully");
      },
      onSettled: () => {
        reset();
      },
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Current Password (min 6 characters)"
        error={errors?.currentPassword?.message}
      >
        <Input
          type="password"
          id="current-password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("currentPassword", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password needs a minimum of 6 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="New Password (min 6 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="new-password"
          disabled={isUpdating}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password needs a minimum of 6 characters",
            },
            validate: (value) =>
              getValues().currentPassword !== value ||
              "New Password shouldn't be matched with current password",
          })}
        />
      </FormRow>

      <FormRow
        label="Confirm password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register("password_confirmation", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
      </FormRow>
      <FormRow>
        <Button type="reset" variation="secondary">
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update password</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
