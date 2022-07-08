import React from "react"
import './Botao.css'


export default props => {
    let classes = 'botao'
    classes += props.operador ? ' operador' : ''
    classes += props.duplo ? ' duplo' : ''
    classes += props.triplo ? ' triplo' : ''

    return (
        <button className={classes} onClick={e => props.click && props.click(props.label)}>
            {props.label}
        </button>
    )
}
   