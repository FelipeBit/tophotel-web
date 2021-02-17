import React from 'react'

import { STextBox, SText } from './styles'

const TextBox: React.FC = props => (
    <STextBox>
        <SText>{props.children}</SText>
    </STextBox>
)

export default TextBox