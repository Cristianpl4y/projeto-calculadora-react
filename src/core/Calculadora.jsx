import React, {Component} from "react"
import './Calculadora.css'

import Botao from '../componentes/Botao'
import Visor from '../componentes/Visor'

const estadoInicial = {
    valorVisor: '0',
    limparVisor: false,
    operador: null,
    valores: [0, 0],
    valorAtual: 0,
}

export default class Calculadora extends Component {

    state = { ...estadoInicial }

    constructor(props){
        super(props)
        this.limparMemoria = this.limparMemoria.bind(this)
        this.setOperacao = this.setOperacao.bind(this)
        this.addDigito = this.addDigito.bind(this)
    }
    
    limparMemoria(){
        this.setState({ ...estadoInicial })
    }

    setOperacao(operador){
        if(this.state.valorAtual === 0){
           this.setState({ operador, valorAtual: 1, limparVisor: true }) 
        }else{
            const finalizarOperacao = operador === "="
            const valorAtualOperacao = this.state.operador

            const valores = [...this.state.valores ]
            try{
                valores[0] = eval(`${valores[0]} ${valorAtualOperacao} ${valores[1]}`)
                if (isNaN(valores[0]) || !isFinite(valores[0])) {
                    this.limparMemoria()
                    return
                }
            } catch(e){
                valores[0] = this.state.valores[0]
            }
            valores[1] = 0

            this.setState({
                valorVisor: valores[0],
                operador: finalizarOperacao ? null : operador,
                valorAtual: finalizarOperacao ? 0 : 1,
                limparVisor: !finalizarOperacao,
                valores
            })
        }

    }


    addDigito(numero){

        // Regra para evitar ter dois pontos.
        if(numero === '.' && this.state.valorVisor.includes('.')){
            return
        }

        // verifica se precissa limpar o Visor
        const limparVisor = this.state.valorVisor === '0' || this.state.limparVisor === true

        // Valor atual do Visor
        const valorAtual = limparVisor ? '' : this.state.valorVisor

        // Novo valor a ser adicionado ao visor
        const valorVisor = valorAtual + numero

        this.setState({ valorVisor , limparVisor: false })

        if(numero !== '.'){
            const i = this.state.valorAtual
            const novoValor = parseFloat(valorVisor)
            const valores = [...this.state.valores]
            valores[i] = novoValor
            this.setState({ valores })
            console.log(valores)
        }
    }


    render(){    
        return (
            <div className="calculadora">
                <Visor value={this.state.valorVisor}/>
                <Botao label="AC" click={this.limparMemoria} triplo/>
                <Botao label="/" click={this.setOperacao} operador />
                <Botao label="7" click={this.addDigito} />
                <Botao label="8" click={this.addDigito}/>
                <Botao label="9" click={this.addDigito}/>
                <Botao label="*" click={this.setOperacao} operador/>
                <Botao label="4" click={this.addDigito}/>
                <Botao label="5" click={this.addDigito}/>
                <Botao label="6" click={this.addDigito}/>
                <Botao label="-" click={this.setOperacao} operador/>
                <Botao label="1" click={this.addDigito}/>
                <Botao label="2" click={this.addDigito}/>
                <Botao label="3" click={this.addDigito}/>
                <Botao label="+" click={this.setOperacao} operador/>
                <Botao label="0" click={this.addDigito} duplo />
                <Botao label="." click={this.addDigito}/>
                <Botao label="=" click={this.setOperacao} operador/>
            </div>
        )
         
    }
}   