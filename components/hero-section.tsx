"use client"

import { useState, useEffect } from "react"
import { gsap } from "gsap"
import Image from "next/image"

const heroImages = [
  {
    src: "./hero-section/Sunshine1.png",
    title: "Sunshine",
  },
  {
    src: "./hero-section/MistyCold1.png",
    title: "Nature",
  },
  {
    src: "./hero-section/Cloud1.png",
    title: "Cloud",
  },
  {
    src: "./hero-section/Wallpaper1.png",
    title: "Wallpaper",
  },
  {
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    title: "Misty Forest",
    subtitle: "Where silence speaks louder than words",
  },
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
    title: "Mountain Peaks",
    subtitle: "Touch the sky, feel the freedom",
  },
  {
    src: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
    title: "Ocean Waves",
    subtitle: "Endless horizons, infinite possibilities",
  },
  {
    src: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
    title: "Alpine Lake",
    subtitle: "Reflection of nature's perfection",
  },
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 6000)

    return () => clearInterval(interval)
  }, [currentSlide])

  const nextSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)

    // Animate out current slide
    gsap.to(".hero-bg-current", {
      scale: 1.1,
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        setCurrentSlide((prev) => (prev + 1) % heroImages.length)
        setIsTransitioning(false)
      },
    })
  }

  const prevSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)

    gsap.to(".hero-bg-current", {
      scale: 0.9,
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)
        setIsTransitioning(false)
      },
    })
  }

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return
    setIsTransitioning(true)

    gsap.to(".hero-bg-current", {
      rotationY: 90,
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        setCurrentSlide(index)
        setIsTransitioning(false)
      },
    })
  }

  // Animate in new slide
  useEffect(() => {
    gsap.fromTo(
      ".hero-bg-current",
      {
        scale: 1.2,
        opacity: 0,
        rotationY: -90,
      },
      {
        scale: 1,
        opacity: 1,
        rotationY: 0,
        duration: 1.2,
        ease: "power2.out",
      },
    )
  }, [currentSlide])

  return (
    <section className="snap-section hero-section relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images with Slider */}
      <div className="hero-bg absolute inset-0 w-full h-[120%] -top-[10%]">
        <div className="hero-bg-current relative w-full h-full">
          <Image
            src={heroImages[currentSlide].src || "/placeholder.svg"}
            alt={heroImages[currentSlide].title}
            fill
            className="object-cover"
            priority
            crossOrigin="anonymous"
          />
        </div>
      </div>

      {/* Enhanced Overlay with animated gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70 animate-pulse"
        style={{
          background: `linear-gradient(135deg, 
               rgba(0,0,0,0.4) 0%, 
               rgba(0,0,0,0.2) 30%, 
               rgba(0,0,0,0.1) 50%, 
               rgba(0,0,0,0.3) 70%, 
               rgba(0,0,0,0.6) 100%)`,
        }}
      />

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        disabled={isTransitioning}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 disabled:opacity-50 group"
      >
        <svg
          className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        disabled={isTransitioning}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 disabled:opacity-50 group"
      >
        <svg
          className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white scale-125 shadow-lg" : "bg-white/50 hover:bg-white/80 hover:scale-110"
            }`}
          />
        ))}
      </div>

      {/* Dynamic Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="hero-title text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl">
            {heroImages[currentSlide].title}
          </span>
        </h1>

        <p className="hero-subtitle text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
          {heroImages[currentSlide].subtitle}
        </p>

        {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-full hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Browse Gallery
          </button>
          <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
            Upload Wallpaper
          </button>
        </div> */}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
        <div
          className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / heroImages.length) * 100}%` }}
        />
      </div>
    </section>
  )
}
