import React from 'react';
import './tableStyles.css';

const TableData = (props) => {

    
    // console.log("Props: ", props)
    const renderTableData = () => {
        return (props.data.map((item, i) => (
            <tr key={i}>
                 <td>{item.patientName}</td>
                 <td>{item.selectedDate}</td>
                 <td>{item.startTime}</td>
              </tr>
        )))
     }

    const renderTableHeader = () => {
        // let header = Object.keys(props.data[0])
        let header = ["Patient Name", "Appointment Date", "Slot Time"]
        return header.map((key, index) => {
           return <th key={index}>{key.toUpperCase()}</th>
        })
     }
  
    return(
        <div>
            <p>Total Appointments: {props.dataLength}</p>
            <table id="appointment">
                
                <thead>
                    <tr>{renderTableHeader()}</tr>
                </thead>
               <tbody>
                  {renderTableData()}
               </tbody>
               
            </table>
        </div>
    )
}

export default TableData;