import{
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
import { useState} from "react";





function Transactions() {

  
    const [descricao, setDescricao] = useState("")
    const [quantidade, setQuantidade] = useState("")
    const [preco, setPreco] = useState("")
    const [total, setTotal] = useState("")
    const [lista, setLista] = useState([])
    const [valorTotal, setvalorTotal] = useState(0)


  return (
    <Box h="h100vh">
      <Center as="header"
      h={150}
      bgColor = "blue.600"
      color = "white"
      fontWeight="bold"
      fontSize="4xl"
      pb="8"
      >
        Listagem de Transações
      </Center>
      <Flex
      align="center"
      justify = "center"
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

         

            
            
          </FormControl> 
        </Center>
               

      </Flex>
      
    </Box>
  );
}

export default Transactions;
