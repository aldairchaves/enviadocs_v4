// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

//import './evdToken.sol';

contract enviaDocs {

    bool private status = true;

    address admin;

    constructor(){
        admin = msg.sender;
    }
    
    modifier onlyOwner(){
        require (admin == msg.sender);
        _;
    }

//variavel inicial para o id dos membros  
    uint32 userID=0;
   

 
//mapeamento da estrutura dos utilizadoes
    event GrantPermission(address indexed account);
    event RevokePermission(address indexed account);
    mapping(address =>bool) public userAccess;

   
    



//################################Gestão de Users###############################################
//funcao interna para atribuir permissão ao utilizador para utilizar o contrato
    function userPermission(address _account) public onlyOwner {
         userAccess[_account] = true;
         emit GrantPermission( _account);
     }
//Funcao receber a permissão e gravar na funçao interna
    function grantPermission(address _account) external onlyOwner {
        userPermission(_account);
    }
//Funçao para remover o acesso do utilizador
      function revokePermission(address _account) public onlyOwner {
        userAccess[_account] = false;
        emit RevokePermission(_account);
    }

 
//################################Envio do Form#####################################################
    uint public IDdoc = 0;

//Estrutura do formulario - Cabeçalho
    struct formHeader {
        uint hID;
        address hSender;
        address hIdDest;
        string hDestName;       
    }

    formHeader[] FormHeader;

    uint[] public headerID;

//função para envio do cabeçalho do form
    function sendHForm (
        address _hSender,
        address _hIdDest,        
        string memory _hDestName 
        ) internal returns (uint[] memory) {            
               
        IDdoc++;

        if(userAccess[msg.sender] == true){
            FormHeader.push(formHeader(IDdoc,_hSender,_hIdDest, _hDestName));
            headerID.push(IDdoc);
           return (headerID);
        } else {
           revert();
           }
    }
    

    function setSendHForm( address _hSender,
        address _hIdDest,        
        string memory _hDestName) external {
            sendHForm(_hSender, _hIdDest,  _hDestName);
        }



   //estrutura para os detalhes da mensagem
    struct mDetail {
        uint mID;
        string mItems;
        string mDate;

    }

    mDetail[] MDetail;

//Funcao para o envio dos detalhes da mensagem
    function sendMsgDetail(string memory _mItems, string memory _mDate ) internal returns (string memory) {
        if(userAccess[msg.sender] == true){
            MDetail.push(mDetail(IDdoc,_mItems, _mDate));
           return "Notas enviadas";
        } else {
           revert();
           }
    } 

    function setSendMsgDetail (string memory _mItems, string memory _mDate ) external {
        sendMsgDetail(_mItems, _mDate);
    }

uint[] DocResult;

string myID;
//Funcao para retornar documentos por utilizador
function returnDocuments(address _userID) public returns (uint[] memory){
        uint myID;
        address _hSender;
        address _hIdDest; 
        string memory _hDestName;        

            for(uint i= 0; i < FormHeader.length; i++){
                if (FormHeader[i].hSender == _userID) {                    
                        myID = FormHeader[i].hID;
                    _hSender = FormHeader[i].hSender;
                    _hIdDest = FormHeader[i].hIdDest; 
                    _hDestName = FormHeader[i].hDestName; 
                    DocResult.push(myID);                                     
                }
            }       
              
           return (DocResult);
    }

//################################Fim do Envio do Form#####################################################


//################################Funcoes de consulta#####################################################

//estrutura para envio da parte superior do formulario
    function getDocDetail(uint _docID) public view returns (uint, address, string memory, string memory, string memory){
        uint myID;
        string memory _uName;
        address _hIdDest; 
        string memory _hDestName;
        //string memory _hExpDate;
        string memory _mItems;
        string memory _mDate;

        //address _mAddress = msg.sender;
        //bool resultCreate = false; 

            for(uint i= 0; i < FormHeader.length; i++){
                if (FormHeader[i].hID == _docID) {
                    //resultCreate = true;
                    _hIdDest = FormHeader[i].hIdDest;
                    _hDestName = FormHeader[i].hDestName;
                    //_hExpDate = FormHeader[i].hExpDate;
                    for(uint i= 0; i < MDetail.length; i++){
                        if (MDetail[i].mID == FormHeader[i].hID) {
                            _mItems = MDetail[i].mItems;
                            _mDate = MDetail[i].mDate;               
                        }
                    }                     
                }
            }        
            
           return (IDdoc,_hIdDest, _hDestName,_mItems, _mDate);
       
    }

  

    function getMsgDetail(uint _docID) public view returns (string memory){
        string memory _mItems;
        
        
            for(uint i= 0; i < MDetail.length; i++){
                if (MDetail[i].mID == _docID) {
                    _mItems = MDetail[i].mItems;
                                 
                }
                                       
                
            }        
            
           return (_mItems);
       
    }

}