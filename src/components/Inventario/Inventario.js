import React, { useState } from 'react';
import styles from './styles.module.css';
import { 
    GiBleedingWound,
    GiBleedingEye,
    GiReaperScythe,
    GiSchoolBag,
    GiWingedEmblem,
    GiSteelwingEmblem,
    GiBatwingEmblem ,
} from 'react-icons/gi';


export const Inventario = () => {
    var show = false
    const [ArmaAtiva, setArmaAtiva] = useState(0)
    const corFundo = 'transparent'
    const cor = '#f4f4f4'
    const corFundoInativo = '#313131'
    const corInativo = '#ff6173'
    var armaAtiva1 = false
    var armaAtiva2 = false
    var armaAtiva3 = false
    var emblemaAtivo = false

    const showInventario = () => {
        getComputedStyle(document.documentElement).getPropertyValue('--visibilidade')
        getComputedStyle(document.documentElement).getPropertyValue('--corFundo')

        if (!show) {
            document.documentElement.style.setProperty('--visibilidade', 'visible')
            document.documentElement.style.setProperty('--corFundo', 'rgba(90, 90, 90, 0.343)')
            show = true
        } else {
            document.documentElement.style.setProperty('--visibilidade', 'hidden')
            document.documentElement.style.setProperty('--corFundo', 'rgba(0, 0, 0, 0.543)')
            show = false
        }
    }

    getComputedStyle(document.documentElement).getPropertyValue('--corFundoArma')
    getComputedStyle(document.documentElement).getPropertyValue('--corArma')

    const ativarArma1 = () => {
        if (ArmaAtiva !== 0) {
            document.getElementById('arma1').style.setProperty('--corFundoArma', '#313131')
            document.getElementById('arma1').style.setProperty('--corArma', '#ff6173')
            document.getElementById('arma2').style.setProperty('--corFundoArma', '#313131')
            document.getElementById('arma2').style.setProperty('--corArma', '#ff6173')
            document.getElementById('arma3').style.setProperty('--corFundoArma', '#313131')
            document.getElementById('arma3').style.setProperty('--corArma', '#ff6173')
        }
        if (ArmaAtiva !== 1) {
            document.getElementById('arma1').style.setProperty('--corFundoArma', 'transparent')
            document.getElementById('arma1').style.setProperty('--corArma', '#f4f4f4')
            setArmaAtiva(1)
        } else {
            document.getElementById('arma1').style.setProperty('--corFundoArma', '#313131')
            document.getElementById('arma1').style.setProperty('--corArma', '#ff6173')
            setArmaAtiva(0)
        }

    }
    const ativarArma2 = () => {
        if (ArmaAtiva !== 0) {
            document.getElementById('arma1').style.setProperty('--corFundoArma', '#313131')
            document.getElementById('arma1').style.setProperty('--corArma', '#ff6173')
            document.getElementById('arma2').style.setProperty('--corFundoArma', '#313131')
            document.getElementById('arma2').style.setProperty('--corArma', '#ff6173')
            document.getElementById('arma3').style.setProperty('--corFundoArma', '#313131')
            document.getElementById('arma3').style.setProperty('--corArma', '#ff6173')
        }
        if (ArmaAtiva !== 2) {
            document.getElementById('arma2').style.setProperty('--corFundoArma', 'transparent')
            document.getElementById('arma2').style.setProperty('--corArma', '#f4f4f4')
            setArmaAtiva(2)
        } else {
            document.getElementById('arma2').style.setProperty('--corFundoArma', '#313131')
            document.getElementById('arma2').style.setProperty('--corArma', '#ff6173')
            setArmaAtiva(0)
        }

    }
    const ativarArma3 = () => {
        if (ArmaAtiva !== 0) {
            document.getElementById('arma1').style.setProperty('--corFundoArma', '#313131')
            document.getElementById('arma1').style.setProperty('--corArma', '#ff6173')
            document.getElementById('arma2').style.setProperty('--corFundoArma', '#313131')
            document.getElementById('arma2').style.setProperty('--corArma', '#ff6173')
            document.getElementById('arma3').style.setProperty('--corFundoArma', '#313131')
            document.getElementById('arma3').style.setProperty('--corArma', '#ff6173')
        }
        if (ArmaAtiva !== 3) {
            document.getElementById('arma3').style.setProperty('--corFundoArma', 'transparent')
            document.getElementById('arma3').style.setProperty('--corArma', '#f4f4f4')
            setArmaAtiva(3)
        } else {
            document.getElementById('arma3').style.setProperty('--corFundoArma', '#313131')
            document.getElementById('arma3').style.setProperty('--corArma', '#ff6173')
            setArmaAtiva(0)
        }
    }

    getComputedStyle(document.documentElement).getPropertyValue('--corFundoEmblema')
    getComputedStyle(document.documentElement).getPropertyValue('--corEmblema')

    const ativarEmblema = () => {
    }

    return (
        <div className={styles.invtrContainer}>
            <button 
                className={styles.invtrButton}
                onClick={showInventario}><GiSchoolBag style={{fontSize: '20px'}}/></button>
            <div className={styles.invtrBody}>
                <button
                    id='arma1'
                    value='1' 
                    className={styles.invtrArmas}
                    onClick={ativarArma1}><GiBleedingWound className={styles.classArma1}/></button>
                <button
                    id='arma2'
                    value='2' 
                    className={styles.invtrArmas}
                    onClick={ativarArma2}><GiBleedingEye value='2' style={{fontSize: '25px'}}/></button>
                <button 
                    id='arma3'
                    value='3' 
                    className={styles.invtrArmas}
                    onClick={ativarArma3}><GiReaperScythe style={{fontSize: '25px'}}/></button>
                <button 
                    id='emblema1'
                    value='1' 
                    className={styles.invtrEmblemas}
                    onClick={ativarEmblema}><GiWingedEmblem style={{fontSize: '25px'}}/></button>
                <button 
                    id='emblema2'
                    value='2' 
                    className={styles.invtrEmblemas}
                    onClick={ativarEmblema}><GiSteelwingEmblem style={{fontSize: '25px'}}/></button>
                <button 
                    id='emblema3'
                    value='3' 
                    className={styles.invtrEmblemas}
                    onClick={ativarEmblema}><GiBatwingEmblem style={{fontSize: '25px'}}/></button>
            </div>
        </div>
    )
}