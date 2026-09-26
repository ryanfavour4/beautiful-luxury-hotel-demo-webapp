import  { useState, useEffect, useRef } from "react";
import hotelImage from "../../../public/image/charleson-building.jpg";
import { Icon } from "@iconify/react";

const Messenger = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello It's me here! How can I assist you today?", sender: "bot" },
    { id: 2, text: "I would like to request a room service. Also, I need some towels.", sender: "user" },
  ]);

  // 1. Create a ref for the scrollable container
  const scrollRef = useRef<HTMLDivElement>(null);

  // 2. Function to handle scrolling to bottom
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  // 3. Scroll when messages change OR when keyboard might open (on focus)
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    setMessages([...messages, { id: Date.now(), text: message, sender: "user" }]);
    setMessage("");
  };

  return (
    <aside className="flex flex-col h-[100dvh] w-full overflow-hidden bg-white md:h-full lg:bg-light lg:shadow-lg">
      
      {/* HEADER */}
      <div className="flex-none flex flex-col items-center justify-center gap-1 border-b border-b-grey py-4">
        <img src={hotelImage} alt="hotel" className="size-10 rounded-full" />
        <h2 className="font-semibold text-neutral-800 text-sm">Ryan Favour</h2>
        <p className="text-[10px] font-medium uppercase text-primary">your personal concierge</p>
      </div>

      {/* CHATS — Attached the Ref here */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`${
              msg.sender === "user" 
                ? "ml-auto bg-primary text-white rounded-tr-none" 
                : "mr-auto bg-grey/20 text-neutral-800 rounded-tl-none"
            } flex w-[80%] items-start rounded-2xl p-3 text-sm`}
          >
            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      {/* INPUT AREA */}
      <div className="flex-none p-4 pb-6 bg-white ">
        <div className="flex items-center gap-2">
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-grey/50 bg-white px-2 py-1">
            <button className="p-2 hover:bg-grey/10 rounded-lg">
              <Icon icon={"famicons:attach"} className="size-5 text-gray-500" />
            </button>
            <input
              type="text"
              value={message}
              onFocus={scrollToBottom} // 4. Scroll to bottom when user clicks input
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type your message..."
              className="w-full border-none bg-transparent py-2 text-sm focus:outline-none"
            />
          </div>
          <button 
            onClick={handleSendMessage}
            className="flex-none rounded-xl bg-primary p-3 text-white shadow-md active:scale-95 transition-transform"
          >
            <Icon icon={"mynaui:send-solid"} className="size-5" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Messenger;