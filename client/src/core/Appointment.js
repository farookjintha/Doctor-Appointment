import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import TableData from './TableData';


import {getAppointmentData, listAppointments } from '../api/apiFunc';

const Appointment = () => {
    const [appointmentData, setAppointmentData] = useState([])
    const [appointmentSearched, setAppointmentSearched] = useState(false);
    const [dateForAppointmentDisplay, setDateForAppointmentDisplay] = useState(new Date());

    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);


    const listAppointmentData = () => (
        getAppointmentData().then(data =>{
            console.log("Data: ", data)
            if(data.error){
                setError(data.error);
            }else{
                console.log("Data from DB: ", data);
                setAppointmentData(data);
                setAppointmentSearched(false);
                // console.log("Appointment Data: ", appointmentData);
            }
        })
    )

    useEffect(()=>{
        listAppointmentData();
        displaySlots();
    }, []);

    const searchAppointmentData = (date) => {
        if(date){
            listAppointments({selectedDate: date || undefined})
            .then(response => {
                if(response.error){
                    console.log(response.error);
                }else{
                    setAppointmentSearched(response);
                    setAppointmentData(false);
                    console.log("Searched Result: ", appointmentSearched);
                }
            })
        }
    };
    const searchAppointmentSubmit = (event) => {
        event.preventDefault();
        let day = dateForAppointmentDisplay.getDate();
        let month = dateForAppointmentDisplay.getMonth() + 1;
        let year = dateForAppointmentDisplay.getFullYear();
        let date = `${month}-${day}-${year}`
        searchAppointmentData(date);
    }

    const selectDate = () =>(
        <form onSubmit={searchAppointmentSubmit}>
            <div>
                <DatePicker selected={dateForAppointmentDisplay} dateFormat="dd/MM/yyyy" showYearDropdown onChange={date => setDateForAppointmentDisplay(date)} />
                <button className="input-group-text">Search</button>
            </div>
        </form>
    )

    const displaySlots = () => (
        <div>
            <h2>List Appointments:</h2> {selectDate()}
                {/* {JSON.stringify(slotResult)} */}
            <div className="row">
                {appointmentData && <TableData data={appointmentData} dataLength={appointmentData.length}/>}
                {appointmentSearched && <TableData data={appointmentSearched} dataLength={appointmentSearched.length} />}
            </div>
        </div>
    )

    const showMenu = () => {
        return (
            <div className="row">
                <div className="container">
                <ul className="nav bg-primary">
                    <li className="nav-item">
                        <Link className="btn btn-primary" to="/doctor/dashboard" >List Slots</Link>
                    </li>
    
                    <li className="nav-item">
                        <button className="btn btn-primary">Add Slot</button>
                    </li>
                    <li className="nav-item">
                        <Link className="btn btn-primary" to="/doctor/appointments" >Appointments</Link>
                    </li>
                </ul>
                </div>
                    <div className="container">
                        {displaySlots()}
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

export default Appointment;