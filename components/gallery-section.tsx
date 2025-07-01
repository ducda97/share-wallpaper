"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { gsap } from "gsap"
import Image from "next/image"

const wallpapers = [
  {
    id: 1,
    title: "Misty Mountain Peak",
    category: "Mountains",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
    downloads: "2.3k",
  },
  {
    id: 2,
    title: "Ocean Waves",
    category: "Ocean",
    image:
      "https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
    downloads: "1.8k",
  },
  {
    id: 3,
    title: "Forest Canopy",
    category: "Forest",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
    downloads: "3.1k",
  },
  {
    id: 4,
    title: "Alpine Lake",
    category: "Mountains",
    image:
      "https://images.unsplash.com/photo-1506197603052-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
    downloads: "2.7k",
  },
  {
    id: 5,
    title: "Tropical Beach",
    category: "Ocean",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf9603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
    downloads: "4.2k",
  },
  {
    id: 6,
    title: "Autumn Forest",
    category: "Forest",
    image:
      "https://images.unsplash.com/photo-1507041957456-9c397ce39c97?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
    downloads: "1.9k",
  },
  {
    id: 7,
    title: "Snow-Capped Peaks",
    category: "Mountains",
    image:
      "https://images.unsplash.com/photo-1464822759844-d150baec0494?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
    downloads: "2.1k",
  },
  {
    id: 8,
    title: "Coral Reef",
    category: "Ocean",
    image:
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
    downloads: "1.5k",
  },
  {
    id: 9,
    title: "Redwood Giants",
    category: "Forest",
    image:
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
    downloads: "2.8k",
  },
]

export default function GallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeCategory, setActiveCategory] = useState("All")
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null)
  const filteredWallpapers = wallpapers.filter((wallpaper) => {
    if (activeCategory === "All") return true
    if (activeCategory === "Desktop") return wallpaper.category === "Mountains" || wallpaper.category === "Forest"
    if (activeCategory === "Mobile") return wallpaper.category === "Ocean"
    return wallpaper.category === activeCategory
  })

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = "unset"
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredWallpapers.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredWallpapers.length) % filteredWallpapers.length)
  }

  const handleThumbnailHover = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
      duration: 0.3,
      ease: "power2.out",
    })
  }

  const handleThumbnailLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
      duration: 0.3,
      ease: "power2.out",
    })
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!lightboxOpen) return

      if (e.key === "Escape") {
        closeLightbox()
      } else if (e.key === "ArrowLeft") {
        prevImage()
      } else if (e.key === "ArrowRight") {
        nextImage()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [lightboxOpen])

  return (
    <section className="snap-section gallery-section py-20 px-6 relative overflow-hidden">
      {/* Dynamic Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(34,197,94,0.1),transparent_50%)] animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.1),transparent_50%)] animate-pulse delay-1000"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,rgba(168,85,247,0.1),transparent_50%)] animate-pulse delay-2000"></div>

        {/* Enhanced floating gradients with category-based animations */}
        <div
          className={`absolute top-1/4 left-1/3 w-64 h-64 rounded-full blur-3xl transition-all duration-1000 ${
            activeCategory === "All"
              ? "bg-gradient-to-r from-green-400/10 via-blue-400/10 to-purple-400/10 animate-float"
              : activeCategory === "Desktop"
                ? "bg-gradient-to-r from-purple-400/15 via-pink-400/15 to-purple-400/15 animate-float-delayed"
                : "bg-gradient-to-r from-blue-400/15 via-cyan-400/15 to-blue-400/15 animate-float-slow"
          }`}
        ></div>
        <div
          className={`absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl transition-all duration-1000 ${
            activeCategory === "All"
              ? "bg-gradient-to-r from-purple-400/5 to-pink-400/5 animate-float-delayed"
              : activeCategory === "Desktop"
                ? "bg-gradient-to-r from-green-400/10 to-emerald-400/10 animate-float"
                : "bg-gradient-to-r from-teal-400/10 to-blue-400/10 animate-float-delayed"
          }`}
        ></div>

        {/* Additional floating elements for more dynamic feel */}
        <div
          className={`absolute top-1/2 left-1/4 w-32 h-32 rounded-full blur-2xl transition-all duration-1000 ${
            activeCategory === "Desktop"
              ? "bg-gradient-to-r from-orange-400/10 to-red-400/10 animate-float-slow opacity-100"
              : "opacity-0"
          }`}
        ></div>
        <div
          className={`absolute bottom-1/4 right-1/3 w-40 h-40 rounded-full blur-2xl transition-all duration-1000 ${
            activeCategory === "Mobile"
              ? "bg-gradient-to-r from-indigo-400/10 to-purple-400/10 animate-float opacity-100"
              : "opacity-0"
          }`}
        ></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-green-500/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-float-delayed"></div>
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-float-slow"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-title text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Featured Collection
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12">
            Handpicked wallpapers that showcase the raw beauty and power of nature
          </p>

          {/* Enhanced Category Tabs with Animation */}
          <div className="relative flex justify-center mb-12">
            <div className="flex bg-white/5 backdrop-blur-sm rounded-full p-2 border border-white/10 relative overflow-hidden">
              {/* Animated Background Slider */}
              <div
                className="absolute top-2 bottom-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-500 ease-out shadow-lg"
                style={{
                  width: "calc(33.333% - 4px)",
                  left:
                    activeCategory === "All"
                      ? "4px"
                      : activeCategory === "Desktop"
                        ? "calc(33.333% + 2px)"
                        : "calc(66.666%)",
                  transform: "translateZ(0)",
                }}
              />

              {["All", "Desktop", "Mobile"].map((category, index) => (
                <button
                  key={category}
                  onClick={() => {
                    // Animate tab content out
                    gsap.to(".gallery-grid", {
                      opacity: 0,
                      y: 20,
                      duration: 0.3,
                      ease: "power2.out",
                      onComplete: () => {
                        setActiveCategory(category)
                        // Animate tab content back in
                        gsap.fromTo(
                          ".gallery-grid",
                          { opacity: 0, y: 20 },
                          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
                        )
                      },
                    })
                  }}
                  className={`relative z-10 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 min-w-[120px] ${
                    activeCategory === category ? "text-white shadow-lg" : "text-white/70 hover:text-white/90"
                  }`}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {category === "All" && (
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                    )}
                    {category === "Desktop" && (
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    )}
                    {category === "Mobile" && (
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z"
                        />
                      </svg>
                    )}
                    {category}
                  </span>

                  {/* Ripple Effect */}
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                  </div>
                </button>
              ))}
            </div>

            {/* Floating Particles around tabs */}
            <div className="absolute -top-2 -left-2 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            <div className="absolute -bottom-2 -right-2 w-2 h-2 bg-blue-400 rounded-full animate-ping delay-1000"></div>
          </div>
        </div>

        {/* Unique Masonry Layout */}
        {/* Unique Layout Based on Category */}
        <div
          className={`gallery-grid transition-all duration-700 ease-out ${
            activeCategory === "All"
              ? "columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
              : activeCategory === "Desktop"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          }`}
        >
          {filteredWallpapers.map((wallpaper, index) => (
            <div
              key={wallpaper.id}
              className={`gallery-item group cursor-pointer transition-all duration-500 transform hover:scale-105 ${
                activeCategory === "All"
                  ? `break-inside-avoid mb-6 ${index % 7 === 0 ? "md:col-span-2" : ""} ${index % 5 === 0 ? "lg:row-span-2" : ""}`
                  : activeCategory === "Desktop"
                    ? "hover:z-10 hover:shadow-2xl"
                    : "hover:z-10 hover:shadow-2xl"
              }`}
              onMouseEnter={handleThumbnailHover}
              onMouseLeave={handleThumbnailLeave}
              onClick={() => openLightbox(index)}
              style={{
                animationDelay: `${index * 0.1}s`,
                transform:
                  activeCategory === "Desktop"
                    ? `rotate(${((index % 3) - 1) * 2}deg)`
                    : activeCategory === "Mobile"
                      ? `rotate(${(index % 2 === 0 ? -1 : 1) * 1}deg)`
                      : "none",
              }}
            >
              <div
                className={`relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-white/10 ${
                  activeCategory === "All"
                    ? "rounded-2xl"
                    : activeCategory === "Desktop"
                      ? "rounded-xl hover:rounded-2xl"
                      : "rounded-3xl hover:rounded-2xl"
                }`}
              >
                <div
                  className={`relative overflow-hidden ${
                    activeCategory === "All"
                      ? `rounded-xl ${index % 3 === 0 ? "aspect-[3/4]" : index % 4 === 0 ? "aspect-square" : "aspect-[4/3]"}`
                      : activeCategory === "Desktop"
                        ? "aspect-[16/9] rounded-lg"
                        : "aspect-[9/16] rounded-2xl"
                  }`}
                >
                  <Image
                    src={wallpaper.image || "/placeholder.svg"}
                    alt={wallpaper.title}
                    fill
                    className={`object-cover transition-all duration-700 ${
                      activeCategory === "Desktop"
                        ? "group-hover:scale-110 group-hover:rotate-2"
                        : activeCategory === "Mobile"
                          ? "group-hover:scale-105 group-hover:-rotate-1"
                          : "group-hover:scale-110 group-hover:rotate-1"
                    }`}
                    crossOrigin="anonymous"
                  />

                  {/* Enhanced Animated Overlay */}
                  <div
                    className={`absolute inset-0 transition-all duration-500 ${
                      activeCategory === "Desktop"
                        ? "bg-gradient-to-r from-black/80 via-transparent to-black/80 opacity-0 group-hover:opacity-100"
                        : activeCategory === "Mobile"
                          ? "bg-gradient-to-b from-black/60 via-transparent to-black/90 opacity-0 group-hover:opacity-100"
                          : "bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100"
                    }`}
                  />

                  {/* Floating Category Tag with enhanced animation */}
                  <div
                    className={`absolute transition-all duration-300 ${
                      activeCategory === "Desktop"
                        ? "top-4 right-4 transform translate-x-2 group-hover:translate-x-0"
                        : "top-4 left-4 transform -translate-y-2 group-hover:translate-y-0"
                    }`}
                  >
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm border transition-all duration-300 hover:scale-110 ${
                        wallpaper.category === "Forest"
                          ? "bg-green-500/20 text-green-300 border-green-500/30 hover:bg-green-500/30"
                          : wallpaper.category === "Ocean"
                            ? "bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30"
                            : "bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/30"
                      }`}
                    >
                      {wallpaper.category}
                    </span>
                  </div>

                  {/* Enhanced Download Button */}
                  <div
                    className={`absolute transition-all duration-300 delay-100 ${
                      activeCategory === "Desktop"
                        ? "bottom-4 left-4 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                        : activeCategory === "Mobile"
                          ? "bottom-6 right-4 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                          : "bottom-4 right-4 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                    }`}
                  >
                    <button className="p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl group/btn">
                      <svg
                        className="w-5 h-5 text-white group-hover/btn:animate-bounce"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Enhanced Download Count */}
                  <div
                    className={`absolute transition-all duration-300 delay-200 ${
                      activeCategory === "Desktop"
                        ? "bottom-4 right-4 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                        : activeCategory === "Mobile"
                          ? "bottom-6 left-4 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                          : "bottom-4 left-4 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                    }`}
                  >
                    <span className="text-xs text-white/80 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full flex items-center hover:bg-black/50 transition-colors duration-300">
                      <svg className="w-3 h-3 mr-1 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      {wallpaper.downloads}
                    </span>
                  </div>

                  {/* Category-specific decorative elements */}
                  {activeCategory === "Desktop" && (
                    <div className="absolute top-2 left-2 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-ping"></div>
                  )}
                  {activeCategory === "Mobile" && (
                    <div className="absolute top-2 right-2 w-2 h-8 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button with Animation */}
        <div className="text-center mt-16">
          <button className="group px-10 py-4 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white font-semibold rounded-full hover:from-green-600 hover:via-blue-600 hover:to-purple-600 transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-2xl relative overflow-hidden">
            <span className="relative z-10">Load More Wallpapers</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>
        </div>

        {/* Community & Support Section */}
        <section className="snap-section relative py-24 mt-32 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 via-purple-900/30 to-slate-900/50">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(34,197,94,0.15),transparent_50%)] animate-pulse"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.15),transparent_50%)] animate-pulse delay-1000"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(168,85,247,0.15),transparent_50%)] animate-pulse delay-2000"></div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-10 left-10 w-16 h-16 bg-green-400/10 rounded-full blur-xl animate-float"></div>
          <div className="absolute top-20 right-20 w-24 h-24 bg-blue-400/10 rounded-full blur-xl animate-float-delayed"></div>
          <div className="absolute bottom-10 left-1/3 w-20 h-20 bg-purple-400/10 rounded-full blur-xl animate-float-slow"></div>
          <div className="absolute bottom-20 right-1/4 w-32 h-32 bg-pink-400/10 rounded-full blur-xl animate-float"></div>

          <div className="container mx-auto max-w-6xl px-6 relative z-10">
            {/* Thank You Message */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mb-8 animate-bounce">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Cảm ơn bạn!
                </span>
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                Cảm ơn bạn đã ghé thăm và khám phá bộ sưu tập hình nền thiên nhiên của chúng tôi.
                Sự ủng hộ của bạn giúp chúng tôi tiếp tục mang đến những hình ảnh đẹp nhất!
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Feedback Form */}
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Góp ý của bạn</h3>
                </div>
                
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="relative group">
                      <input
                        type="text"
                        placeholder="Tên của bạn"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:bg-white/15"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
                    </div>
                    <div className="relative group">
                      <input
                        type="email"
                        placeholder="Email của bạn"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:bg-white/15"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
                    </div>
                  </div>
                  
                  <div className="relative group">
                    <textarea
                      rows={4}
                      placeholder="Chia sẻ ý kiến, đề xuất hoặc yêu cầu của bạn..."
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none group-hover:bg-white/15"
                    ></textarea>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
                  </div>
                  
                  <button
                    type="submit"
                    className="group w-full px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-2xl relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Gửi góp ý
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </button>
                </form>
              </div>

              {/* Social & Support */}
              <div className="space-y-8">
                {/* Social Media */}
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h2m-4 9l4-4 4 4m-4-4v9" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Kết nối với chúng tôi</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <a
                      href="#"
                      className="group flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    >
                      <svg className="w-6 h-6 text-white mr-3 group-hover:animate-bounce" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                      <span className="text-white font-semibold">Twitter</span>
                    </a>
                    
                    <a
                      href="#"
                      className="group flex items-center justify-center px-6 py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl hover:from-pink-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    >
                      <svg className="w-6 h-6 text-white mr-3 group-hover:animate-bounce" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                      </svg>
                      <span className="text-white font-semibold">Pinterest</span>
                    </a>
                    
                    <a
                      href="#"
                      className="group flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-700 to-blue-800 rounded-xl hover:from-blue-800 hover:to-blue-900 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    >
                      <svg className="w-6 h-6 text-white mr-3 group-hover:animate-bounce" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                      </svg>
                      <span className="text-white font-semibold">Facebook</span>
                    </a>
                    
                    <a
                      href="#"
                      className="group flex items-center justify-center px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    >
                      <svg className="w-6 h-6 text-white mr-3 group-hover:animate-bounce" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      <span className="text-white font-semibold">YouTube</span>
                    </a>
                  </div>
                </div>

                {/* Donation Section */}
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Ủng hộ dự án</h3>
                  </div>
                  
                  <p className="text-white/70 mb-6 leading-relaxed">
                    Nếu bạn thích dự án này, hãy ủng hộ chúng tôi để tiếp tục phát triển và mang đến nhiều hình nền đẹp hơn!
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="group flex-1 flex items-center justify-center px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative overflow-hidden">
                      <span className="relative z-10 flex items-center">
                        <svg className="w-5 h-5 mr-2 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                        <span className="text-white font-semibold">Donate</span>
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </button>
                    
                    <button className="group flex-1 flex items-center justify-center px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative overflow-hidden">
                      <span className="relative z-10 flex items-center">
                        <svg className="w-5 h-5 mr-2 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11a9 9 0 11-18 0 9 9 0 0118 0zm-9 7v-1m0-8h.01" />
                        </svg>
                        <span className="text-white font-semibold">QR Code</span>
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </button>
                  </div>
                  
                  {/* QR Code Display (hidden by default, can be toggled) */}
                  <div className="mt-6 p-4 bg-white rounded-xl hidden" id="qr-code">
                    <div className="w-32 h-32 bg-gray-200 rounded-lg mx-auto flex items-center justify-center">
                      <span className="text-gray-500 text-sm">QR Code</span>
                    </div>
                    <p className="text-center text-gray-600 text-sm mt-2">Quét mã để ủng hộ</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-1/2 left-0 w-1 h-32 bg-gradient-to-b from-green-400 to-blue-400 rounded-full opacity-50 animate-pulse"></div>
            <div className="absolute top-1/3 right-0 w-1 h-24 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full opacity-50 animate-pulse delay-1000"></div>
            <div className="absolute bottom-1/4 left-1/2 w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-50 animate-pulse delay-2000"></div>
          </div>
        </section>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="lightbox-container fixed inset-0 z-40 flex items-center justify-center bg-black/95 backdrop-blur-sm">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-50 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 group"
          >
            <svg
              className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Enhanced Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-8 top-1/2 transform -translate-y-1/2 z-50 p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-all duration-300 group border border-white/30 hover:border-white/50"
          >
            <svg
              className="w-10 h-10 text-white group-hover:scale-125 group-hover:-translate-x-1 transition-all duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>

            {/* Arrow glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
          </button>

          <button
            onClick={nextImage}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 z-50 p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-all duration-300 group border border-white/30 hover:border-white/50"
          >
            <svg
              className="w-10 h-10 text-white group-hover:scale-125 group-hover:translate-x-1 transition-all duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>

            {/* Arrow glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
          </button>

          {/* Full-Screen Image Container */}
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="relative w-full h-full overflow-hidden">
              {/* Dynamic Background for portrait images */}
              <div
                className="absolute inset-0 transition-all duration-1000 ease-out"
                style={{
                  background: `radial-gradient(ellipse at center, 
                    ${
                      filteredWallpapers[currentImageIndex]?.category === "Forest"
                        ? "rgba(34,197,94,0.15)"
                        : filteredWallpapers[currentImageIndex]?.category === "Ocean"
                          ? "rgba(59,130,246,0.15)"
                          : "rgba(168,85,247,0.15)"
                    }, 
                    transparent 70%)`,
                }}
              />

              {/* Animated gradient layers */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-900/80 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent animate-pulse delay-1000"></div>

              {/* Floating particles */}
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-400/10 rounded-full blur-2xl animate-float"></div>
              <div className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-blue-400/10 rounded-full blur-2xl animate-float-delayed"></div>
              <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-purple-400/10 rounded-full blur-2xl animate-float-slow"></div>

              {/* Main Image with Slide Animation */}
              <div className="relative w-full h-full flex items-center justify-center p-8 z-20">
                <div
                  key={currentImageIndex}
                  className="relative max-w-full max-h-full animate-in fade-in slide-in-from-right-10 duration-700 ease-out"
                >
                  {/* Enhanced Image glow effect with dynamic colors and mobile blur background */}
                  <div
                    className={`absolute -inset-4 rounded-3xl blur-xl opacity-60 animate-pulse transition-all duration-1000 ${
                      filteredWallpapers[currentImageIndex]?.category === "Forest"
                        ? "bg-gradient-to-r from-green-400/40 via-emerald-400/30 to-green-400/40"
                        : filteredWallpapers[currentImageIndex]?.category === "Ocean"
                          ? "bg-gradient-to-r from-blue-400/40 via-cyan-400/30 to-blue-400/40"
                          : "bg-gradient-to-r from-purple-400/40 via-pink-400/30 to-purple-400/40"
                    }`}
                  ></div>

                  {/* Mobile blur background for portrait images */}
                  {filteredWallpapers[currentImageIndex]?.category === "Ocean" && (
                    <div className="absolute inset-0 -z-10">
                      <Image
                        src={filteredWallpapers[currentImageIndex]?.image || "/placeholder.svg"}
                        alt=""
                        fill
                        className="object-cover blur-3xl opacity-30 scale-110"
                        crossOrigin="anonymous"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-800/60 to-slate-900/80"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-blue-900/20"></div>
                    </div>
                  )}

                  {/* Touch/Swipe Area */}
                  <div
                    className="relative touch-none select-none z-10"
                    onTouchStart={(e) => {
                      const touch = e.touches[0]
                      setTouchStart({ x: touch.clientX, y: touch.clientY })
                    }}
                    onTouchMove={(e) => {
                      if (!touchStart) return
                      const touch = e.touches[0]
                      const deltaX = touch.clientX - touchStart.x
                      const deltaY = touch.clientY - touchStart.y

                      // Only handle horizontal swipes
                      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                        e.preventDefault()
                      }
                    }}
                    onTouchEnd={(e) => {
                      if (!touchStart) return
                      const touch = e.changedTouches[0]
                      const deltaX = touch.clientX - touchStart.x
                      const deltaY = touch.clientY - touchStart.y

                      // Only handle horizontal swipes with minimum distance
                      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 100) {
                        if (deltaX > 0) {
                          prevImage()
                        } else {
                          nextImage()
                        }
                      }
                      setTouchStart(null)
                    }}
                  >
                    <Image
                      src={filteredWallpapers[currentImageIndex]?.image || "/placeholder.svg"}
                      alt={filteredWallpapers[currentImageIndex]?.title || ""}
                      width={1920}
                      height={1080}
                      className={`relative max-w-full max-h-full object-contain rounded-2xl shadow-2xl transform transition-all duration-700 hover:scale-105 ${
                        filteredWallpapers[currentImageIndex]?.category === "Ocean" ? "max-h-[80vh] w-auto" : ""
                      }`}
                      crossOrigin="anonymous"
                      style={{
                        filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.5))",
                      }}
                    />

                    {/* Swipe Indicators */}
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="flex flex-col items-center space-y-2 text-white/60">
                        <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="text-xs font-medium">Swipe</span>
                      </div>
                    </div>

                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="flex flex-col items-center space-y-2 text-white/60">
                        <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="text-xs font-medium">Swipe</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Image Info with Animation */}
              <div className="absolute bottom-8 left-8 right-8 bg-inherit z-20 p-4 transform transition-all duration-500">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <span
                        className={`px-6 py-3 rounded-full text-lg font-bold backdrop-blur-sm border-2 transition-all duration-300 hover:scale-110 ${
                          filteredWallpapers[currentImageIndex]?.category === "Forest"
                            ? "bg-green-500/30 text-green-200 border-green-400/50 shadow-lg shadow-green-400/25"
                            : filteredWallpapers[currentImageIndex]?.category === "Ocean"
                              ? "bg-blue-500/30 text-blue-200 border-blue-400/50 shadow-lg shadow-blue-400/25"
                              : "bg-purple-500/30 text-purple-200 border-purple-400/50 shadow-lg shadow-purple-400/25"
                        }`}
                      >
                        {filteredWallpapers[currentImageIndex]?.category}
                      </span>
                      {/* Floating sparkles */}
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping"></div>
                    </div>

                    <div className="flex items-center space-x-2 text-white/80 text-lg">
                      <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span className="font-semibold">
                        {filteredWallpapers[currentImageIndex]?.downloads} downloads
                      </span>
                    </div>
                  </div>

                  <button className="group relative px-8 py-4 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white font-bold text-lg rounded-full hover:from-green-400 hover:via-blue-400 hover:to-purple-400 transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-3xl overflow-hidden">
                    {/* Button glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                    <div className="relative flex items-center space-x-3">
                      <svg
                        className="w-6 h-6 group-hover:animate-bounce"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span>Download 4K</span>
                    </div>

                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </button>
                </div>
              </div>

              {/* Enhanced Image Counter */}
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-black/40 z-50 backdrop-blur-xl rounded-full px-8 py-4 border border-white/20">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white text-lg font-bold">
                    {currentImageIndex + 1} / {filteredWallpapers.length}
                  </span>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </section>
  )
}
