import { useEffect, useState } from "react";
import api from "../../api/axios";
import Philosophy from "./Philosophy";

export default function Editorial() {
  const [items, setItems] = useState([]);
  const [images, setImages] = useState([]);

  // Pool of images to rotate
  const IMAGE_POOL = [
    "https://i.pinimg.com/736x/d8/69/2e/d8692edc497117a8b1e2c89b543c2d90.jpg",
    "https://i.pinimg.com/1200x/e8/db/6d/e8db6d172bc4a9d1f6d8eaa7378655bb.jpg",
    "https://i.pinimg.com/1200x/2e/95/16/2e951610845cf2adefc05eec1b0612c5.jpg",
    "https://i.pinimg.com/736x/6a/10/4c/6a104c6596556645e222ee89f4acba9d.jpg",
    "https://i.pinimg.com/1200x/fa/03/d6/fa03d6171887108f2cc1c1a528883f6a.jpg",
  ];

  const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

  // Fetch research + assign random images
  useEffect(() => {
    api.get("/research").then((res) => {
      const shuffledItems = shuffle(res.data).slice(0, 3);
      const shuffledImages = shuffle(IMAGE_POOL).slice(0, 3);

      setItems(shuffledItems);
      setImages(shuffledImages);
    });
  }, []);

  // Rotate images every 2 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setImages(shuffle(IMAGE_POOL).slice(0, 3));
    }, 2 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full px-6 py-20">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e6e6db] pb-6">
          <h2 className="text-4xl font-serif italic">
            Editorial Discovery
          </h2>

          <a
            href="/research"
            className="text-sm font-medium flex items-center gap-1 hover:text-text-muted"
          >
            View Journal
            <span className="material-symbols-outlined text-sm">
              arrow_outward
            </span>
          </a>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <article
              key={item._id}
              className="flex flex-col gap-4 group cursor-pointer"
            >

              {/* Image */}
              <div className="relative w-full h-56 rounded-2xl overflow-hidden bg-stone-100">
                <img
                  src={images[index]}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>


              {/* Meta */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs text-text-muted font-medium">
                  <span>{item.domain}</span>
                  <span className="size-1 rounded-full bg-stone-300" />
                  <span>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-xl font-serif italic leading-tight group-hover:underline decoration-primary decoration-2 underline-offset-4">
                  {item.title}
                </h3>

                <p className="text-sm text-text-muted line-clamp-2">
                  {item.abstract}
                </p>
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
