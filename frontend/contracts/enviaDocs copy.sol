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
   
//estrutura dos dados dos utilizadores
    struct user{
        uint uId;
        string uName;
        address uAddress;
        bool status;
    }
 
//mapeamento da estrutura dos utilizadoes
     mapping(uint => user) private users;
     mapping(address => user) private checkAddress;
     mapping(address => user[]) private EditUser;
     event savingsEvent(uint indexed _memberId);
	 user[] private UserArray;


//################################Gestão de Users###############################################
//funcao para criar um novo user da DApp
    function addUser(
        string memory _uName,         
        address _uAddress,
        bool _status         
        ) onlyOwner external returns(uint){
        require(checkAddress[_uAddress].uId == 0, "Address is already in use");
        uint memberID = userID++;
        user memory s = user(userID, _uName, _uAddress, _status);
        checkAddress[_uAddress] = s;
        users[memberID] = user(memberID, _uName, _uAddress, _status);
		UserArray.push(user(memberID, _uName, _uAddress, _status));		
        return memberID;
    }
//funcao para editar user
    function edituser(uint _uId, string memory _newName, address _newAddress, bool _status) public returns(string memory, address){
    
	UserArray.push(user(userID, _newName, _newAddress, _status));

    return(_newName, _newAddress);

    }

//funcao para eliminar user
    function deleteUser(uint _uId, address _idAdress, string memory _uName) public returns (string memory) {
        user[] storage editUser = EditUser[msg.sender];
        for(uint i = 0; i < editUser.length; i++){
         if(editUser[i].uAddress == _idAdress && editUser[i].uId == _uId
         ){
             delete editUser[i].uAddress;
         } 
         
        }return("Utilizador eliminado");

    }

//################################FIM Gestão de Users###############################################


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
        ) public returns (uint[] memory) {            
            bool userExists = false;
            bool status = true;        
        IDdoc++;

        for(uint i= 0; i < UserArray.length; i++){
            if (UserArray[i].uAddress == _hSender && UserArray[i].status == true) {
                userExists = true;
            }
        }        
        if(userExists){
            FormHeader.push(formHeader(IDdoc,_hSender,_hIdDest, _hDestName));
            headerID.push(IDdoc);
           return (headerID);
        } else {
           revert();
           }
    }

//estrutura para os detalhes da mensagem
    struct mDetail {
        uint mID;
        string mItems;
        string mData;

    }

    mDetail[] MDetail;

//Funcao para o envio dos detalhes da mensagem
    function sendMsgDetail(string memory _mItems, string memory _mData ) public returns (string memory) {
        address _mAddress = msg.sender;
        bool userExists = false;       
        
        for(uint i= 0; i < UserArray.length; i++){
            if (UserArray[i].uAddress == _mAddress  && UserArray[i].status == true) {
                userExists = true;
            }
        }        
        if(userExists){
            MDetail.push(mDetail(IDdoc,_mItems, _mData));
           return "Notas enviadas";
        } else {
           revert();
           }
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
        string memory _mData;

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
                            _mData = MDetail[i].mData;               
                        }
                    }                     
                }
            }        
            
           return (IDdoc,_hIdDest, _hDestName,_mItems, _mData);
       
    }

    //funcao para retornar a lista de users
    function returUsers() onlyOwner public view returns(uint[] memory, string[] memory, address[] memory){
        
        uint[] memory uId = new uint[](userID);
        string[] memory uName = new string[](userID);
        address[] memory uAddress = new address[](userID);
        for (uint i = 0; i < userID; i++) {
           user storage UserStorage = users[i];
            uId[i] = UserStorage.uId;
            uName[i] = UserStorage.uName;
            uAddress[i] = UserStorage.uAddress;
        }
        return (uId, uName, uAddress);
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
//################################Fim das Funcoes de consulta#####################################################


}