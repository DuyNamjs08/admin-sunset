import { useEffect, useState } from "react";
import "./chat.css";
import { io } from "socket.io-client";
import { useChatGet, useSendPost } from "../../useQuery/useChat";
import { showMessageError, showMessageSuccesss } from "../../feature/homeSlice";
import { useDispatch } from "react-redux";

function Chat() {
  const dispatch = useDispatch();
  const socket = io("http://localhost:8017/", {
    transports: ["websocket"],
  });
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { data } = useChatGet({
    senderId: "662729a89cc36d6fce699a27",
    receiverId: "661df3d1eaabf26f85209e6c",
  });
  const { mutate } = useSendPost();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      await mutate(
        {
          message: inputValue,
          senderId: "662729a89cc36d6fce699a27",
          receiverId: "661df3d1eaabf26f85209e6c",
        },
        {
          onSuccess: () => {
            dispatch(showMessageSuccesss("Tạo thành công!"));
            setInputValue("");
          },
          onError: () => {
            dispatch(showMessageError("Tạo thất bại!"));
          },
        }
      );
    }
  };
  useEffect(() => {
    if (data) {
      setMessages((prevMessages) => [...prevMessages, ...data]);
    }
  }, [data]);
  useEffect(() => {
    socket.on("connect", () => {
      setConnected(true);
    });
    socket.on("chat message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
    return () => {
      socket.off("disconnect", () => {
        setConnected(false);
      });
      socket.off("chat message");
    };
  }, []);
  return (
    <div>
      <h2>
        Connection:{" "}
        {connected ? (
          <span style={{ color: "#4f4" }}>connected</span>
        ) : (
          <span style={{ color: "#f44" }}>disconnected</span>
        )}
      </h2>
      <ul id="messages" className="messages">
        {messages.length > 0
          ? messages.map((message, index) => (
              <li key={index}>{message.message}</li>
            ))
          : ""}
      </ul>
      <form id="form" className="form" onSubmit={handleSubmit}>
        <input
          id="input"
          className="input"
          autoComplete="off"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;
