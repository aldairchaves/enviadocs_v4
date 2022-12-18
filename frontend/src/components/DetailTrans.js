import {
  Flex,
  Box,
  Center,
  FormControl,
  Input,
  FormLabel,
  HStack,
  TableContainer
} from "@chakra-ui/react"

import { useState, useEffect } from "react";
import Web3 from "web3";
//import { useAppContext } from "../Context/appContext";
import axios from "axios";
import Contract_ABI from "../utils/config_abi.json";
import { useLocation } from 'react-router-dom';
import TableFormDetails from "./TableFormDetails";
import Navbar from "../Navbar/Navbar";

var myaccount = "";
const DetailTrans = () => {

  const [lista, setLista] = useState([])

  const [useData, setUseData] = useState(false)

  const location = useLocation();
  const [destinatario, setDestinatario] = useState("")
  const [iddestnatario, setIdDestinatario] = useState("")
  const [dataexpiracao, setDataExpiracao] = useState("")
  const [numerodocumento, setNumeroDocumento] = useState("")
  const [msdID, setMsdID] = useState("")

  const [account, setAccount] = useState(); // state variable to set account.
  const curretDoc = location.state.docnumber;
  const contractAdress = process.env.REACT_APP_CONTRACT_NUMBER



  useEffect(() => {



    async function load() {

      const web3 = new Web3(Web3.givenProvider || process.env.REACT_APP_PROVIDER_URL);
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);
      myaccount = accounts[0];

    }

    load();
    SetGetMsg();

  }, []);


  var IDREM = localStorage.getItem('IDrem');

  const userDetail = () => {
    const useInfo = axios.post(process.env.REACT_APP_GETUSERINFO, { 'idAddress': IDREM })
      .then((result) =>
        // console.log(result)
        setUseData(result.data)
      )

  }

  const current = new Date();
  const ndate = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;



  //Função para determinar os detalhes do doc
  async function SetDetailsDoc() {
    const web3 = new Web3(Web3.givenProvider || process.env.REACT_APP_PROVIDER_URL);
    const contract = new web3.eth.Contract(Contract_ABI, process.env.REACT_APP_CONTRACT_NUMBER)
    const Message = await SetfGetDocId();

    var t = await contract.methods.getDocDetail(curretDoc).call()
      .then((readDoc) => {

        return readDoc;

      })
      .catch((error) => { console.log(error) });


  }


  //Função para retornar o os detalhes dos itens da blockchain
  async function SetGetMsg() {
    const web3 = new Web3(Web3.givenProvider || process.env.REACT_APP_PROVIDER_URL);
    const contract = new web3.eth.Contract(Contract_ABI, process.env.REACT_APP_CONTRACT_NUMBER)


    const result = await contract.methods.getMsgDetail(curretDoc).call()
      .then((readmsg) => {

        var lines = readmsg.toString().split("-");
        for (let index = 0; index < lines.length; index++) {
          var line = lines[index].split(";");

          const novoItem = {
            id: index,
            descricao: line[0],
            quantidade: line[1],
            preco: line[2],
            total: line[3]
          }
          
          //if(novoItem.id === 0 && lista.length === 0)
          // {
          setLista(lista => [...lista, novoItem]);
          //}

          for (let ind = 0; ind < lista.length; ind++) {
            if (lista[ind].id !== novoItem.id) {
              console.log("Id Antigo: ", lista[ind].id);
              console.log("Id Novo: ", novoItem.id);
              setLista(lista => [...lista, novoItem]);
              console.log("Lista", lista)
            }
          }
        }

        //Retorna os detalhes de remetente, destinatário e data
        contract.methods.getDocDetail(curretDoc).call()
          .then((readDoc) => {
            setDataExpiracao(readDoc[4]);
            setDestinatario(readDoc[2]);
            setIdDestinatario(readDoc[1]);
            setNumeroDocumento(curretDoc);
            setDestinatario(readDoc[2]);
          })
          .catch((error) => { console.log(error) });

        const useInfo = axios.post(process.env.REACT_APP_GETUSERINFO, { 'idAddress': myaccount })
          .then((result) =>
            // console.log(result)
            setUseData(result.data)
          )

      })
      .catch((error) => { console.log(error) });
  }


  //Função para retornar o ID do doc atual
  async function SetfGetDocId() {
    const web3 = new Web3(Web3.givenProvider || process.env.REACT_APP_PROVIDER_URL);

    const contract = new web3.eth.Contract(Contract_ABI, process.env.REACT_APP_CONTRACT_NUMBER)
    return contract.methods.IDdoc().call()
      .then((IDdoc) => {
        setMsdID(IDdoc);
        return IDdoc;
      })
      .catch((error) => { console.log(error) });

  }

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
        Envio de Documento
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

            <HStack sparcing="4" justify="right">
              <Box w="25%">
                <FormLabel htmlFor="docNumber">Nº do documento</FormLabel>
                <Input id="docNumber" type="number" value={numerodocumento} disabled />
              </Box>
            </HStack>

            <HStack sparcing="4">
              <Box w="100%">
                <FormLabel htmlFor="nome">Remetente</FormLabel>
                <Input id="sender" value={useData.name} disabled />
              </Box>

              <Box w="100%">
                <FormLabel htmlFor="senderID">Endereço de Identificação</FormLabel>
                <Input id="senderID" value={account} disabled />
              </Box>
            </HStack>

            <HStack sparcing="4">
              <Box w="100%">
                <FormLabel htmlFor="senderMail">E-mail</FormLabel>
                <Input id="senderMail" type="email" value={useData.email} disabled />
              </Box>
              <Box w="100%">
                <FormLabel htmlFor="date">Data de envio</FormLabel>
                <Input id="date" type="text" value={ndate} disabled />
              </Box>
            </HStack>

            <HStack sparcing="4">
              <Box w="100%">
                <FormLabel htmlFor="recipName">Destinatário</FormLabel>
                <Input id="recipName" value={destinatario} disabled />
              </Box>

              <Box w="100%">
                <FormLabel htmlFor="recipID">Endereço do Destinatário</FormLabel>
                <Input id="recipID" value={iddestnatario} disabled />
              </Box>
            </HStack>



            <HStack sparcing="4">

              <Box w="50%">
                <FormLabel htmlFor="dataexpiracao">Data de expiração</FormLabel>
                <Input id="dataexpiracao" type="text" disabled value={dataexpiracao} />
              </Box>
            </HStack>

            <TableContainer>

              <TableFormDetails lista={lista} />

            </TableContainer>





          </FormControl>



        </Center>


      </Flex>

    </Box>
  );
}


export default DetailTrans;
