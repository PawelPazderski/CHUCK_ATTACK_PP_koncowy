import React, { useState, useEffect } from 'react'
import useSound from 'use-sound'

const Jokes = () => {
    const [randomJoke, setRandomJoke] = useState({
        id:0,
        joke: "dupa zbita"
    })
    const [nextJoke, setNextJoke] = useState(false)
    const [play] = useSound("/sounds/punch01.mp3",{ volume: 0.2 })
    // const [gun] = useSound("/sounds/gun01.mp3")

    useEffect(()=>{
        if (!localStorage.bestJokes) {
            localStorage.setItem("bestJokes", JSON.stringify([]))
        }
    },[])


    useEffect(()=>{
        fetch("http://api.icndb.com/jokes/random")
            .then(res => res.json())
            .then(data => setRandomJoke({
                ...data.value,
                joke: data.value.joke.replace(/&quot;/g, '"')
            }))
            .catch(err => console.log(err))
    },[nextJoke])

    const handleJoke = () => {
        setNextJoke(prev => !prev)
    }


    const addToFavourite = () => {
        // localStorage.clear()
        const jokeArray = JSON.parse(localStorage.bestJokes);
        // console.log(jokeArray, randomJoke)
        const filter = jokeArray.filter(e => e.id === randomJoke.id)

    
        filter.length ? alert("You already added it:)") : jokeArray.push(randomJoke)

        localStorage.setItem("bestJokes", JSON.stringify(jokeArray))

        console.log("adding to favourite")
    }


    return (
        <>
        <div className="joke">
                <h2>{randomJoke.joke}</h2>
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
                     onClick={() => {
                         play()
                         addToFavourite()
                        }
                    }
                    >
                <i className="fas fa-heart"></i>
                </div>
                <p>add to favourites</p>
            
            
        </div>
        </>
    )
}

export default Jokes