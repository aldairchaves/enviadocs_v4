import React, { useEffect } from "react";

export default function TableForm({ lista, setLista }) {


    useEffect(() => {

    }, [])


    return (
        <>
            <br />


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

                            </tr>
                        </tbody>

                    </React.Fragment>
                ))}
            </table>

        </>
    )

}
