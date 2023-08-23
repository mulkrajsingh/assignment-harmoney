import React, { useEffect, useState } from "react";
import { deleteMessages, getMessages } from "../Api/Api";
import SingleMessage from "./SingleMessage";
import PostMessages from "./PostMessages";

const Messages = () => {
  const [allMessages, setAllMessages] = useState([]);
  const [isAscSort, setIsAscSort] = useState(true);

  const getAllMessages = () => {
    getMessages()
      .then((res) => {
        if (res.msg) {
          window.alert(res.msg);
          return;
        }

        handleSort({ allMsg: res });
      })
      .catch((err) => {
        window.alert(err.msg);
      });
  };

  useEffect(() => {
    getAllMessages();
  }, []);

  const deleteMsg = (id) => {
    deleteMessages({ msgId: id })
      .then((res) => {
        if (res.msg) {
          window.alert(res.msg);
          return;
        }
        getAllMessages();
      })
      .catch((err) => {
        window.alert(err.msg);
      });
  };

  const handleSort = ({ allMsg, isAsc = false }) => {
    const messages = allMsg || allMessages;

    const sortedMsg = messages.sort((msg1, msg2) => {
      const date1 = new Date(msg1.timestamp);
      const date2 = new Date(msg2.timestamp);

      let sortType; // sort desc

      if (date1 < date2) {
        sortType = -1;
      } else if (date1 === date2) {
        sortType = 0;
      } else {
        sortType = 1;
      }

      if (!isAsc) {
        sortType *= -1;
      }

      return sortType;
    });

    setAllMessages(sortedMsg);
    setIsAscSort(isAsc);
  };

  return (
    <div className="all_message_container">
      <PostMessages
        getAllMessages={getAllMessages}
        handleSort={handleSort}
        isAscSort={isAscSort}
      />

      {allMessages.length > 0 &&
        allMessages.map((message) => (
          <SingleMessage
            key={message.id}
            message={message}
            deleteMsg={deleteMsg}
          />
        ))}
    </div>
  );
};

export default Messages;
