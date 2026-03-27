import { useState } from 'react'
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell
} from 'recharts'
import { Users, DollarSign, TrendingDown, AlertTriangle } from 'lucide-react'
import KPICard from '../components/KPICard'
import PageHeader from '../components/PageHeader'
import ChartCard from '../components/ChartCard'
import YearSelector from '../components/YearSelector'
import { YEARS, enrollment, expenses, totalRevenue, fmtFull } from '../data/financialData'

const tooltipStyle = { backgroundColor: '#161B22', border: '1px solid #30363D', borderRadius: '8px' }

// Payroll composition data
const payrollData = YEARS.map(y => {
  const total = expenses['Payroll (modeled)'][y] + (expenses['Startup Payroll (offset)'][y] || 0)
  const fixed = 300000
  const variable = total - fixed
  return {
    year: y,
    'Admin/Leadership (Fixed)': fixed,
    'Instructional (Variable)': Math.max(0, variable),
    total,
    perStudent: Math.round(total / enrollment[y]),
  }
})

const staffCostPerStudent = YEARS.map(y => {
  const totalPayroll = expenses['Payroll (modeled)'][y] + (expenses['Startup Payroll (offset)'][y] || 0)
    + expenses["Workers' Compensation"][y] + expenses['Mgmt Fee - Payroll & HR'][y]
  return {
    year: y,
    'Staffing Cost/Student': Math.round(totalPayroll / enrollment[y]),
    'Target': 10000,
  }
})

const adminSplit = YEARS.map(y => {
  const total = expenses['Payroll (modeled)'][y] + (expenses['Startup Payroll (offset)'][y] || 0)
  const admin = 300000
  const instructional = Math.max(0, total - admin)
  return {
    year: y,
    'Admin %': Math.round((admin / total) * 100),
    'Instructional %': Math.round((instructional / total) * 100),
    admin,
    instructional,
  }
})

const benchmarks = [
  { metric: 'Staffing as % of Revenue', baf: '44.0%', charter: '55-65%', private: '50-60%', status: 'green' },
  { metric: 'Admin as % of Payroll', baf: '56.4%', charter: '25-35%', private: '20-30%', status: 'red' },
  { metric: 'Payroll Cost/Student', baf: '$10,872', charter: '$10-12K', private: '$9-11K', status: 'amber' },
  { metric: 'Student-to-Staff Ratio', baf: 'TBD', charter: '15:1', private: '12:1', status: 'blue' },
]

const recommendations = [
  { title: 'Right-Size Admin Roles', desc: 'Evaluate part-time or shared admin positions. Multi-role hires: attendance + parent comms + light bookkeeping.', phase: 'FY27', impact: 'Reduce admin % from 56% to 40%' },
  { title: 'Hire Instructional Staff Only', desc: 'Every new hire should be classroom-facing. Target 15:1 student-teacher ratio at 75 students.', phase: 'FY28-29', impact: 'Maintain instructional quality' },
  { title: 'Teacher Aides Over Full Teachers', desc: 'Lower-cost support ($25-35K) vs full teachers ($45-55K). Cross-train for multi-subject coverage.', phase: 'FY28-29', impact: '$15-20K savings per position' },
  { title: 'Performance-Based Compensation', desc: 'Tie 10-15% of teacher pay to student outcomes. Promote from within vs external hires for dept heads.', phase: 'FY30-31', impact: 'Better retention + outcomes' },
]

export default function StaffingEfficiency() {
  const [year, setYear] = useState('FY27')
  const yi = YEARS.indexOf(year)
  const pd = payrollData[yi]

  return (
    <div>
      <PageHeader title="Staffing & Efficiency" subtitle="Payroll composition, cost benchmarks, and optimization roadmap">
        <YearSelector selected={year} onChange={setYear} />
      </PageHeader>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <KPICard label="Total Staffing Cost" value={fmtFull(pd.total)} icon={DollarSign}
          status={pd.perStudent < 10000 ? 'green' : 'amber'}
          subtitle={`${((pd.total / totalRevenue[year]) * 100).toFixed(1)}% of revenue`} />
        <KPICard label="Cost/Student" value={`$${pd.perStudent.toLocaleString()}`} icon={Users}
          status={pd.perStudent < 10000 ? 'green' : 'amber'} subtitle="Target: <$10K" />
        <KPICard label="Fixed Payroll" value="$300,000" status="blue" subtitle="Admin/Leadership — no inflation" />
        <KPICard label="Variable Rate" value="$6,059/student" icon={TrendingDown} status="green"
          subtitle="Instructional staff scaling" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <ChartCard title="Payroll Composition" subtitle="Fixed admin vs variable instructional">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={payrollData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#30363D" />
              <XAxis dataKey="year" stroke="#8B949E" fontSize={12} />
              <YAxis stroke="#8B949E" fontSize={11} tickFormatter={v => `$${(v/1e3).toFixed(0)}K`} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => fmtFull(v)} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="Admin/Leadership (Fixed)" stackId="a" fill="#F85149" radius={[0,0,0,0]} />
              <Bar dataKey="Instructional (Variable)" stackId="a" fill="#39D353" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Staffing Cost Per Student" subtitle="Decreasing with scale — targeting <$10K">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={staffCostPerStudent}>
              <CartesianGrid strokeDasharray="3 3" stroke="#30363D" />
              <XAxis dataKey="year" stroke="#8B949E" fontSize={12} />
              <YAxis stroke="#8B949E" fontSize={11} tickFormatter={v => `$${(v/1e3).toFixed(0)}K`} domain={[6000, 14000]} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => `$${v.toLocaleString()}`} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line type="monotone" dataKey="Staffing Cost/Student" stroke="#58A6FF" strokeWidth={3} dot={{ r: 5, fill: '#58A6FF' }} />
              <Line type="monotone" dataKey="Target" stroke="#D29922" strokeDasharray="5 5" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Admin Split + Benchmarks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <ChartCard title="Admin vs Instructional Split" subtitle="Admin-heavy at start — self-corrects at scale">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={adminSplit}>
              <CartesianGrid strokeDasharray="3 3" stroke="#30363D" />
              <XAxis dataKey="year" stroke="#8B949E" fontSize={12} />
              <YAxis stroke="#8B949E" fontSize={11} tickFormatter={v => `${v}%`} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => `${v}%`} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="Admin %" stackId="a" fill="#F85149" radius={[0,0,0,0]} />
              <Bar dataKey="Instructional %" stackId="a" fill="#39D353" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Industry Benchmarks" subtitle="BAF vs charter and private school averages">
          <div className="space-y-3 py-2">
            {benchmarks.map((b, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-bg-primary rounded-lg">
                <div className={`w-2 h-2 rounded-full shrink-0 ${
                  b.status === 'green' ? 'bg-accent-green' : b.status === 'red' ? 'bg-accent-red' : b.status === 'amber' ? 'bg-accent-amber' : 'bg-accent-blue'
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-text-primary">{b.metric}</div>
                  <div className="flex gap-4 mt-0.5 text-[10px] text-text-muted">
                    <span>Charter: {b.charter}</span>
                    <span>Private: {b.private}</span>
                  </div>
                </div>
                <div className={`text-sm font-bold ${
                  b.status === 'green' ? 'text-accent-green' : b.status === 'red' ? 'text-accent-red' : 'text-accent-amber'
                }`}>
                  {b.baf}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 p-3 bg-accent-red/5 border border-accent-red/10 rounded-lg">
            <p className="text-xs text-text-muted">
              <AlertTriangle size={12} className="inline text-accent-red mr-1" />
              Admin at 56.4% of payroll is inverted vs industry (25-35%). Expected at 50 students — self-corrects to 31% at 110.
            </p>
          </div>
        </ChartCard>
      </div>

      {/* Optimization Recommendations */}
      <h3 className="text-sm font-semibold text-text-primary mb-3">Optimization Roadmap</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {recommendations.map((r, i) => (
          <div key={i} className="card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-text-primary">{r.title}</span>
              <span className="text-[10px] bg-accent-blue/10 text-accent-blue px-2 py-0.5 rounded-full font-medium">{r.phase}</span>
            </div>
            <p className="text-[11px] text-text-muted leading-relaxed mb-2">{r.desc}</p>
            <div className="text-[10px] text-accent-green font-medium">{r.impact}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
