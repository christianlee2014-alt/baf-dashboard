const statusMap = {
  green: { bg: 'bg-accent-green/10', text: 'text-accent-green', dot: 'bg-accent-green', border: 'border-accent-green/20' },
  red: { bg: 'bg-accent-red/10', text: 'text-accent-red', dot: 'bg-accent-red', border: 'border-accent-red/20' },
  amber: { bg: 'bg-accent-amber/10', text: 'text-accent-amber', dot: 'bg-accent-amber', border: 'border-accent-amber/20' },
  blue: { bg: 'bg-accent-blue/10', text: 'text-accent-blue', dot: 'bg-accent-blue', border: 'border-accent-blue/20' },
}

export default function HealthBadge({ label, value, target, status, detail }) {
  const s = statusMap[status] || statusMap.blue
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg border ${s.border} ${s.bg}`}>
      <div className="flex items-center gap-3 min-w-0">
        <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${s.dot} ${status === 'red' ? 'animate-pulse' : ''}`} />
        <div className="min-w-0">
          <div className="text-sm font-medium text-text-primary">{label}</div>
          <div className="text-xs text-text-muted">{detail}</div>
        </div>
      </div>
      <div className="text-right shrink-0 ml-3">
        <div className={`text-sm font-bold ${s.text}`}>{value}</div>
        <div className="text-[10px] text-text-muted">Target: {target}</div>
      </div>
    </div>
  )
}
