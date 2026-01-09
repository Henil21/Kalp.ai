import { useRef, useEffect } from "react";

export default function IntroVideo({ onFinish }) {
  const videoRef = useRef(null);
  const started = useRef(false);

  const finish = () => {
    localStorage.setItem("introPlayed", "true");
    onFinish();
  };

  // Try autoplay immediately (may succeed on some browsers)
  useEffect(() => {
    const playPromise = videoRef.current?.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay with sound blocked — waiting for user interaction
      });
    }
  }, []);

  // First user interaction enables sound
  const handleUserInteraction = () => {
    if (started.current) return;
    started.current = true;
    videoRef.current?.play();
  };

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black"
      onClick={handleUserInteraction}
    >
      <video
        ref={videoRef}
        src="/bigban.mp4"
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
        onEnded={finish}
      />

      {/* Skip */}
      <button
        className="absolute top-6 right-6 text-white text-sm opacity-70 hover:opacity-100"
        onClick={(e) => {
          e.stopPropagation();
          finish();
        }}
      >
        Skip
      </button>
    </div>
  );
}
