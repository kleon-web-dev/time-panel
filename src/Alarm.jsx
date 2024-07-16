import React, { useState, useEffect } from 'react';

function Alarm() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [notificationSent, setNotificationSent] = useState(false); // Aggiunto stato per controllare se la notifica è stata già inviata

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (isRunning) {
                const now = new Date();
                setCurrentTime(now);
                const currentMinutes = now.getMinutes();
                const currentHours = now.getHours();

                // Verifica se l'orario corrente corrisponde all'orario impostato e se la notifica non è ancora stata inviata
                if (currentHours === hours && currentMinutes === minutes && !notificationSent) {
                    if ("Notification" in window) {
                        if (Notification.permission === "granted") {
                            new Notification("Sveglia", {
                                body: `Sveglia per ${hours}:${minutes}. Fai clic qui per disattivare l'allarme.`,
                                icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzQE-cB500hWzT6lyEwUylMrqqd6nMkWsQng&s"
                            });
                        } else if (Notification.permission === "default") {
                            Notification.requestPermission().then((permission) => {
                                if (permission === "granted") {
                                    new Notification("Sveglia", {
                                        body: `Sveglia per ${hours}:${minutes}. Fai clic qui per disattivare l'allarme.`,
                                        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzQE-cB500hWzT6lyEwUylMrqqd6nMkWsQng&s"
                                    });
                                }
                            });
                        }
                    }
                    setNotificationSent(true);
                    setHours(0);
                    setMinutes(0);
                    setIsRunning(false);
                }
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [minutes, hours, isRunning, notificationSent]); 
    function incrM() {
        setMinutes((m) => (m + 1) % 60);
    }

    function decrM() {
        setMinutes((m) => (m - 1 + 60) % 60);
    }

    function incrH() {
        setHours((h) => (h + 1) % 24);
    }

    function decrH() {
        setHours((h) => (h - 1 + 24) % 24);
    }

    function start() {
        setIsRunning(true);
        setNotificationSent(false); 
    }

    function clear() {
        setIsRunning(false);
        setHours(0);
        setMinutes(0);
        setNotificationSent(false); 
    }


    function formatTime() {
        let fHours = String(hours).padStart(2, "0");
        let fMinutes = String(minutes).padStart(2, "0");
        return `${fHours}:${fMinutes}`;
    }

    return (
        <div className='alarm-container'>
            <div className='alarm-display'>
            <div className="alarm-time">{formatTime()}</div>
                
                <div className="alarm-display-incrdecr">
                    <div className='alarm-increments'>
                        <button onClick={incrH}>Ore +</button>
                        <button onClick={incrM}> Minuti +</button>
                    </div>
                    
                    <div className="alarm-decrements">
                        <button onClick={decrH}>Ore -</button>
                        <button onClick={decrM}>Minuti -</button>
                    </div>
                </div>
                <div className="alarm-controls">
                    <button onClick={start} className='start-alarm'>Inizia</button>

                    <button onClick={clear} className='clear-alarm'>Resetta</button>
                </div>
                
            </div>
        </div>
    );
}

export default Alarm;
