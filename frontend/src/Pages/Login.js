import React, { useState, useEffect } from 'react'
import Alert from '../components/Alert'
import { useAppContext } from '../Context/appContext'
import { useNavigate } from 'react-router-dom'
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
  FormControl,
  FormHelperText,
  InputRightElement
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";


const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);



const initialState = {
  email: '',
  password: '',
  isMember: true,

}

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState(initialState)
  const navigate = useNavigate()

  const handleShowClick = () => setShowPassword(!showPassword);

  const { user, isLoading, displayAlert, loginUser } = useAppContext()



  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  //Função de login do utilizador
  const handleSubmit = e => {
    e.preventDefault()
    const { email, password, isMember } = values
    if (!email || !password || (!isMember && !email)) {
      displayAlert()
      return
    }
    const currentUser = { email, password }

    if (isMember) {

      loginUser(currentUser)

    }
  }


  useEffect(() => {

    if (user) {
      setTimeout(() => {
        navigate('/home')
      }, 2000)
    }

  }, [user, navigate])

  return (

    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Box>
        <Heading color="blue.700" height="20vh">BudgetDApp</Heading>
      </Box>
      <br />
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >

        <h1 color="blue.700">Autenticação do utilizador</h1>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmit}>
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
                  <Input type="text" placeholder="username" name='email' value={values.email} onChange={handleChange} />
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
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name='password'
                    value={values.password}
                    onChange={handleChange}
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
                disabled={isLoading}
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

export default Login