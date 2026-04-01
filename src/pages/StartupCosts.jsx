import { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell
} from 'recharts'
import { DollarSign, Building2, Briefcase, AlertTriangle, TrendingUp } from 'lucide-react'
import KPICard from '../components/KPICard'
import PageHeader from '../components/PageHeader'
import ChartCard from '../components/ChartCard'
import { CAMPUSES, FISCAL_YEARS } from '../data/campuses'

const fmtK = (v) => `$${(v / 1000).toFixed(0)}K`
const fmtFull = (v) => `$${v.toLocaleString()}`
const tooltipStyle = { backgroundColor: '#161B22', border: '1px solid #30363D', borderRadius: '8px' }

// Startup cost categories — mirrors Palm Beach Year 1 structure
// Each new campus incurs these one-time costs at launch
const STARTUP_COSTS = {
  'Facility Setup': {
    items: [
      { name: 'First & Last Month Rent (Deposit)', cost: 360000, notes: '2 months at $180K/yr' },
      { name: 'Facility Renovation & Build-out', cost: 150000, notes: 'Classrooms, offices, common areas' },
      { name: 'Fire & Safety Compliance', cost: 25000, notes: 'Fire protection, alarms, exits' },
      { name: 'Security System Installation', cost: 15000, notes: 'Cameras, access control' },
    ],
  },
  'Technology & Equipment': {
    items: [
      { name: 'Computers & Accessories (Initial)', cost: 20000, notes: 'Student devices, 50 units' },
      { name: 'Technology Infrastructure', cost: 35000, notes: 'Network, servers, WiFi, LMS' },
      { name: 'Office Furniture & Equipment', cost: 10000, notes: 'Desks, chairs, storage' },
      { name: 'Classroom Furniture', cost: 40000, notes: 'Student desks, whiteboards, supplies' },
      { name: 'Office Equipment (Copiers, etc.)', cost: 8000, notes: 'Printers, copiers, phones' },
    ],
  },
  'Legal & Licensing': {
    items: [
      { name: 'Charter Application & Legal Fees', cost: 25000, notes: 'Legal counsel, filings' },
      { name: 'Insurance (First Year Prepaid)', cost: 4500, notes: 'General liability' },
      { name: 'Audit Setup', cost: 5500, notes: 'Initial financial audit engagement' },
      { name: 'Professional Fees', cost: 10000, notes: 'Consultants, compliance' },
    ],
  },
  'Staffing & Recruitment': {
    items: [
      { name: 'Pre-Opening Payroll (3 months)', cost: 150000, notes: 'Leadership, admin before students arrive' },
      { name: 'Startup Payroll Offset', cost: -70358, notes: 'Grant/offset for startup staffing' },
      { name: 'Recruitment & Hiring Costs', cost: 15000, notes: 'Job postings, background checks' },
      { name: 'Staff Training & Development', cost: 12000, notes: 'Initial PD, onboarding' },
    ],
  },
  'Marketing & Enrollment': {
    items: [
      { name: 'Brand Development', cost: 8000, notes: 'Logo, website, collateral' },
      { name: 'Marketing Campaign', cost: 20000, notes: 'Digital ads, community outreach, events' },
      { name: 'Student Recruitment Events', cost: 5000, notes: 'Open houses, info sessions' },
    ],
  },
  'Working Capital Reserve': {
    items: [
      { name: 'Operating Reserve (3 months)', cost: 100000, notes: 'Cash buffer before revenue flows' },
      { name: 'Contingency Fund', cost: 25000, notes: 'Unexpected startup costs' },
    ],
  },
};

function getCategoryTotal(category) {
  return STARTUP_COSTS[category].items.reduce((sum, item) => sum + item.cost, 0);
}

function getTotalStartupCost() {
  return Object.keys(STARTUP_COSTS).reduce((sum, cat) => sum + getCategoryTotal(cat), 0);
}

// Per-campus startup with location-specific adjustments
function getCampusStartupCost(campus) {
  const base = getTotalStartupCost();
  const multipliers = {
    'palm-beach': 1.0,
    'broward': 1.05,  // 5% higher COL
    'tampa': 0.95,    // 5% lower COL
  };
  return Math.round(base * (multipliers[campus.id] || 1.0));
}

const COLORS = ['#c9a84c', '#4a90d9', '#50c878', '#e74c3c', '#9b59b6', '#e67e22'];

export default function StartupCosts() {
  const [selectedCampus, setSelectedCampus] = useState('all')

  const totalAllCampuses = CAMPUSES.reduce((sum, c) => sum + getCampusStartupCost(c), 0);
  const palmBeachCost = getCampusStartupCost(CAMPUSES[0]);

  // Category breakdown for pie chart
  const categoryData = Object.keys(STARTUP_COSTS).map((cat, i) => ({
    name: cat,
    value: getCategoryTotal(cat),
    color: COLORS[i % COLORS.length],
  }));

  // Campus comparison
  const campusComparisonData = CAMPUSES.map(campus => ({
    name: campus.name.replace(' Campus', '').replace(' (BAF)', ''),
    cost: getCampusStartupCost(campus),
    color: campus.color,
    launch: campus.launchYear,
  }));

  // Detailed breakdown for selected campus or all
  const getDetailRows = () => {
    const multiplier = selectedCampus === 'all' ? 1 :
      (selectedCampus === 'broward' ? 1.05 : selectedCampus === 'tampa' ? 0.95 : 1.0);

    return Object.entries(STARTUP_COSTS).flatMap(([category, { items }]) =>
      items.map(item => ({
        category,
        name: item.name,
        cost: Math.round(item.cost * multiplier),
        notes: item.notes,
      }))
    );
  };

  return (
    <div>
      <PageHeader
        title="Startup Costs"
        subtitle="One-time launch investment required per campus location"
      >
        <div className="flex items-center gap-1 bg-bg-card border border-bg-border rounded-lg p-1">
          <button
            onClick={() => setSelectedCampus('all')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
              selectedCampus === 'all'
                ? 'bg-accent-blue text-white shadow-lg shadow-accent-blue/20'
                : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover'
            }`}
          >All Campuses</button>
          {CAMPUSES.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCampus(c.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
                selectedCampus === c.id
                  ? 'bg-accent-blue text-white shadow-lg shadow-accent-blue/20'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover'
              }`}
            >{c.name.replace(' Campus', '').replace(' (BAF)', '')}</button>
          ))}
        </div>
      </PageHeader>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <KPICard
          label="Total Startup Investment"
          value={fmtK(totalAllCampuses)}
          icon={DollarSign}
          status="amber"
          subtitle="All 3 campuses combined"
        />
        <KPICard
          label="Per-Campus Average"
          value={fmtK(Math.round(totalAllCampuses / CAMPUSES.length))}
          icon={Building2}
          status="green"
        />
        <KPICard
          label="Palm Beach (Baseline)"
          value={fmtK(palmBeachCost)}
          icon={Briefcase}
          status="green"
          subtitle="FY27 launch cost"
        />
        <KPICard
          label="ROI Timeline"
          value="18-24 mo"
          icon={TrendingUp}
          status="green"
          subtitle="Estimated payback period"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Category Breakdown Pie */}
        <ChartCard title="Cost Breakdown by Category" subtitle="Where the startup investment goes">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={110}
                dataKey="value"
                label={({ name, value }) => `${name.split(' ')[0]}: ${fmtK(value)}`}
                labelLine={true}
              >
                {categoryData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => fmtFull(v)} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Campus Comparison */}
        <ChartCard title="Startup Cost by Campus" subtitle="Adjusted for local cost of living">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={campusComparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#30363D" />
              <XAxis dataKey="name" stroke="#8B949E" style={{ fontSize: 12 }} />
              <YAxis stroke="#8B949E" style={{ fontSize: 12 }} tickFormatter={fmtK} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => fmtFull(v)} />
              <Bar dataKey="cost" name="Startup Cost">
                {campusComparisonData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Detailed Breakdown Table */}
      <div className="bg-bg-card border border-bg-border rounded-card overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-bg-border">
          <h3 className="text-base font-bold text-text-primary">
            Detailed Cost Breakdown {selectedCampus !== 'all' ? `— ${CAMPUSES.find(c => c.id === selectedCampus)?.name}` : '— Per Campus (Baseline)'}
          </h3>
          <p className="text-xs text-text-muted mt-1">All one-time costs required before opening day</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-bg-border">
                <th className="text-left px-5 py-3 text-text-muted font-semibold text-xs uppercase tracking-wider">Category</th>
                <th className="text-left px-5 py-3 text-text-muted font-semibold text-xs uppercase tracking-wider">Line Item</th>
                <th className="text-right px-5 py-3 text-text-muted font-semibold text-xs uppercase tracking-wider">Cost</th>
                <th className="text-left px-5 py-3 text-text-muted font-semibold text-xs uppercase tracking-wider">Notes</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(STARTUP_COSTS).map(([category, { items }]) => {
                const multiplier = selectedCampus === 'all' ? 1 :
                  (selectedCampus === 'broward' ? 1.05 : selectedCampus === 'tampa' ? 0.95 : 1.0);
                const catTotal = Math.round(getCategoryTotal(category) * multiplier);

                return items.map((item, idx) => (
                  <tr key={`${category}-${idx}`} className="border-b border-bg-border/50 hover:bg-bg-hover/50 transition-colors">
                    {idx === 0 && (
                      <td rowSpan={items.length} className="px-5 py-3 text-text-primary font-semibold align-top border-r border-bg-border/30">
                        <div>{category}</div>
                        <div className="text-xs text-accent-blue mt-1 font-bold">{fmtFull(catTotal)}</div>
                      </td>
                    )}
                    <td className="px-5 py-3 text-text-primary">{item.name}</td>
                    <td className={`px-5 py-3 text-right font-mono font-semibold ${item.cost < 0 ? 'text-accent-green' : 'text-text-primary'}`}>
                      {fmtFull(Math.round(item.cost * multiplier))}
                    </td>
                    <td className="px-5 py-3 text-text-muted text-xs">{item.notes}</td>
                  </tr>
                ));
              })}
              <tr className="bg-bg-hover/80 border-t-2 border-accent-blue/30">
                <td colSpan={2} className="px-5 py-4 text-text-primary font-bold text-base">TOTAL STARTUP INVESTMENT</td>
                <td className="px-5 py-4 text-right font-mono font-bold text-base text-accent-blue">
                  {fmtFull(selectedCampus === 'all' ? getTotalStartupCost() : getCampusStartupCost(CAMPUSES.find(c => c.id === selectedCampus) || CAMPUSES[0]))}
                </td>
                <td className="px-5 py-4 text-text-muted text-xs">One-time pre-opening investment</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Timeline of Capital Needs */}
      <div className="bg-bg-card border border-bg-border rounded-card p-5">
        <h3 className="text-base font-bold text-text-primary mb-4">Capital Deployment Timeline</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CAMPUSES.map((campus, idx) => {
            const cost = getCampusStartupCost(campus);
            const launchIdx = FISCAL_YEARS.indexOf(campus.launchYear);
            const prepYear = launchIdx > 0 ? FISCAL_YEARS[launchIdx - 1] : 'Pre-FY27';
            return (
              <div key={campus.id} className="bg-bg-hover rounded-lg p-4" style={{ borderLeft: `3px solid ${campus.color}` }}>
                <div className="text-xs text-text-muted mb-1">{prepYear} → {campus.launchYear}</div>
                <div className="text-lg font-bold text-text-primary mb-1">{campus.name}</div>
                <div className="text-2xl font-bold" style={{ color: campus.color }}>{fmtK(cost)}</div>
                <div className="text-xs text-text-muted mt-2">
                  Capital needed {prepYear} for {campus.launchYear} launch
                </div>
                <div className="mt-3 pt-3 border-t border-bg-border">
                  <div className="flex justify-between text-xs">
                    <span className="text-text-muted">Facility</span>
                    <span className="text-text-primary font-semibold">{fmtK(Math.round(getCategoryTotal('Facility Setup') * (campus.id === 'broward' ? 1.05 : campus.id === 'tampa' ? 0.95 : 1)))}</span>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-text-muted">Tech & Equipment</span>
                    <span className="text-text-primary font-semibold">{fmtK(Math.round(getCategoryTotal('Technology & Equipment') * (campus.id === 'broward' ? 1.05 : campus.id === 'tampa' ? 0.95 : 1)))}</span>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-text-muted">Staffing</span>
                    <span className="text-text-primary font-semibold">{fmtK(Math.round(getCategoryTotal('Staffing & Recruitment') * (campus.id === 'broward' ? 1.05 : campus.id === 'tampa' ? 0.95 : 1)))}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}
