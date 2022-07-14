import React, { useState, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner';
import Swal from 'sweetalert2'
import useSound from 'use-sound'

const Jokes = () => {
    const [randomJoke, setRandomJoke] = useState({
        id: 0,
        joke: ""
    })
    const [nextJoke, setNextJoke] = useState(false)
    const [play] = useSound("/sounds/punch01.mp3",{ volume: 0.2 })

    useEffect(()=>{
        if (!localStorage.bestJokes) {
            localStorage.setItem("bestJokes", JSON.stringify([]))
        }
    },[])


    useEffect(()=>{
        fetch("https://api.chucknorris.io/jokes/random")
            .then(res => res.json())
            .then(data => setRandomJoke({
                id: data.id,
                joke: data.value
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

    
        filter.length 
        ? 
        Swal.fire({
            icon: 'info',
            title: 'You already added this one',
            background: 'brown',
            color: 'white',
            showConfirmButton: false,
            timer: 1000,
            customClass: {
                popup: "swal2-custom"
            }
        })
        : 
        jokeArray.push(randomJoke)

        localStorage.setItem("bestJokes", JSON.stringify(jokeArray))

        console.log("adding to favourite")
    }


    return (
        <>
        <div className="joke">
                <div className="joke-container">
                    <h2>{randomJoke.joke.length 
                    ? 
                    randomJoke.joke 
                    :
                    <div>
                        <Spinner animation="border" variant="dark" />
                        <p>Loading...</p>
                    </div> 
                    }
                    </h2>
                    {randomJoke.joke.length 
                    ? 
                    <div className='joke-buttons'>
                        <div className="joke-btn">
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
                        <div className="joke-btn">
                            <div className="another_bck"
                                onClick={() => {
                                    handleJoke()
                                    play()
                                    }
                                }
                                >
                                <i className="fas fa-angle-right fa-2x"></i>
                            </div>
                            <p>hit again</p>
                        </div>
                    </div>
                    :
                    null
                    }
                    
                </div> 
        </div>
        </>
    )
}

export default Jokes;