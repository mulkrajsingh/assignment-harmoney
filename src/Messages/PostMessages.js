import React, { useState } from "react";
import { postMessages } from "../Api/Api";

const PostMessages = ({ getAllMessages, handleSort, isAscSort }) => {
  const [postMsg, setPostMsg] = useState("");

  const handlePostMessage = () => {
    if (postMsg && postMsg.trim()) {
      postMessages({ text: postMsg.trim() })
        .then((res) => {
          if (res.msg) {
            window.alert(res.msg);
            return;
          }
          setPostMsg("");
          getAllMessages();
        })
        .catch((err) => {
          window.alert(err.msg);
        });
    } else {
      window.alert("Please enter messge to post!!");
    }
  };

  return (
    <section>
      <p>Type something in the box below, then hit "Post"</p>

      <div className="input_wrapper">
        <input
          type="text"
          className="input"
          value={postMsg}
          onChange={(e) => setPostMsg(e.target.value)}
        />

        <button type="button" className="btn_post" onClick={handlePostMessage}>
          Post!
        </button>

        <button type="button" className="btn_sort" onClick={() => handleSort({ isAsc: !isAscSort })}>
          Sort{" "}
          {isAscSort ? (
            <i className="fa fa-sort-amount-asc" />
          ) : (
            <i className="fa fa-sort-amount-desc" />
          )}
        </button>
      </div>
    </section>
  );
};

export default PostMessages;
