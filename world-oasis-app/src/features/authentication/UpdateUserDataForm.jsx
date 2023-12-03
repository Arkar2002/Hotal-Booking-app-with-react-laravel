import { useUser } from "./useUser";
import { useState } from "react";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useUpdateUser } from "./useUpdateUser";
import toast from "react-hot-toast";
import { usePreShowImage } from "../../hooks/usePreShowImage";
import styled from "styled-components";

const Img = styled.img`
  display: block;
  width: 20rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
`;

function UpdateUserDataForm() {
  const { data: user } = useUser();
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);
  const [image, setImage] = useState(null);
  const [preShowImageUrl, setPreShowImageUrl] = useState("");
  const { updateUser, isUpdatingUser } = useUpdateUser();
  const preShowImage = usePreShowImage();

  function handleSubmit(e) {
    e.preventDefault();
    const userObj = image ? { email, name, image } : { email, name };
    const formData = new FormData();
    for (let data in userObj) {
      formData.append(data, userObj[data]);
    }
    if (!email || !name) return toast.error("Please fill out valid data");
    updateUser(formData, {
      onSuccess: () => {
        toast.success("Updated Successfully");
      },
    });
  }

  function handleImage(e) {
    const { files } = e.target;
    const image = files[0];
    setImage(image);
    preShowImage(image, setPreShowImageUrl);
  }

  function handleCancel() {
    setImage(null);
    setPreShowImageUrl("");
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isUpdatingUser}
        />
      </FormRow>
      <FormRow label="Full name">
        <Input
          value={name}
          type="text"
          id="fullName"
          onChange={(e) => setName(e.target.value)}
          disabled={isUpdatingUser}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          type="file"
          id="avatar"
          accept="image/*"
          disabled={isUpdatingUser}
          onChange={handleImage}
        />
      </FormRow>
      {preShowImageUrl && (
        <FormRow label="Preshow Image">
          <Img src={preShowImageUrl} />
        </FormRow>
      )}
      <FormRow>
        <Button
          onClick={handleCancel}
          disabled={isUpdatingUser}
          type="reset"
          variation="secondary"
        >
          Cancel
        </Button>
        <Button disabled={isUpdatingUser}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
