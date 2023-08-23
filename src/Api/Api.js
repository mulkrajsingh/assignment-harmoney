const BASE_URL = "https://mapi.harmoney.dev/api/v1/messages/";
const TOKEN = "VO_szVmhZAmcQZGo";

const request = ({ method = "GET", msgId = "", body }) => {
  let url = BASE_URL;
  if (method === "DELETE") {
    url = `${url}${msgId}/`;
  }

  let option = {
    headers: {
      Authorization: TOKEN,
      "Content-Type": "application/json",
    },
    method,
  };

  if (method === "POST") {
    option = {
      ...option,
      body: JSON.stringify(body),
    };
  }

  return fetch(url, option)
    .then((res) => {
      if (res.status === 204) {
        return [];
      }
      return res.json().then((resp) => resp);
    })
    .catch(() => ({ msg: "Something went wrong" }));
};

export const getMessages = () => {
  return request({})
    .then((res) => {
      if (res.msg) {
        return { msg: "Unable to get messages" };
      }
      return res;
    })
    .catch(() => ({ msg: "Something went wrong" }));
};

export const postMessages = ({ text }) => {
  return request({ method: "POST", body: { text } })
    .then((res) => {
      if (res.msg) {
        return { msg: "Unable to post message" };
      }
      return res;
    })
    .catch(() => ({ msg: "Something went wrong" }));
};

export const deleteMessages = ({ msgId }) => {
  return request({ method: "DELETE", msgId })
    .then((res) => {
      if (res.msg) {
        return { msg: "Unable to delete messages" };
      }
      return res;
    })
    .catch(() => ({ msg: "Something went wrong" }));
};
