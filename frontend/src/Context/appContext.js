import React,{ useReducer,useContext, useState } from "react";

import reducer from "./reducers";
import axios from 'axios'
import Web3 from "web3";

import { CLEAR_ALERT, DISPLAY_ALERT,REGISTER_USER_BEGIN,REGISTER_USER_SUCCESS,REGISTER_USER_ERROR,LOGIN_USER_BEGIN,LOGIN_USER_SUCCESS,LOGIN_USER_ERROR } from "./actions"



const token = localStorage.getItem('token')
const user = localStorage.getItem('user')



const initialState = {
    isLoading:false,
    showAlert:true,
    alertText:'',
    alertType:'',
    user:user? JSON.parse(user):null,
    token:token,
}

const AppContext = React.createContext()

const AppProvider = ({children}) => {
    const [state,dispatch] = useReducer(reducer,initialState)


    
    const displayAlert = () => {
        dispatch({ type:DISPLAY_ALERT })
        clearAlert()
    }

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({type:CLEAR_ALERT})
        },2000)
    }

    const addUserToLocalSt = ({user,token}) => {
        localStorage.setItem('user',JSON.stringify(user))
        localStorage.setItem('token',token)
    }

    const removeUser = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }


    //Função para registo de um novo utilizador
    const registerUser = async (currentUser) => {
        dispatch({
            type:REGISTER_USER_BEGIN
        })

        try {

            const response = await axios.post('http://localhost:5003/api/register',currentUser)
            console.log(response)

            const {user,token} = response.data
            dispatch({ type:REGISTER_USER_SUCCESS,payload:{user,token}})

            addUserToLocalSt({user,token})

        }catch(error) {

            console.log(error.response);

            dispatch({ type:REGISTER_USER_ERROR,payload:{msg:error.response.data.msg} })

        }

        clearAlert()

    }

    const loginUser = async (currentUser) => {
        

        dispatch({
            type:LOGIN_USER_BEGIN
        })

        try {

            const {data} = await axios.post('/api/login',currentUser)

            const {user,token} = data
            
            dispatch({ type:LOGIN_USER_SUCCESS,payload:{user,token}})

            addUserToLocalSt({user,token})

        }catch(error) {

            console.log(error.response);

            dispatch({ type:LOGIN_USER_ERROR,payload:{msg:error.response.data.msg} })

        }

    }

    // const [account, setAccount] = useState(" ");

      //carregar informações básicas do utilizador
      const getUserInfo =  async (getAccount) => {

        const result =  await axios.get('http://localhost:5003/api/register',getAccount)

        console.log(result)



    }


   
        // async function load() {
        //     //const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
            
        //     const web3 = new Web3(Web3.givenProvider || 'http://192.168.1.118:7545');
        //     const accounts = await web3.eth.requestAccounts();

        //     setAccount(accounts[0]);
        // }

        
    

    
    

    return( 
        <AppContext.Provider value={{ ...state, displayAlert, registerUser,loginUser, removeUser}}>

            {children}

        </AppContext.Provider>
    )
}

const useAppContext = () => {
    return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }