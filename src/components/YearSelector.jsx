import { YEARS } from '../data/financialData'

export default function YearSelector({ selected, onChange }) {
  return (
    <div className="flex items-center gap-1 bg-bg-card border border-bg-border rounded-lg p-1">
      {YEARS.map(y => (
        <button
          key={y}
          onClick={() => onChange(y)}
          className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
            selected === y
              ? 'bg-accent-blue text-white shadow-lg shadow-accent-blue/20'
              : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover'
          }`}
        >
          {y}
        </button>
      ))}
    </div>
  )
}
