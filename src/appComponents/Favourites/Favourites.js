import React, { useState, useEffect, useRef } from 'react'
import Carousel from 'react-bootstrap/Carousel'

const Favourites = () => {
    const [myJokes, setMyJokes] = useState([])

    const carouselRef = useRef()

    useEffect(()=> {
        setMyJokes(JSON.parse(localStorage.bestJokes))
        // console.log(carouselRef)
    },[])



    const removeJoke = (e) => {
    
        console.log(e.currentTarget)
        const target = e.currentTarget
        const lastEl = myJokes[myJokes.length-1]
        

        if (lastEl.id === +target.dataset.id) {
            
            const jokes = myJokes.filter(el => el.id !== +target.dataset.id)
            localStorage.setItem("bestJokes", JSON.stringify(jokes))
            setMyJokes(JSON.parse(localStorage.bestJokes))

            carouselRef.current.prev()
            
        } else {
            const jokes = myJokes.filter(el => el.id !== +target.dataset.id)

        
            localStorage.setItem("bestJokes", JSON.stringify(jokes))
            setMyJokes(JSON.parse(localStorage.bestJokes))
        }

    }

return (
        <>
        <div className="joke-carousel">
        {myJokes.length ? <Carousel ref={carouselRef}>
            {myJokes.map((el, i) => {
                return (<Carousel.Item key={i}>
                
                <div className="joke-carousel-item">
                    <h3>{i + 1}</h3>
                    <div className="remove-icon" data-id={el.id} onClick={removeJoke}>
                        <i className="far fa-times-circle"></i>
                        </div>
                    <div className="joke-text">
                        <p>{el.joke}</p>
                    </div>
                </div>

                </Carousel.Item>)
            })}
        </Carousel> : <div className="go-to-jokes">Go to Chuck jokes and find your favourites!</div>}
        </div>

        </>
)
}

export default Favourites