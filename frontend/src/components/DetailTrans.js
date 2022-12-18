import{
    Flex,
    Box,
    Center,
    FormControl,
    Input,
    FormLabel,
    HStack,
    
    Button,
    
    TableContainer,
    AccordionIcon,
  } from "@chakra-ui/react"
  import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"
  import TableForm from "./Tableform"
  import { useState, useEffect, useContext} from "react";
  import Web3 from "web3";
  import { useAppContext } from "../Context/appContext";
  import axios from "axios";
  import Contract_ABI from "../utils/config_abi.json";
  import { useParams } from 'react-router-dom';
  

  
  
  function Document({route, navigation}) {
      const parms = useParams();
      const [descricao, setDescricao] = useState("")
      const [quantidade, setQuantidade] = useState("")
      const [preco, setPreco] = useState("")
      const [total, setTotal] = useState("")
      const [lista, setLista] = useState([])
      const [valorTotal, setvalorTotal] = useState(0)
      const [sender, setSender] = useState("")
      const [useData, setUseData] = useState(false)

     

      const [account, setAccount] = useState(); // state variable to set account.

     const { getAccount} = useAppContext()

      useEffect(() => {
          async function load() {
              //const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
              const web3 = new Web3(Web3.givenProvider || 'http://192.168.1.118:7545');
              const accounts = await web3.eth.requestAccounts();
              
              setAccount(accounts[0]);
          }

          
          load();
         
          
          userDetail ()
         
  
      }, []);
  
      const  userDetail = () => {
        const useInfo =   axios.post('http://localhost:5003/api/getuserinfo', {'idAddress': "0x51bf60a6d4A36d870157B296A2A84Eb94fC9034c"})
            .then((result)=>
            // console.log(result)
            setUseData(result.data)
            )
           
          }

          const current = new Date();
          const ndate = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

        
          let Contract_Address = '0x8FCC014fB765510788901bE99b1E51654Beea83C';
          const Web3 = require('web3')
          const web3 = new Web3('http://192.168.1.118:7545')
          let enviaDocs = new web3.eth.Contract(Contract_ABI, Contract_Address);

          async function sendDocs() {
            console.log('Teste 1')             
            try {
                    enviaDocs.methods.setSendHForm('0x51bf60a6d4A36d870157B296A2A84Eb94fC9034c', '0x53cf168CF045801C4eF9bF57A3eB601DA9850425','Teste final').send({
                    from: account,
                    gas: '212000',
                    gasPrice: 100000000000, 
                    
                })
                .then((result) => {
                  console.log(result)
                  sendItemLines();
                    console.log("Executada");
                }).catch(console.log);            
            } catch (error) {
                console.log(error)
    
            }
        }
      
        async function SetfGetDocId() {
          const web3 = new Web3(Web3.givenProvider || 'http://192.168.1.118:7545');
          const contract = new web3.eth.Contract(Contract_ABI, '0x8FCC014fB765510788901bE99b1E51654Beea83C')
          return contract.methods.IDdoc().call()
          .then((IDdoc) => {
              return IDdoc;
          })
          .catch((error) => {console.log(error)});
          //console.log(result);
          //return result;    
      }

      async function sendItemLines() {               
        var detailLine = "";
        var count = 1;

        lista.map(function(itemLine) {
            if(count > 1){
                detailLine+="-";
            }  
            detailLine += itemLine.descricao+";"+itemLine.quantidade+";"+itemLine.preco+";"+itemLine.total;
            count++;
        });
        // var encodeData = btoa(detailLine)
        // detailLine = encodeData;

        //var dataConcat = datadocumento+";"+dataexpiracao+";"+telcontato;

        // console.log()
        try {
            const Message = await SetfGetDocId();
            console.log(Message);
            const sendMdetail = await enviaDocs.methods.setSendMsgDetail('notas','teste').send({
                from: account,
                gas: '212000',
                //gasPrice: 100000000000 
                //to: iddestnatario,
            }).then((Result) =>{
                console.log(Result)

            });
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
                <Input id="sender" value={useData.name} disabled/>              
              </Box>
              <Box w="100%">
                <FormLabel htmlFor="senderID">Endereço de Identificação</FormLabel>
                <Input id="senderID" value={account} disabled/>              
              </Box>                    
              </HStack>
              
              <HStack sparcing="4">
              <Box w="100%">
                <FormLabel htmlFor="senderMail">E-mail</FormLabel>
                <Input id="senderMail" type="email" value={useData.email} disabled/>              
              </Box>
              <Box w="100%">
                <FormLabel htmlFor="date">Data de envio</FormLabel>
                <Input id="date" type="text" value={ndate} disabled />              
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
                onClick={sendDocs}
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
  
  export default Document;
  