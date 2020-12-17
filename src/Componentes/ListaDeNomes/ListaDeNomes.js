import React, { useState } from 'react'
import './style.css'

const ListaDeNomes = (props) => {
    const { nomes, setNomes } = props
    const [nome, setNome] = useState('')

    const handleChange = () => {
        if (nomes.filter(x => x === nome).length > 0) {
            alert("Nome já cadastrado")
            setNome('')
        }
        else {
            setNomes(e => e = [...e, nome])
            setNome('')
        }
    }

    return (
        <div className="container">
            <div className="titulo">
                Lista de nomes
            </div>
            <div className="conteudo">
                <input type="text" autoComplete="off" value={nome} name="nome" className="input" onChange={e => setNome(e.target.value)} placeholder="Digite um nome..."></input>
                <button data-testid="enviar" onClick={() => handleChange()} className="submit">Cadastrar</button>
            </div>
            <div className="rodape">
                www.ambevtech.com.br
            </div>
            <div className="tlista">
                <h5>Nomes Listados</h5>
            </div>
            <div className="nomes">
                {nomes.map((pessoa, index) => (
                    <div key={index}> - {pessoa} - </div>
                ))}
            </div>
        </div>
    )
}

export default ListaDeNomes