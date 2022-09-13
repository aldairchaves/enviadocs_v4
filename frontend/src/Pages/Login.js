import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useAppContext } from "../Context/appContext";
import { DISPLAY_ALERT,CLEAR_ALERT,REGISTER_USER_BEGIN,REGISTER_USER_SUCCESS,REGISTER_USER_ERROR,LOGIN_USER_BEGIN,LOGIN_USER_SUCCESS,LOGIN_USER_ERROR } from "../Context/actions"

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const App = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  const initialState = {
    username:'',
    
    password:'',
    isMember:true,
  
  }
  
  
  const [values,setValues] = useState(initialState)
  const { user , isLoading , showAlert , displayAlert,registerUser,loginUser } = useAppContext()

  const handleChange = e => {
    setValues({...values,[e.target.name]:e.target.value})
  }

  const toggleMember = () => {

    setValues({ ...values , isMember:!values.isMember })

  }

  const handleSubmit = e => {
    e.preventDefault()
    const {username,password,isMember} = values
    if(!username || !password || (!isMember && !username)){
      displayAlert()
      return
    }
    const currentUser = {username,password}

    if(isMember) {

      loginUser(currentUser)

    }

  }



  

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        
        <Heading color="blue.700">Autenticação do utilizador</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input type="name" placeholder="username" handleChange={handleChange} />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password" }
                    placeholder="Password"
                    handleChange={handleChange}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleSubmit}>
                      {showPassword ? "Hide" : "Mostrar"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                 
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="blue"
                width="full"
              >
                Entrar
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      
    </Flex>
  );
};

export default App;