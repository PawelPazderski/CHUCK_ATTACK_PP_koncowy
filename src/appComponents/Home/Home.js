import React, { useState } from "react"
import ReactAudioPlayer from 'react-audio-player';

const Home = () => {
    const [play, setPLay] = useState(false)

    const playTune = () => {
        setPLay(true)
    }

    const stopTune = () => {
        setPLay(false)
    }

    return (
        <>
            <div className="title-container">
                <h1 className="title">Chuck Attack</h1>
                {!play
                ?
                <div className="joke-btn">
                                <div className="another_bck"
                                    onClick={() => playTune()}
                                    >
                                    <i className="fas fa-play"></i>
                                </div>
                                <p>play tune</p>
                </div>
                :
                <div className="joke-btn">
                                <div className="another_bck"
                                    onClick={() => stopTune()}
                                    >
                                    <i className="fas fa-stop"></i>
                                </div>
                                <p>stop tune</p>
                </div>
                }
            </div>
            
            {play
            &&
            <ReactAudioPlayer
            src="/sounds/Walker.mp3"
            autoPlay
            loop={true}
            volume={0.1}
            // controls
            />
            }
        </>
    )
}

export default Home