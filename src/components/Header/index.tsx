import React from 'react'
import { Link } from 'react-router-dom'

import { SHeader, SImage } from './styles'
import hotelLogo from '../../assets/icons/top-hotel.jpg'

const Header: React.FC = () => (
    <SHeader>
        <Link to={`/`} >
            <SImage src={hotelLogo} alt="hotel logo" />
        </Link>
    </SHeader>
)

export default Header