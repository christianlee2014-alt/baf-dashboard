import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

const statusColors = {
  green: 'kpi-green',
  red: 'kpi-red',
  amber: 'kpi-amber',
  blue: 'kpi-blue',
}

export default function KPICard({ label, value, subtitle, trend, trendValue, status = 'blue', icon: Icon }) {
  const trendColor = trend === 'up' ? 'text-accent-green' : trend === 'down' ? 'text-accent-red' : 'text-text-muted'
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus

  return (
    <div className={`kpi-card ${statusColors[status] || 'kpi-blue'}`}>
      <div className="flex items-start justify-between mb-1">
        <span className="text-xs text-text-secondary font-medium uppercase tracking-wide">{label}</span>
        {Icon && <Icon size={16} className="text-text-muted" />}
      </div>
      <div className="text-2xl lg:text-3xl font-bold text-text-primary tracking-tight">{value}</div>
      {(subtitle || trendValue) && (
        <div className="flex items-center gap-2 mt-1.5">
          {trendValue && (
            <span className={`flex items-center gap-0.5 text-xs font-medium ${trendColor}`}>
              <TrendIcon size={12} />
              {trendValue}
            </span>
          )}
          {subtitle && <span className="text-xs text-text-muted">{subtitle}</span>}
        </div>
      )}
    </div>
  )
}
