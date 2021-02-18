import React from 'react'

import Button from '../Button/index'
import roomImage from '../../assets/images/hotelroom.jpg'

import { SCard, SImage, SInfo, SText, SDescription } from './styles'

interface Props {
    id: string,
    image: string,
    category: string,
    beds: number,
    bedType: string,
    text: string,
    currency: string,
    total: string
}

function HorizontalOfferCard(props: Props) {

    return (
        <SCard key={props.id}>
            <SImage style={{ backgroundImage: `url(${roomImage})` }} />
            <SInfo>
                <SText>Category: {props.category}</SText>
                <SText>Beds: {props.beds}</SText>
                <SText>Bed type: {props.bedType}</SText>
                <SDescription>Description {props.text.length > 400 ? (props.text.substring(0, 400) + '...') : props.text}</SDescription>
                <SText>Price: {props.currency}: {props.total}</SText>
                <Button onClick={() => null} isLoading={false}>Reserve Now</Button>
            </SInfo>
        </SCard>)
}

//background-image: url("paper.gif");

export default HorizontalOfferCard