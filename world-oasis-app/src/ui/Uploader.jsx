import { useState } from "react";
import Button from "./Button";
import { axiosClient } from "../services/axiosClient";
import { bookings } from "../data/data-bookings";
import { guests } from "../data/data-guests";

function Uploader() {
  const [isUploading, setIsUploading] = useState(false);

  async function upload() {
    setIsUploading(true);
    await axiosClient.post("bookings/bulk", bookings);
    await axiosClient
      .post("guests/bulk", guests)
      .then(() => setIsUploading(false));
  }

  return (
    <div
      style={{
        position: "fixed",
        width: "300px",
        left: "-50px",
        bottom: "-100px",
        marginTop: "auto",
        backgroundColor: "#e0e7ff",
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
      }}
    >
      <h3>DEV AREA</h3>

      <Button disabled={isUploading} onClick={upload}>
        Upload ALL sample data
      </Button>
      <p>Only run this only once!</p>
      <p>
        <em>(Cabin images need to be uploaded manually)</em>
      </p>
      <hr />
      <p>You can run this every day you develop the app</p>
    </div>
  );
}

export default Uploader;
