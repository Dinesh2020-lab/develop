export default function ProgressBar({ value = 0, color = 'var(--accent)' }) {
  return (
    <div className="progress-wrap">
      <div className="progress-label">
        <span>Progress</span>
        <span>{value}%</span>
      </div>
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${value}%`, color }}
        />
      </div>
    </div>
  )
}
