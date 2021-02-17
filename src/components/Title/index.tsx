import React from 'react'

import { SWrapper, STitle } from './styles'

interface Props {
    children: any
}
function SubTitle(props: Props) {

    return (
        <SWrapper>
            <STitle>{props.children}</STitle>
        </SWrapper>
    )
}

export default SubTitle