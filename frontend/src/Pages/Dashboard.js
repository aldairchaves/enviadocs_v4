import {
  Flex,
  Box,
  Center,
  FormControl,
  Input,
  FormLabel,
  HStack,

  Button,

  TableContainer,
  AccordionIcon,
} from "@chakra-ui/react"
import TableForm from "../components/Tableform"
import { useState, useEffect, useContext } from "react";
import Web3 from "web3";
import { useAppContext } from "../Context/appContext";
import axios from "axios";
import Contract_ABI from "../utils/config_abi.json";




function Dashboard() {


  var account2 = "";

  const [account, setAccount] = useState();
  const Web3 = require('web3')
  //const web3 = new Web3('http://127.0.0.1:7545')
  //let enviaDocs = new web3.eth.Contract(Contract_ABI, Contract_ABI.address);


  const [defineBalance, setDefineBalance] = useState();

  useEffect(() => {
    async function load() {
      const web3 = new Web3(Web3.givenProvider || 'http://192.168.1.118:7545');
      const accounts = await web3.eth.requestAccounts();

      setAccount(accounts[0]);
      console.log(accounts);
      account2 = (accounts[0]);
      const balance = await web3.eth.getBalance(account2);
      setDefineBalance(balance / 1000000000000000000);

    }

    load();
  }, []);


  return (
    <Box h="h100vh">
      <Center as="header"
        h={150}
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
          maxW={840}
          bg="white"
          top={100}
          position="absolute"
          borderRadius={5}
          p="6"
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
