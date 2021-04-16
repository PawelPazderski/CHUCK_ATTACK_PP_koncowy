import React, { useState, useEffect } from 'react'
import useSound from 'use-sound'

const Jokes = () => {
    const [randomJoke, setRandomJoke] = useState("")
    const [nextJoke, setNextJoke] = useState(false)
    const [play] = useSound("/sounds/punch01.mp3",{ volume: 0.2 })
    // const [gun] = useSound("/sounds/gun01.mp3")

    useEffect(()=>{
        fetch("http://api.icndb.com/jokes/random")
            .then(res => res.json())
            .then(data => setRandomJoke(data.value.joke))
            .catch(err => console.log(err))
    },[nextJoke])

    const handleJoke = () => {
        setNextJoke(prev => !prev)
    }


    return (
        <>
        <div className="joke">
                <h2>{randomJoke}</h2>
                <div className="another_bck"
                onClick={() => {
                    handleJoke()
                    play()}
                }
                >
                <i className="fas fa-angle-right fa-2x"></i>
                </div>
                <p>hit again</p>
                <div className="another_bck"
                     onClick={play}>
                <i className="fas fa-heart"></i>
                </div>
                <p>add to favourites</p>
            
            
        </div>
        </>
    )
}

export default Jokes