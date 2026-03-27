import { useState } from 'react'
import {
  PieChart, Pie, Cell, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { AlertTriangle } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import ChartCard from '../components/ChartCard'
import YearSelector from '../components/YearSelector'
import SortableTable from '../components/SortableTable'
import {
  YEARS, expenses, totalExpenses, enrollment,
  getExpenseCategoryChartData, getTop10Expenses, getFixedVsVariable,
  getRGMSTotals, rgmsFeeItems, categoryColors, fmtFull, fmtPct
} from '../data/financialData'

const tooltipStyle = { backgroundColor: '#161B22', border: '1px solid #30363D', borderRadius: '8px' }

const costLeaks = [
  { title: 'Food Service Net Loss', amount: '-$25,000/yr', detail: 'Revenue covers only 28.6% of costs. BAF subsidizes $500/student/yr in meals.', severity: 'red' },
  { title: 'RGMS Fee Escalation', amount: '10% vs 3% inflation', detail: 'Over 5 years, BAF pays ~$850K in management fees. Excess cost vs CPI: ~$107K.', severity: 'red' },
  { title: 'Postage Costs', amount: '$100/student', detail: '$5,000/yr for 50 students — shift to digital communications.', severity: 'amber' },
  { title: 'Admin Transportation', amount: '$200/student', detail: '$10,000/yr for a single-site school. Implement mileage caps & virtual meetings.', severity: 'amber' },
]

export default function ExpenseBreakdown() {
  const [year, setYear] = useState('FY27')

  // Build table data
  const tableData = Object.entries(expenses).map(([name, data]) => {
    const row = { name, category: data.category }
    YEARS.forEach(y => { row[y] = data[y] })
    return row
  })
  // Add total row
  const totalRow = { name: 'TOTAL', category: '', _highlight: true }
  YEARS.forEach(y => { totalRow[y] = totalExpenses[y] })
  const tableWithTotal = [...tableData, totalRow]

  const columns = [
    { key: 'name', label: 'Line Item', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    ...YEARS.map(y => ({ key: y, label: y, align: 'right', format: 'currency', sortable: true })),
  ]

  const catData = getExpenseCategoryChartData(year)
  const top10 = getTop10Expenses(year)
  const fixVar = getFixedVsVariable(year)
  const rgmsTotals = getRGMSTotals()
  const rgmsChartData = YEARS.map(y => ({ year: y, 'RGMS Fees': rgmsTotals[y] }))

  return (
    <div>
      <PageHeader title="Expense Breakdown" subtitle={`Total: ${fmtFull(totalExpenses[year])} • ${Object.keys(expenses).length} line items`}>
        <YearSelector selected={year} onChange={setYear} />
      </PageHeader>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <ChartCard title="Expense by Category" subtitle={year}>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={catData}
                cx="50%" cy="50%"
                innerRadius={55} outerRadius={90}
                dataKey="value" nameKey="name"
                stroke="#0D1117" strokeWidth={2}
              >
                {catData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => fmtFull(v)} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-1 mt-2">
            {catData.map(c => (
              <div key={c.name} className="flex items-center gap-1.5 text-[10px] text-text-secondary">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: c.fill }} />
                <span className="truncate">{c.name}</span>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Fixed vs Variable" subtitle={year}>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={fixVar}
                cx="50%" cy="50%"
                innerRadius={55} outerRadius={90}
                dataKey="value" nameKey="name"
                stroke="#0D1117" strokeWidth={2}
              >
                {fixVar.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => fmtFull(v)} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-2">
            {fixVar.map(f => (
              <div key={f.name} className="text-center">
                <div className="text-lg font-bold" style={{ color: f.fill }}>{fmtFull(f.value)}</div>
                <div className="text-[10px] text-text-muted">{f.name}</div>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="RGMS Fee Growth" subtitle="10% annual escalation">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={rgmsChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#30363D" />
              <XAxis dataKey="year" stroke="#8B949E" fontSize={11} />
              <YAxis stroke="#8B949E" fontSize={11} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => fmtFull(v)} />
              <Line type="monotone" dataKey="RGMS Fees" stroke="#F85149" strokeWidth={3} dot={{ r: 5, fill: '#F85149' }} />
            </LineChart>
          </ResponsiveContainer>
          <div className="text-center mt-2">
            <span className="text-xs text-accent-red font-medium">5-Year Total: ~$850K</span>
          </div>
        </ChartCard>

        <ChartCard title="Top 10 Expenses" subtitle={year}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={top10} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#30363D" />
              <XAxis type="number" stroke="#8B949E" fontSize={10} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
              <YAxis type="category" dataKey="name" stroke="#8B949E" fontSize={9} width={130} tick={{ fill: '#8B949E' }} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => fmtFull(v)} />
              <Bar dataKey="value" fill="#58A6FF" radius={[0,4,4,0]} barSize={16} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Cost Leak Alerts */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
          <AlertTriangle size={16} className="text-accent-red" /> Cost Leak Alerts
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {costLeaks.map((leak, i) => (
            <div key={i} className={`alert-${leak.severity}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-text-primary">{leak.title}</span>
                <span className={`text-xs font-bold ${leak.severity === 'red' ? 'text-accent-red' : 'text-accent-amber'}`}>
                  {leak.amount}
                </span>
              </div>
              <p className="text-[11px] text-text-muted leading-relaxed">{leak.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Full Expense Table */}
      <ChartCard title="Complete Expense Detail" subtitle="All 46 line items across FY27-FY31 • Click headers to sort">
        <SortableTable columns={columns} data={tableWithTotal} defaultSort="FY27" />
      </ChartCard>
    </div>
  )
}
