import React from 'react'

import { SWrapper, SSubTitle } from './styles'

interface Props {
    children: any
}
function SubTitle(props: Props) {

    return (
        <SWrapper>
            <SSubTitle>{props.children}</SSubTitle>
        </SWrapper>
    )
}

export default SubTitle