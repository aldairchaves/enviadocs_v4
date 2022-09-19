const axios = require('axios');





// axios.defaults.headers.common['User-Agent'] = 'PostmanRuntime/7.26.2';
//  axios.f ('http://localhost:5003/api/getuserinfo', 
        
//         {params:{idAddress: '0x51bf60a6d4A36d870157B296A2A84Eb94fC9034c' }}
//   )
//             .then(res => {
//               //return res.data;
//               console.log(res.data)
              
//             })
       

// axios.get('http://localhost:5003/api/getuserinfo', {
          
//           "idAddress":"9879sx9a6a68xa"
          
// }.then(response => {
//         console.log(response)
// })
// )


// const reponse =  axios({
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' },
//         data: JSON.stringify({
//           idAddress: '0x51bf60a6d4A36d870157B296A2A84Eb94fC9034c'
//         }),
//         url: 'http://localhost:5003/api/getuserinfo',
//       })
//       console.log(reponse)

const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
          "idAddress": "0x51bf60a6d4A36d870157B296A2A84Eb94fC9034c"
        }),
      };
      fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });