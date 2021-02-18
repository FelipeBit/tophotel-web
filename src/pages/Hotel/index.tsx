import React, { useState, useEffect } from "react"
import ReactStars from 'react-stars'
import Loader from "react-loader-spinner";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import api from '../../services/api'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Container from '../../components/Container'
import SubTitle from '../../components/SubTitle'
import Title from '../../components/Title'
import ImgBig from '../../components/ImgBig'
import TextBox from '../../components/TextBox'
import Text from '../../components/Text'
import Button from '../../components/Button'
import Grid2Columns from '../../components/Grid2Columns'
import Grid1Column from '../../components/Grid1Column'

interface Hotel {
    info: {
        hotel: {
            name: string,
            rating: number,
            address: {
                lines: Array<string>,
                cityName: string
            },
            contact: {
                phone: string,
                email: string
            },
            description: {
                text: string
            },
            media: [{
                uri: string
            }]
        }
    }

}

interface Weather {
    weather: [
        {
            WeatherText: string,
            WeatherIcon: number,
            Temperature: {
                Metric: {
                    Value: string
                }
            },
            RealFeelTemperature: {
                Metric: {
                    value: string
                }
            },
            Link: string

        }
    ]
}

function Hotel(props: any) {
    const [isLoading, setIsLoading] = useState(true)
    const [hotel, setHotel] = useState<Hotel | any>('')
    const [weather, setWeather] = useState<Weather | any>('')

    useEffect(() => {

        api.get(`hotels/${props.match.params.id}`)
            .then(function (response) {

                setHotel(response.data)
                console.log(response.data)

                api.get(`weather/`, {
                    params: {
                        latitude: response.data.info.hotel.latitude,
                        longitude: response.data.info.hotel.longitude
                    }
                })
                    .then(function (response) {

                        console.log(response.data)

                        //setWeather(response.data)

                    })
                    .catch(function (error) {
                        console.log(error);
                    }).finally(() => {
                        setIsLoading(false)
                    })


            })
            .catch(function (error) {
                console.log(error);
            }).finally(() => {
                setIsLoading(false)
            })

    }, [])

    const handleClick = () => {
        toast.success('Hotel booked successfully!');
    }

    return (
        <>
            <Header />
            <Container>

                {isLoading
                    ? (
                        <div style={{ textAlign: 'center' }}>
                            <Title>Loading</Title>
                            <Loader type="ThreeDots" color="#00077F" height={80} width={80} />
                        </div>
                    )
                    : (
                        <>
                            <Title>{hotel.info.hotel.name}</Title>
                            <ImgBig image={hotel.info.hotel.media[0].uri} />
                            <Grid2Columns>
                                <p style={{ textAlign: 'right', marginTop: '5px', fontWeight: 'bold', fontSize: '24px', color: '#00077F' }} >Classification:</p>
                                <ReactStars
                                    count={5}
                                    value={Number(hotel.info.hotel.rating)}
                                    half={false}
                                    size={32}
                                    color2={'#ffd700'}
                                    edit={false}
                                />
                            </Grid2Columns>
                            <Grid1Column>
                                <div style={{ width: '100%', textAlign: 'center' }}>
                                    <Button onClick={handleClick} isLoading={isLoading}>Reserve Now</Button>
                                </div>
                            </Grid1Column>
                            <SubTitle>Description</SubTitle>
                            <TextBox>{hotel.info.hotel.description.text}</TextBox>
                            {weather ? (
                                <section>
                                    <SubTitle>Current weather</SubTitle>
                                    <Text>Weather: {weather.weather[0]?.WeatherText}</Text>
                                    <Text>Temperature: {weather?.weather[0]?.Temperature?.Metric?.Value} °C</Text>
                                    <Text>Real Feel Temperature: {weather?.weather[0]?.RealFeelTemperature?.Metric?.Value} °C</Text>
                                    <Text>More info: {weather?.weather[0]?.Link}</Text>
                                </section>
                            ) : null
                            }
                            <section>
                                <SubTitle>Contact</SubTitle>
                                <Text>Phone: {hotel.info.hotel.contact.phone}</Text>
                                <Text>E-mail: {hotel.info.hotel.contact.email}</Text>
                                <Text>Adress: {hotel.info.hotel.address.cityName},
                            {hotel.info.hotel.address.lines.map((line: string) => {
                                    return `${line},`
                                })}
                                </Text>
                            </section>
                        </>
                    )
                }
            </Container>
            <Footer />
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
}

export default Hotel