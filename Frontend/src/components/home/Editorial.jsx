import { useEffect, useState } from "react";
import api from "../../api/axios";
import Philosophy from "./Philosophy";

export default function Editorial() {
  const [items, setItems] = useState([]);

  // Domain → image mapping
  const DOMAIN_IMAGES = {
    Phicology: "https://i.pinimg.com/1200x/dc/97/5a/dc975af246e7cb7bfecf418aa6a9225e.jpg",
    Physics: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80",
    Biology: "https://i.pinimg.com/736x/7b/29/51/7b2951943deaaff7ea371c2c430a903b.jpg",
    Neuroscience: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1200&q=80",
    Genomics: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
  };

  const DEFAULT_IMAGE =
    "https://i.pinimg.com/1200x/dc/97/5a/dc975af246e7cb7bfecf418aa6a9225e.jpg";

  useEffect(() => {
    api.get("/research").then((res) => {
      const shuffled = [...res.data].sort(() => 0.5 - Math.random());
      setItems(shuffled.slice(0, 3));
    });
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
          {items.map((item) => (
            <article
              key={item._id}
              className="flex flex-col gap-4 group cursor-pointer"
            >

              {/* Image */}
              <div className="relative w-full h-56 rounded-2xl overflow-hidden bg-stone-100">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${
                      DOMAIN_IMAGES[item.domain] || DEFAULT_IMAGE
                    })`,
                  }}
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
