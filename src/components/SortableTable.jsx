import { useState, useMemo } from 'react'
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'
import { fmtFull } from '../data/financialData'

export default function SortableTable({ columns, data, defaultSort, formatters = {} }) {
  const [sortKey, setSortKey] = useState(defaultSort || null)
  const [sortDir, setSortDir] = useState('desc')

  const sorted = useMemo(() => {
    if (!sortKey) return data
    return [...data].sort((a, b) => {
      const va = a[sortKey], vb = b[sortKey]
      if (typeof va === 'number' && typeof vb === 'number') {
        return sortDir === 'asc' ? va - vb : vb - va
      }
      return sortDir === 'asc'
        ? String(va).localeCompare(String(vb))
        : String(vb).localeCompare(String(va))
    })
  }, [data, sortKey, sortDir])

  function toggleSort(key) {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-bg-border">
            {columns.map(col => (
              <th
                key={col.key}
                onClick={() => col.sortable !== false && toggleSort(col.key)}
                className={`px-3 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wider whitespace-nowrap ${
                  col.sortable !== false ? 'cursor-pointer hover:text-text-primary select-none' : ''
                } ${col.align === 'right' ? 'text-right' : ''}`}
              >
                <span className="inline-flex items-center gap-1">
                  {col.label}
                  {col.sortable !== false && (
                    sortKey === col.key
                      ? sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />
                      : <ChevronsUpDown size={10} className="opacity-30" />
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr key={i} className={`table-row ${row._highlight ? 'bg-accent-blue/5' : ''}`}>
              {columns.map(col => {
                const raw = row[col.key]
                const formatter = formatters[col.key] || (col.format === 'currency' ? fmtFull : null)
                const display = formatter ? formatter(raw, row) : raw
                return (
                  <td
                    key={col.key}
                    className={`px-3 py-2.5 whitespace-nowrap ${col.align === 'right' ? 'text-right font-mono' : ''} ${
                      typeof raw === 'number' && raw < 0 ? 'text-accent-red' : 'text-text-primary'
                    }`}
                  >
                    {display}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
