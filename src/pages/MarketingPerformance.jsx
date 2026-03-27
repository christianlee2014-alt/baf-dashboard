import PageHeader from '../components/PageHeader'
import ChartCard from '../components/ChartCard'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const budgetAllocation = [
  { name: 'RGMS Recruit & Retention', value: 21249, color: '#58A6FF' },
  { name: 'Digital Marketing', value: 10000, color: '#39D353' },
  { name: 'Promotional Items', value: 3000, color: '#D29922' },
]

const channels = [
  { platform: 'Website', metric: 'Monthly Visitors', target: '500+', frequency: 'Weekly' },
  { platform: 'Website', metric: 'Inquiry Submissions', target: '20/month', frequency: 'Weekly' },
  { platform: 'Facebook', metric: 'Page Followers', target: '500+', frequency: 'Monthly' },
  { platform: 'Facebook', metric: 'Engagement Rate', target: '>5%', frequency: 'Weekly' },
  { platform: 'Instagram', metric: 'Followers', target: '300+', frequency: 'Monthly' },
  { platform: 'Instagram', metric: 'Story Views', target: '100+ avg', frequency: 'Weekly' },
  { platform: 'Google Ads', metric: 'Cost per Lead', target: '<$25', frequency: 'Monthly' },
  { platform: 'Referrals', metric: 'New Students', target: '10/year', frequency: 'Quarterly' },
]

const fmt = (v) => '$' + v.toLocaleString()

export default function MarketingPerformance() {
  return (
    <div className="space-y-6">
      <PageHeader title="Marketing & Social Media" subtitle="Channel performance, budget allocation, and ROI tracking" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Marketing Budget', value: '$34,249', sub: 'FY27' },
          { label: 'Cost Per Enrolled Student', value: '$685', sub: '50 students' },
          { label: 'LTV per Student', value: '$98,916', sub: '4-year average' },
          { label: 'Marketing ROI', value: '3,510%', sub: 'Revenue / Marketing Cost' },
        ].map((card, i) => (
          <div key={i} className="bg-card rounded-xl border border-white/5 p-5">
            <p className="text-xs text-gray-500 uppercase tracking-wider">{card.label}</p>
            <p className="text-3xl font-bold text-white mt-2">{card.value}</p>
            <p className="text-sm text-gray-400 mt-1">{card.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Budget Allocation (FY27)" subtitle="$34,249 total marketing spend">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={budgetAllocation} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {budgetAllocation.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={fmt} contentStyle={{ background: '#161B22', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#F0F6FC' }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <div className="bg-card rounded-xl border border-white/5 p-6">
          <h3 className="text-lg font-semibold text-white mb-1">ROI Breakdown</h3>
          <p className="text-sm text-gray-400 mb-4">Every $1 spent on marketing generates $36 in revenue</p>
          <div className="space-y-3">
            <div className="bg-background rounded-lg p-3 border border-white/5">
              <div className="flex justify-between"><span className="text-gray-400">Total Spend</span><span className="text-white font-semibold">$34,249</span></div>
            </div>
            <div className="bg-background rounded-lg p-3 border border-white/5">
              <div className="flex justify-between"><span className="text-gray-400">Students Enrolled</span><span className="text-white font-semibold">50</span></div>
            </div>
            <div className="bg-background rounded-lg p-3 border border-white/5">
              <div className="flex justify-between"><span className="text-gray-400">Cost per Enrollment</span><span className="text-white font-semibold">$685</span></div>
            </div>
            <div className="bg-background rounded-lg p-3 border border-white/5">
              <div className="flex justify-between"><span className="text-gray-400">Revenue per Student</span><span className="text-white font-semibold">$24,729</span></div>
            </div>
            <div className="bg-background rounded-lg p-3 border border-green-500/20">
              <div className="flex justify-between"><span className="text-green-400 font-medium">LTV:CAC Ratio</span><span className="text-green-400 font-bold">144:1</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-white/5 overflow-hidden">
        <div className="p-6 pb-3">
          <h3 className="text-lg font-semibold text-white">Channel Performance Targets</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-gray-400 font-medium px-6 py-3">Platform</th>
                <th className="text-left text-gray-400 font-medium px-6 py-3">Metric</th>
                <th className="text-left text-gray-400 font-medium px-6 py-3">FY27 Target</th>
                <th className="text-left text-gray-400 font-medium px-6 py-3">Tracking</th>
              </tr>
            </thead>
            <tbody>
              {channels.map((c, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="px-6 py-3 text-white font-medium">{c.platform}</td>
                  <td className="px-6 py-3 text-gray-300">{c.metric}</td>
                  <td className="px-6 py-3 text-gray-300">{c.target}</td>
                  <td className="px-6 py-3 text-gray-400">{c.frequency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
