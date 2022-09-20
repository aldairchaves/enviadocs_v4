import React, { useEffect } from "react"
import { useState } from "react";
import { v4 as uuidv4 } from "uuid"
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"
import { Box, HStack, Input, FormLabel, Button, Grid, GridItem, Flex } from "@chakra-ui/react"



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
        <br />
            <Flex fontSize="xl" justify = "center" style={{fontWeight: 'bold'}}>Adicionar Itens ao Documento</Flex>
            <form onSubmit={handleSubmit}>
                <Grid templateColumns='4' gap={4}>
                    <GridItem bg='white'>

                        <FormLabel htmlFor="descricao">Descricao</FormLabel>
                        <Input
                            type="text"
                            name="descricao"
                            id="descricao"
                            placeholder="Descricao "
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        />



                        <FormLabel htmlFor="quantidade">Quantidade</FormLabel>
                        <Input
                            type="number"
                            name="quantidade"
                            id="quantidade"
                            placeholder="Quantidade"
                            value={quantidade}
                            w='30%'
                            onChange={(e) => setQuantidade(e.target.value)}
                        />



                        <FormLabel htmlFor="preco">Preco</FormLabel>
                        <Input
                            type="number"
                            name="preco"
                            id="preco"
                            placeholder="Preco"
                            value={preco}
                            w='30%'
                            onChange={(e) => setPreco(e.target.value)}
                        />



                    </GridItem>



                </Grid>

                <p />
                <br/>

                <HStack sparcing="6">
                    <Box w="25%">
                        <FormLabel htmlFor="total">Total</FormLabel>
                        <p>{total}</p>
                    </Box>
                </HStack>
                <br/>

                <HStack justify="center">
                <Button
                    type="submit"
                    className="mb-5 bg-blue-500 text-white font-bold py-2 px-8 rounded shadow boerder-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all durantion-300"
                >
                    {edicao ? "Editando Linha" : "Adicionar Item"}
                </Button>
                </HStack>
            </form>
            <br/>

            {/*Tabela de itens */}
            <table width="100% " className="mb-10">

                <thead>
                    <tr className="bg-gray-100">
                        <td className="font-bold">Itens</td>
                        <td className="font-bold">Quantidade</td>
                        <td className="font-bold">Preço</td>
                        <td className="font-bold">Total</td>
                    </tr>
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
