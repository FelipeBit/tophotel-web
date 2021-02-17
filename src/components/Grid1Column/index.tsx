import React from 'react'

import { SGrid1Column } from './styles'

const Grid1column: React.FC = props => (
    <SGrid1Column>
        {props.children}
    </SGrid1Column>
)

export default Grid1column