// Complete financial data from BAF Pro Forma Model
export const YEARS = ['FY27', 'FY28', 'FY29', 'FY30', 'FY31'];
export const YEAR_LABELS = { FY27: '2026-27', FY28: '2027-28', FY29: '2028-29', FY30: '2029-30', FY31: '2030-31' };

export const enrollment = { FY27: 50, FY28: 75, FY29: 80, FY30: 95, FY31: 110 };

// ─── REVENUE ───
export const revenue = {
  'FTE Base (State/District)': { FY27: 450000, FY28: 675000, FY29: 720000, FY30: 855000, FY31: 1071608 },
  'Tuition/Parent Support':    { FY27: 50000,  FY28: 75000,  FY29: 80000,  FY30: 95000,  FY31: 119068 },
  'Grant: Google Startup':     { FY27: 10000,  FY28: 0,      FY29: 0,      FY30: 0,      FY31: 0 },
  'Grant: PBC':                { FY27: 25000,  FY28: 26500,  FY29: 28090,  FY30: 29775,  FY31: 31562 },
  'Grant: Other':              { FY27: 20000,  FY28: 21200,  FY29: 22472,  FY30: 23820,  FY31: 25250 },
  'Food Service Revenue':      { FY27: 10000,  FY28: 15000,  FY29: 16000,  FY30: 19000,  FY31: 23814 },
  'Medicaid Revenue':          { FY27: 666208, FY28: 714818, FY29: 766460, FY30: 830530, FY31: 809780 },
  'Other Revenue':             { FY27: 5250,   FY28: 5250,   FY29: 5250,   FY30: 5250,   FY31: 5250 },
};

export const totalRevenue = {};
YEARS.forEach(y => {
  totalRevenue[y] = Object.values(revenue).reduce((s, r) => s + r[y], 0);
});

// ─── EXPENSES ───
export const expenses = {
  'Payroll (modeled)':                { FY27: 602947, FY28: 754422, FY29: 784886, FY30: 875818, FY31: 966482,  category: 'Payroll', type: 'mixed' },
  'Startup Payroll (offset)':         { FY27: -70358, FY28: 0,      FY29: 0,      FY30: 0,      FY31: 0,       category: 'Payroll', type: 'fixed' },
  "Workers' Compensation":            { FY27: 6029,   FY28: 7544,   FY29: 7849,   FY30: 8758,   FY31: 9665,    category: 'Payroll', type: 'mixed' },
  'Mgmt Fee - Payroll & HR':          { FY27: 5000,   FY28: 5500,   FY29: 6050,   FY30: 6655,   FY31: 7321,    category: 'RGMS Fees', type: 'fixed' },
  'Rent':                             { FY27: 180000, FY28: 185400, FY29: 190962, FY30: 196691, FY31: 202592,  category: 'Facility', type: 'fixed' },
  'Water/Sewer/Storm':                { FY27: 1500,   FY28: 1545,   FY29: 1591,   FY30: 1639,   FY31: 1688,    category: 'Facility', type: 'fixed' },
  'Electricity':                      { FY27: 8000,   FY28: 8240,   FY29: 8487,   FY30: 8742,   FY31: 9004,    category: 'Facility', type: 'fixed' },
  'Security Officer':                 { FY27: 60000,  FY28: 61800,  FY29: 63654,  FY30: 65564,  FY31: 67531,   category: 'Facility', type: 'fixed' },
  'General Maintenance Contract':     { FY27: 35000,  FY28: 36050,  FY29: 37132,  FY30: 38245,  FY31: 39393,   category: 'Facility', type: 'fixed' },
  'Maintenance Supplies':             { FY27: 3000,   FY28: 4500,   FY29: 4800,   FY30: 5700,   FY31: 7144,    category: 'Facility', type: 'variable' },
  'Repairs & Maintenance':            { FY27: 3500,   FY28: 3605,   FY29: 3713,   FY30: 3825,   FY31: 3939,    category: 'Facility', type: 'fixed' },
  'Fire Protection':                  { FY27: 2844,   FY28: 2929,   FY29: 3017,   FY30: 3107,   FY31: 3201,    category: 'Facility', type: 'fixed' },
  'Mgmt Fee - Management & Oversight':{ FY27: 84997,  FY28: 93497,  FY29: 102847, FY30: 113131, FY31: 124445,  category: 'RGMS Fees', type: 'fixed' },
  'Mgmt Fee - Accounting':            { FY27: 15000,  FY28: 16500,  FY29: 18150,  FY30: 19965,  FY31: 21962,   category: 'RGMS Fees', type: 'fixed' },
  'Technology Service Contract':      { FY27: 5000,   FY28: 5150,   FY29: 5305,   FY30: 5464,   FY31: 5628,    category: 'Technology', type: 'fixed' },
  'Computers & Accessories':          { FY27: 20000,  FY28: 30000,  FY29: 32000,  FY30: 38000,  FY31: 47627,   category: 'Technology', type: 'variable' },
  'General Liability Insurance':      { FY27: 4500,   FY28: 4635,   FY29: 4774,   FY30: 4917,   FY31: 5065,    category: 'Admin & Professional', type: 'fixed' },
  'Office Equipment Rental':          { FY27: 2000,   FY28: 2060,   FY29: 2122,   FY30: 2185,   FY31: 2251,    category: 'Admin & Professional', type: 'fixed' },
  'Office Equipment Supplies':        { FY27: 2000,   FY28: 2060,   FY29: 2122,   FY30: 2185,   FY31: 2251,    category: 'Admin & Professional', type: 'fixed' },
  'Printing':                         { FY27: 5000,   FY28: 5150,   FY29: 5305,   FY30: 5464,   FY31: 5628,    category: 'Admin & Professional', type: 'fixed' },
  'Office Supplies':                  { FY27: 2500,   FY28: 3750,   FY29: 4000,   FY30: 4750,   FY31: 5953,    category: 'Admin & Professional', type: 'variable' },
  'Office Furniture & Equipment':     { FY27: 10000,  FY28: 10300,  FY29: 10609,  FY30: 10927,  FY31: 11255,   category: 'Admin & Professional', type: 'fixed' },
  'Internet/Phones':                  { FY27: 6000,   FY28: 6180,   FY29: 6365,   FY30: 6556,   FY31: 6753,    category: 'Technology', type: 'fixed' },
  'Dues & Subscriptions':             { FY27: 1000,   FY28: 1030,   FY29: 1061,   FY30: 1093,   FY31: 1126,    category: 'Admin & Professional', type: 'fixed' },
  'Admin Transportation':             { FY27: 10000,  FY28: 10300,  FY29: 10609,  FY30: 10927,  FY31: 11255,   category: 'Admin & Professional', type: 'fixed' },
  'Audit':                            { FY27: 5500,   FY28: 5665,   FY29: 5835,   FY30: 6010,   FY31: 6190,    category: 'Admin & Professional', type: 'fixed' },
  'Legal':                            { FY27: 5000,   FY28: 5150,   FY29: 5305,   FY30: 5464,   FY31: 5628,    category: 'Admin & Professional', type: 'fixed' },
  'Professional Fees - Other':        { FY27: 2500,   FY28: 2575,   FY29: 2652,   FY30: 2732,   FY31: 2814,    category: 'Admin & Professional', type: 'fixed' },
  'Mgmt Fee - School Accountability': { FY27: 8500,   FY28: 9350,   FY29: 10285,  FY30: 11314,  FY31: 12445,   category: 'RGMS Fees', type: 'fixed' },
  'Postage':                          { FY27: 5000,   FY28: 5150,   FY29: 5305,   FY30: 5464,   FY31: 5628,    category: 'Admin & Professional', type: 'fixed' },
  'Staff Relations':                  { FY27: 2500,   FY28: 2575,   FY29: 2652,   FY30: 2732,   FY31: 2814,    category: 'Admin & Professional', type: 'fixed' },
  'Board Expenditures':               { FY27: 5000,   FY28: 5150,   FY29: 5305,   FY30: 5464,   FY31: 5628,    category: 'Admin & Professional', type: 'fixed' },
  'Student Bus Passes':               { FY27: 2500,   FY28: 3750,   FY29: 4000,   FY30: 4750,   FY31: 5953,    category: 'Student Services', type: 'variable' },
  'Food Service (expense)':           { FY27: 35000,  FY28: 52500,  FY29: 56000,  FY30: 66500,  FY31: 83347,   category: 'Student Services', type: 'variable' },
  'Graduation':                       { FY27: 5000,   FY28: 5150,   FY29: 5305,   FY30: 5464,   FY31: 5628,    category: 'Student Services', type: 'fixed' },
  'Student Events':                   { FY27: 7500,   FY28: 11250,  FY29: 12000,  FY30: 14250,  FY31: 17860,   category: 'Student Services', type: 'variable' },
  'Speech Therapist':                 { FY27: 1500,   FY28: 1545,   FY29: 1591,   FY30: 1639,   FY31: 1688,    category: 'Curriculum & Instruction', type: 'fixed' },
  'Books & Materials':                { FY27: 2830,   FY28: 4245,   FY29: 4528,   FY30: 5378,   FY31: 6739,    category: 'Curriculum & Instruction', type: 'variable' },
  'Curriculum License':               { FY27: 42000,  FY28: 63000,  FY29: 67200,  FY30: 79800,  FY31: 100017,  category: 'Curriculum & Instruction', type: 'variable' },
  'Student Information System':       { FY27: 9500,   FY28: 14250,  FY29: 15200,  FY30: 18050,  FY31: 22623,   category: 'Technology', type: 'variable' },
  'CTE Equipment/Supplies':           { FY27: 10000,  FY28: 10300,  FY29: 10609,  FY30: 10927,  FY31: 11255,   category: 'Curriculum & Instruction', type: 'fixed' },
  'Instructor Training':              { FY27: 15000,  FY28: 15450,  FY29: 15914,  FY30: 16391,  FY31: 16883,   category: 'Curriculum & Instruction', type: 'fixed' },
  'Mgmt Fee - Technology Management': { FY27: 5000,   FY28: 5500,   FY29: 6050,   FY30: 6655,   FY31: 7321,    category: 'RGMS Fees', type: 'fixed' },
  'Marketing':                        { FY27: 10000,  FY28: 15300,  FY29: 16320,  FY30: 19380,  FY31: 23814,   category: 'Marketing', type: 'variable' },
  'Promotional Items':                { FY27: 3000,   FY28: 4500,   FY29: 4800,   FY30: 5700,   FY31: 7144,    category: 'Marketing', type: 'variable' },
  'Mgmt Fee - Student Recruit & Retention': { FY27: 21249, FY28: 23374, FY29: 25711, FY30: 28282, FY31: 31111, category: 'RGMS Fees', type: 'fixed' },
};

export const totalExpenses = {};
YEARS.forEach(y => {
  totalExpenses[y] = Object.values(expenses).reduce((s, e) => s + e[y], 0);
});

// ─── DERIVED METRICS ───
export const netSurplus = {};
export const surplusMargin = {};
export const revenuePerStudent = {};
export const expensePerStudent = {};
export const cumulativeReserves = {};

let cumRes = 0;
YEARS.forEach(y => {
  netSurplus[y] = totalRevenue[y] - totalExpenses[y];
  surplusMargin[y] = ((netSurplus[y] / totalRevenue[y]) * 100);
  revenuePerStudent[y] = totalRevenue[y] / enrollment[y];
  expensePerStudent[y] = totalExpenses[y] / enrollment[y];
  cumRes += netSurplus[y];
  cumulativeReserves[y] = cumRes;
});

export const breakEvenStudents = 49;

// ─── EXPENSE CATEGORIES ───
export const expenseCategories = [
  'Payroll', 'Facility', 'RGMS Fees', 'Curriculum & Instruction',
  'Technology', 'Student Services', 'Admin & Professional', 'Marketing'
];

export const categoryColors = {
  'Payroll': '#58A6FF',
  'Facility': '#BC8CFF',
  'RGMS Fees': '#F85149',
  'Curriculum & Instruction': '#39D353',
  'Technology': '#D29922',
  'Student Services': '#F778BA',
  'Admin & Professional': '#8B949E',
  'Marketing': '#FFA657',
};

export function getCategoryTotals(year) {
  const totals = {};
  expenseCategories.forEach(c => { totals[c] = 0; });
  Object.values(expenses).forEach(e => {
    totals[e.category] += e[year];
  });
  return totals;
}

// ─── RGMS FEE DATA ───
export const rgmsFeeItems = [
  'Mgmt Fee - Management & Oversight',
  'Mgmt Fee - Student Recruit & Retention',
  'Mgmt Fee - Accounting',
  'Mgmt Fee - School Accountability',
  'Mgmt Fee - Payroll & HR',
  'Mgmt Fee - Technology Management',
];

export function getRGMSTotals() {
  const totals = {};
  YEARS.forEach(y => {
    totals[y] = rgmsFeeItems.reduce((s, item) => s + expenses[item][y], 0);
  });
  return totals;
}

// ─── REVENUE CATEGORIES ───
export const revenueCategories = Object.keys(revenue);

export const revenueCategoryColors = {
  'FTE Base (State/District)': '#58A6FF',
  'Tuition/Parent Support': '#39D353',
  'Grant: Google Startup': '#D29922',
  'Grant: PBC': '#BC8CFF',
  'Grant: Other': '#FFA657',
  'Food Service Revenue': '#F778BA',
  'Medicaid Revenue': '#F85149',
  'Other Revenue': '#8B949E',
};

// ─── HEALTH INDICATORS ───
export function getHealthIndicators(year) {
  const margin = surplusMargin[year];
  const revPerStu = revenuePerStudent[year];
  const expPerStu = expensePerStudent[year];
  const buffer = enrollment[year] - breakEvenStudents;

  return [
    {
      label: 'Surplus Margin',
      value: `${margin.toFixed(1)}%`,
      target: '>5%',
      status: margin >= 5 ? 'green' : margin >= 3 ? 'amber' : 'red',
      detail: margin >= 5 ? 'On target' : margin >= 3 ? 'Approaching target' : 'Below 5% target',
    },
    {
      label: 'Break-Even Buffer',
      value: `${buffer} students`,
      target: '>6 students',
      status: buffer >= 6 ? 'green' : buffer >= 3 ? 'amber' : 'red',
      detail: buffer >= 6 ? 'Healthy buffer' : `Only ${buffer} student${buffer !== 1 ? 's' : ''} above break-even`,
    },
    {
      label: 'Revenue/Student',
      value: `$${Math.round(revPerStu).toLocaleString()}`,
      target: '>$22K',
      status: revPerStu >= 22000 ? 'green' : revPerStu >= 20000 ? 'amber' : 'red',
      detail: revPerStu >= 22000 ? 'Healthy' : 'Below target',
    },
    {
      label: 'Expense/Student',
      value: `$${Math.round(expPerStu).toLocaleString()}`,
      target: '<$20K',
      status: expPerStu <= 20000 ? 'green' : expPerStu <= 22000 ? 'amber' : 'red',
      detail: expPerStu <= 20000 ? 'On target' : 'Above target — needs scale',
    },
    {
      label: 'Cumulative Reserves',
      value: `$${Math.round(cumulativeReserves[year]).toLocaleString()}`,
      target: '>$300K',
      status: cumulativeReserves[year] >= 300000 ? 'green' : cumulativeReserves[year] >= 100000 ? 'amber' : 'red',
      detail: cumulativeReserves[year] >= 300000 ? 'Healthy reserves' : 'Building reserves',
    },
  ];
}

// ─── CHART DATA HELPERS ───
export function getRevExpChartData() {
  return YEARS.map(y => ({
    year: y,
    Revenue: totalRevenue[y],
    Expenses: totalExpenses[y],
    Surplus: netSurplus[y],
  }));
}

export function getSurplusMarginChartData() {
  return YEARS.map(y => ({
    year: y,
    'Surplus Margin': parseFloat(surplusMargin[y].toFixed(2)),
    Target: 5,
  }));
}

export function getCashFlowChartData() {
  return YEARS.map(y => ({
    year: y,
    'Annual Surplus': netSurplus[y],
    'Cumulative Reserves': cumulativeReserves[y],
  }));
}

export function getRevenueStackedData() {
  return YEARS.map(y => {
    const row = { year: y };
    Object.keys(revenue).forEach(k => { row[k] = revenue[k][y]; });
    return row;
  });
}

export function getEnrollmentChartData() {
  return YEARS.map(y => ({
    year: y,
    Students: enrollment[y],
    'Break-Even': breakEvenStudents,
  }));
}

export function getExpenseCategoryChartData(year) {
  const totals = getCategoryTotals(year);
  return expenseCategories.map(c => ({
    name: c,
    value: totals[c],
    fill: categoryColors[c],
  }));
}

export function getTop10Expenses(year) {
  return Object.entries(expenses)
    .map(([name, data]) => ({ name, value: data[year] }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);
}

export function getFixedVsVariable(year) {
  let fixed = 0, variable = 0;
  Object.values(expenses).forEach(e => {
    if (e.type === 'fixed') fixed += e[year];
    else variable += e[year];
  });
  return [
    { name: 'Fixed Costs', value: fixed, fill: '#58A6FF' },
    { name: 'Variable Costs', value: variable, fill: '#39D353' },
  ];
}

// ─── FORMATTING ───
export function fmt(n, decimals = 0) {
  if (n === undefined || n === null) return '—';
  const abs = Math.abs(n);
  if (abs >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  if (abs >= 1e3) return `$${(n / 1e3).toFixed(decimals > 0 ? decimals : 0)}K`;
  return `$${n.toLocaleString()}`;
}

export function fmtFull(n) {
  if (n === undefined || n === null) return '—';
  const prefix = n < 0 ? '-$' : '$';
  return prefix + Math.abs(Math.round(n)).toLocaleString();
}

export function fmtPct(n, dec = 1) {
  if (n === undefined || n === null) return '—';
  return `${n.toFixed(dec)}%`;
}
