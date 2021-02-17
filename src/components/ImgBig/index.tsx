import React from 'react'

import { SImg } from './styles'

interface Props {
    image: string
}

function ImgBig(props: Props) {
    return <SImg src={props.image} loading="lazy" />
}

export default ImgBig