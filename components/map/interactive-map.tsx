// interactive-map.tsx
"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Layers, MapPin } from "lucide-react"
import dynamic from "next/dynamic"

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })
const GeoJSON = dynamic(() => import("react-leaflet").then((mod) => mod.GeoJSON), { ssr: false })
const useMap = dynamic(() => import("react-leaflet").then((mod) => mod.useMap), { ssr: false })
const CircleMarker = dynamic(() => import("react-leaflet").then((mod) => mod.CircleMarker), { ssr: false })

type HeatAspect = "population" | "slope" | "rainfall" | "risk"

// Centered to the requested boundary: 29.30° N, 79.525° E
const HALDWANI = { lat: 29.3, lng: 79.525 }

// --- RISK ZONE DATA ---
const riskZones: GeoJSON.FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      // High Risk zone near Ranibagh/NH-109
      properties: { id: "RZ01", name: "Ranibagh - NH-109 Corridor", risk: "High" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [79.5, 29.23],
            [79.53, 29.23],
            [79.53, 29.215],
            [79.5, 29.215],
            [79.5, 29.23],
          ],
        ],
      },
    },
    {
      type: "Feature",
      // High Risk zone: Amritpur Paniyali area
      properties: { id: "RZ02", name: "Amritpur Paniyali Hotspot", risk: "High" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [79.54, 29.29],
            [79.56, 29.29],
            [79.56, 29.27],
            [79.54, 29.27],
            [79.54, 29.29],
          ],
        ],
      },
    },
    {
      type: "Feature",
      // High Risk zone near Nainital/Bhimtal Road (High Elevation)
      properties: { id: "RZ06", name: "Nainital-Bhimtal Hill Corridor", risk: "High" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [79.58, 29.35],
            [79.64, 29.35],
            [79.64, 29.3],
            [79.58, 29.3],
            [79.58, 29.35],
          ],
        ],
      },
    },
    {
      type: "Feature",
      // Medium Risk area for Kathgodam Junction
      properties: { id: "RZ03", name: "Kathgodam Foothills", risk: "Medium" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [79.49, 29.26],
            [79.51, 29.26],
            [79.51, 29.24],
            [79.49, 29.24],
            [79.49, 29.26],
          ],
        ],
      },
    },
    {
      type: "Feature",
      // Low Risk zone in the flatter Haldwani city area
      properties: { id: "RZ04", name: "Haldwani City Center", risk: "Low" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [79.51, 29.22],
            [79.53, 29.22],
            [79.53, 29.2],
            [79.51, 29.2],
            [79.51, 29.22],
          ],
        ],
      },
    },
    {
      type: "Feature",
      // Lowest Risk zone in the Lalkuan/Southern plain (More Green)
      properties: { id: "RZ05", name: "Lalkuan Southern Plain", risk: "Very Low" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [79.45, 29.15],
            [79.6, 29.15],
            [79.6, 29.1],
            [79.45, 29.1],
            [79.45, 29.15],
          ],
        ],
      },
    },
  ],
}

// --- FINAL HEATMAP DATA (Rainfall Proneness increased in Kathgodam, Panachakki, Bithoria) ---
const heatData = {
  // --- RISK HEATMAP: (No Change, Preserved) ---
  risk: [
    [29.22, 79.51, 0.98],
    [29.265, 79.505, 0.95],
    [29.28, 79.53, 0.96],
    [29.35, 79.58, 0.92],
    [29.4, 79.6, 0.9],
    [29.45, 79.55, 0.88],
    [29.245, 79.515, 0.87],
    [29.48, 79.51, 0.85],
    [29.38, 79.45, 0.75],
    [29.42, 79.55, 0.65],
    [29.2183, 79.5126, 0.6],
    [29.3, 79.45, 0.58],
    [29.205, 79.525, 0.55],
    [29.15, 79.45, 0.2],
    [29.12, 79.5, 0.1],
    [29.105, 79.58, 0.05],
    [29.11, 79.42, 0.15],
    [29.16, 79.55, 0.25],
    [29.2, 79.45, 0.35],
    ...Array.from({ length: 50 }, (_, i) => {
      const lat = 29.1 + Math.random() * 0.4
      const lng = 79.4 + Math.random() * 0.25
      const baseIntensity = (lat - 29.1) / 0.4
      const intensity = Math.min(0.8, baseIntensity * (0.3 + Math.random() * 0.5))
      return [lat, lng, intensity]
    }),
  ],

  // --- SLOPE HEATMAP: (No Change, Preserved) ---
  slope: [
    [29.45, 79.55, 0.98],
    [29.35, 79.6, 0.95],
    [29.285, 79.535, 0.9],
    [29.27, 79.525, 0.88],
    [29.4, 79.48, 0.85],
    [29.3, 79.57, 0.82],
    [29.25, 79.51, 0.8],
    [29.23, 79.5, 0.75],
    [29.225, 79.498, 0.7],
    [29.38, 79.45, 0.65],
    [29.32, 79.51, 0.55],
    [29.15, 79.45, 0.15],
    [29.12, 79.5, 0.05],
    [29.105, 79.58, 0.1],
    [29.11, 79.42, 0.2],
    [29.16, 79.55, 0.3],
    ...Array.from({ length: 50 }, (_, i) => {
      const lat = 29.1 + Math.random() * 0.4
      const lng = 79.4 + Math.random() * 0.25
      const baseIntensity = (lat - 29.1) / 0.4
      const intensity = Math.min(0.8, baseIntensity * (0.3 + Math.random() * 0.5))
      return [lat, lng, intensity]
    }),
  ],

  // --- RAINFALL HEATMAP: INTENSITY INCREASED IN KATHGHARIA, PANCHAKKI, BITHORIA ---
  rainfall: [
    // HIGH RAINFALL (0.85 - 0.98) - Near the hills
    [29.48, 79.6, 0.98],
    [29.4, 79.45, 0.95],
    [29.35, 79.55, 0.93],
    [29.45, 79.5, 0.9],
    [29.26, 79.5, 0.88],
    [29.38, 79.62, 0.85],

    // NEW: HIGH PRONENESS POINTS FOR KATHGHARIA, PANCHAKKI, BITHORIA (Haldwani outskirts)
    [29.25, 79.54, 0.85], // Kathgharia area
    [29.2, 79.54, 0.75], // Bithoria area
    [29.23, 79.53, 0.7], // Panachakki area

    // MEDIUM RAINFALL (0.55 - 0.84)
    [29.3, 79.525, 0.8],
    [29.2183, 79.5126, 0.65],
    [29.18, 79.53, 0.55],

    // LOW RAINFALL (0.05 - 0.50)
    [29.15, 79.5, 0.5],
    [29.12, 79.55, 0.4],
    [29.1, 79.42, 0.35],

    // Denser coverage points (~50 more) - Smoother, with latitude-based bias
    ...Array.from({ length: 50 }, (_, i) => {
      const lat = 29.1 + Math.random() * 0.4
      const lng = 79.4 + Math.random() * 0.25
      let intensity = Math.random() * 0.5 + 0.1
      if (lat > 29.35) {
        intensity = 0.5 + Math.random() * 0.45
      } else if (lat > 29.25) {
        intensity = 0.3 + Math.random() * 0.5
      }
      return [lat, lng, Math.min(1.0, intensity)]
    }),
  ],

  // --- POPULATION HEATMAP: (No Change, Preserved) ---
  population: [
    [29.2183, 79.5126, 0.95],
    [29.22, 79.515, 0.9],
    [29.215, 79.51, 0.85],
    [29.222, 79.518, 0.8],
    [29.218, 79.508, 0.75],
    [29.26, 79.51, 0.7],
    [29.21, 79.515, 0.6],
    [29.15, 79.48, 0.4],
    [29.3, 79.52, 0.35],
    [29.12, 79.55, 0.3],
    [29.4, 79.5, 0.25],
    [29.1, 79.45, 0.2],
    ...Array.from({ length: 50 }, (_, i) => [
      29.1 + Math.random() * 0.4,
      79.4 + Math.random() * 0.25,
      Math.random() * 0.4,
    ]),
  ],
}

const MapEventController = ({ setVisibleHeatAspect, setShowRisk }: any) => {
  const map = useMap()

  useEffect(() => {
    const handleMapEvent = (event: CustomEvent<any>) => {
      const { type, ...detail } = event.detail

      switch (type) {
        case "focusMapOn":
          map.setView([detail.lat, detail.lng], detail.zoom || 12)
          break
        case "toggleLayer":
          if (detail.layer === "risk") {
            setShowRisk(detail.visible)
          } else {
            if (!detail.visible) {
              setVisibleHeatAspect(null)
            } else {
              setVisibleHeatAspect(detail.layer)
            }
          }
          break
        case "setHeatmap":
          setVisibleHeatAspect(detail.aspect)
          break
      }
    }

    window.addEventListener("mapEvent", handleMapEvent as EventListener)
    return () => window.removeEventListener("mapEvent", handleMapEvent as EventListener)
  }, [map, setVisibleHeatAspect, setShowRisk])

  return null
}

// Heatmap Layer Component using Circle Markers
const HeatLayer = ({ aspect }: { aspect: HeatAspect | null }) => {
  if (!aspect) return null

  // Renamed data source
  const data = heatData[aspect]

  // Function to get color based on intensity (Green for lowest risk/slope)
  const getColor = (intensity: number) => {
    if (intensity >= 0.8) return "#ff0000" // Red (Highest Risk/Slope/Rainfall)
    if (intensity >= 0.6) return "#ffaa00" // Orange
    if (intensity >= 0.4) return "#ffff00" // Yellow
    if (intensity >= 0.2) return "#aaff00" // Yellow-Green
    return "#00ff00" // Green (Lowest Risk/Flat/Perfect to live)
  }

  return (
    <>
      {data.map((point, idx) => {
        const [lat, lng, intensity] = point
        const radius = 15 + intensity * 20

        return (
          <CircleMarker
            key={`${aspect}-${idx}`}
            center={[lat, lng]}
            radius={radius}
            pathOptions={{
              fillColor: getColor(intensity),
              fillOpacity: 0.4,
              color: getColor(intensity),
              weight: 1,
              opacity: 0.6,
            }}
          ></CircleMarker>
        )
      })}
    </>
  )
}

const Legend = () => {
  const [L, setL] = useState<any>(null)
  const [map, setMap] = useState<any>(null)

  useEffect(() => {
    Promise.all([import("leaflet"), import("react-leaflet")]).then(([leaflet, reactLeaflet]) => {
      setL(leaflet.default)
    })
  }, [])

  useEffect(() => {
    if (!L || !map) return

    const legend = L.control({ position: "bottomright" })

    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "info legend")
      div.style.backgroundColor = "white"
      div.style.padding = "10px"
      div.style.borderRadius = "5px"
      div.style.boxShadow = "0 0 15px rgba(0,0,0,0.2)"

      div.innerHTML = `
        <div style="font-weight: bold; margin-bottom: 5px;">Risk Levels</div>
        <div><span style="background: #dc2626; width: 18px; height: 18px; display: inline-block; margin-right: 5px;"></span> High Risk</div>
        <div><span style="background: #f59e0b; width: 18px; height: 18px; display: inline-block; margin-right: 5px;"></span> Medium Risk</div>
        <div><span style="background: #10b981; width: 18px; height: 18px; display: inline-block; margin-right: 5px;"></span> Low Risk</div>
        <div><span style="background: #34d399; width: 18px; height: 18px; display: inline-block; margin-right: 5px;"></span> Very Low Risk (Plains)</div>
      `
      return div
    }

    legend.addTo(map)

    return () => {
      legend.remove()
    }
  }, [L, map])

  return null
}

export default function InteractiveMap() {
  const mapRef = useRef(null)
  const [showRisk, setShowRisk] = useState(true)
  const [visibleHeatAspect, setVisibleHeatAspect] = useState<HeatAspect | null>("risk")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
    link.crossOrigin = ""
    document.head.appendChild(link)

    return () => {
      document.head.removeChild(link)
    }
  }, [])

  const handleHeatmapToggle = (aspect: HeatAspect, isChecked: boolean) => {
    setVisibleHeatAspect(isChecked ? aspect : null)
  }

  const riskStyle = useMemo(
    () => ({
      style: (feature: any) => {
        const riskLevel = feature.properties.risk
        let fillColor = "#10b981" // Low Risk: Emerald Green
        let borderColor = "#059669"

        if (riskLevel === "High") {
          fillColor = "#dc2626" // Red
          borderColor = "#b91c1c"
        } else if (riskLevel === "Medium") {
          fillColor = "#f59e0b" // Amber/Orange
          borderColor = "#d97706"
        } else if (riskLevel === "Very Low") {
          fillColor = "#34d399" // Light Green (Perfect to live)
          borderColor = "#065f46"
        }

        return {
          fillColor: fillColor,
          fillOpacity: 0.5,
          color: borderColor,
          weight: 2,
        }
      },
      onEachFeature: (feature: any, layer: any) => {
        if (feature.properties && feature.properties.name) {
          layer.bindPopup(`
          <strong>${feature.properties.name}</strong><br/>
          Risk Level: ${feature.properties.risk}<br/>
          Zone ID: ${feature.properties.id}
        `)
        }
      },
    }),
    [],
  )

  if (!mounted) {
    return (
      <Card className="glass-card border-2 shadow-2xl overflow-hidden">
        <div className="h-[75vh] flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-muted-foreground">Loading map...</p>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="glass-card border-2 shadow-2xl overflow-hidden">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Landslide Risk Map </h2>
            <p className="text-sm text-muted-foreground">Haldwani Region Analysis</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background/80 border">
            <Layers className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Layers:</span>
          </div>

          <Button
            variant={showRisk ? "default" : "outline"}
            size="sm"
            onClick={() => setShowRisk(!showRisk)}
            className="transition-all duration-200"
          >
            Risk Zones
          </Button>

          <Button
            variant={visibleHeatAspect === "rainfall" ? "default" : "outline"}
            size="sm"
            onClick={() => handleHeatmapToggle("rainfall", visibleHeatAspect !== "rainfall")}
            className="transition-all duration-200"
          >
            Rainfall
          </Button>

          <Button
            variant={visibleHeatAspect === "risk" ? "default" : "outline"}
            size="sm"
            onClick={() => handleHeatmapToggle("risk", visibleHeatAspect !== "risk")}
            className="transition-all duration-200"
          >
            Risk Heat
          </Button>

          <Button
            variant={visibleHeatAspect === "population" ? "default" : "outline"}
            size="sm"
            onClick={() => handleHeatmapToggle("population", visibleHeatAspect !== "population")}
            className="transition-all duration-200"
          >
            Population
          </Button>

          <Button
            variant={visibleHeatAspect === "slope" ? "default" : "outline"}
            size="sm"
            onClick={() => handleHeatmapToggle("slope", visibleHeatAspect !== "slope")}
            className="transition-all duration-200"
          >
            Slope
          </Button>
        </div>
      </div>

      <MapContainer
        ref={mapRef}
        center={[HALDWANI.lat, HALDWANI.lng]}
        zoom={12}
        className="h-[75vh] w-full"
        scrollWheelZoom
        zoomControl
        attributionControl={false} // ADDED: Set attributionControl to false
        preferCanvas
      >
        <TileLayer
          attribution="" // UPDATED: Set attribution to an empty string
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <HeatLayer aspect={visibleHeatAspect} />

        {showRisk && <GeoJSON data={riskZones as any} {...riskStyle} />}

        <MapEventController setVisibleHeatAspect={setVisibleHeatAspect} setShowRisk={setShowRisk} />

        <Legend />
      </MapContainer>
    </Card>
  )
}