import React, { useState, useEffect } from 'react'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import styled from 'styled-components'

const MENU_URL = "http://localhost:3001/movies";

const CustomButton = styled(Button)`
    background: brown;
    border: none;
`

const ChuckOGraphy = () => {
    const [movieList, setMovieList] = useState([])
    const [showMore, setShowMore] = useState(false)
    const [movieID, setMovieID] = useState(0)

    const movieMore = (e) => {
        // console.log(e.target)
        // console.log(e.target.id)
        setShowMore(true)
        setMovieID(+e.target.id)
    }

    const hideMore = () => {
        setShowMore(false)
    }

    useEffect(() => {
        fetch(MENU_URL)
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                throw new Error("Błąd")
            } )
            .then(movies => setMovieList(movies))
            .catch(err => console.log(err))

    },[])

    return (
        <>
        <div className="list-container">
        <div className="movie-list">
            <h1>The lucky list</h1>
            <div className="movies-list-items">
                <ul>
                {movieList.map(item => {
                    return <li key={item.id}>
                        <br/>
                        <h2>{item.titleOrg}</h2>
                        <h4>{item.titlePl}</h4>
                        <p>Character: {item.character}</p>
                        <p>{item.year} - {item.type}</p>
                        <CustomButton id={item.id} onClick={movieMore} size="sm" variant="dark">{item.titleOrg}: more</CustomButton>
                        </li>
                })}
            </ul>
            
            </div>
            
        </div>
        {showMore && <Card className="card-movie" style={{ width: '25rem' }}>
                    <Card.Title>{movieList[movieID-1].titleOrg}</Card.Title>
                    <Card.Img variant="top" src={movieList[movieID-1].poster} alt="foto" />

                    <Card.Body>
                        
                        <Card.Text>
                        Chuck Norris as {movieList[movieID-1].character}<br/>
                        World premiere: {movieList[movieID-1].year}<br/>
                        <br />
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                        incididunt ut labore et dolore magna aliqua. Vel quam elementum pulvinar etiam non. 
                        Velit ut tortor pretium viverra suspendisse potenti. Turpis egestas pretium aenean pharetra. 
                        Sit amet tellus cras adipiscing enim eu. Sollicitudin ac orci phasellus egestas tellus.
                        </Card.Text>
                        <CustomButton onClick={hideMore} size="sm" variant="dark">Close</CustomButton>

                    </Card.Body>
                    </Card>}
        </div>
        </>
    )
}



export default ChuckOGraphy