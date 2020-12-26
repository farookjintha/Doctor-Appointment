import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import ModalForm from './ModalForm';
import DisplayItem from './DisplayItem';

import {createSlot, getSlots, list} from '../api/apiFunc';

const Dashboard = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showModal, setShowModal] = useState(false);
    const [showSlots, setShowSlots] = useState(true);
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [isBooked, setIsBooked] = useState(false);
    const [slotResult, setSlotResult ] = useState([]);
    const [dateForSlotDisplay, setDateForSlotDisplay] = useState(new Date());

    const [searchResult, setSearchResult] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    
    const listSlots = () => (
        getSlots().then(data =>{
            if(data.error){
                setError(data.error);
            }else{
                console.log("Data from DB: ", data);
                setSlotResult(data);
                setSearchResult(false);
            }
        }
        )
    );

    useEffect(()=>{
        listSlots();
        displaySlots();
    }, []);

    useEffect(()=> {
        // console.log("Start Time: ", startTime);
        // console.log("End Time: ", endTime);
    }, [startTime, endTime]);

    const searchData = (date) => {
        if(date){
            list({selectedDate: date || undefined})
            .then(response => {
                if(response.error){
                    console.log(response.error);
                }else{
                    setSearchResult(response);
                    setSlotResult(false);
                    console.log("Searched Result: ", searchResult);
                }
            })
        }
    }

    const searchSubmit = (event) => {
        event.preventDefault();
        let day = dateForSlotDisplay.getDate();
        let month = dateForSlotDisplay.getMonth() + 1;
        let year = dateForSlotDisplay.getFullYear();
        let date = `${month}-${day}-${year}`
        searchData(date);
    }
    
    const selectDate = () =>(
        <form onSubmit={searchSubmit}>
            <div>
                <DatePicker selected={dateForSlotDisplay} dateFormat="dd/MM/yyyy" showYearDropdown onChange={date => setDateForSlotDisplay(date)} />
                <button className="input-group-text">Search</button>
            </div>
        </form>
    )

    const handleModal = event => {
        setShowModal(!showModal);
    }


    const handleSubmit = (event) => {
        // console.log(showModal);
        // setShowModal(!showModal);
        let day = selectedDate.getDate();
        let month = selectedDate.getMonth() + 1;
        let year = selectedDate.getFullYear();
        // console.log("Date Selected: ",(`${day} ${month} ${year}`));
        let startHr = startTime.getHours();
        let startMin = startTime.getMinutes();

        let endHr = endTime.getHours();
        let endMin = endTime.getMinutes();
        
        let modifiedSelectedDate = `${month}-${day}-${year}`;
        let modifiedStartTime = `${month}-${day}-${year} ${startHr}:${startMin}`
        let modifiedEndTime = `${month}-${day}-${year} ${endHr}:${endMin}`

        let diffTime1 = new Date(`${month}-${day}-${year} ${startHr}:${startMin}`)
        let diffTime2 = new Date(`${month}-${day}-${year} ${endHr}:${endMin}`)
        console.log("End  > Start : ",(diffTime2.getTime() > diffTime1.getTime()))
        console.log("Time Difference: ", (diffTime2.getTime() - diffTime1.getTime()))

        if((diffTime2.getTime() > diffTime1.getTime()) && ((diffTime2.getTime() - diffTime1.getTime()) <= 30*60*1000)){    
            let payload = {
                selectedDate: modifiedSelectedDate,
                startTime: modifiedStartTime,
                endTime: modifiedEndTime,
                isBooked
            }
            createSlot(payload).then(data => {
                if(data.error){
                    setError(data.error)
                }else{
                    setError('');
                    setSuccess(true);
                }
            });
            console.log(payload)
        }else{
            diffTime2.getTime() < diffTime1.getTime() ? setError("End Time should be greater than Start Time") : 
                setError("Slot time should not exceed 30 min")
        }
        
    }

    const handleSelectedDate = (date) => {
        // let formatDate = date.getDate();
        // let formatMonth = date.getMonth();
        // let formatYear = date.getYear();
        // let finalDate = new Date(`${formatDate}/${formatMonth}/${formatYear}`)
        setSelectedDate(date);
        console.log("Date from Props: ", selectedDate);
    }

    const handleStartTime = (date) => {
        setStartTime(date);
        console.log("StartTime from Props: ", startTime);
    }
    const handleEndTime = (date) => {
        setEndTime(date);
        console.log("EndTime from Props: ", endTime);
    }
     
    const displaySlots = () => (
        <div>
            <h2>List Slots:</h2> {selectDate()}
                {/* {JSON.stringify(slotResult)} */}
            <div className="row">
                {slotResult && slotResult.map((slot, i) => (
                    <div key={i} className="col-xs">
                        <DisplayItem item={slot} />
                    </div>
                ))}
                {searchResult && searchResult.map((slot, i) => (
                    <div key={i} className="col-xs">
                        <DisplayItem item={slot} />
                    </div>
                ))}
            </div>
        </div>
    )
    
    
    
    const showMenu = () => {
        return (
            <div className="row">
                <div className="container">
                <ul className="nav bg-primary">
                    <li className="nav-item" onClick={listSlots}>
                        <Link className="btn btn-primary" to="/doctor/dashboard" >List Slots</Link>
                    </li>
    
                    <li className="nav-item">
                        <button className="btn btn-primary" onClick={handleModal} >Add Slot</button>
                    </li>
                </ul>
                </div>
                    <div className="container">
                        {displaySlots()}
                    </div>
                
                <div className="container">
                    <ModalForm 
                        onClose={handleModal}
                        selectedDate={selectedDate} 
                        startTime={startTime} 
                        endTime={endTime} 
                        show={showModal} 
                        handleSelectedDate={handleSelectedDate}
                        handleStartTime={handleStartTime}
                        handleEndTime={handleEndTime}
                        handleSubmit={handleSubmit}
                        success={success}
                        error={error}
                        />
                </div>
            </div>
        );
    }


    return(
        <div>
            {showMenu()}
        </div>
    )
}

export default Dashboard;