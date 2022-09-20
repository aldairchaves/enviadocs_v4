import React from "react"
import { useNavigate } from 'react-router-dom';


export default function Table({lista}) {
    const navigate = useNavigate();
    console.log('Aquiiiiiiiiiiiiiiiiiii');
    function openDetailsDoc(docNumber) {
        console.log(docNumber);
        navigate('/detailtrans', { docnumber: docNumber});
        //history.push({pathname:'/detailstransaction/'+btoa(params)});	
    }

    return (
        <>

           <table width="100% " className="mb-10" style={{marginTop: 75,}}>
              
              <thead>
                    <tr className="bg-gray-100">
                    <td style={{fontWeight: 'bold'}}>Número do Documento</td>
                    <td style={{fontWeight: 'bold'}}>Data Transação</td>
                    <td style={{fontWeight: 'bold'}}>Itens</td>
                    <td style={{fontWeight: 'bold'}}>Data de Expiração</td>
                    </tr>
                </thead>
             {lista.map((trans, key) => (
                 
                <React.Fragment key={key}>
                               
                <tbody >
                    <tr>
                        <td >{trans.docNumber}</td>
                        <td>{trans.startDate}</td>
                        <td>{trans.transItems}</td>
                        <td>{trans.endDate}</td>                        
                        <td><button onClick={() => openDetailsDoc(trans.docNumber)}>Ver Detalhes</button></td>
                    </tr>
                </tbody>
            
                 </React.Fragment>
             ))}
         </table>
        </>
    )
}