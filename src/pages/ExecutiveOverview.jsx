import { useState } from 'react'
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine
} from 'recharts'
import { DollarSign, Users, TrendingUp, AlertTriangle, Percent } from 'lucide-react'
import KPICard from '../components/KPICard'
import HealthBadge from '../components/HealthBadge'
import PageHeader from '../components/PageHeader'
import ChartCard from '../components/ChartCard'
import YearSelector from '../components/YearSelector'
import {
  YEARS, enrollment, totalRevenue, totalExpenses, netSurplus,
  surplusMargin, breakEvenStudents, revenuePerStudent, expensePerStudent,
  getRevExpChartData, getSurplusMarginChartData, getCashFlowChartData,
  getHealthIndicators, fmtFull, fmtPct
} from '../data/financialData'

const currencyFormatter = (v) => v >= 1e6 ? `$${(v/1e6).toFixed(1)}M` : `$${(v/1e3).toFixed(0)}K`
const tooltipStyle = { backgroundColor: '#161B22', border: '1px solid #30363D', borderRadius: '8px' }

export default function ExecutiveOverview() {
  const [year, setYear] = useState('FY27')
  const health = getHealthIndicators(year)
  const yi = YEARS.indexOf(year)
  const prevYear = yi > 0 ? YEARS[yi - 1] : null

  const revTrend = prevYear ? ((totalRevenue[year] - totalRevenue[prevYear]) / totalRevenue[prevYear] * 100) : null
  const expTrend = prevYear ? ((totalExpenses[year] - totalExpenses[prevYear]) / totalExpenses[prevYear] * 100) : null

  return (
    <div>
      <PageHeader title="Executive Overview" subtitle="Blooming Academies Foundation — 5-Year Financial Dashboard">
        <YearSelector selected={year} onChange={setYear} />
      </PageHeader>

      {/* Critical Alert Banner */}
      {surplusMargin[year] < 1 && (
        <div className="flex items-center gap-3 bg-accent-red/10 border border-accent-red/20 rounded-card px-4 py-3 mb-6">
          <AlertTriangle size={18} className="text-accent-red shrink-0" />
          <span className="text-sm text-accent-red font-medium">
            Critical: {year} surplus margin at {fmtPct(surplusMargin[year])} — near break-even. Immediate action required.
          </span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 mb-6">
        <KPICard
          label="Total Revenue"
          value={fmtFull(totalRevenue[year])}
          icon={TrendingUp}
          status={revTrend > 0 ? 'green' : 'amber'}
          trend={revTrend > 0 ? 'up' : revTrend < 0 ? 'down' : null}
          trendValue={revTrend !== null ? `${revTrend.toFixed(1)}%` : null}
          subtitle={prevYear ? `vs ${prevYear}` : 'Baseline'}
        />
        <KPICard
          label="Total Expenses"
          value={fmtFull(totalExpenses[year])}
          icon={DollarSign}
          status={expTrend < 3 ? 'green' : 'amber'}
          trend={expTrend > 0 ? 'up' : 'down'}
          trendValue={expTrend !== null ? `${expTrend.toFixed(1)}%` : null}
          subtitle={prevYear ? `vs ${prevYear}` : 'Baseline'}
        />
        <KPICard
          label="Net Surplus"
          value={fmtFull(netSurplus[year])}
          status={netSurplus[year] > 50000 ? 'green' : netSurplus[year] > 10000 ? 'amber' : 'red'}
          subtitle={`${fmtPct(surplusMargin[year])} margin`}
        />
        <KPICard
          label="Surplus Margin"
          value={fmtPct(surplusMargin[year])}
          icon={Percent}
          status={surplusMargin[year] >= 5 ? 'green' : surplusMargin[year] >= 3 ? 'amber' : 'red'}
          subtitle="Target: >5%"
        />
        <KPICard
          label="Students"
          value={enrollment[year]}
          icon={Users}
          status={enrollment[year] > 80 ? 'green' : enrollment[year] > 55 ? 'amber' : 'red'}
          subtitle={`Break-even: ${breakEvenStudents}`}
        />
        <KPICard
          label="Break-Even"
          value={`${breakEvenStudents} students`}
          status={enrollment[year] - breakEvenStudents > 5 ? 'green' : 'red'}
          subtitle={`Buffer: ${enrollment[year] - breakEvenStudents}`}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <ChartCard title="Revenue vs Expenses" subtitle="Annual comparison across all fiscal years">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={getRevExpChartData()} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#30363D" />
              <XAxis dataKey="year" stroke="#8B949E" fontSize={12} />
              <YAxis stroke="#8B949E" fontSize={11} tickFormatter={currencyFormatter} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => fmtFull(v)} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="Revenue" fill="#39D353" radius={[4,4,0,0]} />
              <Bar dataKey="Expenses" fill="#F85149" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Surplus Margin Trend" subtitle="Operating margin with 5% target line">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={getSurplusMarginChartData()}>
              <CartesianGrid strokeDasharray="3 3" stroke="#30363D" />
              <XAxis dataKey="year" stroke="#8B949E" fontSize={12} />
              <YAxis stroke="#8B949E" fontSize={11} tickFormatter={v => `${v}%`} domain={[0, 8]} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => `${v}%`} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <ReferenceLine y={5} stroke="#D29922" strokeDasharray="5 5" label={{ value: '5% Target', position: 'right', fill: '#D29922', fontSize: 11 }} />
              <Line type="monotone" dataKey="Surplus Margin" stroke="#58A6FF" strokeWidth={3} dot={{ r: 5, fill: '#58A6FF' }} activeDot={{ r: 7 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Cash Flow + Health */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <ChartCard title="Cash Flow & Reserves" subtitle="Building financial cushion over time" className="lg:col-span-3">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={getCashFlowChartData()}>
              <defs>
                <linearGradient id="reservesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#58A6FF" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#58A6FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#30363D" />
              <XAxis dataKey="year" stroke="#8B949E" fontSize={12} />
              <YAxis stroke="#8B949E" fontSize={11} tickFormatter={currencyFormatter} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => fmtFull(v)} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Area type="monotone" dataKey="Cumulative Reserves" stroke="#58A6FF" fill="url(#reservesGrad)" strokeWidth={2} />
              <Bar dataKey="Annual Surplus" fill="#39D353" radius={[4,4,0,0]} barSize={30} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <div className="lg:col-span-2">
          <ChartCard title="Health Indicators" subtitle={`Status for ${year}`}>
            <div className="space-y-2">
              {health.map((h, i) => (
                <HealthBadge key={i} {...h} />
              ))}
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  )
}
