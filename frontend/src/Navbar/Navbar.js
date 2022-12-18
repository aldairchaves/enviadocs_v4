import React from "react";
import {Link, Navigate} from 'react-router-dom';
import './Navbar.css'
import { useAppContext } from "../Context/appContext";

const Navbar = () => {
    const { removeUser } = useAppContext();
    
    async function logout ()  {
        await removeUser()
            Navigate('/');
        
    }

    return (
        <div className="container">
            <div className="brand">BudgetDApp</div>
            <nav className="item">
                <ul className="ul">
                    <li>
                        <Link to='/home'>Home</Link>
                    </li>
                    <li>
                        <Link to='/Document'>Documentos</Link>
                    </li>
                    <li>
                        <Link to='/Transaction'>Transações</Link>
                    </li>
                    <li>
                        <button onClick={logout}>Sair</button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar