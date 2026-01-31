import { useEffect, useState } from 'react'
import Flag from './Flag'
import './Game.css'

function Game() {
  const [flags, setFlags] = useState({}); //receber todas as bandeiras que a api disponibiliza para (objeto)
  const [option, setOption ] = useState([]); //receber as opções que foram randomicamente sorteadas para aparecer ao usuário, vai ser uma lista (lista)
  const [correctFlag, setCorrectFlag] = useState(''); // nome da bandeira correta 
  const [flagUrl, setFlagUrl] = useState(''); // apenas texto com espaco vazio
  const [message, setMessage ] = useState(''); // 
  const [correctCount, setCorrectCount ] = useState(0); // variavel para resposta correta
  const [incorrectCount, setIncorrectCount ] = useState(0); // variavel para resposta falsa 
  const [answered, setAnswered] = useState(false); //variavel de controle

  useEffect(()=>{
    fetch('https://flagcdn.com/pt/codes.json') // requisição aos dados da API/URL
    .then(response => response.json()) // absorvendo 
    .then(data => setFlags(data)) // enviando as informações para flags 
    .catch(error => console.log(error)); //caso aconteça algum erro 
  },[]); //vinculado a um vetor de dependencias vazio, logo antes de renderizado, essa função é executada 1 vez.

  
  useEffect(()=>{
    if (Object.keys(flags).length > 0){ // se a quantidade de chaves for maior que 0, recebemos chaves/dados
    startNewRound();
    }
  },[flags]);

  const startNewRound = () =>{ //sorteando o elemento correto
    const flagCodes =  Object.keys(flags); // quantidade das chaves 
    const selectedCodes = [];
    while (selectedCodes.length < 5 ){ 
      const randomIndex = Math.floor(Math.random() * flagCodes.length); //pegando o indice da lista e sorteando entre 0 e 1 0.8 0.7
      const randomCode = flagCodes[randomIndex]; //adicionando o numero sorteado a uma variavel
      if (!selectedCodes.includes(randomCode)){
        selectedCodes.push(randomCode);
      }

    }
    console.log(selectedCodes);

    const correctIndex = Math.floor(Math.random() * selectedCodes.length); // definindo o elemtno
    const correctCode = selectedCodes[correctIndex]; 
    setCorrectFlag(flags[correctCode]);
    setFlagUrl('http://flagcdn.com/256x192/'+correctCode+'.png');
    setOption (selectedCodes.map(code=>flags[code])); 
    setMessage ('');
    setAnswered (false);


  };

  const handleOptionClick = (selectedFlag) => {
    if (answered) return; // verificar se ele vai errar ou acertar
    setAnswered(true);
    if (selectedFlag === correctFlag ) { //comparando o nome do pais inserido com o nome correto
      setMessage('Acertou!');
      setCorrectCount(correctCount + 1 );
    } else {
      setMessage('Errou!');
      setIncorrectCount(incorrectCount +1);
    }

     setTimeout(() => { //executar depois do tempo predefinido
    startNewRound();
    }, 1500); 

  }


  return (
    <div className='game-container'>
      <h1 className='game-title'> De onde é está bandeira?</h1>
      <div className="score-container">
        <p className="score correct">Acertos: {correctCount}</p>
        <p className={message == 'Acertou!'? 'score correct' : message == 'Errou!'?'score wrong': ''}>{message}</p>
        <p className="score wrong">Erros: {incorrectCount}</p>
      </div>
      {flagUrl? <Flag flagUrl={flagUrl}/> : 'Carregando...'}
      <div className="options-container">
        {option.map((flag, index) => (
          <button onClick={()=> handleOptionClick(flag)}
          className={answered && flag === correctFlag ? 'option-button correct-option': 'option-button'}
          key={index}
          disabled={answered}
          >  
            {index+1}) {flag}
          </button>
        ))}
      </div>
        
    </div>
  )
}

export default Game