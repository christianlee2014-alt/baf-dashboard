import { Calendar, Building2, Users, ArrowRight, CheckCircle2, Clock, MapPin } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import ChartCard from '../components/ChartCard'
import { CAMPUSES, FISCAL_YEARS, calculateCampusFinancials, getConsolidatedFinancials } from '../data/campuses'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'

const tooltipStyle = { backgroundColor: '#161B22', border: '1px solid #30363D', borderRadius: '8px' }

export default function ExpansionTimeline() {
  const campusFinancials = {}
  CAMPUSES.forEach(campus => {
    campusFinancials[campus.id] = calculateCampusFinancials(campus)
  })
  const consolidated = getConsolidatedFinancials()

  // Stacked enrollment data
  const enrollmentStackedData = FISCAL_YEARS.filter(fy => consolidated[fy]).map(fy => {
    const row = { year: fy }
    CAMPUSES.forEach(campus => {
      const data = campusFinancials[campus.id][fy]
      row[campus.id] = data ? data.students : 0
    })
    row.total = CAMPUSES.reduce((sum, c) => sum + (campusFinancials[c.id][fy]?.students || 0), 0)
    return row
  })

  // Stacked revenue data
  const revenueStackedData = FISCAL_YEARS.filter(fy => consolidated[fy]).map(fy => {
    const row = { year: fy }
    CAMPUSES.forEach(campus => {
      const data = campusFinancials[campus.id][fy]
      row[campus.id] = data ? data.totalRevenue : 0
    })
    return row
  })

  // Cumulative surplus
  let cumulativeSurplus = 0
  const surplusData = FISCAL_YEARS.filter(fy => consolidated[fy]).map(fy => {
    cumulativeSurplus += consolidated[fy].surplus
    return {
      year: fy,
      annual: consolidated[fy].surplus,
      cumulative: cumulativeSurplus,
    }
  })

  return (
    <div>
      <PageHeader
        title="Expansion Timeline"
        subtitle="Campus launch schedule and multi-location growth roadmap"
      />

      {/* Timeline */}
      <div className="relative mb-8">
        {/* Connecting line */}
        <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-bg-border hidden lg:block" />
        
        <div className="space-y-6">
          {CAMPUSES.map((campus, idx) => {
            const isLaunched = true // all planned campuses shown
            const financials = campusFinancials[campus.id]
            const launchData = financials[campus.launchYear]
            const latestFY = FISCAL_YEARS.filter(fy => financials[fy]).pop()
            const latestData = financials[latestFY]

            return (
              <div key={campus.id} className="relative flex gap-4 lg:gap-6">
                {/* Timeline dot */}
                <div className="hidden lg:flex flex-col items-center pt-1">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-2"
                    style={{
                      backgroundColor: `${campus.color}15`,
                      borderColor: campus.color,
                    }}
                  >
                    <Building2 size={20} style={{ color: campus.color }} />
                  </div>
                </div>

                {/* Card */}
                <div className="flex-1 bg-bg-card border border-bg-border rounded-card p-5 hover:border-opacity-60 transition-all"
                  style={{ borderLeftColor: campus.color, borderLeftWidth: '3px' }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-text-primary">{campus.name}</h3>
                        <span
                          className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider"
                          style={{
                            backgroundColor: `${campus.color}20`,
                            color: campus.color,
                          }}
                        >
                          {campus.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-text-muted">
                        <span className="flex items-center gap-1"><MapPin size={12} /> {campus.location}</span>
                        <span className="flex items-center gap-1"><Calendar size={12} /> Launch: {campus.launchYear}</span>
                      </div>
                    </div>
                  </div>

                  {/* Year-by-year breakdown */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {FISCAL_YEARS.map(fy => {
                      const data = financials[fy]
                      if (!data) return null
                      const yearsFromLaunch = FISCAL_YEARS.indexOf(fy) - FISCAL_YEARS.indexOf(campus.launchYear)
                      return (
                        <div key={fy} className="bg-bg-hover rounded-lg p-3">
                          <div className="text-xs text-text-muted mb-1 flex items-center justify-between">
                            <span>{fy}</span>
                            {yearsFromLaunch === 0 && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent-green/20 text-accent-green">LAUNCH</span>
                            )}
                          </div>
                          <div className="text-sm font-bold text-text-primary flex items-center gap-1">
                            <Users size={12} className="text-text-muted" /> {data.students}
                          </div>
                          <div className="text-xs text-accent-green mt-1">
                            ${(data.totalRevenue / 1e6).toFixed(2)}M rev
                          </div>
                          <div className={`text-xs mt-0.5 ${data.surplus > 0 ? 'text-accent-green' : 'text-accent-red'}`}>
                            ${(data.surplus / 1e3).toFixed(0)}K surplus
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Stacked Enrollment Chart */}
      <ChartCard title="Enrollment Growth by Campus" subtitle="Stacked view of student growth across all locations">
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={enrollmentStackedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#30363D" />
            <XAxis dataKey="year" stroke="#8B949E" style={{ fontSize: 12 }} />
            <YAxis stroke="#8B949E" style={{ fontSize: 12 }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            {CAMPUSES.map(campus => (
              <Area
                key={campus.id}
                type="monotone"
                dataKey={campus.id}
                stackId="1"
                fill={campus.color}
                stroke={campus.color}
                fillOpacity={0.6}
                name={campus.name}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Stacked Revenue Chart */}
      <ChartCard title="Revenue Growth by Campus" subtitle="Combined revenue trajectory across all locations">
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={revenueStackedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#30363D" />
            <XAxis dataKey="year" stroke="#8B949E" style={{ fontSize: 12 }} />
            <YAxis
              stroke="#8B949E"
              style={{ fontSize: 12 }}
              tickFormatter={(v) => v >= 1e6 ? `$${(v/1e6).toFixed(1)}M` : `$${(v/1e3).toFixed(0)}K`}
            />
            <Tooltip contentStyle={tooltipStyle} formatter={(v) => `$${(v/1e6).toFixed(2)}M`} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            {CAMPUSES.map(campus => (
              <Area
                key={campus.id}
                type="monotone"
                dataKey={campus.id}
                stackId="1"
                fill={campus.color}
                stroke={campus.color}
                fillOpacity={0.6}
                name={campus.name}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Cumulative Surplus */}
      <ChartCard title="Cumulative Surplus Trajectory" subtitle="Combined reserves across all campuses over time">
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={surplusData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#30363D" />
            <XAxis dataKey="year" stroke="#8B949E" style={{ fontSize: 12 }} />
            <YAxis
              stroke="#8B949E"
              style={{ fontSize: 12 }}
              tickFormatter={(v) => `$${(v/1e3).toFixed(0)}K`}
            />
            <Tooltip contentStyle={tooltipStyle} formatter={(v) => `$${(v/1e3).toFixed(0)}K`} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Area type="monotone" dataKey="cumulative" fill="#C9A84C" stroke="#C9A84C" fillOpacity={0.3} name="Cumulative Reserves" />
            <Area type="monotone" dataKey="annual" fill="#50C878" stroke="#50C878" fillOpacity={0.3} name="Annual Surplus" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  )
}
