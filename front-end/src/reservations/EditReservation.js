import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";
import { formatAsDate } from "../utils/date-time";

// Defines the EditReservation component for the edit reservation page.

export default function EditReservation() {
  const URL = process.env.REACT_APP_API_BASE_URL;
  const { reservation_id } = useParams();
  const [existingReservation, setExistingReservation] = useState(null);
  const [error, setError] = useState(null);

  // Makes a GET request for a record that matches the 'reservation_id' param.
  // If a match is found, it is set to the 'existingReservation' state.
  // If not, the 'error' state is set accordingly and displayed.
  useEffect(() => {
    const abortController = new AbortController();
    axios
      .get(`${URL}/reservations/${reservation_id}`, {
        signal: abortController.signal,
      })
      .then((response) =>
        setExistingReservation({
          ...response.data.data,
          reservation_date: formatAsDate(response.data.data.reservation_date),
        })
      )
      .catch(setError);
    return () => abortController.abort();
  }, [URL, reservation_id]);

  // If an existing reservation is found, the ReservationForm component is called in 'editMode'.
  return (
    <div>
      <h1 className="my-4">Edit Reservation</h1>
      <ErrorAlert error={error} />
      {existingReservation && (
        <ReservationForm
          existingReservation={existingReservation}
          editMode={true}
        />
      )}
    </div>
  );
}
