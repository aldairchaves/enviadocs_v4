import axios from "axios";


const response = await axios.post('http://localhost:5003/api/register',{
    
        "name":"Amanda",
        "idAddress":"0x837492738343",
        "email": "teste@mail.com",
        "company":"Tesla",
        "userName": "asantos",
        "contactNumber":"911868357",
        "password":"teste123"
    

})
console.log(response)

const {user,token} = response.data
dispatch({ type:REGISTER_USER_SUCCESS,payload:{user,token}})



