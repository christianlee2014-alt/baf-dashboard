import { AlertTriangle, TrendingUp, CheckCircle, Clock, Rocket, Shield, ArrowRight } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import ChartCard from '../components/ChartCard'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { fmtFull } from '../data/financialData'

const tooltipStyle = { backgroundColor: '#161B22', border: '1px solid #30363D', borderRadius: '8px' }

const lossAreas = [
  {
    title: 'Food Service Net Loss',
    amount: '-$25,000/yr (FY27)',
    fiveYear: '-$195,000',
    detail: 'Revenue covers only 28.6% of food costs. BAF subsidizes meals at $500/student/year. Grows to -$59,533 by FY31.',
    fixes: ['Apply for National School Lunch Program (NSLP)', 'Renegotiate food vendor contract', 'Increase food fee to $400/student', 'Target: break-even on food by FY29'],
  },
  {
    title: 'RGMS Fee Escalation',
    amount: '10% annual growth',
    fiveYear: '~$107K excess vs CPI',
    detail: 'RGMS fees inflate at 10%/yr (3.3× faster than inflation). By FY31, RGMS takes $204,605 — nearly 10% of revenue. 5-year total: ~$850K.',
    fixes: ['Propose CPI-linked escalator (2.5-3%)', 'Cap total RGMS fees at 8% of revenue', 'Performance-based fee structure', 'In-source key functions at 100+ students'],
  },
  {
    title: 'Zero Reserve Buffer',
    amount: '$27,979 by end FY28',
    fiveYear: 'Existential risk',
    detail: 'FY27 surplus: $26,920 (0.27 months of OpEx). FY28: $1,059. Industry standard: 3-6 months ($300K-$600K). 5 withdrawals = instant deficit.',
    fixes: ['Build emergency line of credit ($25K)', 'Monthly cash flow monitoring', 'Target 55+ students in FY27', 'Accelerate revenue diversification'],
  },
]

const phases = [
  {
    name: 'Survive', timeline: 'FY27 (Months 1-12)', icon: Shield, color: '#F85149',
    goal: 'Reach 55 students, build $50K reserve',
    actions: [
      'Secure 55+ students before July 1',
      'Accelerate Medicaid enrollment — 100% capture',
      'Apply for NSLP to offset food service losses',
      'Increase tuition from $1,000 to $1,500',
      'Establish $25K emergency line of credit',
      'Implement monthly cash flow monitoring',
    ],
  },
  {
    name: 'Stabilize', timeline: 'FY28 (Months 13-24)', icon: Clock, color: '#D29922',
    goal: 'Reach 80 students, achieve 3%+ margin',
    actions: [
      'Launch after-school program ($30K new revenue)',
      'Begin summer program planning',
      'Submit 3+ competitive grant applications',
      'Renegotiate RGMS fee escalator to 5% or CPI',
      'Audit all vendor contracts for savings',
      'Go digital to reduce postage/printing',
    ],
  },
  {
    name: 'Grow', timeline: 'FY29-30 (Months 25-48)', icon: TrendingUp, color: '#58A6FF',
    goal: '95 students, $100K+ reserve, 5% margin',
    actions: [
      'Expand tuition to $2,500-3,000 (sliding scale)',
      'Establish corporate partnership program',
      'Evaluate facility capacity for 110 students',
      'Diversify: no single source >40% of revenue',
      'Build internal grant writing capability',
    ],
  },
  {
    name: 'Scale', timeline: 'FY31+ (Months 49-60)', icon: Rocket, color: '#39D353',
    goal: '110+ students, 8%+ margin, $250K+ reserves',
    actions: [
      'Evaluate second campus or grade expansion',
      'Develop online/hybrid program',
      'Build endowment fund (target $500K by Year 8)',
      'Reduce Medicaid dependency below 35%',
      'Achieve financial independence from RGMS',
    ],
  },
]

const decisions = [
  {
    title: 'Increase Tuition ($1K → $2.5K)',
    revenue: '+$75,000/yr',
    cost: '~$0',
    roi: '∞',
    risk: 'Some families may not afford increase',
    mitigation: 'Sliding scale + scholarship fund',
    verdict: 'DO IT',
    verdictColor: '#39D353',
  },
  {
    title: 'Launch After-School Program',
    revenue: '$30-50K/yr',
    cost: '$5K startup + $15K/yr',
    roi: '300-700%',
    risk: 'Requires part-time staff hiring',
    mitigation: 'Start small, scale with demand',
    verdict: 'STRONG YES',
    verdictColor: '#39D353',
  },
  {
    title: 'Renegotiate RGMS Fee Escalator',
    revenue: '~$107K savings over 5 years',
    cost: 'Negotiation effort',
    roi: 'High',
    risk: 'RGMS may resist',
    mitigation: 'Propose performance-based structure',
    verdict: 'PURSUE FY28',
    verdictColor: '#58A6FF',
  },
  {
    title: 'In-Source RGMS Functions',
    revenue: '$100-150K/yr savings',
    cost: '$80-100K/yr (2 hires)',
    roi: '$20-50K net/yr',
    risk: 'Loss of RGMS expertise',
    mitigation: 'Only viable at 100+ students',
    verdict: 'EVALUATE FY30',
    verdictColor: '#D29922',
  },
]

// What-if scenario data
const scenarioData = [
  { year: 'FY27', 'Current Model': 26920, 'With Tuition Increase': 101920, 'Full Optimization': 171920 },
  { year: 'FY28', 'Current Model': 1059, 'With Tuition Increase': 113559, 'Full Optimization': 264559 },
  { year: 'FY29', 'Current Model': 30878, 'With Tuition Increase': 150878, 'Full Optimization': 312878 },
  { year: 'FY30', 'Current Model': 80292, 'With Tuition Increase': 222792, 'Full Optimization': 414792 },
  { year: 'FY31', 'Current Model': 134643, 'With Tuition Increase': 299643, 'Full Optimization': 531643 },
]

export default function StrategicInsights() {
  return (
    <div>
      <PageHeader title="Strategic Insights" subtitle="Critical analysis — where BAF loses money and how to fix it" />

      {/* CRITICAL BANNER */}
      <div className="bg-accent-red/10 border border-accent-red/20 rounded-card p-4 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle size={18} className="text-accent-red" />
          <span className="text-sm font-bold text-accent-red">THE BIG PICTURE</span>
        </div>
        <p className="text-sm text-text-primary leading-relaxed">
          BAF operates on razor-thin margins with almost zero financial cushion. The model works <em>only if</em> every assumption holds perfectly.
          FY28 is the danger year — $1,059 surplus on $1.5M in expenses means one bad month creates a crisis.
          The path to sustainability is <strong>enrollment scale + revenue diversification + cost discipline</strong>.
        </p>
      </div>

      {/* Money Loss Areas */}
      <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
        <AlertTriangle size={16} className="text-accent-red" /> Where BAF Is Losing Money
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        {lossAreas.map((area, i) => (
          <div key={i} className="alert-red">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-text-primary">{area.title}</span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-lg font-bold text-accent-red">{area.amount}</span>
              <span className="text-[10px] bg-accent-red/10 text-accent-red px-2 py-0.5 rounded-full">5yr: {area.fiveYear}</span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed mb-3">{area.detail}</p>
            <div className="border-t border-bg-border pt-2">
              <span className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">Fixes:</span>
              <ul className="mt-1 space-y-1">
                {area.fixes.map((fix, j) => (
                  <li key={j} className="text-[11px] text-text-secondary flex items-start gap-1.5">
                    <CheckCircle size={10} className="text-accent-green shrink-0 mt-0.5" />
                    {fix}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* 4-Phase Action Plan */}
      <h3 className="text-sm font-semibold text-text-primary mb-3">4-Phase Action Plan</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {phases.map((phase, i) => {
          const Icon = phase.icon
          return (
            <div key={i} className="card border-t-4 relative" style={{ borderTopColor: phase.color }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: phase.color + '15' }}>
                  <Icon size={16} style={{ color: phase.color }} />
                </div>
                <div>
                  <div className="text-sm font-bold text-text-primary">{phase.name}</div>
                  <div className="text-[10px] text-text-muted">{phase.timeline}</div>
                </div>
              </div>
              <div className="text-xs text-accent-blue font-medium mb-3">{phase.goal}</div>
              <ul className="space-y-1.5">
                {phase.actions.map((action, j) => (
                  <li key={j} className="text-[11px] text-text-secondary flex items-start gap-1.5">
                    <span className="text-text-muted mt-0.5">☐</span>
                    {action}
                  </li>
                ))}
              </ul>
              {i < 3 && (
                <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                  <ArrowRight size={16} className="text-text-muted" />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Cost-Benefit Analysis */}
      <h3 className="text-sm font-semibold text-text-primary mb-3">Cost-Benefit Analysis: Key Decisions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {decisions.map((d, i) => (
          <div key={i} className="card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-text-primary">{d.title}</span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: d.verdictColor + '15', color: d.verdictColor }}>
                {d.verdict}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="bg-bg-primary rounded-lg p-2.5">
                <div className="text-[10px] text-text-muted uppercase mb-0.5">Revenue Impact</div>
                <div className="text-sm font-bold text-accent-green">{d.revenue}</div>
              </div>
              <div className="bg-bg-primary rounded-lg p-2.5">
                <div className="text-[10px] text-text-muted uppercase mb-0.5">Cost</div>
                <div className="text-sm font-bold text-text-primary">{d.cost}</div>
              </div>
              <div className="bg-bg-primary rounded-lg p-2.5">
                <div className="text-[10px] text-text-muted uppercase mb-0.5">ROI</div>
                <div className="text-sm font-bold text-accent-blue">{d.roi}</div>
              </div>
              <div className="bg-bg-primary rounded-lg p-2.5">
                <div className="text-[10px] text-text-muted uppercase mb-0.5">Risk</div>
                <div className="text-xs text-text-secondary">{d.risk}</div>
              </div>
            </div>
            <div className="text-[11px] text-text-muted">
              <span className="font-medium text-accent-amber">Mitigation:</span> {d.mitigation}
            </div>
          </div>
        ))}
      </div>

      {/* What-If Scenario */}
      <ChartCard title="What-If Scenario: Revenue Optimization Impact" subtitle="Projected surplus under current model vs. with key interventions">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={scenarioData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#30363D" />
            <XAxis dataKey="year" stroke="#8B949E" fontSize={12} />
            <YAxis stroke="#8B949E" fontSize={11} tickFormatter={v => `$${(v/1e3).toFixed(0)}K`} />
            <Tooltip contentStyle={tooltipStyle} formatter={(v) => fmtFull(v)} />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Bar dataKey="Current Model" fill="#F85149" radius={[4,4,0,0]} />
            <Bar dataKey="With Tuition Increase" fill="#D29922" radius={[4,4,0,0]} />
            <Bar dataKey="Full Optimization" fill="#39D353" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-3 p-3 bg-accent-green/5 border border-accent-green/10 rounded-lg">
          <p className="text-xs text-text-secondary">
            <strong className="text-accent-green">Full Optimization</strong> includes: tuition increase ($1K→$3K), after-school programs, summer programs, grant expansion, and facility rental.
            Projected FY31 surplus: <strong className="text-accent-green">$531K</strong> vs current model <strong className="text-accent-red">$135K</strong>.
          </p>
        </div>
      </ChartCard>
    </div>
  )
}
