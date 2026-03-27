export default function ChartCard({ title, subtitle, children, className = '' }) {
  return (
    <div className={`card ${className}`}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="text-sm font-semibold text-text-primary">{title}</h3>}
          {subtitle && <p className="text-xs text-text-muted mt-0.5">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  )
}
