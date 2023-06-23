import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Select,
  Box,
  Image, InputGroup, InputLeftElement
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  selectTemp,
  set_temp,
} from "../features/dataSlice";
import { useSelector, useDispatch } from "react-redux";

export default function MedicalForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formData = useSelector(selectTemp);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: formData });

  function handleFileChange(event) {
    const file = event.target.files[0];
    setSelectedFile(URL.createObjectURL(file));
  }

  useEffect(() => {
    setSelectedFile(formData.file);
  }, [formData]);

  function onSubmit(values) {
    return new Promise((resolve) => {
        //Call API HERE AS NEEDED
        console.log(JSON.stringify(values.file));
        values.file = selectedFile;
        // dispatch(add(values));
        dispatch(set_temp(values));
        navigate("/TruffleHealth-Demo/summary");
        resolve();
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.first_name || errors.last_name }>
          <FormLabel htmlFor="name">Name</FormLabel>

          <InputGroup>

          <Input
            id="first_name"
            name="first_name"
            placeholder="first_name"
            {...register("first_name", {
              required: "First name is required",
            })}
          />
          
          <Input
            id="last_name"
            name="last_name"
            placeholder="last_name"
            {...register("last_name", {
              required: "Last name is required",
            })}
          />
          </InputGroup>
          <FormErrorMessage>
            { (errors.first_name && errors.first_name.message) || (errors.last_name && errors.last_name.message)}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.addr}>
          <FormLabel htmlFor="addr">Address</FormLabel>
          <Input
            id="addr"
            placeholder="enter your address"
            {...register("addr", {
              required: "This is required",
              validate: (value, formValues) => {},
            })}
          />
          <FormErrorMessage>
            {errors.addr && errors.addr.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.hospital_name}>
          <FormLabel htmlFor="hospital_name">Hospital name</FormLabel>
          <Select
            id="hospital_name"
            {...register("hospital_name", {
              required: "Hospital name is required",
            })}
            placeholder="Select option"
          >
            <option value="Hopspital 1">Hospital 1</option>
            <option value="Hopspital 2">Hospital 2</option>
            <option value="Hopspital 3">Hospital 3</option>
          </Select>
          <FormErrorMessage>
            {errors.hospital_name && errors.hospital_name.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.date}>
          <FormLabel htmlFor="date">Date</FormLabel>
          <Input
            id="date"
            type="date"
            placeholder="enter your date"
            {...register("date", {
              required: "Date is required",
            })}
          />
          <FormErrorMessage>
            {errors.date && errors.date.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.amount}>
          <FormLabel htmlFor="amount">Amount</FormLabel>

          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              children="$"
            />
            <Input
              id="amount"
              type="number"
              placeholder="enter an amount"
              {...register("amount", {
                required: "Amount is required",
                valueAsNumber: true,
                validate: (value, formValues) => {
                  if (value < 0) return "Please enter a valid amount";
                },
              })}
            />
          </InputGroup>

          <FormErrorMessage>
            {errors.amount && errors.amount.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.file}>
          <FormLabel htmlFor="file">File</FormLabel>
          <Input
            id="file"
            type="file"
            accept="image/*"
            placeholder="enter an file"
            {...register("file", {
              onChange: handleFileChange,
              validate: (value, formValues) => {
                console.log(value);
                if (!selectedFile) return "Please select a file";
              },
            })}
          />

          <FormErrorMessage>
            {errors.amount && errors.amount.message}
          </FormErrorMessage>
        </FormControl>

        <Box mt={4}>
          {selectedFile && (
            <Image src={selectedFile} alt="Preview" maxH="200px" />
          )}
        </Box>
        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          Continue
        </Button>
      </form>
    </div>
  );
}
