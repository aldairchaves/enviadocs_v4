import {
  Flex,
  Box,
  Center,
  FormControl,
  Input,
  FormLabel,
  HStack,
  RadioGroup,
  Radio,
  Button,



} from "@chakra-ui/react"
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"
import TableForm from "../components/Tableform"
import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from '../components/TableTransactions';







function Transactions() {


  const [descricao, setDescricao] = useState("")
  const [quantidade, setQuantidade] = useState("")
  const [preco, setPreco] = useState("")
  const [total, setTotal] = useState("")
  const [lista, setLista] = useState([])
  const [valorTotal, setvalorTotal] = useState(0)
  const [showresult, setShowResult] = React.useState([]);
  let [lineOne, setLineOne] = React.useState('');


  const getUserInfo = async () =>  {
 
    var idAddress = { "transID": "0x51bf60a6d4A36d870157B296A2A84Eb94fC9034c" }
    const setResult = await axios.post('http://localhost:5003/api/getdoc', idAddress)
      .then((res) => {
        setShowResult(res.data.docs)
        
        console.log(res.data.docs)

      })
  }

  useEffect(() => {

   
   getUserInfo();
   
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
          maxW={840}
          bg="white"
          top={100}
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
      <button onClick={getUserInfo}>Teste</button>
    </Box>
  );
}

export default Transactions;
