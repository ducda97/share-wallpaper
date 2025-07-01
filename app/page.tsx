"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
// import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import GallerySection from "@/components/gallery-section"
import Footer from "@/components/footer"

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export default function HomePage() {
  useEffect(() => {
    const initializeAnimations = () => {
      // Hero text entrance animation
      gsap.fromTo(
        ".hero-title",
        {
          opacity: 0,
          scale: 0.8,
          y: 50,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          delay: 0.5,
        },
      )

      gsap.fromTo(
        ".hero-subtitle",
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          delay: 1,
        },
      )

      // Hero parallax effect
      gsap.to(".hero-bg", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })

      // Gallery thumbnails entrance animation
      gsap.fromTo(
        ".gallery-item",
        {
          opacity: 0,
          y: 60,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".gallery-grid",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Gallery parallax effects
      gsap.utils.toArray(".gallery-item").forEach((item: any, index) => {
        const direction = index % 3 === 0 ? -1 : index % 3 === 1 ? 1 : 0
        const distance = direction * 20

        gsap.to(item, {
          y: distance,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        })
      })

      // Section fade-ins
      gsap.fromTo(
        ".section-title",
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".gallery-section",
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Enhanced Snap Scrolling Functionality
      const sections = document.querySelectorAll(".snap-section")
      let currentSection = 0
      let isScrolling = false
      let lastScrollTime = 0
      let snapScrollingEnabled = true // Toggle for snap scrolling - disabled by default for normal scrolling

      // Create an array of section positions (top of each section)
      const updateSectionPositions = () => {
        return Array.from(sections).map((section) => {
          const rect = section.getBoundingClientRect()
          return rect.top + window.pageYOffset
        })
      }

      let sectionPositions = updateSectionPositions()

      // Update positions on resize
      window.addEventListener("resize", () => {
        sectionPositions = updateSectionPositions()
      })

      // Get current section based on scroll position
      const getCurrentSection = () => {
        const scrollTop = window.pageYOffset
        const windowHeight = window.innerHeight
        const threshold = windowHeight * 0.3 // 30% threshold

        for (let i = 0; i < sectionPositions.length; i++) {
          const sectionTop = sectionPositions[i]
          const nextSectionTop = sectionPositions[i + 1] || document.body.scrollHeight

          if (scrollTop >= sectionTop - threshold && scrollTop < nextSectionTop - threshold) {
            return i
          }
        }
        return 0
      }

      // Smooth snap to section - Faster and more responsive
      const snapToSection = (index: number) => {
        if (isScrolling || index < 0 || index >= sections.length) return

        isScrolling = true
        currentSection = index

        // Use native smooth scrolling for better performance when available
        if ('scrollBehavior' in document.documentElement.style) {
          window.scrollTo({
            top: sectionPositions[index],
            behavior: 'smooth'
          })

          // Set a timeout to reset isScrolling since we can't detect when native smooth scroll completes
          setTimeout(() => {
            isScrolling = false
            updateNavigationDots()
          }, 600) // Slightly longer than typical smooth scroll duration
        } else {
          // Fallback to GSAP for older browsers
          gsap.to(window, {
            duration: 0.4, // Reduced from 0.8s to 0.4s for faster response
            scrollTo: {
              y: sectionPositions[index],
              autoKill: false,
            },
            ease: "power1.out", // Changed to power1.out for smoother, less aggressive easing
            onComplete: () => {
              isScrolling = false
              updateNavigationDots()
            },
          })
        }
      }

      // Improved wheel event handler - Instant and smooth scrolling
      const handleWheel = (e: WheelEvent) => {
        // If snap scrolling is disabled, allow completely normal scrolling
        if (!snapScrollingEnabled) return

        // Don't interfere if user is already scrolling normally
        if (isScrolling) return

        const now = Date.now()
        // Reduce throttle for more responsive feel
        if (now - lastScrollTime < 150) return
        lastScrollTime = now

        // More sensitive detection - respond to smaller scroll movements
        const scrollSpeed = Math.abs(e.deltaY)
        if (scrollSpeed < 20) return // Lower threshold for better responsiveness

        const direction = e.deltaY > 0 ? 1 : -1
        currentSection = getCurrentSection()
        const targetSection = currentSection + direction

        // Simplified boundary detection
        if (targetSection >= 0 && targetSection < sections.length) {
          e.preventDefault() // Prevent default to enable snap
          snapToSection(targetSection)
        }
      }

      // Touch handling for mobile with improved sensitivity
      let touchStartY = 0
      let touchStartTime = 0

      const handleTouchStart = (e: TouchEvent) => {
        touchStartY = e.touches[0].clientY
        touchStartTime = Date.now()
      }

      const handleTouchEnd = (e: TouchEvent) => {
        if (isScrolling) return

        const touchEndY = e.changedTouches[0].clientY
        const touchEndTime = Date.now()
        const deltaY = touchStartY - touchEndY
        const deltaTime = touchEndTime - touchStartTime

        // Improved touch detection
        if (Math.abs(deltaY) > 30 && deltaTime < 300) {
          const direction = deltaY > 0 ? 1 : -1
          currentSection = getCurrentSection()
          const targetSection = currentSection + direction

          if (targetSection >= 0 && targetSection < sections.length) {
            snapToSection(targetSection)
          }
        }
      }

      // Enhanced keyboard navigation
      const handleKeyDown = (e: KeyboardEvent) => {
        if (isScrolling) return

        currentSection = getCurrentSection()

        switch (e.key) {
          case "ArrowDown":
          case "PageDown":
          case " ": // Spacebar
            e.preventDefault()
            if (currentSection < sections.length - 1) {
              snapToSection(currentSection + 1)
            }
            break
          case "ArrowUp":
          case "PageUp":
            e.preventDefault()
            if (currentSection > 0) {
              snapToSection(currentSection - 1)
            }
            break
          case "Home":
            e.preventDefault()
            snapToSection(0)
            break
          case "End":
            e.preventDefault()
            snapToSection(sections.length - 1)
            break
        }
      }

      // Navigation dots
      let dotsContainer: HTMLDivElement | null = null
      const createNavigationDots = () => {
        dotsContainer = document.createElement("div")
        dotsContainer.className = "fixed right-8 top-1/2 transform -translate-y-1/2 flex flex-col space-y-3"

        // Add snap scrolling toggle button - Bigger and at bottom right
        const toggleButton = document.createElement("button")
        toggleButton.className = `fixed bottom-4 right-4 w-6 h-6 rounded-full border-3 transition-all duration-500 hover:scale-110  flex items-center justify-center shadow-2xl backdrop-blur-md ${
          snapScrollingEnabled
            ? "bg-gradient-to-r from-green-500 to-emerald-500 border-green-400 shadow-green-500/50 hover:from-green-600 hover:to-emerald-600"
            : "bg-gradient-to-r from-slate-800/80 to-slate-700/80 border-white/30 hover:bg-gradient-to-r hover:from-slate-700/90 hover:to-slate-600/90 hover:border-white/50"
        }`
        toggleButton.innerHTML = snapScrollingEnabled
          ? '<svg class="w-4 h-4 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>'
          : '<svg class="w-4 h-4 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8 12h8M12 8v8"></path></svg>'
        toggleButton.title = snapScrollingEnabled ? "Disable Snap Scrolling" : "Enable Snap Scrolling"

        // Add floating animation
        toggleButton.style.animation = "float 3s ease-in-out infinite"

        toggleButton.addEventListener("click", () => {
          snapScrollingEnabled = !snapScrollingEnabled

          // Update button appearance with new bigger style
          toggleButton.className = `fixed bottom-8 right-8 w-8 h-8 rounded-full border-3 transition-all duration-500 hover:scale-110 flex items-center justify-center shadow-2xl backdrop-blur-md ${
            snapScrollingEnabled
              ? "bg-gradient-to-r from-green-500 to-emerald-500 border-green-400 shadow-green-500/50 hover:from-green-600 hover:to-emerald-600"
              : "bg-gradient-to-r from-slate-800/80 to-slate-700/80 border-white/30 hover:bg-gradient-to-r hover:from-slate-700/90 hover:to-slate-600/90 hover:border-white/50"
          }`

          toggleButton.innerHTML = snapScrollingEnabled
            ? '<svg class="w-8 h-8 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>'
            : '<svg class="w-8 h-8 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8 12h8M12 8v8"></path></svg>'

          toggleButton.title = snapScrollingEnabled ? "Click to Disable Snap Scrolling" : "Click to Enable Snap Scrolling"

          // Show enhanced feedback to user
          const feedback = document.createElement("div")
          feedback.className = `fixed bottom-28 right-8 px-6 py-3 rounded-xl text-white font-semibold text-sm shadow-2xl backdrop-blur-md border transition-all duration-500 transform ${
            snapScrollingEnabled
              ? "bg-gradient-to-r from-green-500/90 to-emerald-500/90 border-green-400/50"
              : "bg-gradient-to-r from-slate-800/90 to-slate-700/90 border-white/30"
          }`
          feedback.innerHTML = `
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 rounded-full ${snapScrollingEnabled ? 'bg-green-300' : 'bg-white'} animate-pulse"></div>
              <span>${snapScrollingEnabled ? "Snap Scrolling ON" : "Normal Scrolling ON"}</span>
            </div>
          `
          document.body.appendChild(feedback)

          // Animate feedback in
          setTimeout(() => {
            feedback.style.transform = "translateY(-10px)"
            feedback.style.opacity = "1"
          }, 10)

          // Remove feedback after delay
          setTimeout(() => {
            if (feedback.parentNode) {
              feedback.style.transform = "translateY(10px)"
              feedback.style.opacity = "0"
              setTimeout(() => {
                if (feedback.parentNode) {
                  feedback.parentNode.removeChild(feedback)
                }
              }, 300)
            }
          }, 2500)
        })

        // Add toggle button directly to body instead of dots container
        document.body.appendChild(toggleButton)

        sections.forEach((_, index) => {
          const dot = document.createElement("button")
          dot.className = `w-3 h-3 rounded-full border-2 transition-all duration-300 hover:scale-125 ${
            index === currentSection
              ? "bg-white border-white shadow-lg shadow-white/50"
              : "bg-transparent border-white/50 hover:bg-white/30 hover:border-white/80"
          }`

          dot.addEventListener("click", () => {
            if (!isScrolling) {
              snapToSection(index)
            }
          })

          dotsContainer!.appendChild(dot)
        })

        document.body.appendChild(dotsContainer)
      }

      // Update navigation dots
      const updateNavigationDots = () => {
        if (!dotsContainer) return

        const dots = dotsContainer.querySelectorAll("button")
        dots.forEach((dot, index) => {
          if (index === currentSection) {
            dot.className =
              "w-3 h-3 rounded-full border-2 bg-white border-white shadow-lg shadow-white/50 transition-all duration-300 hover:scale-125"
          } else {
            dot.className =
              "w-3 h-3 rounded-full border-2 bg-transparent border-white/50 hover:bg-white/30 hover:border-white/80 transition-all duration-300 hover:scale-125"
          }
        })
      }

      // Track scroll position for dots update
      const handleScroll = () => {
        if (!isScrolling) {
          const newCurrentSection = getCurrentSection()
          if (newCurrentSection !== currentSection) {
            currentSection = newCurrentSection
            updateNavigationDots()
          }
        }
      }

      // Add event listeners with proper options
      window.addEventListener("wheel", handleWheel, { passive: false })
      window.addEventListener("touchstart", handleTouchStart, { passive: true })
      window.addEventListener("touchend", handleTouchEnd, { passive: true })
      window.addEventListener("keydown", handleKeyDown, { passive: false })
      window.addEventListener("scroll", handleScroll, { passive: true })

      // Initialize navigation dots
      if (sections.length > 0) {
        createNavigationDots()
        // Set initial current section
        currentSection = getCurrentSection()
        updateNavigationDots()
      }

      // Cleanup function
      const cleanup = () => {
        window.removeEventListener("wheel", handleWheel)
        window.removeEventListener("touchstart", handleTouchStart)
        window.removeEventListener("touchend", handleTouchEnd)
        window.removeEventListener("keydown", handleKeyDown)
        window.removeEventListener("scroll", handleScroll)
        if (dotsContainer && dotsContainer.parentNode) {
          dotsContainer.parentNode.removeChild(dotsContainer)
        }
        // Remove toggle button
        const toggleBtn = document.querySelector('.fixed.bottom-8.right-8')
        if (toggleBtn && toggleBtn.parentNode) {
          toggleBtn.parentNode.removeChild(toggleBtn)
        }
      }

      return cleanup
    }

    // Initialize animations immediately
    const cleanup = initializeAnimations()

    // Return cleanup function
    return cleanup
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* <Header /> */}
      <HeroSection />
      <GallerySection />
      <Footer />
    </div>
  )
}
