import { useState } from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, DollarSign, TrendingUp, GraduationCap,
  Users, Brain, BookOpen, Globe, Megaphone, Handshake,
  Target, Settings, ChevronLeft, ChevronRight, Menu, X, Flower2
} from 'lucide-react'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Executive Overview', section: 'Financial' },
  { to: '/expenses', icon: DollarSign, label: 'Expense Breakdown', section: 'Financial' },
  { to: '/revenue', icon: TrendingUp, label: 'Revenue Streams', section: 'Financial' },
  { to: '/enrollment', icon: GraduationCap, label: 'Enrollment & Growth', section: 'Financial' },
  { to: '/staffing', icon: Users, label: 'Staffing & Efficiency', section: 'Financial' },
  { to: '/strategy', icon: Brain, label: 'Strategic Insights', section: 'Financial' },
  { to: '/programs', icon: BookOpen, label: 'Programs & Services', section: 'Operations' },
  { to: '/impact', icon: Globe, label: 'Community Impact', section: 'Operations' },
  { to: '/marketing', icon: Megaphone, label: 'Marketing Performance', section: 'Operations' },
  { to: '/partnerships', icon: Handshake, label: 'Partnerships & Outreach', section: 'Operations' },
  { to: '/outcomes', icon: Target, label: 'Student Outcomes', section: 'Operations' },
  { to: '/settings', icon: Settings, label: 'Settings / About', section: null },
]

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const renderNav = (mobile = false) => {
    let lastSection = null
    return navItems.map((item, i) => {
      const showSection = item.section && item.section !== lastSection
      if (item.section) lastSection = item.section
      const Icon = item.icon
      const isActive = location.pathname === item.to
      return (
        <div key={item.to}>
          {showSection && !collapsed && (
            <div className="px-4 pt-4 pb-1 text-[10px] uppercase tracking-widest text-text-muted font-semibold">
              {item.section}
            </div>
          )}
          {showSection && collapsed && !mobile && <div className="border-t border-bg-border my-2 mx-2" />}
          <NavLink
            to={item.to}
            onClick={() => mobile && setMobileOpen(false)}
            className={`flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm font-medium transition-all duration-200
              ${isActive
                ? 'bg-accent-blue/10 text-accent-blue'
                : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover'
              }
              ${collapsed && !mobile ? 'justify-center px-2' : ''}
            `}
            title={collapsed ? item.label : undefined}
          >
            <Icon size={18} className={`shrink-0 ${isActive ? 'text-accent-blue' : ''}`} />
            {(!collapsed || mobile) && <span className="truncate">{item.label}</span>}
          </NavLink>
        </div>
      )
    })
  }

  return (
    <div className="flex h-screen overflow-hidden bg-bg-primary">
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex flex-col border-r border-bg-border bg-bg-card transition-all duration-300 ${collapsed ? 'w-[68px]' : 'w-64'}`}>
        <div className={`flex items-center gap-3 px-4 h-16 border-b border-bg-border shrink-0 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-green to-accent-blue flex items-center justify-center shrink-0">
            <Flower2 size={18} className="text-bg-primary" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <h1 className="text-sm font-bold text-text-primary truncate">BAF Dashboard</h1>
              <p className="text-[10px] text-text-muted truncate">Blooming Academies Foundation</p>
            </div>
          )}
        </div>
        <nav className="flex-1 overflow-y-auto py-2">
          {renderNav()}
        </nav>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center h-12 border-t border-bg-border text-text-muted hover:text-text-primary transition-colors"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-bg-card border-r border-bg-border flex flex-col animate-slideIn">
            <div className="flex items-center justify-between px-4 h-16 border-b border-bg-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-green to-accent-blue flex items-center justify-center">
                  <Flower2 size={18} className="text-bg-primary" />
                </div>
                <h1 className="text-sm font-bold">BAF Dashboard</h1>
              </div>
              <button onClick={() => setMobileOpen(false)} className="text-text-muted hover:text-text-primary">
                <X size={20} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto py-2">
              {renderNav(true)}
            </nav>
          </aside>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center gap-4 px-4 lg:px-6 h-16 border-b border-bg-border bg-bg-card/50 backdrop-blur-sm shrink-0">
          <button className="lg:hidden text-text-secondary hover:text-text-primary" onClick={() => setMobileOpen(true)}>
            <Menu size={22} />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <span className="text-xs text-text-muted hidden sm:block">Pro Forma Model — FY27-FY31</span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-xs font-bold">
              B
            </div>
          </div>
        </header>
        {/* Page content */}
        <div className="flex-1 overflow-y-auto">
          <div className="page-enter p-4 lg:p-6 max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </div>
      </main>

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .animate-slideIn { animation: slideIn 0.25s ease-out; }
      `}</style>
    </div>
  )
}
