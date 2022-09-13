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
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react"
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"
import TableForm from "./components/Tableform"
import { useState} from "react";




function App() {

  
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
      bgColor = "black"
      color = "white"
      fontWeight="bold"
      fontSize="4xl"
      pb="8"
      >
        Envio de Documento
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

          <HStack sparcing="4" justify="right">
            <Box w="25%">
              <FormLabel htmlFor="docNumber">Nº do documento</FormLabel>
              <Input id="docNumber" type="number" disabled/>              
            </Box>                             
            </HStack>

            <HStack sparcing="4">
            <Box w="100%">
              <FormLabel htmlFor="nome">Remetente</FormLabel>
              <Input id="sender" />              
            </Box>
            <Box w="100%">
              <FormLabel htmlFor="senderID">Endereço de Identificação</FormLabel>
              <Input id="senderID" />              
            </Box>                    
            </HStack>
            
            <HStack sparcing="4">
            <Box w="100%">
              <FormLabel htmlFor="senderMail">E-mail</FormLabel>
              <Input id="senderMail" type="email" />              
            </Box>
            <Box w="100%">
              <FormLabel htmlFor="date">Data de envio</FormLabel>
              <Input id="date" type="date" />              
            </Box>             
            </HStack>

            <HStack sparcing="4">
            <Box w="100%">
              <FormLabel htmlFor="recipName">Destinatário</FormLabel>
              <Input id="recipName" />              
            </Box>
            <Box w="100%">
              <FormLabel htmlFor="recipID">Endereço do Destinatário</FormLabel>
              <Input id="recipID" />              
            </Box>             
            </HStack>

            <HStack sparcing="4">
            <Box w="100%">
              <FormLabel htmlFor="recipName">Destinatário</FormLabel>
              <Input id="recipName" />              
            </Box>
            <Box w="100%">
              <FormLabel htmlFor="recipID">Endereço do Destinatário</FormLabel>
              <Input id="recipID" />              
            </Box>    
            </HStack>

            <HStack sparcing="4">
            
            <Box w="50%">
              <FormLabel htmlFor="expDate">Data de expiração</FormLabel>
              <Input id="expDate" type="date" />              
            </Box>             
            </HStack>

            <TableContainer>
              <TableForm
                  descricao={descricao}
                  setDescricao={setDescricao}
                  quantidade={quantidade}
                  setQuantidade={setQuantidade}
                  preco={preco}
                  setPreco={setPreco}
                  total={total}
                  setTotal={setTotal}
                  setLista={setLista}
                  lista={lista}
                  valorTotal={valorTotal}
                  setvalorTotal={setvalorTotal}

              />

            </TableContainer>            

            <HStack justify="center">
              <Button
              w={240}
              p="6"
              type="submit"
              bg="blue.500"
              color="white"
              fontWeight="bold"
              fontSize="xl"
              mt="2"
              _hover={{bg:"blue.800"}}
              >
                Enviar
              </Button>

            </HStack>

            
            
          </FormControl> 
        </Center>
               

      </Flex>
      
    </Box>
  );
}

export default App;
