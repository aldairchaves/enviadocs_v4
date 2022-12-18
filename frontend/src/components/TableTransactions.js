import React from "react"
import { useNavigate } from 'react-router-dom';

import Moment from 'react-moment';


export default function Table({lista}) {
    const navigate = useNavigate();
    //const TableHeadItem = ({item}) => <th>{item.heading}</th>
    

//Função para retornar o número do doc na página seguinte
    function openDetailsDoc(docNumber) {
        navigate('/detailtrans', {state:{ docnumber: docNumber,}} );
    }

    return (
        <>

           <table width="100% " className="mb-10" style={{marginTop: 75,}}>
              
              <thead>
                    <tr className="bg-gray-100">
                    <td style={{fontWeight: 'bold'}}>Número do Documento</td>
                    <td style={{fontWeight: 'bold'}}>Data Transação</td>
                    
                    <td style={{fontWeight: 'bold'}}>Data de Expiração</td>
                    </tr>
                </thead>
             {lista.map((trans, key) => (
                
                <React.Fragment key={key}>
                               
                <tbody >
                    <tr>
                        <td >{trans.docNumber}</td>
                        <td>
                        {trans.startDate}
                        </td>
                        
                        <td>
                        <Moment format="DD/MM/YYYY">
                        {trans.endDate}
                        </Moment>
                        </td>                        
                        <td><button onClick={() => openDetailsDoc(trans.docNumber)}>Ver Detalhes</button></td>
                    </tr>
                    
                </tbody>
            
                 </React.Fragment>
             ))}
         </table>
         
        </>
    )
}