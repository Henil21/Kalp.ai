import Planet from "./Planet";

export default function AvatarScreen() {
  const planets = ["teal", "amber", "violet", "rose", "cyan", "lime"];

  return (
    <div className="absolute inset-0 bg-space text-white pt-24">
      <h1 className="text-4xl font-light text-center mb-2">
        Make it yours
      </h1>
      <p className="text-white/60 text-center mb-10">
        Choose a username and avatar
      </p>

      <input
        className="mx-auto block mb-14 px-6 py-3 rounded-full
                   bg-white/10 text-center outline-none"
        placeholder="Your profile name…"
      />

      <div className="flex justify-center gap-10">
        {planets.map((hue, i) => (
          <div
            key={i}
            className="hover:scale-110 transition cursor-pointer"
          >
            <Planet size={120 + i * 8} hue={hue} selectable />
          </div>
        ))}
      </div>
    </div>
  );
}
