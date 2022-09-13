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
    Checkbox,
    

  } from "@chakra-ui/react"
  import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"
  import TableForm from "../components/Tableform"
  import { useState, useEffect} from "react";
  import Alert from '../components/Alert'
  import { useAppContext } from '../Context/appContext'
  import { useNavigate } from 'react-router-dom'
  
  function Document() {
  
      const [descricao, setDescricao] = useState("")
      const [quantidade, setQuantidade] = useState("")
      const [preco, setPreco] = useState("")
      const [total, setTotal] = useState("")
      const [lista, setLista] = useState([])
      const [valorTotal, setvalorTotal] = useState(0)

      const initialState = {
        name:'',
        idAddress:'',
        email:'',
        company:'',
        userName:'',
        contactNumber:'',
        password:'',
        isMember:true,
      
      }
      
      const { user , isLoading , showAlert , displayAlert,registerUser,loginUser } = useAppContext()

      const [values,setValues] = useState(initialState)

      const toggleMember = () => {

        setValues({ ...values , isMember:!values.isMember })
    
      }

      const handleChange = e => {
        setValues({...values,[e.target.name]:e.target.value})
      }

      const {name,idAddress, email,company, userName, contactNumber, password,isMember} = values

      const handleSubmit = e => {
        e.preventDefault()
        
        if(!userName ||!idAddress || !email || !password || (!isMember && !name)){
          displayAlert()
          return
        }
        const currentUser = {name,idAddress, email, company, userName, contactNumber, password}
        console.log(currentUser)
        registerUser(currentUser)
    
        if(isMember) {
    
          console.log("Utilizador já está registado")
    
        }else {
          
        }
    
      }
    
  
  
  
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
          Registo de utilizador
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
                <FormLabel htmlFor="name">Nome</FormLabel>
                <Input value={values.name} name='name' onChange={handleChange}/>              
              </Box>
              <Box w="100%">
                <FormLabel htmlFor="userID">Endereço de Identificação</FormLabel>
                <Input  value={values.idAddress} name='idAddress' onChange={handleChange} />              
              </Box>                    
              </HStack>

              
              
              <HStack sparcing="4">
              <Box w="100%">
                <FormLabel htmlFor="email">E-mail</FormLabel>
                <Input type="email" value={values.email} name="email" onChange={handleChange}/>              
              </Box>
              <Box w="100%">
                <FormLabel htmlFor="company">Empresa</FormLabel>
                <Input id="company" type="text" value={values.company} name= "company" onChange={handleChange} />              
              </Box>             
              </HStack>

              <HStack sparcing="4">
              <Box w="100%">
                <FormLabel htmlFor="userName">Username</FormLabel>
                <Input  value={values.userName} name="userName" onChange={handleChange} />              
              </Box>                    
              
  
              
              <Box w="100%">
                <FormLabel htmlFor="contact">Contacto</FormLabel>
                <Input ivalue={values.contactNumber} name="contact" onChange={handleChange} />              
              </Box>

              </HStack>

              <HStack sparcing="4">
              <Box w="50%">
                <FormLabel htmlFor="password">Palavra passe</FormLabel>
                <Input type="password" value={values.password} name="password" onChange={handleChange}/>              
              </Box> 
              </HStack>


              <HStack sparcing="4">
              
              <Box w="50%">
                <FormLabel htmlFor="activeUser">Utilizador ativo?</FormLabel>
                <Checkbox defaultChecked>Ativo</Checkbox>            
              </Box>             
              </HStack>                  
  
              <HStack justify="center">
                <Button
                w={240}
                p="6"
                type="submit"
                onClick={handleSubmit}
                bg="blue.500"
                color="white"
                fontWeight="bold"
                fontSize="l"
                mt="2"
                _hover={{bg:"blue.800"}}
                
                >
                 Registar na base de dados
                </Button>
  
              </HStack>
  
              
              
            </FormControl> 
          </Center>
                 
  
        </Flex>
        
      </Box>
    );
  }
  
  export default Document;
  