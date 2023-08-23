import React from "react";

const SingleMessage = ({ message, deleteMsg }) => {
  const getSource = (source) => {
    let user = "~anonymous";
    if (source) {
      user = source;
    }
    return user;
  };

  const getTime = (timestamp) => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const amPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    hours = hours >= 10 ? hours : `0${hours}`;
    let mins = date.getMinutes();
    mins = mins >= 10 ? mins : `0${mins}`;
    let seconds = date.getSeconds();
    seconds = seconds >= 10 ? seconds : `0${seconds}`;

    return `${hours}:${mins}:${seconds} ${amPm}`;
  };

  return (
    <section className="message_container">
      <i className="fa fa-user-circle-o user_icon" />
      <div className="messge_details">
        <div className="username_time">
          <span className="user_name">{getSource(message.source)}</span>
          <span className="message_time">{getTime(message.timestamp)}</span>
        </div>
        <div className="content">{message.text}</div>
        <button
          type="button"
          className="btn_delete"
          onClick={() => deleteMsg(message.id)}
        >
          Delete
        </button>
      </div>
    </section>
  );
};

export default SingleMessage;
