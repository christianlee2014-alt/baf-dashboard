import { useState } from 'react'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine, Legend
} from 'recharts'
import { Users, Target, TrendingUp, Zap } from 'lucide-react'
import KPICard from '../components/KPICard'
import PageHeader from '../components/PageHeader'
import ChartCard from '../components/ChartCard'
import { YEARS, enrollment, breakEvenStudents, getEnrollmentChartData, fmtFull } from '../data/financialData'

const tooltipStyle = { backgroundColor: '#161B22', border: '1px solid #30363D', borderRadius: '8px' }

const funnelStages = [
  { stage: 'Awareness', count: 500, pct: '100%', color: '#58A6FF' },
  { stage: 'Interest', count: 150, pct: '30%', color: '#BC8CFF' },
  { stage: 'Application', count: 80, pct: '53%', color: '#D29922' },
  { stage: 'Acceptance', count: 65, pct: '81%', color: '#39D353' },
  { stage: 'Enrollment', count: 55, pct: '85%', color: '#39D353' },
]

const growthData = [
  { year: 'FY27', Students: 50, New: 50, growth: 'Baseline' },
  { year: 'FY28', Students: 75, New: 25, growth: '+50%' },
  { year: 'FY29', Students: 80, New: 5, growth: '+6.7%' },
  { year: 'FY30', Students: 95, New: 15, growth: '+18.8%' },
  { year: 'FY31', Students: 110, New: 15, growth: '+15.8%' },
]

export default function EnrollmentGrowth() {
  return (
    <div>
      <PageHeader title="Enrollment & Growth" subtitle="Student acquisition pipeline, break-even analysis, and growth trajectory" />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <KPICard label="Cost Per Enrollment" value="$685" icon={Target} status="green" subtitle="Per new student" />
        <KPICard label="Lifetime Value" value="$98,916" icon={TrendingUp} status="green" subtitle="4-year × $24,729" />
        <KPICard label="LTV:CAC Ratio" value="144:1" icon={Zap} status="green" subtitle="Excellent — invest more" />
        <KPICard label="Payback Period" value="<1 month" icon={Users} status="green" subtitle="$15,228 contribution/student" />
      </div>

      {/* Enrollment Trajectory + Break-Even */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <ChartCard title="Enrollment Trajectory" subtitle="Students enrolled with break-even reference" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={getEnrollmentChartData()}>
              <defs>
                <linearGradient id="enrollGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#58A6FF" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#58A6FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#30363D" />
              <XAxis dataKey="year" stroke="#8B949E" fontSize={12} />
              <YAxis stroke="#8B949E" fontSize={11} domain={[0, 130]} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <ReferenceLine y={breakEvenStudents} stroke="#F85149" strokeDasharray="5 5" label={{ value: `Break-Even (${breakEvenStudents})`, position: 'right', fill: '#F85149', fontSize: 11 }} />
              <Area type="monotone" dataKey="Students" stroke="#58A6FF" fill="url(#enrollGrad)" strokeWidth={3} dot={{ r: 6, fill: '#58A6FF', stroke: '#0D1117', strokeWidth: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Break-Even Gauge */}
        <ChartCard title="Break-Even Analysis" subtitle="49 students needed to cover fixed costs">
          <div className="flex flex-col items-center justify-center h-[280px]">
            {/* Simple gauge visualization */}
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Background ring */}
                <circle cx="100" cy="100" r="80" fill="none" stroke="#30363D" strokeWidth="16" strokeDasharray="502" strokeDashoffset="125" transform="rotate(135 100 100)" />
                {/* Break-even mark */}
                <circle cx="100" cy="100" r="80" fill="none" stroke="#F85149" strokeWidth="16"
                  strokeDasharray={`${(49/130)*377} ${377 - (49/130)*377}`} strokeDashoffset="125" transform="rotate(135 100 100)" opacity="0.3" />
                {/* Current enrollment */}
                {YEARS.map((y, i) => {
                  const pct = enrollment[y] / 130
                  return null // We'll show FY27 by default
                })}
                <circle cx="100" cy="100" r="80" fill="none" stroke="#39D353" strokeWidth="16"
                  strokeDasharray={`${(110/130)*377} ${377 - (110/130)*377}`} strokeDashoffset="125" transform="rotate(135 100 100)" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-accent-green">110</span>
                <span className="text-xs text-text-muted">FY31 Target</span>
              </div>
            </div>
            <div className="flex gap-6 mt-4">
              <div className="text-center">
                <div className="text-lg font-bold text-accent-red">49</div>
                <div className="text-[10px] text-text-muted">Break-Even</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-accent-amber">50</div>
                <div className="text-[10px] text-text-muted">FY27 (1 buffer)</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-accent-green">110</div>
                <div className="text-[10px] text-text-muted">FY31 Target</div>
              </div>
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Enrollment Funnel + Growth Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Enrollment Funnel" subtitle="Awareness → Enrollment conversion: 11%">
          <div className="space-y-3 py-4">
            {funnelStages.map((s, i) => {
              const width = (s.count / 500) * 100
              return (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-text-primary">{s.stage}</span>
                    <span className="text-xs text-text-muted">{s.count} ({s.pct})</span>
                  </div>
                  <div className="h-8 bg-bg-primary rounded-lg overflow-hidden">
                    <div
                      className="h-full rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-500"
                      style={{ width: `${width}%`, backgroundColor: s.color + '40', borderLeft: `3px solid ${s.color}` }}
                    >
                      {s.count}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-2 p-3 bg-bg-primary rounded-lg">
            <p className="text-xs text-text-muted">
              <span className="text-accent-amber font-medium">Key Drop-off:</span> Interest → Application (53%) — streamline application process, offer same-day decisions.
            </p>
          </div>
        </ChartCard>

        <ChartCard title="Year-over-Year Growth" subtitle="New students needed each year">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#30363D" />
              <XAxis dataKey="year" stroke="#8B949E" fontSize={12} />
              <YAxis stroke="#8B949E" fontSize={11} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="Students" fill="#58A6FF" radius={[4,4,0,0]} />
              <Bar dataKey="New" fill="#39D353" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-3 space-y-2">
            {growthData.map(d => (
              <div key={d.year} className="flex items-center justify-between text-xs">
                <span className="text-text-secondary">{d.year}</span>
                <span className="font-medium text-text-primary">{d.Students} students</span>
                <span className="text-accent-blue font-medium">{d.growth}</span>
                <span className="text-text-muted">+{d.New} new</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  )
}
