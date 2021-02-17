import React from 'react'

import { SGrid2Columns } from './styles'

const Grid2Columns: React.FC = props => (
    <SGrid2Columns>
        {props.children}
    </SGrid2Columns>
)

export default Grid2Columns