import { useState } from 'react'
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { Zap } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import ChartCard from '../components/ChartCard'
import YearSelector from '../components/YearSelector'
import SortableTable from '../components/SortableTable'
import {
  YEARS, revenue, totalRevenue, enrollment,
  getRevenueStackedData, revenuePerStudent, revenueCategoryColors,
  fmtFull
} from '../data/financialData'

const tooltipStyle = { backgroundColor: '#161B22', border: '1px solid #30363D', borderRadius: '8px' }
const revenueKeys = Object.keys(revenue)

const opportunities = [
  { title: 'Tuition Increase ($1K → $2.5K)', impact: '+$75K/yr (FY27)', roi: '∞ ROI', color: '#39D353', desc: 'Near-zero cost to implement. Sliding scale preserves access.' },
  { title: 'After-School Program', impact: '$30-50K/yr', roi: '300-700% ROI', color: '#58A6FF', desc: '15 students × $200/mo × 10 months. Low incremental cost.' },
  { title: 'Summer Programs', impact: '+$15K/yr', roi: '200%+ ROI', color: '#D29922', desc: 'Use facility during break — $500/student × 30 students.' },
  { title: 'Grant Pipeline Expansion', impact: '+$20-55K/yr', roi: 'Variable', color: '#BC8CFF', desc: 'Double grant revenue by FY29 through dedicated grant writing.' },
  { title: 'Facility Rental', impact: '$6-18K/yr', roi: 'Near-zero cost', color: '#FFA657', desc: 'Weekends to community groups. $500-1,500/month passive.' },
]

export default function RevenueStreams() {
  const [year, setYear] = useState('FY27')

  // Revenue table data
  const tableData = Object.entries(revenue).map(([name, data]) => {
    const row = { name }
    YEARS.forEach(y => { row[y] = data[y] })
    row.pctFY27 = ((data.FY27 / totalRevenue.FY27) * 100).toFixed(1) + '%'
    return row
  })
  const totalRow = { name: 'TOTAL', _highlight: true, pctFY27: '100%' }
  YEARS.forEach(y => { totalRow[y] = totalRevenue[y] })
  const tableWithTotal = [...tableData, totalRow]

  const columns = [
    { key: 'name', label: 'Revenue Source', sortable: true },
    { key: 'pctFY27', label: '% FY27', align: 'right', sortable: false },
    ...YEARS.map(y => ({ key: y, label: y, align: 'right', format: 'currency', sortable: true })),
  ]

  // Concentration donut for selected year
  const concData = Object.entries(revenue).map(([name, data]) => ({
    name,
    value: data[year],
    fill: revenueCategoryColors[name],
  })).filter(d => d.value > 0)

  // Revenue per student trend
  const rpsData = YEARS.map(y => ({
    year: y,
    'Rev/Student': Math.round(revenuePerStudent[y]),
  }))

  return (
    <div>
      <PageHeader title="Revenue Streams" subtitle={`Total Revenue: ${fmtFull(totalRevenue[year])} • 8 sources`}>
        <YearSelector selected={year} onChange={setYear} />
      </PageHeader>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <ChartCard title="Revenue by Source" subtitle="Stacked across fiscal years" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={getRevenueStackedData()}>
              <CartesianGrid strokeDasharray="3 3" stroke="#30363D" />
              <XAxis dataKey="year" stroke="#8B949E" fontSize={12} />
              <YAxis stroke="#8B949E" fontSize={11} tickFormatter={v => `$${(v/1e6).toFixed(1)}M`} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => fmtFull(v)} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              {revenueKeys.map(k => (
                <Bar key={k} dataKey={k} stackId="a" fill={revenueCategoryColors[k]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Revenue Concentration" subtitle={`${year} breakdown`}>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={concData}
                cx="50%" cy="50%"
                innerRadius={50} outerRadius={85}
                dataKey="value" nameKey="name"
                stroke="#0D1117" strokeWidth={2}
              >
                {concData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => fmtFull(v)} />
            </PieChart>
          </ResponsiveContainer>
          <div className="text-center mt-1">
            <span className="text-xs text-accent-red font-medium">
              Medicaid: {((revenue['Medicaid Revenue'][year] / totalRevenue[year]) * 100).toFixed(1)}% of revenue
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1 mt-2">
            {concData.map(c => (
              <div key={c.name} className="flex items-center gap-1.5 text-[10px] text-text-secondary">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: c.fill }} />
                <span className="truncate">{c.name}</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Rev per student trend */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <ChartCard title="Revenue Per Student" subtitle="Decreasing as enrollment scales — expected">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={rpsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#30363D" />
              <XAxis dataKey="year" stroke="#8B949E" fontSize={11} />
              <YAxis stroke="#8B949E" fontSize={11} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} domain={['dataMin - 2000', 'dataMax + 2000']} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => `$${v.toLocaleString()}`} />
              <Line type="monotone" dataKey="Rev/Student" stroke="#39D353" strokeWidth={3} dot={{ r: 5, fill: '#39D353' }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Growth Opportunities */}
        <div className="lg:col-span-2">
          <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
            <Zap size={16} className="text-accent-amber" /> Growth Opportunities
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {opportunities.map((opp, i) => (
              <div key={i} className="card border-l-4" style={{ borderLeftColor: opp.color }}>
                <div className="text-xs font-bold text-text-primary mb-1">{opp.title}</div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold" style={{ color: opp.color }}>{opp.impact}</span>
                  <span className="text-[10px] bg-bg-hover px-1.5 py-0.5 rounded text-text-muted">{opp.roi}</span>
                </div>
                <p className="text-[10px] text-text-muted leading-relaxed">{opp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Table */}
      <ChartCard title="Revenue Detail" subtitle="All sources across FY27-FY31">
        <SortableTable columns={columns} data={tableWithTotal} defaultSort="FY27" />
      </ChartCard>
    </div>
  )
}
