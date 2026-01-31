import { useEffect, useState } from "react"


function Test() {
    const [flags,setFlags] = useState({}); //Criação de estate com metodo relacionado | Hook para armazenar informações

    useEffect(()=>{ // Hook para executar funções baseado no efeito colateral
        fetch('https://flagcdn.com/pt/codes.json') // busca na api
        .then(response => response.json())
        .then(data => setFlags(data)); //para incluir os dados na setFlags
    }, []); // Array de dependência vazio para renderizar apenas 1 vez 

  return (
    <div>
        <ul>
            {Object.entries(flags).map(([code,name])=><li key={code}>{code} - {name}</li>)} {/* transforma os dados recebidos em uma lista para usar o metodo map recebendo codigo e nome, recebendo os valores sao imprimidos dentro da li somente o nome */}
        </ul>
    </div>
  )
}

export default Test

// faz a busca na api e retorna a sigla e o nome das bandeiras
// requisicoes http
// hook effect 