import { Instagram } from "lucide-react";

export default function InstagramFeed() {
  const posts = [
    { id: 1, src: "/src/assets/images/instagram/insta_1.jpg", likes: "1.2k", comments: 45 },
    { id: 2, src: "/src/assets/images/instagram/insta_2.jpg", likes: "892", comments: 23 },
    { id: 3, src: "/src/assets/images/instagram/insta_3.jpg", likes: "2.1k", comments: 104 },
    { id: 4, src: "/src/assets/images/instagram/insta_4.jpg", likes: "3.4k", comments: 156 },
  ];

  return (
    <section className="py-24 bg-background border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-12">
          <Instagram className="w-10 h-10 text-primary mb-4" />
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">Follow the Glamour</h2>
          <p className="text-muted-foreground max-w-xl">
            Join our community of beauties. Follow <a href="https://www.instagram.com/puja_glam_makeup_studio" target="_blank" rel="noreferrer" className="text-primary hover:underline">@puja_glam_makeup_studio</a> for daily inspiration.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {posts.map((post) => (
            <a 
              key={post.id} 
              href="https://www.instagram.com/puja_glam_makeup_studio" 
              target="_blank" 
              rel="noreferrer"
              className="relative group aspect-square rounded-xl overflow-hidden block bg-muted"
            >
              <img 
                src={post.src} 
                alt="Instagram post" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex gap-6 text-white font-medium">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M21.99 12c0 5.52-4.48 10-10 10-1.7 0-3.31-.43-4.73-1.18L2 22l1.24-5.06C2.45 15.42 2 13.76 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10z"/></svg>
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
        
        <div className="mt-12 text-center">
           <a 
              href="https://www.instagram.com/puja_glam_makeup_studio" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center justify-center h-12 px-8 rounded-full border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300 font-medium"
            >
              View Full Gallery
            </a>
        </div>
      </div>
    </section>
  );
}