// Multi-Campus Financial Model
// Base assumptions mirror Palm Beach structure

const BASE_REVENUE_DRIVERS = {
  perStudentFunding: 9000,
  tuitionPerStudent: 1000,
  foodServicePerStudent: 200,
  pbcGrantBase: 25000,
  pbcGrantGrowth: 0.06,
  otherGrantsBase: 20000,
  otherGrantsGrowth: 0.06,
  medicaidBase: 666208,
  medicaidGrowth: 0.05,
  medicaidPerStudent: 13324.16,
  otherRevenueBase: 5250,
  otherRevenueGrowth: 0.00,
};

const BASE_EXPENSE_DRIVERS = {
  fixedInflation: 0.03,
  mgmtInflation: 0.10,
  payrollFixed: 300000,
  payrollPerStudent: 6059,
  payrollInflation: 0.00,
  workersCompRate: 0.01,
  variablePerStudentInflation: 0.02,
};

const FIXED_EXPENSES = [
  { name: 'Rent', base: 180000, driver: 'FixedInflation' },
  { name: 'Water / Sewer / Storm', base: 1500, driver: 'FixedInflation' },
  { name: 'Electricity', base: 8000, driver: 'FixedInflation' },
  { name: 'Security Officer', base: 60000, driver: 'FixedInflation' },
  { name: 'General Maintenance Contract', base: 35000, driver: 'FixedInflation' },
  { name: 'Repairs & Maintenance', base: 3500, driver: 'FixedInflation' },
  { name: 'Fire Protection', base: 2844, driver: 'FixedInflation' },
  { name: 'Technology Service Contract', base: 5000, driver: 'FixedInflation' },
  { name: 'General Liability Insurance', base: 4500, driver: 'FixedInflation' },
  { name: 'Office Equipment Rental', base: 2000, driver: 'FixedInflation' },
  { name: 'Office Equipment Supplies', base: 2000, driver: 'FixedInflation' },
  { name: 'Printing', base: 5000, driver: 'FixedInflation' },
  { name: 'Office Furniture & Equipment', base: 10000, driver: 'FixedInflation' },
  { name: 'Internet / Phones', base: 6000, driver: 'FixedInflation' },
  { name: 'Dues & Subscriptions', base: 1000, driver: 'FixedInflation' },
  { name: 'Admin Transportation', base: 10000, driver: 'FixedInflation' },
  { name: 'Audit', base: 5500, driver: 'FixedInflation' },
  { name: 'Legal', base: 5000, driver: 'FixedInflation' },
  { name: 'Professional Fees - Other', base: 2500, driver: 'FixedInflation' },
  { name: 'Postage', base: 5000, driver: 'FixedInflation' },
  { name: 'Staff Relations', base: 2500, driver: 'FixedInflation' },
  { name: 'Board Expenditures', base: 5000, driver: 'FixedInflation' },
  { name: 'Graduation', base: 5000, driver: 'FixedInflation' },
];

const MGMT_EXPENSES = [
  { name: 'Mgmt Fee - Payroll & HR', base: 5000, driver: 'MgmtInflation' },
  { name: 'Mgmt Fee - Management & Oversight', base: 84997, driver: 'MgmtInflation' },
  { name: 'Mgmt Fee - Accounting', base: 15000, driver: 'MgmtInflation' },
  { name: 'Mgmt Fee - School Accountability', base: 8500, driver: 'MgmtInflation' },
];

const PER_STUDENT_EXPENSES = [
  { name: 'Maintenance Supplies', basePerStudent: 60 },
  { name: 'Computers & Accessories', basePerStudent: 400 },
  { name: 'Office Supplies', basePerStudent: 50 },
  { name: 'Student Bus Passes', basePerStudent: 50 },
  { name: 'Food Service (expense)', basePerStudent: 700 },
  { name: 'Student Events', basePerStudent: 150 },
];

// Campus definitions
const CAMPUSES = [
  {
    id: 'palm-beach',
    name: 'Palm Beach (BAF)',
    location: 'Palm Beach County, FL',
    launchYear: 'FY27',
    enrollment: { FY27: 50, FY28: 75, FY29: 80, FY30: 95, FY31: 110 },
    status: 'Operating',
    color: '#c9a84c',
  },
  {
    id: 'broward',
    name: 'Broward Campus',
    location: 'Broward County, FL',
    launchYear: 'FY28',
    enrollment: { FY28: 75, FY29: 125, FY30: 175, FY31: 225, FY32: 275 },
    status: 'Planned — FY28',
    color: '#4a90d9',
  },
  {
    id: 'tampa',
    name: 'Tampa Campus',
    location: 'Tampa, FL',
    launchYear: 'FY29',
    enrollment: { FY29: 75, FY30: 125, FY31: 175, FY32: 225, FY33: 275 },
    status: 'Planned — FY29',
    color: '#50c878',
  },
];

const FISCAL_YEARS = ['FY27', 'FY28', 'FY29', 'FY30', 'FY31', 'FY32', 'FY33'];

function calculateCampusFinancials(campus) {
  const results = {};
  const launchIdx = FISCAL_YEARS.indexOf(campus.launchYear);

  FISCAL_YEARS.forEach((fy, fyIdx) => {
    const yearsFromLaunch = fyIdx - launchIdx;
    const students = campus.enrollment[fy] || 0;

    if (students === 0) {
      results[fy] = null;
      return;
    }

    // Revenue
    const perStudentRev = students * BASE_REVENUE_DRIVERS.perStudentFunding;
    const tuitionRev = students * BASE_REVENUE_DRIVERS.tuitionPerStudent;
    const foodRev = students * BASE_REVENUE_DRIVERS.foodServicePerStudent;
    const pbcGrant = BASE_REVENUE_DRIVERS.pbcGrantBase * Math.pow(1 + BASE_REVENUE_DRIVERS.pbcGrantGrowth, yearsFromLaunch);
    const otherGrants = BASE_REVENUE_DRIVERS.otherGrantsBase * Math.pow(1 + BASE_REVENUE_DRIVERS.otherGrantsGrowth, yearsFromLaunch);
    const medicaid = BASE_REVENUE_DRIVERS.medicaidBase * Math.pow(1 + BASE_REVENUE_DRIVERS.medicaidGrowth, yearsFromLaunch);
    const otherRev = BASE_REVENUE_DRIVERS.otherRevenueBase;
    const googleGrant = yearsFromLaunch === 0 ? 10000 : 0;

    const totalRevenue = perStudentRev + tuitionRev + foodRev + pbcGrant + otherGrants + medicaid + otherRev + googleGrant;

    // Expenses
    const payroll = (BASE_EXPENSE_DRIVERS.payrollFixed + (students * BASE_EXPENSE_DRIVERS.payrollPerStudent)) *
      Math.pow(1 + BASE_EXPENSE_DRIVERS.payrollInflation, yearsFromLaunch);
    const startupPayroll = yearsFromLaunch === 0 ? -70358 : 0;
    const workersComp = payroll * BASE_EXPENSE_DRIVERS.workersCompRate;

    let fixedTotal = 0;
    FIXED_EXPENSES.forEach(exp => {
      fixedTotal += exp.base * Math.pow(1 + BASE_EXPENSE_DRIVERS.fixedInflation, yearsFromLaunch);
    });

    let mgmtTotal = 0;
    MGMT_EXPENSES.forEach(exp => {
      mgmtTotal += exp.base * Math.pow(1 + BASE_EXPENSE_DRIVERS.mgmtInflation, yearsFromLaunch);
    });

    let perStudentTotal = 0;
    PER_STUDENT_EXPENSES.forEach(exp => {
      perStudentTotal += students * exp.basePerStudent *
        Math.pow(1 + BASE_EXPENSE_DRIVERS.variablePerStudentInflation, yearsFromLaunch);
    });

    const totalExpenses = payroll + startupPayroll + workersComp + fixedTotal + mgmtTotal + perStudentTotal;
    const surplus = totalRevenue - totalExpenses;

    results[fy] = {
      students,
      totalRevenue: Math.round(totalRevenue),
      totalExpenses: Math.round(totalExpenses),
      surplus: Math.round(surplus),
      surplusMargin: totalRevenue > 0 ? ((surplus / totalRevenue) * 100).toFixed(1) : '0.0',
      revenuePerStudent: Math.round(totalRevenue / students),
      expensePerStudent: Math.round(totalExpenses / students),
      breakdown: {
        revenue: {
          perStudentFunding: Math.round(perStudentRev),
          tuition: Math.round(tuitionRev),
          foodService: Math.round(foodRev),
          pbcGrant: Math.round(pbcGrant),
          otherGrants: Math.round(otherGrants),
          medicaid: Math.round(medicaid),
          otherRevenue: Math.round(otherRev),
          googleGrant: Math.round(googleGrant),
        },
        expenses: {
          payroll: Math.round(payroll + startupPayroll),
          workersComp: Math.round(workersComp),
          fixedCosts: Math.round(fixedTotal),
          mgmtFees: Math.round(mgmtTotal),
          perStudentCosts: Math.round(perStudentTotal),
        },
      },
    };
  });

  return results;
}

function getConsolidatedFinancials() {
  const consolidated = {};
  const campusData = {};

  CAMPUSES.forEach(campus => {
    campusData[campus.id] = calculateCampusFinancials(campus);
  });

  FISCAL_YEARS.forEach(fy => {
    let totalStudents = 0, totalRevenue = 0, totalExpenses = 0;
    const activeCampuses = [];

    CAMPUSES.forEach(campus => {
      const data = campusData[campus.id][fy];
      if (data) {
        totalStudents += data.students;
        totalRevenue += data.totalRevenue;
        totalExpenses += data.totalExpenses;
        activeCampuses.push(campus.name);
      }
    });

    if (activeCampuses.length > 0) {
      consolidated[fy] = {
        students: totalStudents,
        totalRevenue,
        totalExpenses,
        surplus: totalRevenue - totalExpenses,
        surplusMargin: totalRevenue > 0 ? (((totalRevenue - totalExpenses) / totalRevenue) * 100).toFixed(1) : '0.0',
        activeCampuses,
        campusCount: activeCampuses.length,
      };
    }
  });

  return consolidated;
}

export { CAMPUSES, FISCAL_YEARS, BASE_REVENUE_DRIVERS, BASE_EXPENSE_DRIVERS,
  calculateCampusFinancials, getConsolidatedFinancials };
