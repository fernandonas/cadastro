import { useState } from 'react';
import ListaDeNomes from './Componentes/ListaDeNomes/ListaDeNomes';

function App() {
  const [nomes, setNomes] = useState(['Nome Inicial'])
  return (
    <div className="App">
      <ListaDeNomes nomes={nomes} setNomes={setNomes}/>
    </div>
  );
}

export default App;