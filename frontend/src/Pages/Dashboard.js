import {
  Flex,
  Box,
  Center,
  FormControl,
  HStack
} from "@chakra-ui/react"
import { useState, useEffect } from "react";
import Web3 from "web3";
import Navbar from "../Navbar/Navbar";


function Dashboard() {
 
  var account2 = "";

  const [account, setAccount] = useState();
  const Web3 = require('web3')
  const [defineBalance, setDefineBalance] = useState();

  //Função para carregar a carteira digital
  useEffect(() => {
    async function load() {
      const web3 = new Web3(Web3.givenProvider || process.env.PROVIDER_URL);
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);
      account2 = (accounts[0]);
      const balance = await web3.eth.getBalance(account2);
      setDefineBalance(balance / 1000000000000000000);
      localStorage.setItem("IDrem", accounts)
    }
    load();
  }, []);


  return (

    <Box h="h100vh">
      <Navbar />
      <Center as="header"
        h={180}
        bgColor="blue.600"
        color="white"
        fontWeight="bold"
        fontSize="4xl"
        pb="8"
      >
        Dashboard
      </Center>
      <Flex
        align="center"
        justify="center"
        bg="blackAlpha.200"
        h="calc(100vh - 150px"
      >
        <Center
          w="100%"
          maxW={940}
          bg="white"
          top={180}
          position="absolute"
          borderRadius={15}
          p="16"
          boxShadow={"0 1px 2px #ccc"}
        >
          <FormControl display="flex" flexDir="column" gap="4">

            <HStack sparcing="4" justify="left">
              <Box w="100%">
                <>Conta: {account}</>
                <br />
              </Box>
            </HStack>
            <HStack sparcing="4" justify="left">
              <Box w="100%">
                <br />
                Seu Saldo é: {defineBalance}
              </Box>
            </HStack>

          </FormControl>
        </Center>


      </Flex>

    </Box>
  );
}

export default Dashboard;
