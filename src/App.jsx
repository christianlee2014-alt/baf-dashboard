import { Routes, Route } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout'
import ExecutiveOverview from './pages/ExecutiveOverview'
import ExpenseBreakdown from './pages/ExpenseBreakdown'
import RevenueStreams from './pages/RevenueStreams'
import EnrollmentGrowth from './pages/EnrollmentGrowth'
import StaffingEfficiency from './pages/StaffingEfficiency'
import StrategicInsights from './pages/StrategicInsights'
import ProgramsServices from './pages/ProgramsServices'
import CommunityImpact from './pages/CommunityImpact'
import MarketingPerformance from './pages/MarketingPerformance'
import PartnershipsOutreach from './pages/PartnershipsOutreach'
import StudentOutcomes from './pages/StudentOutcomes'
import Settings from './pages/Settings'
import MultiCampusOverview from './pages/MultiCampusOverview'
import ExpansionTimeline from './pages/ExpansionTimeline'

export default function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<ExecutiveOverview />} />
        <Route path="expenses" element={<ExpenseBreakdown />} />
        <Route path="revenue" element={<RevenueStreams />} />
        <Route path="enrollment" element={<EnrollmentGrowth />} />
        <Route path="staffing" element={<StaffingEfficiency />} />
        <Route path="strategy" element={<StrategicInsights />} />
        <Route path="programs" element={<ProgramsServices />} />
        <Route path="impact" element={<CommunityImpact />} />
        <Route path="marketing" element={<MarketingPerformance />} />
        <Route path="partnerships" element={<PartnershipsOutreach />} />
        <Route path="outcomes" element={<StudentOutcomes />} />
        <Route path="multi-campus" element={<MultiCampusOverview />} />
        <Route path="expansion" element={<ExpansionTimeline />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}
