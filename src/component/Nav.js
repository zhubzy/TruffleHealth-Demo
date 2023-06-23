import React, { useState } from "react";
import { Text, Flex, Spacer } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginOut } from "../features/dataSlice";

const Nav = () => {
  const [scroll, setScroll] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeScroll = () =>
    document.body.scrollTop > 80 || document.documentElement.scrollTop > 80
      ? setScroll(true)
      : setScroll(false);

  window.addEventListener("scroll", changeScroll);

  const handleLogout = () => {
    // Invalidate access toke here
    dispatch(loginOut())
    // Redirect to login page
    navigate("/TruffleHealth-Demo/login");
  };

  return (
    <Flex
      h="10vh"
      alignItems="center"
      p="6"
      boxShadow={scroll ? "base" : "none"}
      position="sticky"
      top="0"
      zIndex="sticky"
      w="full"
      bg={"gray.200"}
    >
      <Text fontSize="xl" fontWeight="bold">
        <Link to="/TruffleHealth-Demo">Truffle Health Home</Link>
      </Text>

      <Spacer />

      <Flex alignItems="center">
        <Text fontSize="md" mr="10">
          <Link to="/TruffleHealth-Demo/form">Fill out a form</Link>
        </Text>
        <Text fontSize="md" onClick={handleLogout} style={{ cursor: "pointer" }}>
          Logout
        </Text>
      </Flex>
    </Flex>
  );
};

export default Nav;
