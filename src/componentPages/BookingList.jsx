import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const BookingList = () => {
  let [bookingList, setBookingList] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3003/booking").then((res) => {
      setBookingList(res.data)
    })
  }, [])

  let handleCancelTickets = (bookingID) => {
    const booking = bookingList.find(b => b.id === bookingID);
    if (!booking) return;

    axios.delete(`http://localhost:3003/booking/${booking.id}`)
      .then(() => {
        axios.get(`http://localhost:3003/${booking.type}/${booking.refID}`)
          .then((res) => {
            let updatedSeats = res.data.seats + booking.seats;
            axios.patch(`http://localhost:3003/${booking.type}/${booking.refID}`, {
              seats: updatedSeats
            }).then(() => {
              setBookingList(prev => prev.filter((b) => b.id !== booking.id))
              toast.success("Tickets Cancelled Successfully")
            })
          })
      })
  }

  return (
    <div className="booking-list-container">
      <ToastContainer />
      <h1 className="booking-title">Booking List</h1>
      {
        bookingList.map((ticket) => (
          <div className="booking-card" key={ticket.id}>
            <h2>{ticket.title}</h2>
            <p>Name: {ticket.name}</p>
            <p>Phone: {ticket.phone}</p>
            <p>No. of Seats: {ticket.seats}</p>
            <button className="cancel-button" onClick={() => handleCancelTickets(ticket.id)}>
              Cancel Ticket
            </button>
          </div>
        ))
      }
    </div>
  )
}

export default BookingList
