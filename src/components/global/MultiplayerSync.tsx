"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Users, Link as LinkIcon, Check } from "lucide-react";

export default function MultiplayerSync() {
  const searchParams = useSearchParams();
  const connectToPeerId = searchParams?.get("peer");

  const [myId, setMyId] = useState<string>("");
  const [peerConnected, setPeerConnected] = useState(false);
  const [peerCursor, setPeerCursor] = useState({ x: -100, y: -100 });
  const [copied, setCopied] = useState(false);
  
  // Store the active connection
  const connRef = useRef<any>(null);

  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return;

    // Dynamically import peerjs so it doesn't break SSR
    import('peerjs').then(({ default: Peer }) => {
      const peer = new Peer();

      peer.on("open", (id) => {
        setMyId(id);

        // If URL has ?peer=..., automatically connect to that friend
        if (connectToPeerId && connectToPeerId !== id) {
          const conn = peer.connect(connectToPeerId);
          setupConnection(conn);
        }
      });

      // When someone else connects to us
      peer.on("connection", (conn) => {
        setupConnection(conn);
      });

      function setupConnection(conn: any) {
        connRef.current = conn;

        conn.on("open", () => {
          setPeerConnected(true);
        });

        conn.on("data", (data: any) => {
          if (data && typeof data.x === 'number' && typeof data.y === 'number') {
            setPeerCursor({ x: data.x, y: data.y });
          }
        });

        conn.on("close", () => {
          setPeerConnected(false);
          connRef.current = null;
        });
      }

      // Track our own mouse and send it to the peer
      const handleMouseMove = (e: MouseEvent) => {
        if (connRef.current && peerConnected) {
          connRef.current.send({
            x: e.clientX,
            y: e.clientY
          });
        }
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        peer.destroy();
      };
    });
  }, [connectToPeerId, peerConnected]);

  const shareLink = () => {
    if (!myId) return;
    const url = `${window.location.origin}${window.location.pathname}?peer=${myId}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Fake Cursor of the friend */}
      {peerConnected && (
        <div
          className="fixed z-[9999] pointer-events-none transition-all duration-75 ease-out"
          style={{
            left: peerCursor.x,
            top: peerCursor.y,
            transform: "translate(-50%, -50%)"
          }}
        >
          {/* Custom Cursor SVG */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.5 3.5L18.5 12L11.5 13L9 19L5.5 3.5Z" fill="#ec4899" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
          </svg>
          <span className="bg-pink-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full absolute top-5 left-3 whitespace-nowrap shadow-md">
            Friend
          </span>
        </div>
      )}

      {/* Connection UI Button */}
      <button
        onClick={shareLink}
        className={`fixed bottom-6 right-6 z-[100] p-4 rounded-full shadow-2xl transition-all duration-300 border-2 flex items-center gap-2 ${
          peerConnected
            ? "bg-green-500 text-white border-green-400"
            : copied
            ? "bg-yellow-400 text-black border-yellow-300"
            : "bg-black text-white hover:bg-gray-800 border-white/20"
        }`}
        title={peerConnected ? "Connected to a friend!" : "Share Link for P2P Multiplayer"}
      >
        {peerConnected ? (
          <>
            <Users className="w-6 h-6 animate-pulse" />
          </>
        ) : copied ? (
          <>
            <Check className="w-6 h-6" />
          </>
        ) : (
          <>
            <LinkIcon className="w-6 h-6 text-pink-500" />
          </>
        )}
      </button>
    </>
  );
}
