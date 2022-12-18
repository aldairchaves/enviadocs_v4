import{
    Flex,
    Box,
    Center,
    FormControl,
    Input,
    FormLabel,
    HStack,
    Button,    
    Checkbox,
  } from "@chakra-ui/react"
  import { useState, useEffect} from "react";
  import Alert from '../components/Alert'
  import { useAppContext } from '../Context/appContext'
  import Web3 from "web3";
  import Contract_ABI from "../utils/config_abi.json";
  import Swal from "sweetalert2";
  
  function Document() {
    
      const [account, setAccount] = useState();

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
      
      const {displayAlert,registerUser } = useAppContext()

      const [values,setValues] = useState(initialState)

    
      const regMsg = () => {
        Swal.fire({
            title: "Success",
            text: "Utilizador Registado com sucesso",
            icon: "success",
            confirmButtonText: "OK",
          }).then(()=>{
            window.location.reload();
          });
    }

      const handleChange = e => {
        setValues({...values,[e.target.name]:e.target.value})
      }

      const {name,idAddress, email,company, userName, contactNumber, password,isMember} = values

      
      //Registo de utilizador na base de dados
      const handleSubmit = e => {
        e.preventDefault()
        
        if(!userName ||!idAddress || !email || !password || (!isMember && !name)){
          displayAlert()
          return
        }
        const currentUser = {
          "name":name,
          "idAddress":idAddress,
          "email": email,
          "company":company,
          "userName": userName,
          "contactNumber":company,
          "password":password
        }
        console.log(currentUser)
        registerUser(currentUser)
        regUser();
        regMsg();
    
        if(isMember) {
    
          console.log("Utilizador já está registado")
    
        }else {
          
        }
    
      }


      useEffect(() => {
        async function load() {
            const web3 = new Web3(Web3.givenProvider || process.env.REACT_APP_PROVIDER_URL);
            const accounts = await web3.eth.requestAccounts();

            setAccount(accounts[0]);
        }

        load();
        
        

    }, []);


      let Contract_Address = process.env.REACT_APP_CONTRACT_NUMBER;
      const Web3 = require('web3')
      const web3 = new Web3(process.env.REACT_APP_PROVIDER_URL)
      let enviaDocs = new web3.eth.Contract(Contract_ABI, Contract_Address);

      
//Registo de utilizador na blockchain
      async function regUser() {
        try {
                enviaDocs.methods.grantPermission(values.idAddress).send({
                from: account,
                gas: '212000',
                gasPrice: 100000000000 
               
            })
            .then((result) => {
               
                console.log("Executada");
            }).catch(console.log);            
        } catch (error) {
            console.log(error)

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
                 Registar utilizador
                </Button>
                </HStack>
                
  
              
              
            </FormControl> 
          </Center>
                 
  
        </Flex>
        
      </Box>
    );
  }
  
  export default Document;
  