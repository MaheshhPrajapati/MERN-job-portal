import { useEffect, useState } from "react";

export default function Message(props) {
  const [isVisible, setIsVisible] = useState(true);
  let message = props.message;
  console.log(message[2], typeof message[2]);
  let status;
  try {
    status =
    message[2].toString().startsWith("5") || message[2].toString().startsWith("4")
      ? "message-red-bar"
      : "message-green-bar";
  } catch (error) {
    console.error(error)
  }
  

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);
  return isVisible ? <div className={status}>{message[1]}</div> : null;
}
