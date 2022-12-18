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
} from "@chakra-ui/react"
import TableForm from "../components/Tableform"
import { useState, useEffect } from "react";
import Web3 from "web3";

import axios from "axios";
import Contract_ABI from "../utils/config_abi.json";
import Navbar from "../Navbar/Navbar";
import Swal from "sweetalert2";




function Document() {


  const [descricao, setDescricao] = useState("")
  const [quantidade, setQuantidade] = useState("")
  const [preco, setPreco] = useState("")
  const [total, setTotal] = useState("")
  const [lista, setLista] = useState([])
  const [valorTotal, setvalorTotal] = useState(0)
  const [sender, setSender] = useState("")
  const [exDate, setExDate] = useState("")
  const [tReceip, setTReceip] = useState("")
  //const [sdate, setSDate] = useState("")
  //const [ndate, setNDate] = useState("")
  const [useData, setUseData] = useState(false)
  const [docID, setdocID] = useState("")

  const [account, setAccount] = useState(); // state variable to set account.

  //Função para carregar carteira digital e carregar as funções s=de informações do utilizador
  useEffect(() => {
    async function load() {
      const web3 = new Web3(Web3.givenProvider || process.env.REACT_APP_PROVIDER_URL);
      const accounts = await web3.eth.requestAccounts();

      setAccount(accounts[0]);
    }
    load();

    userDetail();
    SetfGetDocId();

  }, []);


  //Função para gerar alerta de envio
  const showAlert = () => {
    Swal.fire({
      title: "Success",
      text: "Documento enviado com sucesso",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      window.location.reload();
    });
  }

  //COnsulta dos detalhes do utilizador
  const userDetail = async () => {
    const useInfo = await axios.post(process.env.REACT_APP_GETUSERINFO, { 'idAddress': account })
      .then((result) =>
        setUseData(result.data)
      )

  }

  //Carregar o número do documento atual
  async function SetfGetDocId() {
    const web3 = new Web3(Web3.givenProvider || process.env.REACT_APP_PROVIDER_URL);
    const contract = new web3.eth.Contract(Contract_ABI, process.env.REACT_APP_CONTRACT_NUMBER)
    return contract.methods.IDdoc().call()
      .then((IDdoc) => {
        setdocID(IDdoc);
      })
      .catch((error) => { console.log(error) });
  }

  //Formatar a data de envio
  const current = new Date();
  const ndate = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;


  let Contract_Address = process.env.REACT_APP_CONTRACT_NUMBER;
  const Web3 = require('web3')
  const web3 = new Web3(process.env.REACT_APP_PROVIDER_URL)
  let enviaDocs = new web3.eth.Contract(Contract_ABI, Contract_Address);

  //Função para envio de identificação do doc para blockchain
  async function sendDocs() {
    try {
      enviaDocs.methods.setSendHForm(account, tReceip, sender).send({
        from: account,
        gas: '212000',
        gasPrice: 100000000000,
      })
        .then((result) => {
          sendItemLines();
          showAlert();
        }).catch(console.log);
    } catch (error) {
      console.log(error)

    }
  }


  //Função para envio dos itens da mensagem
  async function sendItemLines() {
    var detailLine = "";
    var count = 1;

    lista.map(function (itemLine) {
      if (count > 1) {
        detailLine += "-";
      }
      detailLine += itemLine.descricao + ";" + itemLine.quantidade + ";" + itemLine.preco + ";" + itemLine.total;
      count++;
    });

    try {
      const Message = await SetfGetDocId();
      console.log(Message);
      const sendMdetail = await enviaDocs.methods.setSendMsgDetail(detailLine, exDate).send({
        from: account,
        gas: '212000',
        //gasPrice: 100000000000 
        //to: iddestnatario,
      }).then((Result) => {
        console.log(Result)

      });
    } catch (error) {
      console.log(error)
    }
    sendMsgDB();
  }

  const iddoc = parseInt(docID) + 1;


  //Função para envio do doc para base de dados
  const sendMsgDB = async () => {
    var detailLineN = "";
    var count = 1;

    lista.map(function (itemLine) {
      if (count > 1) {
        detailLineN += "-";
      }
      detailLineN += itemLine.descricao + ";" + itemLine.quantidade + ";" + itemLine.preco + ";" + itemLine.total;
      count++;
    });

    const useInfo = await axios.post(process.env.REACT_APP_STRANSACTION_URL, { "docNumber": iddoc, "transSender": account, "transReceip": tReceip, "startDate": ndate, "transItems": detailLineN, "endDate": exDate })
      .then((result) =>
        setUseData(result.data)
      )
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
                <FormLabel htmlFor="docID" style={{ fontWeight: 'bold' }}>Nº do documento</FormLabel>
                <Input id="docID" type="text" value={iddoc} disabled />
              </Box>
            </HStack>

            <HStack sparcing="4">
              <Box w="100%">
                <FormLabel htmlFor="nome" style={{ fontWeight: 'bold' }}>Remetente</FormLabel>
                <Input id="sender" />
              </Box>
              <Box w="100%">
                <FormLabel htmlFor="account" style={{ fontWeight: 'bold' }}>Endereço de Identificação</FormLabel>
                <Input id="account" type="text" value={account} disabled onChange={(e) => setAccount(e.target.value)} />
              </Box>
            </HStack>

            <HStack sparcing="4">
              <Box w="100%">
                <FormLabel htmlFor="senderMail" style={{ fontWeight: 'bold' }}>E-mail</FormLabel>
                <Input id="senderMail" type="email" />
              </Box>
              <Box w="100%">
                <FormLabel htmlFor="date" style={{ fontWeight: 'bold' }}>Data de envio</FormLabel>
                <Input id="date" type="text" disabled value={ndate} />
              </Box>
            </HStack>

            <HStack sparcing="4">
              <Box w="100%">
                <FormLabel htmlFor="sender" style={{ fontWeight: 'bold' }}>Destinatário</FormLabel>
                <Input id="sender" type="text" value={sender} onChange={(e) => setSender(e.target.value)} />
              </Box>
              <Box w="100%">
                <FormLabel htmlFor="tReceip" style={{ fontWeight: 'bold' }}>Endereço do Destinatário</FormLabel>
                <Input id="tReceip" type="text" value={tReceip} onChange={(e) => setTReceip(e.target.value)} />
              </Box>
            </HStack>

            <HStack sparcing="4">

              <Box w="50%">
                <FormLabel htmlFor="exDate" style={{ fontWeight: 'bold' }}>Data de expiração</FormLabel>
                <Input id="exDate" type="date" value={exDate} onChange={(e) => setExDate(e.target.value)} />
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
                onClick={sendDocs}
                bg="blue.500"
                color="white"
                fontWeight="bold"
                fontSize="xl"
                mt="2"
                _hover={{ bg: "blue.800" }}

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

export default Document;
