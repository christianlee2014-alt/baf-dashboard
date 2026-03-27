import PageHeader from '../components/PageHeader'

const active = [
  { partner: 'Royal Global Management Services', type: 'Management Company', value: 'Full operations management', status: 'Active', term: '5-year contract (2024-2029)' },
  { partner: 'Palm Beach County School District', type: 'Charter Authorizer', value: 'FTE funding channel', status: 'Active', term: 'Ongoing' },
  { partner: 'Google', type: 'Grant', value: '$10,000 one-time', status: 'FY27 only', term: 'One-time' },
  { partner: 'Palm Beach County', type: 'Grant', value: '$25,000 + 6%/yr', status: 'Active', term: 'Renewable' },
]

const targets = [
  { partner: 'Local Hospitals / Health Systems', type: 'Clinical referrals + sponsorship', value: '$10-25K/yr', priority: 'High' },
  { partner: 'Palm Beach State College', type: 'Dual enrollment', value: 'Brand value', priority: 'Medium' },
  { partner: 'United Way / Community Foundation', type: 'Grant funding', value: '$15-30K/yr', priority: 'High' },
  { partner: 'Local Businesses', type: 'Scholarship sponsorship', value: '$5-15K/yr', priority: 'Medium' },
  { partner: 'FL Dept of Education', type: 'Competitive grants', value: '$20-50K', priority: 'High' },
  { partner: 'Title I Federal', type: 'Federal allocation', value: 'Enrollment-dependent', priority: 'High' },
]

const prioColors = {
  High: 'bg-red-500/10 text-red-400',
  Medium: 'bg-amber-500/10 text-amber-400',
}

export default function PartnershipsOutreach() {
  return (
    <div className="space-y-6">
      <PageHeader title="Partnerships & Outreach" subtitle="Current partnerships and expansion pipeline" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Active Partnerships', value: '4', sub: 'Management, district, grants' },
          { label: 'Grant Revenue (FY27)', value: '$55,000', sub: 'Google + PBC + Other' },
          { label: 'Pipeline Value', value: '$75-175K', sub: '6 target partnerships' },
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
          <h3 className="text-lg font-semibold text-white">Active Partnerships</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-gray-400 font-medium px-6 py-3">Partner</th>
                <th className="text-left text-gray-400 font-medium px-6 py-3">Type</th>
                <th className="text-left text-gray-400 font-medium px-6 py-3">Value</th>
                <th className="text-left text-gray-400 font-medium px-6 py-3">Term</th>
                <th className="text-left text-gray-400 font-medium px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {active.map((a, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="px-6 py-3 text-white font-medium">{a.partner}</td>
                  <td className="px-6 py-3 text-gray-300">{a.type}</td>
                  <td className="px-6 py-3 text-gray-300">{a.value}</td>
                  <td className="px-6 py-3 text-gray-400">{a.term}</td>
                  <td className="px-6 py-3"><span className="px-2 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-medium">{a.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-white/5 overflow-hidden">
        <div className="p-6 pb-3">
          <h3 className="text-lg font-semibold text-white">Target Partnership Pipeline</h3>
          <p className="text-sm text-gray-400">Prioritized opportunities for FY28-31</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-gray-400 font-medium px-6 py-3">Potential Partner</th>
                <th className="text-left text-gray-400 font-medium px-6 py-3">Type</th>
                <th className="text-left text-gray-400 font-medium px-6 py-3">Est. Value</th>
                <th className="text-left text-gray-400 font-medium px-6 py-3">Priority</th>
              </tr>
            </thead>
            <tbody>
              {targets.map((t, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="px-6 py-3 text-white font-medium">{t.partner}</td>
                  <td className="px-6 py-3 text-gray-300">{t.type}</td>
                  <td className="px-6 py-3 text-gray-300">{t.value}</td>
                  <td className="px-6 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${prioColors[t.priority]}`}>{t.priority}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
