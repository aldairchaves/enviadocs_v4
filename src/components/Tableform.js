import React, { useEffect } from "react"
import { useState } from "react";
import { v4 as uuidv4 } from "uuid"
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"
import {Box, HStack, Input, FormLabel, FormControl} from "@chakra-ui/react"


  
export default function TableForm({ descricao, setDescricao, quantidade, setQuantidade, preco, setPreco, total, setTotal, lista, setLista, valorTotal, setvalorTotal }) {
    const [edicao, setEdicao] = useState(false)

    //Funcao para submeter
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!descricao || !quantidade || !preco) {
            alert("Preencha os campos")
        } else {

            const novoItem = {
                id: uuidv4(),
                descricao,
                quantidade,
                preco,
                total
            }
            setDescricao("")
            setQuantidade("")
            setPreco("")
            setTotal("")
            setLista([...lista, novoItem])
            setEdicao(false)
        }


    }

    //Calculo dos itens
    useEffect(() => {
        const calcTotal = (total) => {
            setTotal(quantidade * preco)
        }
        calcTotal(total)
    }, [total, preco, quantidade, setTotal])

    //Calculo Total Geral
    useEffect(() => {
        let rows = document.querySelectorAll(".total")
        let sum = 0

        for (let i = 0; i < rows.length; i++) {
            if (rows[i].className === "total") {
                sum += isNaN(rows[i].innerHTML) ? 0 : parseInt(rows[i].innerHTML)
                setvalorTotal(sum)
            }
        }
    })


    //Funcao de edicao

    const editaLinha = (id) => {
        const editaLinha = lista.find((row) => row.id === id)
        setLista(lista.filter((row) => row.id !== id))
        setEdicao(true)
        setDescricao(editaLinha.descricao)
        setQuantidade(editaLinha.quantidade)
        setPreco(editaLinha.preco)
        setTotal(editaLinha.total)
    }

    //Funcao de delecao
    const deleteRow = (id) => setLista(lista.filter((row) => row.id !== id)
    )



    return (
        <>
            
            <FormControl display="flex" flexDir="column" gap="4" onSubmit={handleSubmit}>
           
                
                
                <HStack sparcing="4" >
                <Box w="15%">                    
                    <FormLabel htmlFor="descricao">Descricao de itens</FormLabel>
                    <th>
                    <Input
                        type="text"
                        name="descricao"
                        id="descricao"
                        placeholder="Descricao "
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                    </th>
                    </Box>                             
                 </HStack>
               
                

                
                   
                    <HStack sparcing="4" >
                <Box w="15%"> 
                        <FormLabel htmlFor="quantidade">Quantidade</FormLabel>
                       
                        <Input
                            type="number"
                            name="quantidade"
                            id="quantidade"
                            placeholder="Quantidade"
                            value={quantidade}
                            onChange={(e) => setQuantidade(e.target.value)}
                        />
                        
                        </Box>                             
                 </HStack>
                   

                    <div className="flex flex-col">
                        <label htmlFor="preco">Preco</label>
                        <th>
                        <input
                            type="number"
                            name="preco"
                            id="preco"
                            placeholder="Preco"
                            value={preco}
                            onChange={(e) => setPreco(e.target.value)}
                        />
                        </th>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="total">Total</label>
                        <th>
                        <p>{total}</p>
                        </th>
                    </div>
                    
               
                
                
                <button
                    type="submit"
                    className="mb-5 bg-blue-500 text-white font-bold py-2 px-8 rounded shadow boerder-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all durantion-300"
                >
                    {edicao ? "Editando Linha" : "Adicionar Item"}
                </button>
            </FormControl>
           

            {/*Tabela de itens */}
            <table width="100% " className="mb-10">

                <thead>
                    
                        <th className="font-bold">Itens</th>
                        <th className="font-bold">Quantidade</th>
                        <th className="font-bold">Preço</th>
                        <th className="font-bold">Total</th>
                    
                </thead>
                {lista.map(({ id, descricao, quantidade, preco, total }) => (

                    <React.Fragment key={id}>


                        <tbody>
                            <tr>
                                <td>{descricao}</td>
                                <td>{quantidade}</td>
                                <td>{preco}</td>
                                <td className="total">{total}</td>
                                <td><button onClick={() => deleteRow(id)}><AiOutlineDelete className="text-red-500 font-bold" />
                                </button></td>
                                <td><button onClick={() => editaLinha(id)}><AiOutlineEdit className="text-green-500 font-bold" />
                                </button></td>
                            </tr>
                        </tbody>

                    </React.Fragment>
                ))}
            </table>

            <div>
                <h2 className="flex items-end justify-end text-gray-800 text text-xl font-bold justify-right">EUR {valorTotal.toLocaleString()}</h2>
            </div>

        </>
    )
}
