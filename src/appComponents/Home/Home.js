import React from "react"
import ReactAudioPlayer from 'react-audio-player';

const Home = () => {

    return (
        <>
            <h1 className="title">Chuck Attack</h1>
            <ReactAudioPlayer
            src="/sounds/Walker.mp3"
            autoPlay
            loop={true}
            volume={0.1}
            // controls
          />
          <div className="background"></div>
        </>
    )
}

export default Home