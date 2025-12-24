import Planet from "./Planet";
export default function WelcomeScreen({ onNext }) {
  return (
    <div className="absolute inset-0 bg-space flex flex-col items-center justify-center text-white">
      <h1 className="text-5xl font-light tracking-wide mb-10">
        Welcome to <span className="opacity-90">Comet</span>
      </h1>

      <Planet size={360} hue="teal" slowRotate />

      <button
        onClick={onNext}
        className="mt-14 px-8 py-4 rounded-full
                   bg-white/10 backdrop-blur-md
                   hover:bg-white/20 transition"
      >
        Get started →
      </button>
    </div>
  );
}
