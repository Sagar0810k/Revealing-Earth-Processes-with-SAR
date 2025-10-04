"use client"

import {
  PieChart,
  Pie,
  Cell,
  Tooltip as RTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { TrendingUp, BarChart3, Activity, Droplets } from "lucide-react"

const colors = {
  high: "hsl(0, 85%, 50%)", // Brighter, more saturated red for high risk
  medium: "hsl(38, 95%, 55%)", // More vibrant orange for medium risk
  low: "hsl(142, 75%, 45%)", // Richer, deeper green for low risk
  primary: "hsl(260, 60%, 50%)", // Deep blue matching design
  accent: "hsl(200, 60%, 60%)", // Teal accent
  chart1: "hsl(260, 65%, 55%)", // Rich blue
  chart2: "hsl(200, 65%, 60%)", // Vibrant teal
  chart3: "hsl(80, 60%, 60%)", // Warm yellow-green
  chart4: "hsl(28, 75%, 62%)", // Coral-orange
  chart5: "hsl(150, 65%, 58%)", // Bright green
}

const riskDistribution = [
  { name: "High Risk Zones", value: 42, color: colors.high },
  { name: "Medium Risk Zones", value: 38, color: colors.medium },
  { name: "Low Risk Zones", value: 20, color: colors.low },
]

const monthlyFrequency = [
  { month: "Jan", events: 0 },
  { month: "Feb", events: 1 },
  { month: "Mar", events: 2 },
  { month: "Apr", events: 3 },
  { month: "May", events: 6 },
  { month: "Jun", events: 18 },
  { month: "Jul", events: 24 },
  { month: "Aug", events: 22 },
  { month: "Sep", events: 12 },
  { month: "Oct", events: 5 },
  { month: "Nov", events: 2 },
  { month: "Dec", events: 1 },
]

const rainfallVsMovement = [
  { month: "Jan", rainfall: 15, movement: 0.8 },
  { month: "Feb", rainfall: 28, movement: 1.2 },
  { month: "Mar", rainfall: 45, movement: 1.8 },
  { month: "Apr", rainfall: 65, movement: 2.4 },
  { month: "May", rainfall: 145, movement: 4.2 },
  { month: "Jun", rainfall: 380, movement: 8.5 },
  { month: "Jul", rainfall: 540, movement: 11.2 },
  { month: "Aug", rainfall: 465, movement: 10.1 },
  { month: "Sep", rainfall: 310, movement: 7.3 },
  { month: "Oct", rainfall: 95, movement: 3.2 },
  { month: "Nov", rainfall: 25, movement: 1.4 },
  { month: "Dec", rainfall: 12, movement: 0.9 },
]

const corrScatter = [
  { rainfall: 15, movement: 0.8, size: 50 },
  { rainfall: 28, movement: 1.2, size: 55 },
  { rainfall: 45, movement: 1.8, size: 60 },
  { rainfall: 65, movement: 2.4, size: 70 },
  { rainfall: 95, movement: 3.2, size: 80 },
  { rainfall: 145, movement: 4.2, size: 90 },
  { rainfall: 310, movement: 7.3, size: 120 },
  { rainfall: 380, movement: 8.5, size: 140 },
  { rainfall: 465, movement: 10.1, size: 160 },
  { rainfall: 540, movement: 11.2, size: 180 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3 border-2 border-primary/30 shadow-2xl rounded-lg">
        {label && <p className="font-semibold text-foreground mb-2 text-sm">{label}</p>}
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-bold text-foreground">{entry.value}</span>
            {entry.unit && <span className="text-muted-foreground text-xs">{entry.unit}</span>}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function RiskCharts() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {/* Risk Distribution Pie Chart */}
      <Card className="glass-card border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 group">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
              <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent break-words">
                Risk Distribution
              </CardTitle>
              <CardDescription className="text-xs md:text-sm text-muted-foreground break-words">
                Zones by severity level
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-[280px] md:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <RTooltip content={<CustomTooltip />} />
              <Pie
                data={riskDistribution}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={45}
                paddingAngle={3}
                label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {riskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="hsl(var(--background))" strokeWidth={2} />
                ))}
              </Pie>
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                wrapperStyle={{ paddingTop: "10px", fontSize: "12px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Monthly Events Bar Chart */}
      <Card className="glass-card border-2 border-accent/20 hover:border-accent/40 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10 group">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
              <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg md:text-xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent break-words">
                Monthly Events
              </CardTitle>
              <CardDescription className="text-xs md:text-sm text-muted-foreground break-words">
                Landslide frequency by month
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-[280px] md:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyFrequency} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={colors.chart4} stopOpacity={1} />
                  <stop offset="100%" stopColor={colors.chart4} stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis
                dataKey="month"
                fontSize={11}
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                fontSize={11}
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <RTooltip content={<CustomTooltip />} cursor={{ fill: "hsl(var(--muted))", opacity: 0.2 }} />
              <Bar dataKey="events" fill="url(#barGradient)" name="Events" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Rainfall Impact Line Chart */}
      <Card className="glass-card border-2 border-chart-2/20 hover:border-chart-2/40 transition-all duration-300 hover:shadow-2xl hover:shadow-chart-2/10 group lg:col-span-1">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-chart-2/20 to-chart-2/5 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
              <Droplets className="w-5 h-5 md:w-6 md:h-6 text-chart-2" />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg md:text-xl font-bold bg-gradient-to-r from-chart-2 to-chart-1 bg-clip-text text-transparent break-words">
                Rainfall Impact
              </CardTitle>
              <CardDescription className="text-xs md:text-sm text-muted-foreground break-words">
                Correlation with movement
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-[280px] md:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={rainfallVsMovement} margin={{ left: -20, right: 10, top: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="rainfallGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={colors.chart2} stopOpacity={1} />
                  <stop offset="100%" stopColor={colors.chart1} stopOpacity={1} />
                </linearGradient>
                <linearGradient id="movementGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={colors.high} stopOpacity={1} />
                  <stop offset="100%" stopColor={colors.medium} stopOpacity={1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis
                dataKey="month"
                fontSize={11}
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                yAxisId="left"
                fontSize={11}
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                fontSize={11}
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <Legend wrapperStyle={{ paddingTop: "10px", fontSize: "11px" }} iconType="line" />
              <RTooltip content={<CustomTooltip />} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="rainfall"
                stroke="url(#rainfallGradient)"
                name="Rainfall (mm)"
                strokeWidth={3}
                dot={{ r: 4, fill: colors.chart2, strokeWidth: 2, stroke: "hsl(var(--background))" }}
                activeDot={{ r: 6 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="movement"
                stroke="url(#movementGradient)"
                name="Movement (cm)"
                strokeWidth={3}
                dot={{ r: 4, fill: colors.high, strokeWidth: 2, stroke: "hsl(var(--background))" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Rainfall-Movement Correlation Scatter Chart */}
      <Card className="glass-card border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 group md:col-span-2 lg:col-span-3">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
              <Activity className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg md:text-xl font-bold bg-gradient-to-r from-primary via-accent to-chart-2 bg-clip-text text-transparent break-words">
                Rainfall-Movement Correlation
              </CardTitle>
              <CardDescription className="text-xs md:text-sm text-muted-foreground break-words">
                Strong positive correlation between rainfall intensity and ground movement
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-[300px] md:h-[340px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ left: 10, right: 20, top: 20, bottom: 20 }}>
              <defs>
                <radialGradient id="scatterGradient">
                  <stop offset="0%" stopColor={colors.primary} stopOpacity={1} />
                  <stop offset="100%" stopColor={colors.accent} stopOpacity={0.6} />
                </radialGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis
                type="number"
                dataKey="rainfall"
                name="Rainfall"
                unit="mm"
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                label={{
                  value: "Rainfall (mm)",
                  position: "insideBottom",
                  offset: -10,
                  fill: "hsl(var(--foreground))",
                  fontWeight: 600,
                  fontSize: 12,
                }}
              />
              <YAxis
                type="number"
                dataKey="movement"
                name="Movement"
                unit="cm"
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                label={{
                  value: "Ground Movement (cm)",
                  angle: -90,
                  position: "insideLeft",
                  fill: "hsl(var(--foreground))",
                  fontWeight: 600,
                  fontSize: 12,
                }}
              />
              <ZAxis type="number" dataKey="size" range={[80, 400]} />
              <RTooltip content={<CustomTooltip />} cursor={{ strokeDasharray: "3 3" }} />
              <Scatter data={corrScatter} fill="url(#scatterGradient)" stroke={colors.primary} strokeWidth={2} />
            </ScatterChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </section>
  )
}
