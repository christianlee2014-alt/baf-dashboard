import { useState } from 'react'
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { Building2, Users, DollarSign, TrendingUp, MapPin, Calendar } from 'lucide-react'
import KPICard from '../components/KPICard'
import PageHeader from '../components/PageHeader'
import ChartCard from '../components/ChartCard'
import YearSelector from '../components/YearSelector'
import { CAMPUSES, FISCAL_YEARS, calculateCampusFinancials, getConsolidatedFinancials } from '../data/campuses'

const currencyFormatter = (v) => v >= 1e6 ? `$${(v/1e6).toFixed(1)}M` : `$${(v/1e3).toFixed(0)}K`
const tooltipStyle = { backgroundColor: '#161B22', border: '1px solid #30363D', borderRadius: '8px' }

export default function MultiCampusOverview() {
  const [year, setYear] = useState('FY28')
  const consolidated = getConsolidatedFinancials()
  const campusFinancials = {}
  CAMPUSES.forEach(campus => {
    campusFinancials[campus.id] = calculateCampusFinancials(campus)
  })

  const currentData = consolidated[year]
  const activeCampuses = CAMPUSES.filter(c => campusFinancials[c.id][year])

  // Build chart data for all years
  const consolidatedChartData = FISCAL_YEARS.map(fy => {
    const data = consolidated[fy]
    if (!data) return null
    return {
      year: fy,
      revenue: data.totalRevenue,
      expenses: data.totalExpenses,
      surplus: data.surplus,
      students: data.students,
      campuses: data.campusCount,
    }
  }).filter(Boolean)

  // Campus comparison for selected year
  const campusComparisonData = activeCampuses.map(campus => {
    const data = campusFinancials[campus.id][year]
    return {
      name: campus.name.replace(' Campus', '').replace(' (BAF)', ''),
      students: data.students,
      revenue: data.totalRevenue,
      expenses: data.totalExpenses,
      surplus: data.surplus,
      color: campus.color,
    }
  })

  return (
    <div>
      <PageHeader 
        title="Multi-Campus Overview" 
        subtitle="Consolidated financials across all Blooming Academies locations"
      >
        <YearSelector selected={year} onChange={setYear} years={FISCAL_YEARS.filter(fy => consolidated[fy])} />
      </PageHeader>

      {/* Consolidated KPIs */}
      {currentData && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
            <KPICard
              label="Active Campuses"
              value={currentData.campusCount}
              icon={Building2}
              status="green"
              subtitle={currentData.activeCampuses.join(', ')}
            />
            <KPICard
              label="Total Students"
              value={currentData.students.toLocaleString()}
              icon={Users}
              status="green"
              subtitle="Across all locations"
            />
            <KPICard
              label="Total Revenue"
              value={`$${(currentData.totalRevenue / 1e6).toFixed(2)}M`}
              icon={DollarSign}
              status="green"
            />
            <KPICard
              label="Total Expenses"
              value={`$${(currentData.totalExpenses / 1e6).toFixed(2)}M`}
              icon={TrendingUp}
              status={currentData.surplus > 0 ? 'green' : 'red'}
            />
            <KPICard
              label="Net Surplus"
              value={`$${(currentData.surplus / 1e3).toFixed(0)}K`}
              icon={TrendingUp}
              status={currentData.surplus > 0 ? 'green' : 'red'}
              subtitle={`${currentData.surplusMargin}% margin`}
            />
          </div>

          {/* Campus Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            {activeCampuses.map(campus => {
              const data = campusFinancials[campus.id][year]
              return (
                <div key={campus.id} className="bg-bg-card border border-bg-border rounded-card p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-base font-bold text-text-primary mb-1">{campus.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-text-muted">
                        <MapPin size={12} />
                        <span>{campus.location}</span>
                      </div>
                    </div>
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: campus.color }}
                      title={campus.status}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-xs text-text-muted mb-1">Students</div>
                      <div className="text-lg font-bold text-text-primary">{data.students}</div>
                    </div>
                    <div>
                      <div className="text-xs text-text-muted mb-1">Revenue</div>
                      <div className="text-lg font-bold text-accent-green">
                        ${(data.totalRevenue / 1e6).toFixed(2)}M
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-text-muted mb-1">Expenses</div>
                      <div className="text-lg font-bold text-text-primary">
                        ${(data.totalExpenses / 1e6).toFixed(2)}M
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-text-muted mb-1">Surplus</div>
                      <div className={`text-lg font-bold ${data.surplus > 0 ? 'text-accent-green' : 'text-accent-red'}`}>
                        ${(data.surplus / 1e3).toFixed(0)}K
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-bg-border text-xs text-text-muted">
                    Margin: <span className={data.surplus > 0 ? 'text-accent-green' : 'text-accent-red'}>
                      {data.surplusMargin}%
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}

      {/* Consolidated Growth Chart */}
      <ChartCard title="Consolidated Revenue & Expenses" subtitle="All campuses combined">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={consolidatedChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#30363D" />
            <XAxis dataKey="year" stroke="#8B949E" style={{ fontSize: 12 }} />
            <YAxis stroke="#8B949E" style={{ fontSize: 12 }} tickFormatter={currencyFormatter} />
            <Tooltip contentStyle={tooltipStyle} formatter={(v) => `$${(v/1e6).toFixed(2)}M`} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey="revenue" stroke="#50C878" strokeWidth={2} name="Total Revenue" />
            <Line type="monotone" dataKey="expenses" stroke="#4A90D9" strokeWidth={2} name="Total Expenses" />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Campus Comparison */}
      <ChartCard title={`Campus Comparison — ${year}`} subtitle="Revenue, expenses, and surplus by location">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={campusComparisonData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#30363D" />
            <XAxis dataKey="name" stroke="#8B949E" style={{ fontSize: 12 }} />
            <YAxis stroke="#8B949E" style={{ fontSize: 12 }} tickFormatter={currencyFormatter} />
            <Tooltip contentStyle={tooltipStyle} formatter={(v) => `$${(v/1e6).toFixed(2)}M`} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="revenue" fill="#50C878" name="Revenue" />
            <Bar dataKey="expenses" fill="#4A90D9" name="Expenses" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Student Growth */}
      <ChartCard title="Total Student Enrollment Growth" subtitle="Combined enrollment across all campuses">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={consolidatedChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#30363D" />
            <XAxis dataKey="year" stroke="#8B949E" style={{ fontSize: 12 }} />
            <YAxis stroke="#8B949E" style={{ fontSize: 12 }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="students" fill="#C9A84C" name="Total Students" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  )
}
