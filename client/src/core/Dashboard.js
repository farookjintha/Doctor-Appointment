import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import ModalForm from './ModalForm';

import {createSlot} from '../api/apiFunc';

const Dashboard = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showModal, setShowModal] = useState(false);
    const [showSlots, setShowSlots] = useState(true);
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [isBooked, setIsBooked] = useState(false);
    const [slotResult, setSlotResult ] = useState([]);

    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    
    const listSlots = () => (
        console.log("List Slots: "+ selectedDate)
    );

    useEffect(()=>{
        listSlots();
    }, [selectedDate]);

    useEffect(()=> {
        // console.log("Start Time: ", startTime);
        // console.log("End Time: ", endTime);
    }, [startTime, endTime]);
    
    const selectDate = () =>(
        <div>
            <DatePicker selected={selectedDate} dateFormat="dd/MM/yyyy" showYearDropdown onChange={date => setSelectedDate(date)} />
        </div>
    )

    const handleModal = event => {
        setShowModal(!showModal);
    }


    const handleSubmit = (event) => {
        // console.log(showModal);
        setShowModal(!showModal);
        let payload = {
            selectedDate,
            startTime,
            endTime,
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
    
    
    const showMenu = () => {
        return (
            <div className="container">
                <ul className="nav bg-primary">
                    <li className="nav-item">
                        <Link className="btn btn-primary" to="/doctor/dashboard" >List Slots</Link>
                    </li>
    
                    <li className="nav-item">
                        <button className="btn btn-primary" onClick={handleModal} >Add Slot</button>
                    </li>
                </ul>
                <div>
                    <h2>List Slots:</h2>
                    
                        {selectDate()}
                </div>
                
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
                    />
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