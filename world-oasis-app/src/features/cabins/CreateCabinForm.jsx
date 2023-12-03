import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import styled from "styled-components";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import FileInput from "../../ui/FileInput";
import Button from "../../ui/Button";
import { Textarea } from "../../ui/Textarea";
import { useCreateCabin } from "./useCreateCabin";
import { useUpdateCabin } from "./useUpdateCabin";
import { usePreShowImage } from "../../hooks/usePreShowImage";

const Img = styled.img`
  display: block;
  width: 20rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
`;

function CreateCabinForm({ cabin = false, closeModal }) {
  // state for preshowimage
  const [image, setImage] = useState(null);
  const [preshowImageUrl, setPreshowImageUrl] = useState("");
  const [imageFieldError, setImageFieldError] = useState("");
  const preShowImage = usePreShowImage();

  // check whether edit or create
  const isEditSession = cabin && {
    name: cabin.name,
    maxCapacity: cabin.maxCapacity,
    regularPrice: cabin.regularPrice,
    discountPrice: cabin.discountPrice,
    description: cabin.description,
  };

  // use react form hook for form management
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession || {},
  });
  const { errors } = formState;

  // api calling
  const { createCabin, isCreating } = useCreateCabin();
  const { updateCabin, isUpdating } = useUpdateCabin();

  function onSubmit(data) {
    const newCabin = image ? { ...data, image } : { ...data };
    if (!cabin && !image) {
      setImageFieldError("This image field is required");
      return;
    }
    const formData = new FormData();
    for (let key in newCabin) {
      formData.append(key, newCabin[key]);
    }
    // for editing cabin
    if (isEditSession) {
      formData.append("_method", "PATCH");
      updateCabin(
        { id: cabin.id, formData },
        {
          onSuccess: (data) => {
            toast.success(data.message);
            closeModal();
          },
        }
      );
    } else {
      // for creating new cabin
      createCabin(formData, {
        onSuccess: (data) => {
          toast.success(`${data.name} is created successfully`);
        },
        onSettled: () => {
          reset();
          setPreshowImageUrl("");
          setImage(null);
          closeModal();
        },
      });
    }
  }

  // preshowimage function
  function handlePreShowImage(e) {
    setImageFieldError("");
    const { files } = e.target;
    const image = files[0];
    setImage(image);
    preShowImage(image, setPreshowImageUrl);
  }

  // clear all field values
  function onClear() {
    reset();
    setPreshowImageUrl("");
    setImage(null);
    setImageFieldError("");
    closeModal();
  }

  function onError() {
    if (!imageFieldError) setImageFieldError("This image field is required");
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="name" error={errors.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This name field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum Capacity" error={errors.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This max capacity field is required",
            maxLength: {
              value: 3,
              message:
                "The max capacity field must not be greater than 3 character",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This regular price field is required",
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors.discountPrice?.message}>
        <Input
          type="number"
          id="discountPrice"
          defaultValue={0}
          {...register("discountPrice", {
            required: "This discount price field is required",
            validate: (value) =>
              Number(getValues().regularPrice) >= Number(value) ||
              "Discount Price should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          {...register("description", {
            required: "This description field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={imageFieldError}>
        <FileInput
          type="file"
          id="image"
          accept="image/*"
          onChange={handlePreShowImage}
        />
      </FormRow>

      {preshowImageUrl && (
        <FormRow label="Preshow Image">
          <Img src={preshowImageUrl} alt="preshow" />
        </FormRow>
      )}

      <FormRow>
        <Button variation="secondary" type="reset" onClick={onClear}>
          Cancel
        </Button>
        <Button disabled={isCreating || isUpdating}>
          {isEditSession ? "Edit" : "Create"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
