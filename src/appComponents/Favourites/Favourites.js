import React, { useState, useEffect } from 'react'
import Carousel from 'react-bootstrap/Carousel'

const Favourites = () => {
    const [myJokes, setMyJokes] = useState([])
    const [change, setChange] = useState(false)

    useEffect(()=> {
        setMyJokes(JSON.parse(localStorage.bestJokes))
    },[])

    useEffect(()=> {
        setMyJokes(JSON.parse(localStorage.bestJokes))
    },[change])

    const removeJoke = (e) => {
    
        console.log(e.currentTarget)
        const target = e.currentTarget
        console.log(+target.dataset.id)
        const jokes = myJokes.filter(el => el.id !== +target.dataset.id)
        console.log(jokes)
        
        localStorage.setItem("bestJokes", JSON.stringify(jokes))
        setChange(prev => !prev)
    }

return (
        <>
        <div className="joke-carousel">
        {myJokes.length ? <Carousel>
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