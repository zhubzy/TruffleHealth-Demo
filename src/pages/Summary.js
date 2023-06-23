import React from "react";
import { Box, Text, Button, Heading, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import SummaryComponent from "../component/Summary";
import { selectData, add, selectTemp, del_temp } from "../features/dataSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function SummaryPage() {
  const formData = useSelector(selectTemp);
  const navigate = useNavigate();
  const [loading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();
  function onSubmit() {
    return new Promise((resolve) => {
      setIsLoading(true);
      setTimeout(() => {
        dispatch(add(formData));
        dispatch(del_temp());

        navigate("/");
        setIsLoading(false);
        resolve();
      }, 500);
    });
  }

  return (
    <Box
      display="flex"
      height="100vh"
      flexDirection={"column"}
      justifyItems="center"
      alignItems="center"
    >
      <Heading size="md">Summary</Heading>
      <SummaryComponent formData={formData} />
      <HStack spacing="24px">
        <Button colorScheme="blue">
          <Link to="/form">Back</Link>
        </Button>
        <Button onClick={onSubmit} isLoading={loading} colorScheme="blue">
          Submit
        </Button>
      </HStack>
    </Box>
  );
}
