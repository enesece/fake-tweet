import { useState, useRef } from "react";
import { MessageCircle, Repeat2, Heart, Share, Bookmark } from "lucide-react";
import { formatNumber } from "./utilities/utils";
import { toPng } from "html-to-image";

interface Tweet {
  profileImage: string;
  name: string;
  username: string;
  date: string;
  content: string;
  comments: number;
  reposts: number;
  likes: number;
}

function App() {
  const tweetRef = useRef<HTMLDivElement>(null);

  const [tweet, setTweet] = useState<Tweet>({
    profileImage: "",
    name: "falon",
    username: "falonbalon",
    date: new Date().toISOString().split("T")[0],
    content: "Say what",
    comments: 1,
    reposts: 0,
    likes: 2,
  });

  const downloadTweet = async () => {
    if (tweetRef.current === null) return;

    try {
      const dataUrl = await toPng(tweetRef.current, {
        cacheBust: true,
        backgroundColor: "#000000",
        pixelRatio: 3,
      });

      const link = document.createElement("a");
      link.download = `tweet-${tweet.username || "fake"}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Görsel oluşturulurken hata:", err);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900/99 grid grid-cols-1 md:grid-cols-2">
      <div className="bg-zinc-900 p-4 sm:p-6 md:p-8 overflow-y-auto">
        {/* LEFT SIDE */}
        <div className="w-full max-w-sm mx-auto">
          {/* PROFILE PIC */}
          <div className="mb-6">
            <label className="text-zinc-400 text-sm mb-2 block font-medium">
              Profile Picture
            </label>

            <label className="flex items-center justify-center gap-2 w-full bg-zinc-700 hover:bg-zinc-600 text-white border border-zinc-600 border-dashed rounded-lg px-4 py-3 cursor-pointer transition-all">
              <span className="text-sm font-medium">📷 Upload Image</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = () => {
                    setTweet({
                      ...tweet,
                      profileImage: reader.result as string,
                    });
                  };
                  reader.readAsDataURL(file);
                }}
              />
            </label>
          </div>

          {/* NAME */}
          <div className="mb-4">
            <label className="text-zinc-400 text-sm mb-1 block">Name</label>
            <input
              className="w-full bg-zinc-700 text-white border border-zinc-600 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
              placeholder="falon"
              value={tweet.name}
              onChange={(e) => setTweet({ ...tweet, name: e.target.value })}
              type="text"
              maxLength={15}
            />
          </div>

          {/* USERNAME */}
          <div className="mb-4">
            <label className="text-zinc-400 text-sm mb-1 block">Username</label>
            <input
              className="w-full bg-zinc-700 text-white border border-zinc-600 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
              placeholder="@falonbalon"
              value={tweet.username}
              onChange={(e) => setTweet({ ...tweet, username: e.target.value })}
              type="text"
              maxLength={15}
            />
          </div>

          {/* DATE */}
          <div className="mb-4">
            <label className="text-zinc-400 text-sm mb-1 block">Date</label>
            <input
              type="date"
              className="w-full bg-zinc-700 text-white border border-zinc-600 rounded-lg px-3 py-2 outline-none focus:border-blue-500 [color-scheme:dark]"
              value={tweet.date}
              onChange={(e) => setTweet({ ...tweet, date: e.target.value })}
              max={new Date().toISOString().split("T")[0]}
            />
          </div>

          {/* CONTENT */}
          <div className="mb-4">
            <label className="text-zinc-400 text-sm mb-1 block">Content</label>
            <textarea
              className="w-full bg-zinc-700 text-white border border-zinc-600 rounded-lg px-3 py-2 outline-none focus:border-blue-500 resize-none"
              rows={3}
              value={tweet.content}
              onChange={(e) => setTweet({ ...tweet, content: e.target.value })}
              maxLength={500}
            />
          </div>

          {/* COMMENTS */}
          <div className="mb-4">
            <label className="text-zinc-400 text-sm mb-1 block">Comments</label>
            <input
              className="w-full bg-zinc-700 text-white border border-zinc-600 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
              value={tweet.comments}
              onChange={(e) =>
                setTweet({ ...tweet, comments: Number(e.target.value) })
              }
              type="number"
            />
          </div>

          {/* REPOSTS */}
          <div className="mb-4">
            <label className="text-zinc-400 text-sm mb-1 block">Reposts</label>
            <input
              className="w-full bg-zinc-700 text-white border border-zinc-600 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
              value={tweet.reposts}
              onChange={(e) =>
                setTweet({ ...tweet, reposts: Number(e.target.value) })
              }
              type="number"
            />
          </div>

          {/* LIKES */}
          <div className="mb-4">
            <label className="text-zinc-400 text-sm mb-1 block">Likes</label>
            <input
              className="w-full bg-zinc-700 text-white border border-zinc-600 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
              value={tweet.likes}
              onChange={(e) =>
                setTweet({ ...tweet, likes: Number(e.target.value) })
              }
              type="number"
            />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="relative border-l border-zinc-700 flex flex-col items-center justify-center p-6 py-12 md:p-12 gap-8">
        <div
          ref={tweetRef}
          className="bg-tweet-black rounded-xl border border-zinc-700 p-4 w-full min-w-[320px] max-w-[450px] shrink-0 overflow-hidden"
        >
          <div className="flex items-start gap-3">
            <img
              src={
                tweet.profileImage ||
                "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
              }
              alt={tweet.name}
              className="rounded-full w-10 h-10 object-cover shrink-0"
            />
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex gap-1">
                <p className="text-white text-sm font-bold truncate">
                  {tweet.name}
                </p>
                <p className="text-zinc-400 text-sm">@{tweet.username}</p>
                <p className="text-zinc-400 text-sm">
                  {tweet.date && (
                    <p className="text-zinc-400 text-sm">
                      ·{" "}
                      {new Intl.DateTimeFormat("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }).format(new Date(tweet.date))}
                    </p>
                  )}
                </p>
              </div>
              <p className="text-white text-sm mt-1 break-words">
                {tweet.content}
              </p>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-between items-center mt-4 text-zinc-400 px-2">
            <div className="flex gap-18 cursor-pointer ml-11">
              <div className="flex items-center gap-1 hover:text-blue-400 transition">
                <MessageCircle size={16} />
                <span className="text-sm">{formatNumber(tweet.comments)}</span>
              </div>

              <div className="flex items-center gap-1 hover:text-emerald-400">
                <Repeat2 size={16} />
                <span className="text-sm">{formatNumber(tweet.reposts)}</span>
              </div>

              <div className="flex items-center gap-1 hover:text-pink-500 transition">
                <Heart size={16} />
                <span className="text-sm">{formatNumber(tweet.likes)}</span>
              </div>
            </div>

            <div className="flex gap-3 cursor-pointer">
              <Bookmark size={16} className="hover:text-blue-400 transition" />
              <Share size={16} className="hover:text-blue-400 transition" />
            </div>
          </div>
        </div>

        {/* DOWNLOAD BUTTOn */}
        <button
          onClick={downloadTweet}
          className="bg-white text-black font-bold py-3 px-10 rounded-full hover:bg-zinc-200 transition-all active:scale-95 shadow-xl cursor-pointer"
        >
          Download Tweet
        </button>

        <div className="absolute text-gray-500 bottom-4">
          Coded by{" "}
          <a
            className="creditLink"
            href="https://instagram.com/enesecee"
            target="_blank"
            rel="noopener noreferrer"
          >
            falon
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
