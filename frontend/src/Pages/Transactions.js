import {
  Flex,
  Box,
  Center,
  FormControl,
} from "@chakra-ui/react"
import React, { useEffect } from "react";
import axios from "axios";
import Table from '../components/TableTransactions';
import Navbar from "../Navbar/Navbar";

function Transactions() {


  const [showresult, setShowResult] = React.useState([]);

  var IDREM = localStorage.getItem('IDrem');


  //Função para buscar informações das transaçõespor utilizador
  const getUserInfo = async () => {
    var idAddress = { "transSender": IDREM }

    const setResult = await axios.post(process.env.REACT_APP_GETDOC_URL, idAddress)
      .then((res) => {
        setShowResult(res.data.docs)
      })
  }

  useEffect(() => {


    getUserInfo();

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
        Listagem de Transações
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
          borderRadius={5}
          p="6"
          boxShadow={"0 1px 2px #ccc"}
        >

          <FormControl display="flex" flexDir="column" gap="4">

            {showresult ? (
              <>
                <Table lista={showresult} />
              </>
            ) : (
              <>
              </>
            )}

          </FormControl>

        </Center>


      </Flex>
    </Box>
  );
}

export default Transactions;
