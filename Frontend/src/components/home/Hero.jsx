import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="flex justify-center px-6 py-20">
      <div className="max-w-6xl grid lg:grid-cols-2 gap-12 items-center">

        <div className="flex flex-col gap-8 max-w-xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-white/50 w-fit">
            <span className="size-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs uppercase text-text-muted">
              Research Beta 2.0
            </span>
          </span>

          <h1 className="text-6xl lg:text-7xl font-serif italic leading-tight">
            Accelerating the <br />
            <span className="border-b-4 border-primary/60">
              Speed of Truth.
            </span>
          </h1>

          <p className="text-text-muted text-lg max-w-md">
            AI-assisted pre-review and discovery for the modern researcher.
          </p>

          <div className="flex gap-4">
           
          <Link to="/research">
  <button className="h-12 px-8 rounded-full bg-text-main text-white hover:bg-text-muted transition">
    Explore the Lab
  </button>
          </Link>

            <button className="h-12 px-8 rounded-full border bg-white">
              View Methodology
            </button>
          </div>
        </div>

        <div className="relative h-[500px] flex items-center justify-center">
          <div className="absolute inset-0 border rounded-full opacity-20 scale-90"></div>
          <div
            className="w-full h-full bg-contain bg-no-repeat bg-center animate-float"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBYwV3I9svl3zO2lJhubZX76bzugLGyL9ZA12_MxfvKJJ3xtacDgIzm-8o_zAjy2iky4WCNk_G3Ein2td1CiyTDJwtM80awT_e5F0Tae1cfifoBIMyx6jixMqxKkoJl1-rlXL2-CG7lCZfFvzW7KzEvnCz0-zuQzReMsEq6qUysE2ZqNt1PBHXTBg4GhOCvQ-KtYVXJKQOR9Fzk9xTeK0gJ5Kq-99x3o2KplPVyMP4mY4Su4SlgkgYu5qthTls7pfhQM44kERhXvy0")',
            }}
          />
        </div>

      </div>
    </section>
  );
}
