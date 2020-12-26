import React from 'react';

const DisplayItem = ({item}) => {
    const showBooked = (isBooked) => {
        return isBooked === true ? (
            <div className="badge badge-success badge-pill">Booked</div>
            ) : (
            <div className="badge badge-primary badge-pill">Yet to book</div>
            )
    }

    function format_two_digits(n) {
        return n < 10 ? '0' + n : n;
    }

    const timeFormat = (d) => {
        let hours = format_two_digits(d.getHours());
        let minutes = format_two_digits(d.getMinutes());
        return (<p>{hours}:{minutes}</p>)
    }


    return (
        
            <div className="card">
                <div className="card-header">Starting Time: {timeFormat(new Date(item.startTime))}</div>
                <div className="card-body">
                    Ending Time: {timeFormat(new Date(item.endTime))}
                    {showBooked(item.isBooked)}
                </div>
            </div>
        
    )
}

export default DisplayItem;