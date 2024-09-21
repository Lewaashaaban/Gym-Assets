import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import emailjs from "emailjs-com";
import "../styles/Contact.css";

const Contact = () => {
  const [name, setUserName] = useState("");
  const [email, setUserEmail] = useState("");
  const [phone, setUserPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleContact = (e) => {
    e.preventDefault();

    // Prepare the template parameters to be sent
    const templateParams = {
      from_name: name,
      from_email: email,
      from_phone: phone,
      message: message,
    };

    emailjs
      .send(
        "service_o9xljhj",
        "template_ma7cokm",
        templateParams,
        "p-GoMhzceHskZXmL5"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          alert("Message sent successfully!");
        },
        (err) => {
          console.log("FAILED...", err);
          alert("Failed to send message, please try again.");
        }
      );

    // Clear form fields after submission
    setUserName("");
    setUserEmail("");
    setUserPhone("");
    setMessage("");
  };

  return (
    <div className="contact">
      <div className="contact_header">
        <div className="data phone">
          <h6>Phone</h6>
          <p>
            <small>+961 71726727</small>
          </p>
        </div>
        <div className="data email">
          <h6>Email</h6>
          <p>
            <small>hadizeidan01@gmail.com</small>
          </p>
        </div>
        <div className="data address">
          <h6>Address</h6>
          <p>
            <small>Aley, Mount Lebanon, Lebanon</small>
          </p>
        </div>
      </div>
      <div className="contact_main">
        <div className="contact_heading">
          <h4>Get in Touch</h4>
        </div>
        <form onSubmit={handleContact}>
          <div className="contact_inputs">
            <TextField
              id="outlined-basic"
              label="Your name"
              variant="outlined"
              value={name}
              onChange={(e) => setUserName(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Your email"
              variant="outlined"
              value={email}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Your phone"
              variant="outlined"
              value={phone}
              onChange={(e) => setUserPhone(e.target.value)}
            />
          </div>
          <textarea
            className="messageArea"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" className="btn btn-primary sendMessageBtn">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
