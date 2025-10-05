"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useAnimationFrame } from "framer-motion"

// Placeholder array for the uploaded images (Updated URLs)
const IMAGE_URLS = [
  { url: "/2018.png", alt: "2018" },
  { url: "/2019.png", alt: "2019" },
  { url: "/2020.png", alt: "2020" },
  { url: "/2021.png", alt: "2021" },
  { url: "/2022.png", alt: "2022" },
  { url: "/2023.png", alt: "2023" },
  { url: "/2024.png", alt: "2024" },
]

export default function ScrollShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)

  // Smooth auto-scroll animation (right to left)
  useAnimationFrame((time) => {
    // Slow continuous movement
    setScrollPosition((time / 80) % (IMAGE_URLS.length * 450))
  })

  // Loop video
  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.loop = true
      video.play().catch(err => console.log("Video autoplay prevented:", err))
    }
  }, [])

  return (
    
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      
      {/* TOP SECTION - VIDEO LEFT, TEXT RIGHT */}
      <div className="h-1/2 w-full flex">
        
        {/* LEFT - VIDEO */}
        <div className="w-3/5 h-full relative">
          <video
            ref={videoRef}
            src="/haldwani.mp4"
            muted
            loop
            playsInline
            autoPlay
            className="w-full h-full object-cover"
          >
            Your browser does not support the video tag.
          </video>
          
          {/* Video overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/30" />
          
          {/* Video badge */}
          <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-red-500/30">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-white text-sm font-medium">LIVE SIMULATION</span>
          </div>
        </div>

        {/* RIGHT - VIDEO INFORMATION TEXT */}
        <div className="w-2/5 h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-12 py-8">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <h1 className="text-5xl font-bold text-white mb-8 tracking-tight">
              HALDWANI
            </h1>
            
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Location</p>
                  <p className="text-base text-white/90">Nainital District, Uttarakhand</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Coordinates</p>
                  <p className="text-base text-white/90">29.22°N, 79.51°E</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Elevation</p>
                  <p className="text-base text-white/90">424 m (1,391 ft)</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Region</p>
                  <p className="text-base text-white/90">Kumaon, Himalayan Foothills</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* DIVIDER LINE */}
      <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* BOTTOM SECTION - TEXT LEFT, IMAGES RIGHT */}
      <div className="h-1/2 w-full flex">
        
        {/* LEFT - CLIMATE CHANGE INFORMATION TEXT */}
        <div className="w-2/5 h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 px-12 py-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full"
          >
            <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
              Climate Change<br />
              <span className="text-red-400">Impact Analysis</span>
            </h2>
            
            <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
              <p>
                Tracking <span className="font-semibold text-red-300">vegetation loss</span> and 
                <span className="font-semibold text-orange-300"> deforestation</span> patterns across 2018-2024.
              </p>
              
              <p>
                Rapid urbanization and shifting climate patterns have destabilized regional ecosystems.
              </p>
              
              <div className="mt-6 pt-4 border-t border-white/10">
                <p className="text-red-300 font-semibold text-base flex items-start gap-2">
                  <span className="text-xl">⚠</span>
                  <span>Increasing landslide risk threatens communities</span>
                </p>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-slate-500 text-xs uppercase tracking-wider">
                Annual Data • 2018-2024
              </p>
            </div>
          </motion.div>
        </div>

        {/* RIGHT - SCROLLING IMAGES */}
        <div className="w-3/5 h-full relative overflow-hidden bg-gradient-to-br from-slate-900 to-black">
          
          {/* Scrolling Images Container */}
          <div className="absolute inset-0 flex items-center py-8">
            <div 
              className="flex gap-8 pl-8"
              style={{ 
                transform: `translateX(-${scrollPosition}px)`,
              }}
            >
              {/* Duplicate images for seamless loop */}
              {[...IMAGE_URLS, ...IMAGE_URLS, ...IMAGE_URLS].map((image, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 relative group cursor-pointer"
                  whileHover={{ scale: 1.03, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-96 h-64 rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-slate-800">
                    <img
                      src={image.url} 
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Year label */}
                    <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                      <span className="text-white font-bold text-lg">{image.alt}</span>
                    </div>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 w-full">
                        <p className="text-white text-sm font-medium">Environmental Survey</p>
                        <p className="text-slate-300 text-xs">Year {image.alt}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Gradient overlays for smooth fade */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black via-slate-900/80 to-transparent z-10 pointer-events-none" />
        </div>
      </div>
    </div>
  )
}