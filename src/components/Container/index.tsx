import React from 'react'

import { SContainer } from './styles'

const Header: React.FC = props => (
    <SContainer>
        {props.children}
    </SContainer>
)

export default Header