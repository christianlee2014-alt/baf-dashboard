import { useState, useEffect } from 'react'
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { RefreshCw, Cloud, CloudOff, Clock, TrendingUp, DollarSign, Users } from 'lucide-react'
import KPICard from '../components/KPICard'
import PageHeader from '../components/PageHeader'
import ChartCard from '../components/ChartCard'
import { fetchAllSheets } from '../data/sheetsApi'

const fmtK = (v) => v >= 1e6 ? `$${(v/1e6).toFixed(2)}M` : `$${(v/1e3).toFixed(0)}K`
const fmtFull = (v) => `$${v.toLocaleString()}`
const tooltipStyle = { backgroundColor: '#161B22', border: '1px solid #30363D', borderRadius: '8px' }

export default function LiveData() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastRefresh, setLastRefresh] = useState(null)

  const loadData = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await fetchAllSheets()
      setData(result)
      setLastRefresh(new Date())
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadData() }, [])

  const years = ['FY27', 'FY28', 'FY29', 'FY30', 'FY31']

  // Build chart data from live sheets
  const summaryChartData = data ? years.map(fy => ({
    year: fy,
    revenue: data.summary[fy]?.totalRevenue || 0,
    expenses: data.summary[fy]?.totalExpenses || 0,
    surplus: data.summary[fy]?.surplus || 0,
    students: data.summary[fy]?.students || 0,
  })) : []

  return (
    <div>
      <PageHeader
        title="Live Data — Google Sheets"
        subtitle="Real-time data pulled directly from your BAF Pro Forma spreadsheet"
      >
        <button
          onClick={loadData}
          disabled={loading}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            loading
              ? 'bg-bg-hover text-text-muted cursor-not-allowed'
              : 'bg-accent-blue text-white hover:bg-accent-blue/80'
          }`}
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          {loading ? 'Loading...' : 'Refresh Data'}
        </button>
      </PageHeader>

      {/* Connection Status */}
      <div className={`flex items-center gap-3 rounded-card px-4 py-3 mb-6 ${
        error ? 'bg-accent-red/10 border border-accent-red/20' :
        data ? 'bg-accent-green/10 border border-accent-green/20' :
        'bg-accent-blue/10 border border-accent-blue/20'
      }`}>
        {error ? <CloudOff size={18} className="text-accent-red" /> :
         data ? <Cloud size={18} className="text-accent-green" /> :
         <RefreshCw size={18} className="text-accent-blue animate-spin" />}
        <span className={`text-sm font-medium ${
          error ? 'text-accent-red' : data ? 'text-accent-green' : 'text-accent-blue'
        }`}>
          {error ? `Connection Error: ${error}` :
           data ? `Connected to Google Sheets — Last updated: ${lastRefresh?.toLocaleTimeString()}` :
           'Connecting to Google Sheets...'}
        </span>
      </div>

      {data && (
        <>
          {/* Live KPIs for latest year */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
            {years.map(fy => {
              const d = data.summary[fy]
              if (!d) return null
              return (
                <div key={fy} className="bg-bg-card border border-bg-border rounded-card p-4">
                  <div className="text-xs text-text-muted font-semibold mb-2">{fy}</div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-text-muted">Students</span>
                      <span className="text-text-primary font-bold">{d.students}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-text-muted">Revenue</span>
                      <span className="text-accent-green font-bold">{fmtK(d.totalRevenue)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-text-muted">Expenses</span>
                      <span className="text-text-primary font-bold">{fmtK(d.totalExpenses)}</span>
                    </div>
                    <div className="flex justify-between text-xs pt-1 border-t border-bg-border">
                      <span className="text-text-muted">Surplus</span>
                      <span className={`font-bold ${d.surplus > 0 ? 'text-accent-green' : 'text-accent-red'}`}>
                        {fmtK(d.surplus)}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Revenue vs Expenses Chart */}
          <ChartCard title="Revenue vs Expenses (Live)" subtitle="Data pulled directly from Google Sheets">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={summaryChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#30363D" />
                <XAxis dataKey="year" stroke="#8B949E" style={{ fontSize: 12 }} />
                <YAxis stroke="#8B949E" style={{ fontSize: 12 }} tickFormatter={fmtK} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => fmtFull(Math.round(v))} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="revenue" fill="#50C878" name="Total Revenue" />
                <Bar dataKey="expenses" fill="#4A90D9" name="Total Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Surplus Trend */}
          <ChartCard title="Net Surplus Trend (Live)" subtitle="Annual surplus from Google Sheets">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={summaryChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#30363D" />
                <XAxis dataKey="year" stroke="#8B949E" style={{ fontSize: 12 }} />
                <YAxis stroke="#8B949E" style={{ fontSize: 12 }} tickFormatter={fmtK} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => fmtFull(Math.round(v))} />
                <Line type="monotone" dataKey="surplus" stroke="#C9A84C" strokeWidth={3} name="Net Surplus" dot={{ fill: '#C9A84C', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Revenue Breakdown Table */}
          {data.revenue.length > 0 && (
            <div className="bg-bg-card border border-bg-border rounded-card overflow-hidden mb-6">
              <div className="px-5 py-4 border-b border-bg-border">
                <h3 className="text-base font-bold text-text-primary">Revenue Detail (Live from Sheets)</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-bg-border">
                      <th className="text-left px-5 py-3 text-text-muted font-semibold text-xs uppercase tracking-wider">Revenue Line</th>
                      <th className="text-left px-5 py-3 text-text-muted font-semibold text-xs uppercase tracking-wider">Driver</th>
                      {years.map(fy => (
                        <th key={fy} className="text-right px-4 py-3 text-text-muted font-semibold text-xs uppercase tracking-wider">{fy}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.revenue.map((line, i) => (
                      <tr key={i} className="border-b border-bg-border/50 hover:bg-bg-hover/50">
                        <td className="px-5 py-3 text-text-primary font-medium">{line.name}</td>
                        <td className="px-5 py-3 text-text-muted text-xs">{line.driver}</td>
                        {years.map(fy => (
                          <td key={fy} className="px-4 py-3 text-right font-mono text-text-primary">
                            {line[fy] ? fmtFull(Math.round(line[fy])) : '—'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Expense Breakdown Table */}
          {data.expenses.length > 0 && (
            <div className="bg-bg-card border border-bg-border rounded-card overflow-hidden mb-6">
              <div className="px-5 py-4 border-b border-bg-border">
                <h3 className="text-base font-bold text-text-primary">Expense Detail (Live from Sheets)</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-bg-border">
                      <th className="text-left px-5 py-3 text-text-muted font-semibold text-xs uppercase tracking-wider">Expense Line</th>
                      <th className="text-left px-5 py-3 text-text-muted font-semibold text-xs uppercase tracking-wider">Driver</th>
                      {years.map(fy => (
                        <th key={fy} className="text-right px-4 py-3 text-text-muted font-semibold text-xs uppercase tracking-wider">{fy}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.expenses.map((line, i) => (
                      <tr key={i} className="border-b border-bg-border/50 hover:bg-bg-hover/50">
                        <td className="px-5 py-3 text-text-primary font-medium">{line.name}</td>
                        <td className="px-5 py-3 text-text-muted text-xs">{line.driver}</td>
                        {years.map(fy => (
                          <td key={fy} className={`px-4 py-3 text-right font-mono ${line[fy] < 0 ? 'text-accent-green' : 'text-text-primary'}`}>
                            {line[fy] ? fmtFull(Math.round(line[fy])) : '—'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Cash Flow */}
          {data.cashFlow.length > 0 && (
            <ChartCard title="Cash Flow — Cumulative Reserves (Live)" subtitle="Operating surplus accumulation from Google Sheets">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={data.cashFlow}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#30363D" />
                  <XAxis dataKey="year" stroke="#8B949E" style={{ fontSize: 12 }} />
                  <YAxis stroke="#8B949E" style={{ fontSize: 12 }} tickFormatter={fmtK} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v) => fmtFull(Math.round(v))} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="surplus" fill="#50C878" name="Annual Surplus" />
                  <Bar dataKey="cumulative" fill="#C9A84C" name="Cumulative Reserves" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          )}
        </>
      )}
    </div>
  )
}
