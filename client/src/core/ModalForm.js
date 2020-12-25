import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';

const ModalForm = (props) => {
    
    const onCloseButton = event => {
        console.log(props.show)
        props.onClose && props.onClose(event);
    }

    const handleSelectedDate = date => {
        props.handleSelectedDate && props.handleSelectedDate(date);
    }

    const handleStartTime = date => {
        props.handleStartTime && props.handleStartTime(date)
    }
    
    const handleEndTime = date => {
        props.handleEndTime && props.handleEndTime(date)
    }
    


    const handleSubmit = event => {
        props.handleSubmit && props.handleSubmit(event)
    }

    if(!props.show){
        return null;
    }

    return(
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter" onHide={onCloseButton} centered >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Slot
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    
                    <div className="row align-items-center">
                        <div className="col">
                            <h5>Select Date</h5>
                            <DatePicker selected={props.selectedDate} dateFormat="dd/MM/yyyy" onChange={date => handleSelectedDate(date)} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                        <h5>Start Time</h5>
                        <DatePicker
                            selected={props.startTime}
                            onChange={date => handleStartTime(date)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="HH:mm"
                            timeFormat="HH:mm"
                            />
                        </div>
                    
                        <div className="col">
                        <h5>End Time</h5>
                        <DatePicker
                            selected={props.endTime}
                            onChange={date => handleEndTime(date)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="HH:mm"
                            timeFormat="HH:mm"
                            />
                        </div>
                    </div>
                </div>
                <Button onClick={handleSubmit}>Add</Button>
            </form>
                
            </Modal.Body>
        </Modal>
    )
}

ModalForm.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    handleSelectedDate: PropTypes.func.isRequired,
    handleStartTime: PropTypes.func.isRequired,
    handleEndTime: PropTypes.func.isRequired,
    selectedDate: PropTypes.instanceOf(Date).isRequired,
    startTime: PropTypes.instanceOf(Date).isRequired,
    endTime: PropTypes.instanceOf(Date).isRequired
  };

export default ModalForm;