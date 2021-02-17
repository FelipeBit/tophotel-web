import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from 'react-stars'

import { SCard, SImage, SInfo, STitle, SText } from './styles'
import rightArrow from '../../assets/icons/right-arrow.png'

interface Props {
    image: string,
    title: string,
    description: string,
    rating: number,
    hotelId: string
}

function Card(props: Props) {

    return (
        <SCard>
            <SImage style={{ backgroundImage: `url(${props.image})` }} />
            <SInfo>
                <STitle>{props.title}</STitle>
                <SText>{props.description}</SText>
                <ReactStars
                    count={5}
                    value={props.rating}
                    size={24}
                    color2={'#ffd700'}
                    edit={false}
                />
                <Link to={`/hotel/${props.hotelId}`} style={{ textDecoration: 'none', fontWeight: 'bold', color: 'color: #00077F' }}>Visit <img src={rightArrow} alt="right arrow" style={{ height: '30px', width: '30px', marginBottom: '-10px' }} /></Link>
            </SInfo>
        </SCard>)
}

//background-image: url("paper.gif");

export default Card