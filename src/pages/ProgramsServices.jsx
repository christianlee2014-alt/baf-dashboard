import PageHeader from '../components/PageHeader'

const services = [
  { service: 'Core Academics (ELA, Math, Science, SS)', provider: 'BAF / RGMS', funding: 'FTE + Tuition', status: 'Active' },
  { service: 'Special Education & IEP Services', provider: 'BAF / RGMS', funding: 'IDEA + State', status: 'Active' },
  { service: 'ESL / ESOL Services', provider: 'BAF / RGMS', funding: 'Title III', status: 'Active' },
  { service: 'Clinical Services (Therapy)', provider: 'Dir. of Clinical Services', funding: 'Medicaid', status: 'Active' },
  { service: 'Speech Therapy', provider: 'Contract Provider', funding: 'Medicaid', status: 'Active' },
  { service: 'CTE (Career & Technical Education)', provider: 'BAF', funding: 'Grants + FTE', status: 'Active' },
  { service: 'Food Service', provider: 'Vendor (via RGMS)', funding: 'Fee + Subsidy', status: 'Active' },
  { service: 'Transportation (Bus Passes)', provider: 'Palm Tran / District', funding: 'Per-student budget', status: 'Active' },
]

const leadership = [
  { name: 'Danielle E. Gary', role: 'Director of Clinical Services', focus: 'Trauma-informed care, empowerment model, youth & family services' },
  { name: 'Joanna Mayo', role: 'Director of Administration & HR', focus: 'Compliance, recruitment, onboarding, board liaison' },
]

export default function ProgramsServices() {
  return (
    <div className="space-y-6">
      <PageHeader title="Programs & Services" subtitle="Academic programs, clinical services, and operational support" />

      <div className="bg-card rounded-xl border border-white/5 p-6">
        <h3 className="text-lg font-semibold text-white mb-1">Academic Model</h3>
        <p className="text-sm text-gray-400 mb-4">College Preparatory with integrated clinical/therapeutic support — Medicaid-reimbursable services embedded in the school program.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-background rounded-lg p-4 border border-white/5">
            <p className="text-xs text-gray-500 uppercase tracking-wider">Operator</p>
            <p className="text-white font-medium mt-1">Blooming Academies Foundation</p>
          </div>
          <div className="bg-background rounded-lg p-4 border border-white/5">
            <p className="text-xs text-gray-500 uppercase tracking-wider">Management</p>
            <p className="text-white font-medium mt-1">Royal Global Mgmt Services</p>
          </div>
          <div className="bg-background rounded-lg p-4 border border-white/5">
            <p className="text-xs text-gray-500 uppercase tracking-wider">Contract Term</p>
            <p className="text-white font-medium mt-1">July 2024 – June 2029</p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-white/5 overflow-hidden">
        <div className="p-6 pb-3">
          <h3 className="text-lg font-semibold text-white">Service Inventory</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-gray-400 font-medium px-6 py-3">Service</th>
                <th className="text-left text-gray-400 font-medium px-6 py-3">Provider</th>
                <th className="text-left text-gray-400 font-medium px-6 py-3">Funding Source</th>
                <th className="text-left text-gray-400 font-medium px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="px-6 py-3 text-white">{s.service}</td>
                  <td className="px-6 py-3 text-gray-300">{s.provider}</td>
                  <td className="px-6 py-3 text-gray-300">{s.funding}</td>
                  <td className="px-6 py-3"><span className="px-2 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-medium">{s.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-white/5 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Key Leadership</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {leadership.map((l, i) => (
            <div key={i} className="bg-background rounded-lg p-4 border border-white/5">
              <p className="text-white font-semibold">{l.name}</p>
              <p className="text-blue-400 text-sm">{l.role}</p>
              <p className="text-gray-400 text-sm mt-2">{l.focus}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
