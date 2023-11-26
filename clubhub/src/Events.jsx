import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Events() {
  const events = useSelector((state) => state.events.events);
  console.log(events);

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center p-10">
      <div className="w-100 bg-white rounded p-3">
        <Link to="/login" className="btn btn-success btn-sm">
          add event+
        </Link>
        <table className="table">
          <thead>
            <tr>
              <td>EventName</td>
              <td>ClubName</td>
              <td>Venue</td>
              <td>Capcity</td>
              <td>Date</td>
              <td>Time</td>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.en}</td>
                <td>{event.cn}</td>
                <td>{event.ev}</td>
                <td>{event.ec}</td>
                <td>{formatDate(event.ed)}</td>
                <td>{event.et}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
