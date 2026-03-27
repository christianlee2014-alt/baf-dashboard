import PageHeader from '../components/PageHeader'

const dataSources = [
  { file: 'School_Pro_Forma_GoogleSheets_Ready.xlsm', desc: '5-year financial model (FY27-FY31) — Inputs, Revenue, Expenses, Summary, Break-Even, Cash Flow', type: 'Excel' },
  { file: 'RGMS Charter Agreement with BAF', desc: 'Charter school management contract — Palm Beach Prep Academy Middle School', type: 'Contract' },
  { file: 'RGBM Private School Management with BAF', desc: 'Private school management contract — Blooming Academy College Prep', type: 'Contract' },
  { file: 'Finance Overview Pro Forma', desc: 'Executive summary of financial projections and strategic priorities', type: 'Summary' },
  { file: 'Academic Strategy Presentation', desc: 'Organizational structure, key staff bios, HR processes', type: 'Presentation' },
]

export default function Settings() {
  return (
    <div className="space-y-6">
      <PageHeader title="Settings & Data Sources" subtitle="Dashboard configuration, data provenance, and export options" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Data Period', value: 'FY27–FY31', sub: 'July 2026 – June 2031' },
          { label: 'Last Updated', value: 'Mar 27, 2026', sub: 'Pro forma model v1.0' },
          { label: 'Dashboard Version', value: 'v1.0', sub: 'Built by Artemis' },
        ].map((card, i) => (
          <div key={i} className="bg-card rounded-xl border border-white/5 p-5">
            <p className="text-xs text-gray-500 uppercase tracking-wider">{card.label}</p>
            <p className="text-2xl font-bold text-white mt-2">{card.value}</p>
            <p className="text-sm text-gray-400 mt-1">{card.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl border border-white/5 overflow-hidden">
        <div className="p-6 pb-3">
          <h3 className="text-lg font-semibold text-white">Data Sources</h3>
          <p className="text-sm text-gray-400">All dashboard figures are derived from these source documents</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-gray-400 font-medium px-6 py-3">Source File</th>
                <th className="text-left text-gray-400 font-medium px-6 py-3">Description</th>
                <th className="text-left text-gray-400 font-medium px-6 py-3">Type</th>
              </tr>
            </thead>
            <tbody>
              {dataSources.map((d, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="px-6 py-3 text-white font-medium">{d.file}</td>
                  <td className="px-6 py-3 text-gray-300">{d.desc}</td>
                  <td className="px-6 py-3"><span className="px-2 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium">{d.type}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-white/5 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Methodology Notes</h3>
        <div className="space-y-3 text-sm text-gray-300">
          <p>• All financial projections are based on the BAF Pro Forma Model (FY27–FY31) with editable assumptions for enrollment, per-student funding, inflation rates, and growth drivers.</p>
          <p>• Break-even analysis uses FY27 cost structure to estimate the enrollment needed to cover fixed costs given per-student economics.</p>
          <p>• RGMS management fees escalate at 10% annually per contract terms. General fixed costs inflate at 3%. Variable per-student costs inflate at 2%.</p>
          <p>• Medicaid revenue is modeled with 5% annual growth, capped at 5%. FTE base funding is $9,000/student. Tuition/parent support is $1,000/student.</p>
          <p>• Strategic recommendations and growth opportunities are analytical projections — actual implementation will require board approval and operational planning.</p>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-white/5 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Organization Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500 uppercase tracking-wider text-xs mb-2">School Operator</p>
            <p className="text-white font-medium">Blooming Academies Foundation, Inc.</p>
            <p className="text-gray-400">Florida 501(c)(3) not-for-profit</p>
            <p className="text-gray-400 mt-2">One East Broward Blvd, Suite 1599</p>
            <p className="text-gray-400">Ft. Lauderdale, FL 33301</p>
          </div>
          <div>
            <p className="text-gray-500 uppercase tracking-wider text-xs mb-2">Management Company</p>
            <p className="text-white font-medium">Royal Global Management Services, LLC</p>
            <p className="text-gray-400">Delaware limited liability company</p>
            <p className="text-gray-400 mt-2">One East Broward Blvd, Suite 1599</p>
            <p className="text-gray-400">Ft. Lauderdale, FL 33301</p>
          </div>
        </div>
      </div>
    </div>
  )
}
