import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { BiMinus } from "react-icons/bi";
import { GiShardSword } from "react-icons/gi";
import { GiHealthPotion } from "react-icons/gi";
import { RiDeleteBack2Line } from "react-icons/ri";
import '../../assets/fonts/ThisSucksRegular-Y9yo.ttf';
import { Personagens } from "../Personagens";

export const Calc = () => {
  const [resposta, setResposta] = useState('');
  const [pergunta, setPergunta] = useState('');
  const [operacao, setOperacao] = useState('');
  const [showResultado, setShowResultado] = useState('');
  const [n1, setN1] = useState(parseInt(Math.floor(Math.random() * 10)));
  const [n2, setN2] = useState(parseInt(Math.floor(Math.random() * 10)));
  const [dano, setDano] = useState(20)
  const [click, setClick] = useState(false)
  let trueResultado;

  const criarDigitos = () => {
    const digitos = [];
    const j = 0

    for (let i = 1; i < 11; i++) {
      if (i === 10) {
        digitos.push(
          <button className={styles.buttonPad} onClick={updateResposta} value={j}>{j}</button>
        );
      } else {
        digitos.push(
          <button className={styles.buttonPad} onClick={updateResposta} value={i}>{i}</button>
        );
      };
    };
    return digitos;
  }

  const updateResposta = e => {
    if (resposta === '') return setResposta(e.target.value);
    if (resposta == '-' && e.target.value == 0) return setResposta(0)
    setResposta(resposta + e.target.value);
  }

  const apagarResposta = () => {
    setResposta('');
  }
  const adicionarMenos = () => {
    if (resposta === '') return setResposta('-');
  }

  if (operacao === '') {
    let verificador = Math.floor(Math.random() * 3);
  
    switch (verificador) {
      case 0:
        setOperacao('soma')
        break;
      case 1:
        setOperacao('subtracao')
        break;
      case 2:
        setOperacao('multip')
        break;
    }
  }
  
  useEffect(() => {
    setClick(false)
    if (operacao === 'soma') setPergunta(`${n1} + ${n2}`)
    if (operacao === 'subtracao') setPergunta(`${n1} - ${n2}`)
    if (operacao === 'multip') setPergunta(`${n1} x ${n2}`)
  })

  const rCerta = () => {
    setClick(true)
    setShowResultado("certo");
    setResposta('');
  }
  const rErrada = () => {
    setShowResultado("errado");
    setResposta('');
  }

  const atacar = () => {
    switch (operacao) {
      case 'soma':
        trueResultado = n1 + n2
        break;
      case 'subtracao':
        trueResultado = n1 - n2
        break;
      case 'multip':
        trueResultado = n1 * n2
        break;
    }
    if (resposta == trueResultado) rCerta();
    if (resposta != trueResultado) rErrada();

    let verificador = Math.floor(Math.random() * 3);
    switch (verificador) {
      case 0:
        setOperacao('soma')
        break;
      case 1:
        setOperacao('subtracao')
        break;
      case 2:
        setOperacao('multip')
        break;
    }
    setN1(parseInt(Math.floor(Math.random() * 10)))
    setN2(parseInt(Math.floor(Math.random() * 10)))
  }

  return (
    <>
      <div className={styles.containerCalc}>
        <header className={styles.headerCalc}>
          <h1 className={styles.titleCalc}>oi</h1>
        </header>

        <div>
          <h3 className={styles.perguntaCalc}>{pergunta}</h3>
        </div>

        <div className={styles.respostaDiv}>
          <input
            className={styles.inputCalc}
            placeholder="RESPOSTA..."
            type={'number'}
            onChange={updateResposta}
            value={resposta}
            disabled>
          </input>
        </div>

        <div className={styles.buttonGrid}>
          { criarDigitos() }
          <button 
            className={styles.buttonApagar}
            onClick={apagarResposta}>
              <RiDeleteBack2Line className={styles.deleteIcon}/>
          </button>
          <button 
            className={styles.buttonMenos}
            onClick={adicionarMenos}>
              <BiMinus className={styles.deleteIcon}/>
          </button>
        </div>

        <div className={styles.resultadoDivCalc}>
          <h3 className={styles.resultadoCalc}>{showResultado}</h3>
        </div>
      </div>

      <div className={styles.containerRpg}>
        <div className={styles.characterSpace}>
          <Personagens
            dano={dano}
            click={click}
          />
        </div>

        <div className={styles.buttonSpace}>
          <div className={styles.buttonDivCalc}>
            <div className={styles.buttonDivCalc2}>
              <button 
                className={styles.buttonCalcAtk}
                onClick={() => atacar()}>
                  <p className={styles.buttonCalcText}>ATACAR</p>
                  <GiShardSword className={styles.atkIcon}/>
              </button>
            </div>
            <div className={styles.buttonDivCalc2}>
              <button 
                className={styles.buttonCalcCurar}>
                  <p className={styles.buttonCalcText}>CURAR</p>
                  <GiHealthPotion className={styles.healIcon}/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}