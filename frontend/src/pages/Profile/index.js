import React, { useState, useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css'

import logoImg from '../../assets/logo.svg';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);

    const history = useHistory();

    const victimId = localStorage.getItem('victimId');
    const victimName = localStorage.getItem('victimName');

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: victimId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [victimId]); //executa a função dentro de {} toda vez que o conteudo de [] é alterado. se [] estiver vazio executa apenas uma vez

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: victimId,
                }

            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente.');
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Corona Hero"/>
                <span>Bem vindo(a), {victimName}</span>
                <Link className="button" to="/incidents/new">Cadastrar nova tarefa</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041"/>
                </button>
            </header>

            <h1>Tarefas Cadastradas</h1>

            <ul>
                {incidents.map(incident => ( //toda vez que faz uma repetição (neste caso map, colocar o elemento key na primeira linha)
                    <li key={incident.id}>
                        <strong>TAREFA:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR',{ style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type="button"> 
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>

        </div>
    );
}