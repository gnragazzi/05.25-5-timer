import { useRef, useState, useEffect } from 'react'
import reducer from './reducer'

function App() {
  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  const [clock, setClock] = useState(sessionLength * 60)
  const [isClockRunning, setIsClockRunning] = useState(false)
  const [isSessionCycle, setIsSessionCycle] = useState(true)
  const [isCountdownFinished, setIsCountdownFinished] = useState(false)

  const audioRef = useRef(null)
  const formatTime = (time) => {
    const min = Math.floor(time / 60)
    const sec = Math.floor(time % 60)
    return {
      min: min < 10 ? `0${min}` : min,
      sec: sec < 10 ? `0${sec}` : sec,
    }
  }
  useEffect(() => {
    if (clock === 0) {
      setIsSessionCycle(!isSessionCycle)
      setClock(isSessionCycle ? breakLength * 60 : sessionLength * 60)
      setIsCountdownFinished(true)
      audioRef.current.play()
      const timeout = setTimeout(() => {
        setIsCountdownFinished(false)
      }, 2000)
    }
    if (isClockRunning && !isCountdownFinished) {
      const clockInt = setInterval(() => {
        setClock(clock - 1)
      }, 1000)
      return () => clearInterval(clockInt)
    }
  }, [isClockRunning, clock, isCountdownFinished])
  return (
    <section className='section-center'>
      <h1 className='title'>25+5 Clock</h1>
      <div className='clock-container'>
        <div className='break-session-container'>
          <article className='session-container'>
            <h4 className='container-title' id='session-label'>
              Session Lenght
            </h4>
            <div className='btn-container'>
              <button
                className='icon'
                id='session-decrement'
                onClick={() => {
                  if (!isClockRunning) {
                    sessionLength > 1 && setSessionLength(sessionLength - 1)
                    isSessionCycle &&
                      sessionLength > 1 &&
                      setClock((sessionLength - 1) * 60)
                  }
                }}
              >
                decrement
              </button>
              <p className='Session-time time' id='session-length'>
                {sessionLength}
              </p>
              <button
                className='icon'
                id='session-increment'
                onClick={() => {
                  if (!isClockRunning) {
                    sessionLength < 60 && setSessionLength(sessionLength + 1)
                    isSessionCycle &&
                      sessionLength < 60 &&
                      setClock((sessionLength + 1) * 60)
                  }
                }}
              >
                increment{' '}
              </button>
            </div>
          </article>
          <article className='break-container'>
            <h4 className='container-title' id='break-label'>
              Break Length
            </h4>
            <div className='btn-container'>
              <button
                className='icon'
                id='break-decrement'
                onClick={() => {
                  if (!isClockRunning) {
                    breakLength > 1 && setBreakLength(breakLength - 1)
                    !isSessionCycle &&
                      breakLength > 1 &&
                      setClock((breakLength - 1) * 60)
                  }
                }}
              >
                decrement
              </button>

              <p className='break-time time' id='break-length'>
                {breakLength}
              </p>
              <button
                className='icon'
                id='break-increment'
                onClick={() => {
                  if (!isClockRunning) {
                    breakLength < 60 && setBreakLength(breakLength + 1)
                    !isSessionCycle &&
                      breakLength < 60 &&
                      setClock((breakLength + 1) * 60)
                  }
                }}
              >
                {' '}
                increment{' '}
              </button>
            </div>
          </article>
        </div>
        <article className={`display ${isCountdownFinished ? 'danger' : ''}`}>
          <h4 className='display-title' id='timer-label'>
            {isSessionCycle ? 'Session' : 'Break'}
          </h4>
          <h2 className='display-time' id='time-left'>
            {formatTime(clock).min}:{formatTime(clock).sec}
          </h2>
          <audio
            src='https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Gongs%20and%20Super%20Crashes/1364[kb]muted_gong.wav.mp3'
            ref={audioRef}
            id='beep'
          ></audio>
        </article>
        <div className='control-btns'>
          <button
            id='start_stop'
            onClick={() => {
              setIsClockRunning(!isClockRunning)
            }}
          >
            {isClockRunning ? (
              <button className='icon'>pause</button>
            ) : (
              <button className='icon'>play</button>
            )}
          </button>
          <button
            className='icon'
            id='reset'
            onClick={() => {
              audioRef.current.pause()
              audioRef.current.currentTime = 0
              setBreakLength(5)
              setSessionLength(25)
              setClock(1500)
              setIsClockRunning(false)
              setIsSessionCycle(true)
              setIsCountdownFinished(false)
            }}
          >
            reset
          </button>
        </div>
      </div>
    </section>
  )
}

export default App
