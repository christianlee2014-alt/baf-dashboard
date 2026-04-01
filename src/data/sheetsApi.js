// Google Sheets Live Data Fetcher
const SHEET_ID = '1GpNO1Gm_sPhJBe3T_GTUvwe4kldYQ43D9ewNRxjnq44';
const API_KEY = 'AIzaSyAvgOcKKe2GJgxZIEnCmMH-OVJcx3vG0E8';

const BASE_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values`;

function parseNumber(val) {
  if (!val) return 0;
  return parseFloat(String(val).replace(/[$,%()]/g, '').trim()) || 0;
}

async function fetchSheet(range) {
  const url = `${BASE_URL}/${encodeURIComponent(range)}?key=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Sheets API error: ${res.status}`);
  const data = await res.json();
  return data.values || [];
}

export async function fetchSummary() {
  const rows = await fetchSheet('Summary!A1:F12');
  // Find the data rows (skip headers)
  const result = {};
  const years = ['FY27', 'FY28', 'FY29', 'FY30', 'FY31'];

  rows.forEach(row => {
    const label = (row[0] || '').trim();
    if (label === 'Students') {
      years.forEach((fy, i) => {
        if (!result[fy]) result[fy] = {};
        result[fy].students = parseNumber(row[i + 1]);
      });
    } else if (label === 'Total Revenue') {
      years.forEach((fy, i) => {
        if (!result[fy]) result[fy] = {};
        result[fy].totalRevenue = parseNumber(row[i + 1]);
      });
    } else if (label === 'Total Expenses') {
      years.forEach((fy, i) => {
        if (!result[fy]) result[fy] = {};
        result[fy].totalExpenses = parseNumber(row[i + 1]);
      });
    } else if (label.startsWith('Net Surplus')) {
      years.forEach((fy, i) => {
        if (!result[fy]) result[fy] = {};
        result[fy].surplus = parseNumber(row[i + 1]);
      });
    } else if (label === 'Surplus Margin') {
      years.forEach((fy, i) => {
        if (!result[fy]) result[fy] = {};
        result[fy].surplusMargin = parseNumber(row[i + 1]);
      });
    } else if (label.startsWith('Revenue / Student')) {
      years.forEach((fy, i) => {
        if (!result[fy]) result[fy] = {};
        result[fy].revenuePerStudent = parseNumber(row[i + 1]);
      });
    }
  });
  return result;
}

export async function fetchRevenueDetail() {
  const rows = await fetchSheet('Revenue Detail!A1:K20');
  const years = ['FY27', 'FY28', 'FY29', 'FY30', 'FY31'];
  const lines = [];

  rows.forEach(row => {
    const name = (row[0] || '').trim();
    if (!name || name.startsWith('Revenue') || name.startsWith('Drivers') || name === 'Total Revenue') return;
    const driver = (row[1] || '').trim();
    if (!driver) return;

    const line = { name, driver };
    years.forEach((fy, i) => {
      line[fy] = parseNumber(row[5 + i]);
    });
    lines.push(line);
  });
  return lines;
}

export async function fetchExpenseDetail() {
  const rows = await fetchSheet('Expense Detail!A1:K40');
  const years = ['FY27', 'FY28', 'FY29', 'FY30', 'FY31'];
  const lines = [];

  rows.forEach(row => {
    const name = (row[0] || '').trim();
    if (!name || name.startsWith('Expense') || name.startsWith('Drivers')) return;
    const driver = (row[1] || '').trim();
    if (!driver) return;

    const line = {
      name,
      driver,
      base: parseNumber(row[2]),
      rate: (row[3] || '').trim(),
      notes: (row[4] || '').trim(),
    };
    years.forEach((fy, i) => {
      line[fy] = parseNumber(row[5 + i]);
    });
    lines.push(line);
  });
  return lines;
}

export async function fetchInputs() {
  const rows = await fetchSheet('Inputs!A1:G30');
  const inputs = { enrollment: {}, revenueDrivers: {}, expenseDrivers: {} };
  const years = ['FY27', 'FY28', 'FY29', 'FY30', 'FY31'];

  let section = '';
  rows.forEach(row => {
    const label = (row[0] || '').trim();
    if (label === 'Enrollment') { section = 'enrollment'; return; }
    if (label === 'Revenue Drivers') { section = 'revenue'; return; }
    if (label === 'Expense Drivers') { section = 'expense'; return; }

    if (section === 'enrollment' && label === 'Students') {
      years.forEach((fy, i) => {
        inputs.enrollment[fy] = parseNumber(row[1 + i]);
      });
    } else if (section === 'revenue' && row[1]) {
      inputs.revenueDrivers[label] = { value: parseNumber(row[1]), units: (row[2] || '').trim() };
    } else if (section === 'expense' && row[1]) {
      inputs.expenseDrivers[label] = { value: parseNumber(row[1]), units: (row[2] || '').trim() };
    }
  });
  return inputs;
}

export async function fetchCashFlow() {
  const rows = await fetchSheet('Cash Flow!A1:C10');
  const data = [];
  rows.forEach(row => {
    const fy = (row[0] || '').trim();
    if (!fy.startsWith('FY')) return;
    data.push({
      year: fy,
      surplus: parseNumber(row[1]),
      cumulative: parseNumber(row[2]),
    });
  });
  return data;
}

export async function fetchBreakEven() {
  const rows = await fetchSheet('Break-Even!A1:B15');
  const data = {};
  rows.forEach(row => {
    const label = (row[0] || '').trim();
    const value = (row[1] || '').trim();
    if (label && value) {
      data[label] = parseNumber(value);
    }
  });
  return data;
}

// Fetch all sheets at once
export async function fetchAllSheets() {
  const [summary, revenue, expenses, inputs, cashFlow, breakEven] = await Promise.all([
    fetchSummary(),
    fetchRevenueDetail(),
    fetchExpenseDetail(),
    fetchInputs(),
    fetchCashFlow(),
    fetchBreakEven(),
  ]);
  return { summary, revenue, expenses, inputs, cashFlow, breakEven, lastUpdated: new Date().toISOString() };
}
