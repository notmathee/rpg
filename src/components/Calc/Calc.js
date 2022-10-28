import React, { useState, useEffect, useRef } from "react";
import styles from "./styles.module.css";
import { BiMinus } from "react-icons/bi";
import { Personagens } from "../Personagens";
import { GiShardSword } from "react-icons/gi";
import { GiHealthPotion } from "react-icons/gi";
import { RiDeleteBack2Line } from "react-icons/ri";
import { BarraProgresso } from "../BarraProgresso";
import '../../assets/fonts/ThisSucksRegular-Y9yo.ttf';

export const Calc = (props) => {
  const [resposta, setResposta] = useState('');
  const [pergunta, setPergunta] = useState('');
  const [operacao, setOperacao] = useState('');
  const [showResultado, setShowResultado] = useState('');
  const [n1, setN1] = useState(parseInt(Math.floor(Math.random() * 10)));
  const [n2, setN2] = useState(parseInt(Math.floor(Math.random() * 10)));
  const [dano, setDano] = useState(0)
  const [enemyDano, setEnemyDano] = useState(0)
  const [enemyCrit, setEnemyCrit] = useState(0)
  const [cura, setCura] = useState(0)
  const [crit, setCrit] = useState(false)
  const [click, setClick] = useState(false)
  const [cooldown, setCooldown] = useState('')
  const [curaCooldown, setCuraCooldown] = useState('')
  const [curaCounter, setCuraCounter] = useState(0)
  const [showCuraCounter, setShowCuraCounter] = useState('‎')
  const [travarConfirmar, setTravarConfirmar] = useState('disabled')
  const [acertou, setAcertou] = useState(false)
  const [errou, setErrou] = useState(false)
  const [curou, setCurou] = useState(false)
  const refResultado = useRef(showResultado)
  refResultado.current = showResultado
  var trueResultado;

  const criarDigitos = () => {
    const digitos = [];
    const j = 0

    for (let i = 1; i < 11; i++) {
      if (i === 10) {
        digitos.push(
          <button 
            className={styles.buttonPad}
            disabled={travarConfirmar}
            onClick={updateResposta}
            value={j}>{j}</button>
        );
      } else {
        digitos.push(
          <button 
            className={styles.buttonPad}
            disabled={travarConfirmar}
            onClick={updateResposta}
            value={i}>{i}</button>
        );
      };
    };
    return digitos;
  }

  const updateResposta = e => {
    if (resposta == '-' && e.target.value == 0) return setResposta(0)
    setResposta(resposta + e.target.value);
  }

  const apagarResposta = () => {
    setResposta('');
  }
  const adicionarMenos = () => {
    if (resposta === '') return setResposta('-');
  }

  onkeydown = e => {
    if (e.key === 'a') return atacar();
    if (e.key === 'c') return curar();

    if (travarConfirmar === 'disabled') return;
    if (e.key === '-' && resposta === '') return setResposta('-');
    if (e.key === 'Backspace') return setResposta('');
    if (e.key === 'Enter') return acerto();

    if (isNaN(e.key)) return;
    setResposta(resposta + e.key);
  }
  
  useEffect(() => {
    setClick(false)
    setAcertou(false)
    setErrou(false)
    setCurou(false)
    setCrit(false)
    if (operacao === 'soma') setPergunta(`${n1} + ${n2}`)
    if (operacao === 'subtracao') setPergunta(`${n1} – ${n2}`)
    if (operacao === 'multip') setPergunta(`${n1} x ${n2}`)
  });

  useEffect(() => {
    if (click) {
      if (curaCounter > 1) setCuraCounter(curaCounter - 1)
      if (showCuraCounter > 1) setShowCuraCounter(showCuraCounter - 1)
      if (showCuraCounter == 1) setShowCuraCounter('‎')
      
      getComputedStyle(document.documentElement).getPropertyValue('--abrir-pergunta');
      getComputedStyle(document.documentElement).getPropertyValue('--diminuir-square');
      
      setTimeout(() => {
        if (refResultado.current != 'certo' && refResultado.current != 'errado') {
          setShowResultado('errou')
          setErrou(true)
        }
        if (curaCounter <= 0) {
          setCuraCooldown('')
        }
      }, 5000);
    }
  });

  var curaRandomizer = Math.floor(Math.random() * 6) + 10

  const curar = () => {
    setCura(curaRandomizer)
    setCuraCounter(4)
    setShowCuraCounter(4)
    setCurou(true)
    setCuraCooldown('disabled')
  }

  const atacar = () => {
    setClick(true)
    setTravarConfirmar('')
    setShowResultado('')
    setCuraCooldown('disabled')
    setCooldown('disabled')
    document.documentElement.style.setProperty('--abrir-pergunta', '0.6rem')
    document.documentElement.style.setProperty('--diminuir-square', '0rem')

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

    setTimeout(() => {
      if (curaCounter == 1) setCuraCooldown('')
      setTravarConfirmar('disabled')
      setCooldown('')
      setResposta('')
      document.documentElement.style.setProperty('--abrir-pergunta', '-4rem')
      document.documentElement.style.setProperty('--diminuir-square', '4.5rem')
    }, 5000);
  }

  var critDecider = Math.floor(Math.random() * 2);
  var critDmg = 1.5;
  if (critDecider === 0) critDmg = 2;

  var chanceMais10 = true;
  var chanceMais20 = true;
  var chanceBase = 0.1
  if (chanceMais10) chanceBase += 0.1
  if (chanceMais20) chanceBase += 0.2
  var willCrit = Math.random() < chanceBase;

  var enemyCritDmg = 2
  var enemyChanceMais10 = false;
  var enemyChanceMais20 = false;
  var enemyChanceBase = 0.1
  var enemyWillCrit = Math.random() < enemyChanceBase

  
  const acerto = () => {
    setTravarConfirmar('disabled')

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

    setEnemyDano(Math.floor(Math.random() * (20 - 10 + 1)) + 10)
    if (enemyWillCrit) {
      setEnemyDano(Math.floor((Math.random() * (20 - 10 + 1)) + 10) * enemyCritDmg)
      setEnemyCrit(true)
    }

    if (trueResultado <= 10) setDano(10)
    if (trueResultado > 10) setDano(Math.abs(trueResultado))

    if (willCrit) {
      if (trueResultado <= 10) setDano(10 * critDmg)
      if (trueResultado > 10) setDano(Math.floor(Math.abs(trueResultado) * critDmg))
      setCrit(true)
    }
    
    if (resposta == trueResultado) { 

      setShowResultado('certo')
      setAcertou(true);
      setResposta('');
      trueResultado = 0
    } else {
      setShowResultado('errado');
      setErrou(true);
      setResposta('');
      trueResultado = 0
    }
  }
  console.log(dano)
  return (
    <>
      <div className={styles.containerCalc}>
        <header className={styles.headerCalc}>
          <h1 className={styles.titleCalc}>oi</h1>
        </header>

        <div className={styles.perguntaDiv}>
          <div className={styles.square}/>

          <h3 className={styles.perguntaCalc}>{pergunta}</h3>

          <div className={styles.square}/>
        </div>

        <div className={styles.respostaDiv}>
          <input
            className={styles.inputCalc}
            placeholder="RESPOSTA..."
            // type={'number'}
            onChange={updateResposta}
            value={resposta}
            disabled>
          </input>
        </div>

        <div className={styles.buttonGrid}>
          { criarDigitos() }
          <button 
            className={styles.buttonApagar}
            disabled={travarConfirmar}
            onClick={apagarResposta}>
              <RiDeleteBack2Line className={styles.deleteIcon}/>
          </button>
          <button 
            className={styles.buttonMenos}
            disabled={travarConfirmar}
            onClick={adicionarMenos}>
              <BiMinus className={styles.deleteIcon}/>
          </button>
        </div>

        <div className={styles.divButtonConfirmar}>
          <button
            className={styles.buttonConfirmar}
            disabled={travarConfirmar}
            onClick={() => acerto()}>
            CONFIRMAR 
          </button>
        </div>

        <div className={styles.resultadoDivCalc}>
          <h3 className={styles.resultadoCalc}>{refResultado.current}</h3>
        </div>
      </div>

      <BarraProgresso click={click}/>

      <div className={styles.containerRpg}>
        <div className={styles.characterSpace}>
          <Personagens
            dano={dano}
            enemyDano={enemyDano}
            enemyCrit={enemyCrit}
            cura={cura}
            crit={crit}
            curou={curou}
            acertou={acertou}
            errou={errou}/>
        </div>

        <div className={styles.buttonSpace}>
          <div className={styles.buttonDivCalc}>
            <div className={styles.buttonDivCalc2}>
              <button 
                className={styles.buttonCalcAtk}
                disabled={cooldown}
                onClick={() => atacar()}>
                  <p className={styles.buttonCalcText}>ATACAR</p>
                  <GiShardSword className={styles.atkIcon}/>
                  <p></p>
              </button>
            </div>
            <div className={styles.buttonDivCalc2}>
              <button 
                className={styles.buttonCalcCurar}
                disabled={curaCooldown}
                onClick={() => curar()}>
                  <p className={styles.buttonCalcText}>CURAR</p>
                  <GiHealthPotion className={styles.healIcon}/>
                  <p className={styles.showCuraCounter}>{showCuraCounter}</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}