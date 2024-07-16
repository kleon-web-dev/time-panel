import React, {useEffect, useState, useRef} from 'react';

const TimeWatch = () => {
    return (
        <div className='timewatch-container'>
            <DigitalTime />
            <Stopwatch />
        </div>
    );
};

export default TimeWatch;

const DigitalTime = () => {
    const [time, setTime] = useState(new Date())

    useEffect(() => {
        let intervalId = setInterval(() => {
            setTime(new Date())
        }, 1000);


        return () => {
            clearInterval(intervalId)
        }
    }, []);

    const formatTime = () => {
        let hours = time.getHours();
        let minutes = time.getMinutes();
        let seconds = time.getSeconds();

        let meridiem = (hours >= 12 ? "PM" : "AM")

         hours = hours % 12 || 12;
        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)} ${meridiem}`
    }
    function pad (num) {
        return (num < 10 ? "0" : "") + num
    }

    return (
        <>
        <div className="digitalwatch-container">
            <div className="time">{formatTime()}</div>
        </div>
        </>
    );
}

const Stopwatch = () => {
    const [isRunning, setIsRunning] = useState(false);
    let [elapsedTime, setElapsedTime] = useState(0);
    let interValIdRef = useRef(null);
    let startTimeRef = useRef(0);

    useEffect(() => {
        if(isRunning) {
            interValIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current)
            }, 10);
        }
        return () => {
            clearInterval(interValIdRef.current)
        }
    }, [isRunning])

    function start () {
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }
    function stop () {
        setIsRunning(false);
    }
    function clear () {
        setIsRunning(false);
        setElapsedTime(0)
    }
    function formatTime () {
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60))
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60)
        let seconds = Math.floor(elapsedTime / (1000) % 60)
        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        return `${hours}:${minutes}:${seconds}`
    }
    return (
        <>
        <div className="stopwatch-container">
        <div className="display">{formatTime()}</div>
        <div className="controls">
            <button className='start-time' onClick={start}>Inizia</button>
            <button className='stop-time'
            onClick={stop}>Ferma</button>
            <button className='clear-time' onClick={clear}>Resetta</button>
        </div>
        </div>
        </>
    );
}