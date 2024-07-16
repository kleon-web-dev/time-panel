import React from 'react';


const Calendar = () => {
    let date = new Date();
    let year = date.getFullYear();
    let day = date.getDate();

    const weekdays = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
    const months = [
        'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 
        'Maggio', 'Giugno', 'Luglio', 'Augosto', 
        'Settembre', 'Ottobre', 'Novembre',   'Dicembre'
    ];
    let month = months[date.getMonth()]
    let weekday = weekdays[date.getDay()];
    
    return (
        <div className='calendar-container'>
            <div className='calendar-top'>{month}</div>
            <div className='calendar-bottom'>
                <div className='weekday'>{weekday}</div>
                <div className='day'>{day}</div>
                <div className='year'>{year}</div>
               
            </div>
        </div>
    );
};

export default Calendar;