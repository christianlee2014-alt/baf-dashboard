import PageHeader from '../components/PageHeader'

const academic = [
  { metric: 'ELA Proficiency Rate', baseline: 'Establish', fy29: '+10 pts', fy31: '+20 pts' },
  { metric: 'Math Proficiency Rate', baseline: 'Establish', fy29: '+10 pts', fy31: '+20 pts' },
  { metric: 'Science Proficiency Rate', baseline: 'Establish', fy29: '+10 pts', fy31: '+20 pts' },
  { metric: 'Average GPA', baseline: 'Establish', fy29: '2.8+', fy31: '3.0+' },
  { metric: 'Students At/Above Grade Level', baseline: 'Establish', fy29: '60%+', fy31: '75%+' },
]

const retention = [
  { metric: 'Annual Retention Rate', target: '90%+', status: 'target' },
  { metric: 'Daily Attendance Rate', target: '95%+', status: 'target' },
  { metric: 'Chronic Absenteeism Rate', target: '<10%', status: 'target' },
  { metric: 'Suspension Rate', target: '<5%', status: 'target' },
  { metric: 'Parent Satisfaction (NPS)', target: '50+', status: 'target' },
]

const clinical = [
  { metric: 'Students Receiving Clinical Services', target: 'Track % of enrollment', type: 'Clinical' },
  { metric: 'Clinical Sessions Delivered/Month', target: 'Track per clinician', type: 'Clinical' },
  { metric: 'Behavioral Improvement Rate', target: '70%+ of clinical students', type: 'Clinical' },
  { metric: 'IEP Goal Achievement Rate', target: '75%+', type: 'SPED' },
]

export default function StudentOutcomes() {
  return (
    <div className="space-y-6">
      <PageHeader title="Student Outcomes" subtitle="Academic performance, retention, and clinical outcomes tracking" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'FY27 Enrollment', value: '50', sub: 'Baseline year' },
          { label: 'Retention Target', value: '90%+', sub: 'Annual goal' },
          { label: 'Attendance Target', value: '95%+', sub: 'Daily average' },
          { label: 'Parent NPS Target', value: '50+', sub: 'Quarterly survey' },
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
          <h3 className="text-lg font-semibold text-white">Academic Performance Targets</h3>
          <p className="text-sm text-gray-400">FY27 is the baseline year — establishing metrics for growth tracking</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-gray-400 font-medium px-6 py-3">Metric</th>
                <th className="text-left text-gray-400 font-medium px-6 py-3">Baseline (FY27)</th>
                <th className="text-left text-gray-400 font-medium px-6 py-3">Target (FY29)</th>
                <th className="text-left text-gray-400 font-medium px-6 py-3">Target (FY31)</th>
              </tr>
            </thead>
            <tbody>
              {academic.map((a, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="px-6 py-3 text-white font-medium">{a.metric}</td>
                  <td className="px-6 py-3"><span className="px-2 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-medium">{a.baseline}</span></td>
                  <td className="px-6 py-3 text-gray-300">{a.fy29}</td>
                  <td className="px-6 py-3 text-green-400 font-medium">{a.fy31}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl border border-white/5 overflow-hidden">
          <div className="p-6 pb-3">
            <h3 className="text-lg font-semibold text-white">Retention & Engagement</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-gray-400 font-medium px-6 py-3">Metric</th>
                  <th className="text-left text-gray-400 font-medium px-6 py-3">Target</th>
                </tr>
              </thead>
              <tbody>
                {retention.map((r, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="px-6 py-3 text-white">{r.metric}</td>
                    <td className="px-6 py-3 text-blue-400 font-medium">{r.target}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-white/5 overflow-hidden">
          <div className="p-6 pb-3">
            <h3 className="text-lg font-semibold text-white">Clinical Outcomes</h3>
            <p className="text-sm text-gray-400">Tracked via Medicaid billing & IEP records</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-gray-400 font-medium px-6 py-3">Metric</th>
                  <th className="text-left text-gray-400 font-medium px-6 py-3">Target</th>
                </tr>
              </thead>
              <tbody>
                {clinical.map((c, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="px-6 py-3 text-white">{c.metric}</td>
                    <td className="px-6 py-3 text-blue-400 font-medium">{c.target}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
