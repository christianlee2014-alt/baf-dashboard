import PageHeader from '../components/PageHeader'

const metrics = [
  { metric: 'Students Served', current: '50', target: '80 (FY29)', status: 'track' },
  { metric: '% Free/Reduced Lunch Eligible', current: 'TBD', target: 'Establish baseline', status: 'setup' },
  { metric: 'Families in Community Served', current: '~50', target: '~80', status: 'track' },
  { metric: 'Clinical Service Hours/Month', current: 'TBD', target: 'Track monthly', status: 'setup' },
  { metric: 'IEP Students Supported', current: 'TBD', target: 'Track', status: 'setup' },
  { metric: 'Community Events Hosted', current: '0', target: '4/year', status: 'action' },
  { metric: 'Volunteer Hours', current: '0', target: '200/year', status: 'action' },
  { metric: 'Local Partnerships Active', current: 'TBD', target: '10+', status: 'action' },
]

const statusColors = {
  track: 'bg-blue-500/10 text-blue-400',
  setup: 'bg-amber-500/10 text-amber-400',
  action: 'bg-red-500/10 text-red-400',
}

const statusLabels = {
  track: 'Tracking',
  setup: 'Needs Setup',
  action: 'Action Required',
}

export default function CommunityImpact() {
  return (
    <div className="space-y-6">
      <PageHeader title="Community Impact" subtitle="Measuring BAF's reach and influence in the community" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Students Served', value: '50', sub: 'FY27 enrollment' },
          { label: 'Clinical Programs', value: '2', sub: 'Therapy + Speech' },
          { label: 'Community Events', value: '0', sub: 'Target: 4/year' },
          { label: 'Active Partnerships', value: '4', sub: 'RGMS, District, Google, PBC' },
        ].map((card, i) => (
          <div key={i} className="bg-card rounded-xl border border-white/5 p-5">
            <p className="text-xs text-gray-500 uppercase tracking-wider">{card.label}</p>
            <p className="text-3xl font-bold text-white mt-2">{card.value}</p>
            <p className="text-sm text-gray-400 mt-1">{card.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl border border-white/5 overflow-hidden">
        <div className="p-6 pb-3">
          <h3 className="text-lg font-semibold text-white">Impact Metrics Dashboard</h3>
          <p className="text-sm text-gray-400">Track progress toward community engagement goals</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-gray-400 font-medium px-6 py-3">Metric</th>
                <th className="text-left text-gray-400 font-medium px-6 py-3">Current</th>
                <th className="text-left text-gray-400 font-medium px-6 py-3">Target (FY29)</th>
                <th className="text-left text-gray-400 font-medium px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {metrics.map((m, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="px-6 py-3 text-white font-medium">{m.metric}</td>
                  <td className="px-6 py-3 text-gray-300">{m.current}</td>
                  <td className="px-6 py-3 text-gray-300">{m.target}</td>
                  <td className="px-6 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[m.status]}`}>
                      {statusLabels[m.status]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-white/5 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Impact Narrative — Quarterly Reporting Framework</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: 'Clinical Outcomes', desc: 'Students receiving clinical services who showed behavioral improvement' },
            { title: 'Academic Growth', desc: 'Growth percentile vs Palm Beach County district average' },
            { title: 'Parent Satisfaction', desc: 'Quarterly NPS survey scores — target 50+' },
            { title: 'Staff Retention', desc: 'Retention rate vs county average for similar schools' },
          ].map((item, i) => (
            <div key={i} className="bg-background rounded-lg p-4 border border-white/5">
              <p className="text-white font-semibold">{item.title}</p>
              <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
