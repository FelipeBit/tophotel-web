import React, { useEffect, useState } from "react"
import Select from 'react-select'
import ReactStars from 'react-stars'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import api from '../../services/api'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Card from '../../components/Card'
import HorizontalCard from '../../components/HorizontalCard'
import Container from '../../components/Container'
import Grid1Column from '../../components/Grid1Column'
import Grid2Columns from '../../components/Grid2Columns'
import SubTitle from '../../components/SubTitle'
import Title from '../../components/Title'
import Button from '../../components/Button'

import portugalImage from '../../assets/images/portugal.jpg'
import brazilImage from '../../assets/images/brazil.jpg'
import italyImage from '../../assets/images/italy.jpeg'
import spainImage from '../../assets/images/spain.jpeg'


const prices = [
    { value: '0-99999', label: 'EUR: All Prices' },
    { value: '10-300', label: 'EUR: 10 to 300' },
    { value: '301-600', label: 'EUR: 301 to 600' },
    { value: '601-1000', label: 'EUR: 601 to 1000' }
]

interface Country {
    code: string,
    name: string,
    id: string
}

interface City {
    countryCode: number,
    code: string,
    name: string,
    id: string
}

function Home() {
    const [countries, setCountries] = useState<any[]>([])
    const [selectedCountry, setSelectedCountry] = useState('')
    const [cities, setCities] = useState<any[]>([])
    const [selectedCity, setSelectedCity] = useState('')
    const [availableCities, setAvailableCities] = useState<any[]>([])
    const [hotels, setHotels] = useState<any[]>([])
    const [rating, setRating] = useState(5)
    const [hotelRatings, setHotelRatings] = useState([1, 2, 3, 4, 5])
    const [selectedPrice, setSelectedPrice] = useState('0')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {

        api.get('countries')
            .then(function (response) {
                const countriesResult = response.data.map((country: Country) => {
                    return (
                        {
                            value: country.code,
                            label: country.name
                        }
                    )
                })

                setCountries(countriesResult)

                api.get('cities')
                    .then(function (response) {

                        const citiesResult = response.data.map((city: City) => {
                            return (
                                {
                                    countryCode: city.countryCode,
                                    value: city.code,
                                    label: city.name
                                }
                            )
                        })

                        setCities(citiesResult)

                    })
                    .catch(function (error) {
                        console.log(error);
                    })

            })
            .catch(function (error) {
                console.log(error);
            })

    }, [])

    useEffect(() => {
        const filteredCities = cities.filter(city => city.countryCode == selectedCountry)
        setAvailableCities(filteredCities)
    }, [selectedCountry])

    const handleRating = (newRating: number) => {
        const ratingArray = []
        setHotelRatings([1])
        setRating(newRating)

        for (let i = 1; i <= newRating; i++) {
            ratingArray.push(i)
        }

        setHotelRatings(ratingArray)
    }


    const handleClick = () => {

        if (selectedCity === '' || selectedCountry === '' || selectedPrice === '0') {
            toast.error('You must select country, city and range price!');
            return
        }

        setHotels([])
        const cityCode = selectedCity
        let hotelsFounded = false

        setIsLoading(true)

        api.get('hotels', {
            params: {
                cityCode,
                ratings: hotelRatings,
                priceRange: selectedPrice
            }
        })
            .then(function (response) {
                const hotelsResponse = response.data.data
                if (hotelsResponse.lenght > 0) {
                    hotelsFounded = true
                }
                setHotels(hotelsResponse)
            })
            .catch(function (error) {
                toast.error('Unexpected error!');
                console.log(error);
            }).finally(() => {
                setIsLoading(false)
            })
    }

    return (
        <>
            <Header />
            <Container>
                <Title>Here at TopHotel you can find the best prices for the best destinations</Title>
                <SubTitle>Do your research here</SubTitle>
                <section style={{ border: 'solid 1px', width: '100%', borderColor: '#D6DBDF', borderRadius: '10px', padding: '20px 20px 0 20px' }}>
                    <Select
                        options={countries}
                        placeholder='What country are you going to?'
                        onChange={(event: any) => setSelectedCountry(event.value)}
                    />
                    <Select
                        options={availableCities}
                        placeholder='And what city?'
                        onChange={(event: any) => setSelectedCity(event.value)}
                    />
                    <Select
                        options={prices}
                        placeholder='Choose price range...'
                        onChange={(event: any) => setSelectedPrice(event.value)}
                    />
                    <Grid2Columns>
                        <p style={{ textAlign: 'right', marginTop: '5px', fontWeight: 'bold', color: '#00077F' }} >Choose hotel max rating:</p>
                        <ReactStars
                            count={5}
                            value={rating}
                            half={false}
                            size={24}
                            color2={'#ffd700'}
                            onChange={handleRating}
                        />
                    </Grid2Columns>
                    <Grid1Column>
                        <div style={{ width: '100%', textAlign: 'center' }}>
                            <Button onClick={handleClick} isLoading={isLoading}>Search</Button>
                        </div>
                    </Grid1Column>

                </section>
                {
                    hotels.length > 0 ? <SubTitle>These are the Best hotels found in our search</SubTitle> : null
                }
                <Grid1Column>
                    {
                        hotels.map(hotel =>

                            <HorizontalCard
                                key={hotel.hotel.name}
                                image={hotel.hotel.media[0].uri}
                                title={hotel.hotel.name}
                                description={hotel.hotel.description.text}
                                rating={Number(hotel.hotel.rating)}
                                hotelId={hotel.hotel.hotelId} />

                        )
                    }
                </Grid1Column>
                <SubTitle>Find the best hotels in the best countries</SubTitle>
                <Grid2Columns>
                    <Card country={'Brazil'} countryCode={'https://en.wikipedia.org/wiki/Brazil'} image={brazilImage} />
                    <Card country={'Portugal'} countryCode={'https://en.wikipedia.org/wiki/Portugal'} image={portugalImage} />
                    <Card country={'Italy'} countryCode={'https://en.wikipedia.org/wiki/Italy'} image={italyImage} />
                    <Card country={'Spain'} countryCode={'https://en.wikipedia.org/wiki/Spain'} image={spainImage} />
                </Grid2Columns>
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

export default Home