import React from 'react'
import { Link } from 'react-router-dom'

import { SCard, SImage, SInfo, SText } from './styles'
import rightArrow from '../../assets/icons/right-arrow.png'

interface Props {
    image: string,
    country: string,
    countryCode: string
}

function Card(props: Props) {

    return (
        <SCard>
            <SImage style={{ backgroundImage: `url(${props.image})` }} />
            <SInfo>
                <SText>{props.country}</SText>
                <Link to={{ pathname: props.countryCode }}
                    target="_blank"
                    style={{ textDecoration: 'none', fontWeight: 'bold', color: 'color: #00077F' }}>Visit <img src={rightArrow} alt="right arrow" style={{ height: '30px', width: '30px', marginBottom: '-10px' }} /></Link>
            </SInfo>
        </SCard>)
}

//background-image: url("paper.gif");

export default Card