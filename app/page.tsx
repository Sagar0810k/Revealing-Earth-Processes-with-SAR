"use client"

import type React from "react"

import { Suspense, useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import RiskCharts from "@/components/charts/risk-charts"
import Chatbot from "@/components/chat/chatbot"
import { cn } from "@/lib/utils"
import {
  AlertTriangle,
  MapPin,
  Users,
  Building2,
  TrendingUp,
  Satellite,
  Brain,
  Shield,
  Radio,
  Zap,
  Database,
  CloudRain,
  CheckCircle2,
  XCircle,
  Download,
  Play,
  Pause,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Layers,
  BarChart3,
  Eye,
} from "lucide-react"

const InteractiveMap = dynamic(() => import("@/components/map/interactive-map"), { ssr: false })

function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !isVisible) {
            setTimeout(() => {
              setIsVisible(true)
            }, delay)
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay, isVisible])

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-1000 ease-out will-change-transform",
        isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95",
        className,
      )}
    >
      {children}
    </div>
  )
}

function DynamicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener("resize", handleResize)

    class CalmOrb {
      x: number
      y: number
      radius: number
      baseHue: number
      time: number

      constructor(x: number, y: number, radius: number, hue: number) {
        this.x = x
        this.y = y
        this.radius = radius
        this.baseHue = hue
        this.time = Math.random() * 1000
      }

      update(scroll: number) {
        // Very slow, gentle movement
        this.time += 0.0008
        const scrollInfluence = scroll * 0.00005
        this.x += Math.sin(this.time + scrollInfluence) * 0.08
        this.y += Math.cos(this.time * 0.8 + scrollInfluence) * 0.08
      }

      draw(ctx: CanvasRenderingContext2D) {
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius)
        // Very subtle, light colors with low opacity
        gradient.addColorStop(0, `hsla(${this.baseHue}, 40%, 75%, 0.12)`)
        gradient.addColorStop(0.5, `hsla(${this.baseHue}, 35%, 70%, 0.06)`)
        gradient.addColorStop(1, `hsla(${this.baseHue}, 30%, 65%, 0)`)

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
    }

    // Only 2 orbs with light blue/teal tones
    const orbs = [
      new CalmOrb(canvas.width * 0.25, canvas.height * 0.3, 700, 200), // Light teal
      new CalmOrb(canvas.width * 0.75, canvas.height * 0.7, 800, 210), // Light blue
    ]

    let animationId: number

    const animate = () => {
      // Light, consistent background - no flickering
      ctx.fillStyle = "rgb(250, 251, 253)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      orbs.forEach((orb) => {
        orb.update(scrollY)
        orb.draw(ctx)
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
    }
  }, [scrollY])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 pointer-events-none" />
}

export default function Page() {
  return (
    <main className="relative overflow-hidden">
      <DynamicBackground />

      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden px-4 sm:px-6">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url('/hi.jpg')` }} 
        >
          {/* Overlay for better text visibility */}
          <div className="absolute inset-0 bg-black/50 from-transparent via-background/30 to-background/80" />
        </div>

        {/* Floating decorative elements with enhanced animation */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-delayed" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20 md:py-28 z-10">
          <Reveal>
            <div className="flex flex-col gap-6 sm:gap-8">
              <div className="space-y-3 sm:space-y-4">
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass-card text-xs sm:text-sm font-medium">
                  <Satellite className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                  <span className="break-words">Powered by SAR Satellite Technology</span>
                </div>
                <h1 className="text-balance text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="gradient-text">Predicting Landslides</span>
                  <br />
                  <span className="text-foreground">Before They Happen</span>
                </h1>
                <p className="text-pretty text-base sm:text-lg md:text-xl lg:text-2xl text-white max-w-3xl leading-relaxed">
                  A comprehensive satellite radar analysis of Haldwani combining real-time monitoring, AI-powered
                  insights, and interactive visualizations to protect our community.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <Button
                  onClick={() => document.getElementById("map")?.scrollIntoView({ behavior: "smooth" })}
                  size="lg"
                  className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                >
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                  <span className="break-words">Explore Risk Map</span>
                </Button>
                <Button
                  onClick={() => document.getElementById("numbers")?.scrollIntoView({ behavior: "smooth" })}
                  variant="outline"
                  size="lg"
                  className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 glass-card hover:bg-accent/10 transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                >
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                  <span className="break-words">View Analytics</span>
                </Button>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-6 sm:pt-8">
                <Reveal delay={100}>
                  <Card className="glass-card border-destructive/20 hover:scale-105 transition-transform duration-300 cursor-pointer group">
                    <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-6">
                      <div className="flex items-center justify-between mb-1 sm:mb-2">
                        <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-destructive group-hover:scale-110 transition-transform flex-shrink-0" />
                      </div>
                      <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-destructive break-words">
                        15–20
                      </CardTitle>
                      <CardDescription className="text-xs sm:text-sm md:text-base break-words">
                        High-Risk Zones Identified
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Reveal>

                <Reveal delay={200}>
                  <Card className="glass-card border-primary/20 hover:scale-105 transition-transform duration-300 cursor-pointer group">
                    <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-6">
                      <div className="flex items-center justify-between mb-1 sm:mb-2">
                        <Users className="w-6 h-6 sm:w-8 sm:h-8 text-primary group-hover:scale-110 transition-transform flex-shrink-0" />
                      </div>
                      <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary break-words">
                        47,000+
                      </CardTitle>
                      <CardDescription className="text-xs sm:text-sm md:text-base break-words">
                        People in Danger Areas
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Reveal>

                <Reveal delay={300}>
                  <Card className="glass-card border-accent/20 hover:scale-105 transition-transform duration-300 cursor-pointer group">
                    <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-6">
                      <div className="flex items-center justify-between mb-1 sm:mb-2">
                        <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-accent group-hover:scale-110 transition-transform flex-shrink-0" />
                      </div>
                      <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent break-words">
                        23 km
                      </CardTitle>
                      <CardDescription className="text-xs sm:text-sm md:text-base break-words">
                        Vulnerable Roads
                        <br /><br />
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Reveal>

                <Reveal delay={400}>
                  <Card className="glass-card border-chart-5/20 hover:scale-105 transition-transform duration-300 cursor-pointer group">
                    <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-6">
                      <div className="flex items-center justify-between mb-1 sm:mb-2">
                        <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-chart-5 group-hover:scale-110 transition-transform flex-shrink-0" />
                      </div>
                      <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-chart-5 break-words">
                        5
                      </CardTitle>
                      <CardDescription className="text-xs sm:text-sm md:text-base break-words">
                        Hospitals within 1km
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Reveal>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="sar" className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="grid items-center gap-8 sm:gap-10 md:gap-12 md:grid-cols-2">
              <div className="space-y-4 sm:space-y-6">
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 text-xs sm:text-sm font-medium text-primary">
                  <Satellite className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span>Technology Explained</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight text-balance">
                  How SAR Detects Ground Movement
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed text-pretty">
                  Satellites send radar signals that bounce off Earth's surface. When the ground shifts, the returned
                  signal changes. By comparing these signals over time, we detect potential landslide risk—even before a
                  visible failure occurs.
                </p>
                <ul className="space-y-2 sm:space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2 sm:gap-3">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary mt-1.5 sm:mt-2 flex-shrink-0" />
                    <span className="text-base sm:text-lg">
                      Stable vs. unstable slopes show different signal patterns
                    </span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary mt-1.5 sm:mt-2 flex-shrink-0" />
                    <span className="text-base sm:text-lg">Before/after comparisons reveal progressive movement</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary mt-1.5 sm:mt-2 flex-shrink-0" />
                    <span className="text-base sm:text-lg">Warnings can be raised weeks in advance</span>
                  </li>
                </ul>
              </div>

              <Reveal delay={200}>
                <Card className="glass-card border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Brain className="w-6 h-6 text-primary" />
                      <CardTitle className="text-xl sm:text-2xl">Ask the SAR Assistant</CardTitle>
                    </div>
                    <CardDescription className="text-sm sm:text-base">
                      Use our AI chatbot to explain SAR technology in simple terms and explore the risk map.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-lg border-2 border-dashed border-primary/30 bg-primary/5 p-4 sm:p-6 space-y-3">
                      <p className="text-xs sm:text-sm font-medium text-foreground">Try asking:</p>
                      <div className="space-y-2">
                        <div className="text-xs sm:text-sm text-muted-foreground bg-background/50 rounded-md px-3 py-2">
                          "How does SAR find risk?"
                        </div>
                        <div className="text-xs sm:text-sm text-muted-foreground bg-background/50 rounded-md px-3 py-2">
                          "Show me the risk map"
                        </div>
                        <div className="text-xs sm:text-sm text-muted-foreground bg-background/50 rounded-md px-3 py-2">
                          "What areas are most dangerous?"
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="map" className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent" />
        <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6">
          <Reveal>
            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-accent/10 text-xs sm:text-sm font-medium text-accent">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>Interactive Visualization</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Explore the Risk Map
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed text-pretty">
                Toggle layers, view detailed statistics, and switch between different heatmap visualizations to
                understand landslide risk patterns across Haldwani.
              </p>
            </div>
            <Suspense
              fallback={
                <div className="h-[75vh] rounded-2xl border-2 bg-muted/50 animate-pulse flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-muted-foreground">Loading interactive map...</p>
                  </div>
                </div>
              }
            >
              <InteractiveMap />
            </Suspense>
          </Reveal>
        </div>
      </section>

      <section id="numbers" className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="space-y-4 sm:space-y-6 mb-10 sm:mb-12">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 text-xs sm:text-sm font-medium text-primary">
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>Data Analytics</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
                The Numbers Behind the Risk
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed text-pretty">
                Explore comprehensive data visualizations showing risk distributions, monthly event frequency, rainfall
                patterns, and their correlation with ground movement across the region.
              </p>
            </div>
            <RiskCharts />
          </Reveal>
        </div>
      </section>

      <section id="education" className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="space-y-4 sm:space-y-6 mb-12 sm:mb-16 text-center">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 text-xs sm:text-sm font-medium text-primary">
                <Brain className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>Education & Methodology</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Understanding SAR Technology
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
                Learn how we use satellite radar to detect landslide risks and protect communities
              </p>
            </div>
          </Reveal>

          {/* What is SAR? */}
          <Reveal delay={100}>
            <div className="mb-12 sm:mb-20">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3">
                <Radio className="w-6 h-6 sm:w-8 sm:h-8 text-primary flex-shrink-0" />
                What is SAR?
              </h3>

              <div className="grid gap-6 sm:gap-8 md:grid-cols-2 mb-6 sm:mb-8">
                <Card className="glass-card border-2 hover:border-primary/50 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Eye className="w-5 h-5 text-primary" />
                      Traditional Camera
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="bg-muted/50 rounded-lg p-4 sm:p-6 text-center">
                      <div className="text-5xl sm:text-6xl mb-3">📷</div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Needs sunlight</p>
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                        <span>Blocked by clouds and darkness</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                        <span>Cannot see through vegetation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                        <span>Limited to visible light</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="glass-card border-2 border-primary/50 hover:border-primary transition-all duration-300 hover:shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Satellite className="w-5 h-5 text-primary" />
                      SAR (Synthetic Aperture Radar)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="bg-primary/10 rounded-lg p-4 sm:p-6 text-center border-2 border-primary/30">
                      <div className="text-5xl sm:text-6xl mb-3">📡</div>
                      <p className="text-xs sm:text-sm font-medium text-primary">Works 24/7</p>
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Penetrates clouds, rain, and darkness</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Detects millimeter-level ground movement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Uses radar waves instead of light</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card className="glass-card border-2 border-accent/30">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Zap className="w-5 h-5 text-accent" />
                    Think of it Like Bat Echolocation
                  </CardTitle>
                  <CardDescription>
                    Just like bats use sound waves to "see" in the dark, SAR satellites use radar waves to map Earth's
                    surface
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="text-center space-y-3">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                        <span className="text-3xl">📡</span>
                      </div>
                      <h4 className="font-semibold text-foreground">1. Send Signal</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">Satellite sends radar pulses to Earth</p>
                    </div>
                    <div className="text-center space-y-3">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                        <span className="text-3xl">🌍</span>
                      </div>
                      <h4 className="font-semibold text-foreground">2. Bounce Back</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">Signal reflects off ground surface</p>
                    </div>
                    <div className="text-center space-y-3">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                        <span className="text-3xl">📊</span>
                      </div>
                      <h4 className="font-semibold text-foreground">3. Analyze Change</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">Compare signals to detect movement</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <InteractiveRainfallDemo />
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="mb-12 sm:mb-20">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3">
                <Satellite className="w-6 h-6 sm:w-8 sm:h-8 text-primary flex-shrink-0" />
                Real SAR Data from Haldwani Region
              </h3>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8">
                Coordinates: 29.10°N - 29.50°N, 79.40°E - 79.65°E
              </p>

              <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
                <Card className="glass-card border-2 border-primary/30 hover:border-primary/50 transition-all duration-300 hover:scale-105">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Satellite className="w-5 h-5 text-primary" />
                      Sentinel-1 SAR Image of Haldwani and nearby areas
                    </CardTitle>
                    <CardDescription>Radar backscatter intensity</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="aspect-square bg-muted/50 rounded-lg overflow-hidden border-2 border-primary/20">
                      <img
                        src="/important 1_1 (3).jpg"
                        alt="Sentinel-1 SAR Image of Haldwani"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs sm:text-sm font-semibold text-foreground">What you're seeing:</p>
                      <ul className="space-y-1 text-xs sm:text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                          <span>
                            <strong className="text-foreground">Bright patches</strong> = rough slopes or settlements
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                          <span>
                            <strong className="text-foreground">Dark areas</strong> = water bodies or flat terrain
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                          <span>
                            <strong className="text-foreground">Texture patterns</strong> = surface roughness variations
                          </span>
                        </li>
                      </ul>
                    </div>
                    {/* NEW PDF LINK */}
                    <Button asChild variant="outline" size="sm" className="w-full glass-card bg-transparent">
                      <a href="/Sentinel-1 SAR Image of Haldwani.pdf" download target="_blank" rel="noopener noreferrer">
                        <Download className="w-4 h-4 mr-2" />
                        Download Image (PDF)
                      </a>
                    </Button>
                    {/* END NEW PDF LINK */}
                  </CardContent>
                </Card>

                <Card className="glass-card border-2 border-destructive/30 hover:border-destructive/50 transition-all duration-300 hover:scale-105">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-destructive" />
                      Landslide Detection Map of Haldwani and nearby areas
                    </CardTitle>
                    <CardDescription>Radar-based change detection</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="aspect-square bg-muted/50 rounded-lg overflow-hidden border-2 border-destructive/20">
                      <img
                        src="/colour_1 (2).jpg"
                        alt="Landslide Detection Map of Haldwani"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs sm:text-sm font-semibold text-foreground">Color coding:</p>
                      <ul className="space-y-1 text-xs sm:text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5 flex-shrink-0" />
                          <span>
                            <strong className="text-destructive">Red zones</strong> = possible movement or new landslide
                            areas
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-success mt-1.5 flex-shrink-0" />
                          <span>
                            <strong className="text-success">Green areas</strong> = stable background terrain
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                          <span>
                            <strong className="text-foreground">Clusters</strong> = high-priority risk zones
                          </span>
                        </li>
                      </ul>
                    </div>
                    {/* NEW PDF LINK */}
                    <Button asChild variant="outline" size="sm" className="w-full glass-card bg-transparent">
                      <a href="/Landslide Detection Map of Haldwani.pdf" download target="_blank" rel="noopener noreferrer">
                        <Download className="w-4 h-4 mr-2" />
                        Download Image (PDF)
                      </a>
                    </Button>
                    {/* END NEW PDF LINK */}
                  </CardContent>
                </Card>

                <Card className="glass-card border-2 border-accent/30 hover:border-accent/50 transition-all duration-300 hover:scale-105">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-accent" />
                      Digital Elevation Model of Haldwani and nearby areas
                    </CardTitle>
                    <CardDescription>Terrain height analysis</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="aspect-square bg-muted/50 rounded-lg overflow-hidden border-2 border-accent/20">
                      <img
                        src="/pic3_1 (3).jpg"
                        alt="Digital Elevation Model of Haldwani"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs sm:text-sm font-semibold text-foreground">Elevation mapping:</p>
                      <ul className="space-y-1 text-xs sm:text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                          <span>
                            <strong className="text-foreground">Brighter areas</strong> = higher elevations (mountain
                            ridges)
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                          <span>
                            <strong className="text-foreground">Darker areas</strong> = lower plains and valleys
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                          <span>
                            <strong className="text-foreground">Used for</strong> = slope and landslide risk analysis
                          </span>
                        </li>
                      </ul>
                    </div>
                    {/* NEW PDF LINK */}
                    <Button asChild variant="outline" size="sm" className="w-full glass-card bg-transparent">
                      <a href="/Digital Elevation Model of Haldwani.pdf" download target="_blank" rel="noopener noreferrer">
                        <Download className="w-4 h-4 mr-2" />
                        Download Image (PDF)
                      </a>
                    </Button>
                    {/* END NEW PDF LINK */}
                  </CardContent>
                </Card>
              </div>

              <Card className="glass-card border-2 border-primary/30 mt-6 sm:mt-8">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Database className="w-5 h-5 text-primary" />
                    How These Images Work Together
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                        <span className="text-2xl">1️⃣</span>
                      </div>
                      <h4 className="font-semibold text-foreground">SAR Backscatter</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Identifies surface roughness and detects changes in ground conditions over time
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-3">
                        <span className="text-2xl">2️⃣</span>
                      </div>
                      <h4 className="font-semibold text-foreground">Change Detection</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Compares multiple SAR images to pinpoint areas with ground movement or instability
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-3">
                        <span className="text-2xl">3️⃣</span>
                      </div>
                      <h4 className="font-semibold text-foreground">Elevation Analysis</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Calculates slope angles and identifies steep terrain prone to landslides
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-8 sm:mt-12">
                <h4 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6 flex items-center gap-2">
                  <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
                  Processing Tools Used
                </h4>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 max-w-3xl">
                  Professional GIS and remote sensing software used to process SAR data and generate landslide risk maps
                </p>

                <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                  <Card className="glass-card border-2 border-transparent hover:border-primary/50 transition-all duration-300 hover:scale-105 group">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl">
                          🗺️
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => window.open("https://qgis.org/", "_blank")}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                      <CardTitle className="text-xl">QGIS</CardTitle>
                      <CardDescription className="text-sm font-medium text-primary">
                        Open Source Geographic Information System
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Professional GIS software for spatial data analysis, map creation, and geoprocessing. Used for
                        integrating multiple data layers and generating final risk maps.
                      </p>
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-foreground">Key Features:</p>
                        <ul className="space-y-1">
                          <li className="text-xs text-muted-foreground flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                            <span>Vector and raster data processing</span>
                          </li>
                          <li className="text-xs text-muted-foreground flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                            <span>Spatial analysis and geostatistics</span>
                          </li>
                          <li className="text-xs text-muted-foreground flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                            <span>Map composition and cartography</span>
                          </li>
                          <li className="text-xs text-muted-foreground flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                            <span>Python scripting for automation</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-primary/10 rounded-lg p-3 border border-primary/20">
                        <p className="text-xs font-medium text-foreground mb-1">Used For:</p>
                        <p className="text-xs text-muted-foreground">
                          Slope calculation, risk zone mapping, overlay analysis, and creating interactive
                          visualizations
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full glass-card bg-transparent"
                        onClick={() => window.open("https://qgis.org/", "_blank")}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visit QGIS.org
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="glass-card border-2 border-transparent hover:border-accent/50 transition-all duration-300 hover:scale-105 group">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-3xl">
                          📡
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => window.open("https://step.esa.int/main/toolboxes/snap/", "_blank")}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                      <CardTitle className="text-xl">SNAP</CardTitle>
                      <CardDescription className="text-sm font-medium text-accent">
                        Sentinel Application Platform
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        ESA's official toolbox for processing Sentinel satellite data. Specialized for SAR image
                        preprocessing, calibration, and interferometric analysis.
                      </p>
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-foreground">Key Features:</p>
                        <ul className="space-y-1">
                          <li className="text-xs text-muted-foreground flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                            <span>SAR radiometric calibration</span>
                          </li>
                          <li className="text-xs text-muted-foreground flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                            <span>Terrain correction and orthorectification</span>
                          </li>
                          <li className="text-xs text-muted-foreground flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                            <span>Speckle filtering and noise reduction</span>
                          </li>
                          <li className="text-xs text-muted-foreground flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                            <span>Coherence and backscatter analysis</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-accent/10 rounded-lg p-3 border border-accent/20">
                        <p className="text-xs font-medium text-foreground mb-1">Used For:</p>
                        <p className="text-xs text-muted-foreground">
                          Preprocessing Sentinel-1 SAR images, extracting backscatter intensity, and calculating
                          coherence for change detection
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full glass-card bg-transparent"
                        onClick={() => window.open("https://step.esa.int/main/toolboxes/snap/", "_blank")}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visit SNAP Toolbox
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <Card className="glass-card border-2 border-primary/30 mt-6 sm:mt-8">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Zap className="w-5 h-5 text-primary" />
                      Processing Workflow
                    </CardTitle>
                    <CardDescription>How SNAP and QGIS work together in our analysis pipeline</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-3">
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-3">
                          <span className="text-2xl">1️⃣</span>
                        </div>
                        <h4 className="font-semibold text-foreground">SNAP Processing</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Download and preprocess Sentinel-1 SAR data: calibration, terrain correction, speckle
                          filtering, and feature extraction
                        </p>
                      </div>
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                          <span className="text-2xl">2️⃣</span>
                        </div>
                        <h4 className="font-semibold text-foreground">QGIS Integration</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Import processed SAR data, DEM, and rainfall layers. Perform slope analysis, overlay
                          operations, and risk classification
                        </p>
                      </div>
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-full bg-chart-3/10 flex items-center justify-center mb-3">
                          <span className="text-2xl">3️⃣</span>
                        </div>
                        <h4 className="font-semibold text-foreground">Map Generation</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Create final risk maps with proper symbology, legends, and export for web visualization and
                          stakeholder reports
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              {/* </CHANGE> */}
            </div>
          </Reveal>

          {/* How We Detect Landslides */}
          <Reveal delay={200}>
            <div className="mb-12 sm:mb-20">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3">
                <Layers className="w-6 h-6 sm:w-8 sm:h-8 text-primary flex-shrink-0" />
                How We Detect Landslides
              </h3>

              <ProcessingFlowchart />
            </div>
          </Reveal>

          {/* Understanding the Data */}
          <Reveal delay={300}>
            <div className="mb-12 sm:mb-20">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3">
                <Database className="w-6 h-6 sm:w-8 sm:h-8 text-primary flex-shrink-0" />
                Understanding the Data
              </h3>

              <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                <GlossaryCard
                  term="Backscatter"
                  icon="📡"
                  definition="The strength of the radar signal that bounces back from the ground"
                  example="Rough surfaces (rocks, buildings) = strong backscatter. Smooth surfaces (water) = weak backscatter."
                  color="primary"
                />
                <GlossaryCard
                  term="Coherence"
                  icon="🔗"
                  definition="How similar two radar images are when compared over time"
                  example="High coherence = stable ground. Low coherence = ground movement or vegetation change."
                  color="accent"
                />
                <GlossaryCard
                  term="DEM (Digital Elevation Model)"
                  icon="⛰️"
                  definition="A 3D map showing the height of every point on Earth's surface"
                  example="Used to calculate slope angles and identify steep terrain prone to landslides."
                  color="chart-3"
                />
                <GlossaryCard
                  term="Slope Angle"
                  icon="📐"
                  definition="The steepness of the terrain measured in degrees"
                  example="Slopes > 30° are high risk. Slopes > 45° are extremely dangerous."
                  color="chart-4"
                />
                <GlossaryCard
                  term="Rainfall Intensity"
                  icon="🌧️"
                  definition="Amount of rain falling over a specific time period"
                  example="Heavy rainfall (>100mm/day) saturates soil and triggers landslides."
                  color="chart-5"
                />
                <GlossaryCard
                  term="Risk Score"
                  icon="⚠️"
                  definition="Combined metric (0-100) indicating landslide probability"
                  example="Score > 70 = High Risk. Score > 85 = Critical Risk requiring immediate action."
                  color="destructive"
                />
              </div>
            </div>
          </Reveal>

          {/* Data Sources */}
          <Reveal delay={400}>
            <div className="mb-12 sm:mb-20">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3">
                <Database className="w-6 h-6 sm:w-8 sm:h-8 text-primary flex-shrink-0" />
                Data Sources
              </h3>

              <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                <DataSourceCard
                  name="Sentinel-1"
                  provider="European Space Agency (ESA)"
                  description="C-band SAR satellite providing all-weather, day-and-night imagery every 6-12 days"
                  specs={["Resolution: 10m", "Frequency: C-band (5.4 GHz)", "Coverage: Global"]}
                  link="https://sentinel.esa.int/web/sentinel/missions/sentinel-1"
                  icon="🛰️"
                />
                <DataSourceCard
                  name="SRTM DEM"
                  provider="NASA / USGS"
                  description="30-meter resolution elevation data covering 80% of Earth's land surface"
                  specs={["Resolution: 30m", "Vertical accuracy: ±16m", "Year: 2000"]}
                  link="https://www.usgs.gov/centers/eros/science/usgs-eros-archive-digital-elevation-shuttle-radar-topography-mission-srtm"
                  icon="🗺️"
                />
                <DataSourceCard
                  name="OpenStreetMap"
                  provider="OSM Community"
                  description="Collaborative mapping platform providing road networks, buildings, and infrastructure data"
                  specs={["Type: Vector data", "Update: Real-time", "License: ODbL"]}
                  link="https://www.openstreetmap.org/"
                  icon="🗺️"
                />
                <DataSourceCard
                  name="IMD Rainfall Data"
                  provider="India Meteorological Department"
                  description="Daily rainfall measurements from weather stations across India"
                  specs={["Frequency: Daily", "Coverage: India", "Format: Gridded"]}
                  link="https://www.imd.gov.in/"
                  icon="🌧️"
                />
              </div>
            </div>
          </Reveal>

          {/* Accuracy & Limitations */}
          <Reveal delay={500}>
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3">
                <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-primary flex-shrink-0" />
                Accuracy & Limitations
              </h3>

              <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
                <Card className="glass-card border-2 border-primary/50">
                  <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl flex items-center gap-2 text-primary">
                      <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
                      Strengths
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-foreground">High Detection Rate</p>
                          <p className="text-sm text-muted-foreground">87.5% of high-risk zones correctly identified</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-foreground">Overall Accuracy</p>
                          <p className="text-sm text-muted-foreground">95% accuracy in risk classification</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-foreground">All-Weather Monitoring</p>
                          <p className="text-sm text-muted-foreground">Works through clouds, rain, and at night</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-foreground">Early Warning Capability</p>
                          <p className="text-sm text-muted-foreground">Detects ground movement weeks before failure</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-primary/10 rounded-lg p-4 border border-primary/30">
                      <h4 className="font-semibold text-foreground mb-2">Validation Statistics</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">True Positives</p>
                          <p className="text-2xl font-bold text-primary">14/16</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">False Positives</p>
                          <p className="text-2xl font-bold text-primary">2/16</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-2 border-destructive/50">
                  <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl flex items-center gap-2 text-destructive">
                      <XCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                      Limitations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-destructive mt-2 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-foreground">Resolution Constraints</p>
                          <p className="text-sm text-muted-foreground">10m pixel size may miss small-scale movements</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-destructive mt-2 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-foreground">Temporal Gaps</p>
                          <p className="text-sm text-muted-foreground">6-12 day revisit time may miss rapid events</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-destructive mt-2 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-foreground">Dense Vegetation</p>
                          <p className="text-sm text-muted-foreground">Forest canopy can reduce signal quality</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-destructive mt-2 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-foreground">Sudden Failures</p>
                          <p className="text-sm text-muted-foreground">
                            Cannot predict instantaneous collapses without precursors
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-destructive/10 rounded-lg p-4 border border-destructive/30">
                      <h4 className="font-semibold text-foreground mb-2">Important Note</h4>
                      <p className="text-sm text-muted-foreground">
                        This analysis is a research tool and should complement—not replace—ground surveys and expert
                        assessments. Always consult local authorities for evacuation decisions.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="action" className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6">
        <div className="absolute inset-0 gradient-mesh opacity-5" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="space-y-4 sm:space-y-6 mb-10 sm:mb-12 text-center">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-accent/10 text-xs sm:text-sm font-medium text-accent">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>Take Action</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
                How to Stay Safe
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
                Actionable insights for residents and authorities to mitigate landslide risks effectively.
              </p>
            </div>

            <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
              <Reveal delay={100}>
                <Card className="glass-card border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:scale-105 group">
                  <CardHeader className="space-y-4 p-4 sm:p-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Users className="w-7 h-7 text-primary" />
                    </div>
                    <CardTitle className="text-xl sm:text-2xl">For Residents</CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                      Know where, when, and how to stay safe in your community
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 p-4 sm:p-6 text-muted-foreground">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <p>Avoid building in high-risk zones identified on the map</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <p>Be extra cautious during monsoon months (June-September)</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <p>Plan and practice evacuation routes with your family</p>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>

              <Reveal delay={200}>
                <Card className="glass-card border-2 hover:border-accent/50 transition-all duration-300 hover:shadow-2xl hover:scale-105 group">
                  <CardHeader className="space-y-4 p-4 sm:p-6">
                    <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Shield className="w-7 h-7 text-accent" />
                    </div>
                    <CardTitle className="text-xl sm:text-2xl">For Authorities</CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                      Prioritize mitigation efforts with data-driven insights
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 p-4 sm:p-6 text-muted-foreground">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                      <p>Reinforce vulnerable road sections identified in the analysis</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                      <p>Deploy early warning systems in high-risk zones</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                      <p>Plan infrastructure upgrades in priority areas</p>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Floating Chatbot */}
      <Chatbot />
    </main>
  )
}

function InteractiveRainfallDemo() {
  const [rainfall, setRainfall] = useState(50)

  const getSignalStrength = (rain: number) => {
    return Math.max(20, 100 - rain * 0.8)
  }

  const getRiskLevel = (rain: number) => {
    if (rain < 30) return { level: "Low", color: "text-primary" }
    if (rain < 70) return { level: "Medium", color: "text-accent" }
    return { level: "High", color: "text-destructive" }
  }

  const risk = getRiskLevel(rainfall)
  const signalStrength = getSignalStrength(rainfall)

  return (
    <Card className="glass-card border-2 border-primary/30 mt-6 sm:mt-8">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <CloudRain className="w-5 h-5 text-primary" />
          Interactive Demo: Rainfall Impact on SAR Signal
        </CardTitle>
        <CardDescription>
          Adjust the rainfall slider to see how it affects radar signal and landslide risk
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">Rainfall Intensity</label>
            <span className="text-sm font-bold text-primary">{rainfall}mm/day</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={rainfall}
            onChange={(e) => setRainfall(Number(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <p className="text-sm font-medium text-muted-foreground">SAR Signal Coherence</p>
            <div className="flex items-end gap-2">
              <div className="text-3xl font-bold text-foreground">{signalStrength.toFixed(0)}%</div>
              <div className="text-sm text-muted-foreground mb-1">strength</div>
            </div>
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div className="h-full bg-primary transition-all duration-300" style={{ width: `${signalStrength}%` }} />
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Landslide Risk Level</p>
            <div className="flex items-end gap-2">
              <div className={`text-3xl font-bold ${risk.color}`}>{risk.level}</div>
            </div>
            <p className="text-xs text-muted-foreground">
              {rainfall < 30 && "Ground is stable with good signal quality"}
              {rainfall >= 30 && rainfall < 70 && "Soil saturation increasing, monitor closely"}
              {rainfall >= 70 && "Critical saturation, high landslide probability"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ProcessingFlowchart() {
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      number: 1,
      title: "Data Acquisition",
      description: "Download Sentinel-1 SAR images and SRTM elevation data for Haldwani region",
      icon: "📡",
      color: "primary",
    },
    {
      number: 2,
      title: "Preprocessing",
      description: "Apply radiometric calibration, terrain correction, and speckle filtering to SAR data",
      icon: "⚙️",
      color: "accent",
    },
    {
      number: 3,
      title: "Feature Extraction",
      description: "Calculate backscatter intensity, coherence, slope angle, and aspect from processed data",
      icon: "🔍",
      color: "chart-3",
    },
    {
      number: 4,
      title: "Rainfall Integration",
      description: "Merge IMD rainfall data with SAR observations for temporal correlation analysis",
      icon: "🌧️",
      color: "chart-4",
    },
    {
      number: 5,
      title: "Risk Modeling",
      description: "Apply machine learning algorithms to classify terrain into risk categories",
      icon: "🤖",
      color: "chart-5",
    },
    {
      number: 6,
      title: "Validation",
      description: "Cross-reference results with historical landslide records and ground truth data",
      icon: "✅",
      color: "primary",
    },
    {
      number: 7,
      title: "Visualization",
      description: "Generate interactive maps, charts, and reports for stakeholders and public access",
      icon: "📊",
      color: "accent",
    },
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          const next = (prev + 1) % steps.length
          setActiveStep(next)
          return next
        })
      }, 2000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, steps.length])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    if (!isPlaying) {
      setCurrentStep(0)
      setActiveStep(0)
    } else {
      setActiveStep(null)
    }
  }

  return (
    <Card className="glass-card border-2 border-primary/30">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">7-Step Processing Pipeline</CardTitle>
          <div className="flex gap-2">
            <Button onClick={handlePlayPause} variant="outline" size="sm" className="glass-card bg-transparent">
              {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isPlaying ? "Pause" : "Play"} Animation
            </Button>
            
          </div>
        </div>
        <CardDescription>Click on any step to learn more, or play the full animation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={cn(
                "glass-card p-4 rounded-lg cursor-pointer transition-all duration-300 border-2",
                activeStep === index
                  ? "border-primary scale-105 shadow-lg"
                  : "border-transparent hover:border-primary/30",
              )}
              onClick={() => setActiveStep(activeStep === index ? null : index)}
            >
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0 transition-all duration-300",
                    activeStep === index ? "bg-primary/20 scale-110" : "bg-muted/50",
                  )}
                >
                  {step.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-foreground">
                      Step {step.number}: {step.title}
                    </h4>
                    {activeStep === index ? (
                      <ChevronUp className="w-5 h-5 text-primary" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                  <p
                    className={cn(
                      "text-sm text-muted-foreground transition-all duration-300",
                      activeStep === index ? "opacity-100" : "opacity-70",
                    )}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function GlossaryCard({
  term,
  icon,
  definition,
  example,
  color,
}: {
  term: string
  icon: string
  definition: string
  example: string
  color: string
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card
      className={cn(
        "glass-card border-2 cursor-pointer transition-all duration-300 hover:scale-105",
        isExpanded ? `border-${color}` : "border-transparent hover:border-primary/30",
      )}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{icon}</div>
            <CardTitle className="text-lg">{term}</CardTitle>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-primary" />
          ) : (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{definition}</p>
        {isExpanded && (
          <div className="bg-muted/50 rounded-lg p-3 border border-primary/20 animate-fade-in">
            <p className="text-xs font-medium text-foreground mb-1">Example:</p>
            <p className="text-xs text-muted-foreground">{example}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function DataSourceCard({
  name,
  provider,
  description,
  specs,
  link,
  icon,
}: {
  name: string
  provider: string
  description: string
  specs: string[]
  link: string
  icon: string
}) {
  return (
    <Card className="glass-card border-2 border-transparent hover:border-primary/50 transition-all duration-300 hover:scale-105 group">
      <CardHeader>
        <div className="flex items-start justify-between mb-3">
          <div className="text-4xl">{icon}</div>
          <Button
            variant="ghost"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => window.open(link, "_blank")}
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
        <CardTitle className="text-xl">{name}</CardTitle>
        <CardDescription className="text-sm font-medium text-primary">{provider}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="space-y-2">
          <p className="text-xs font-semibold text-foreground">Specifications:</p>
          <ul className="space-y-1">
            {specs.map((spec, index) => (
              <li key={index} className="text-xs text-muted-foreground flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                {spec}
              </li>
            ))}
          </ul>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full glass-card bg-transparent"
          onClick={() => window.open(link, "_blank")}
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Access Data
        </Button>
      </CardContent>
    </Card>
  )
}
