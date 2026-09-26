import PortalRoot from "@/layout/portal-root";
import { useRef, useState } from "react";
import hotelImage from "/image/charleson-building.jpg";
import { Icon } from "@iconify/react";
import { Link } from "react-router";

const ChatPage = () => {
  const windowHeight = window.innerHeight;
  const containerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const marginTop = Math.floor(windowHeight / 1.2); // Adjust this value as needed
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello It's me here!", sender: "bot" },
    { id: 2, text: "How can I assist you today?", sender: "bot" },
    { id: 3, text: "I trust you are doing good", sender: "bot" },
    {
      id: 4,
      text: "I would like to request a room service. Also, I need some towels.",
      sender: "user",
    },
  ]);

  const scrollToBottom = (smooth = true) => {
    const el = containerRef.current;
    if (!el) return;

    el.scrollTo({
      top: el.scrollHeight,
      behavior: smooth ? "smooth" : "auto",
    });
  };

  const handleFocus = () => {
    setTimeout(() => scrollToBottom(true), 200); // wait for keyboard
  };

  const handleInput = () => {
    scrollToBottom(false); // instant while typing
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    setMessages([...messages, { id: Date.now(), text: message, sender: "user" }]);
    setMessage("");
    scrollToBottom(true);
  };

  return (
    <PortalRoot>
      <main className="h-svh overflow-y-auto bg-light">
        {/* Long content to force scroll */}
        <div ref={containerRef} className="h-dvh space-y-4 overflow-y-scroll px-2">
          {/* back header label */}
          <figure className="py-4">
            <Link to={`/`} className="flex items-center text-sm text-primary hover:underline">
              <Icon icon={"material-symbols-light:chevron-left-rounded"} className="size-7" />{" "}
              <small>Go Back</small>
            </Link>
          </figure>
          {/* HEADER */}
          <div className="flex flex-none flex-col items-center justify-center gap-1 border-b border-b-grey py-4">
            <img src={hotelImage} alt="hotel" className="size-16 rounded-full" />
            <h2 className="text-xl font-semibold text-text/75">Ryan Favour</h2>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              your personal concierge
            </p>
          </div>

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`${
                msg.sender === "user"
                  ? "ml-auto rounded-tr-none bg-primary text-white"
                  : "mr-auto rounded-tl-none bg-grey/20 text-neutral-800"
              } flex w-fit max-w-[80%] items-start rounded-2xl p-3 text-sm`}
            >
              <p>{msg.text}</p>
            </div>
          ))}

          {/* Sticky element INSIDE scroll container */}
          <section
            style={{ marginTop }}
            className={`sticky bottom-0 min-h-20 rounded-t-lg bg-light px-1.5 py-2.5`}
          >
            <div className="flex items-center gap-2">
              <span className="flex flex-1 items-center gap-1 rounded-xl border border-grey/50 bg-light p-1">
                <input type="file" name="file" id="file" hidden />
                <label
                  htmlFor="file"
                  className="block h-full rounded-lg border bg-grey/25 p-2 py-3 hover:bg-grey/15"
                >
                  <Icon icon={"famicons:attach"} className="size-6 text-grey" />
                </label>
                <textarea
                  name="message"
                  rows={1}
                  placeholder="Type a message..."
                  className="w-full resize-none rounded-lg p-3 px-2 text-base outline-none"
                  autoComplete="off"
                  ref={textareaRef}
                  value={message}
                  onFocus={handleFocus}
                  onInput={handleInput}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  autoCapitalize="none"
                  spellCheck={false}
                />
              </span>
              <button
                onClick={handleSendMessage}
                className="btn-primary h-full w-fit py-4 transition-transform active:scale-95"
              >
                <Icon icon={"mynaui:send-solid"} className="size-5" />
              </button>
            </div>
          </section>
        </div>
      </main>
    </PortalRoot>
  );
};

export default ChatPage;
