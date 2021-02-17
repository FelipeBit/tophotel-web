import React from 'react'

import Loader from "react-loader-spinner";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { SButton } from './styles'

interface IButton {
    onClick: any;
    children: string;
    isLoading: boolean;
}

function Button(props: IButton) {

    const handleClick = (event: any) => {
        const { onClick } = props;

        onClick && onClick({ event });
    };

    return (
        <SButton onClick={handleClick} disabled={props.isLoading}>
            {props.isLoading
                ? (
                    <Loader
                        type="Puff"
                        color="white"
                        height={30}
                        width={30}
                        timeout={20000}
                    />
                )
                : props.children}
        </SButton>
    )
}


export default Button