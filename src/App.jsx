import data from './data/telemetry.json'

const STATUS_LABEL = {
  running: 'Running',
  idle: 'Idle',
  maintenance: 'Maintenance',
}

function EngineCard({ engine }) {
  return (
    <article className={`card card--${engine.status}`}>
      <header className="card__head">
        <div>
          <h2 className="card__name">{engine.name}</h2>
          <span className="card__id">{engine.id}</span>
        </div>
        <span className={`badge badge--${engine.status}`}>
          <span className="badge__dot" aria-hidden="true" />
          {STATUS_LABEL[engine.status]}
        </span>
      </header>

      <div className="card__fuel">
        <div className="card__fuel-label">
          <span>Fuel</span>
          <span className="card__fuel-value">{engine.fuel_percent}%</span>
        </div>
        <div
          className="fuelbar"
          role="meter"
          aria-valuenow={engine.fuel_percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${engine.name} fuel level`}
        >
          <div
            className={`fuelbar__fill fuelbar__fill--${engine.status}`}
            style={{ width: `${engine.fuel_percent}%` }}
          />
        </div>
      </div>

      <dl className="card__metrics">
        <div>
          <dt>Running hours</dt>
          <dd>{engine.running_hours.toFixed(1)} h</dd>
        </div>
        <div>
          <dt>RPM</dt>
          <dd>{engine.rpm}</dd>
        </div>
        <div>
          <dt>Fuel flow</dt>
          <dd>{engine.fuel_flow_lph.toFixed(1)} L/h</dd>
        </div>
        <div>
          <dt>Temperature</dt>
          <dd>{engine.temperature_c} °C</dd>
        </div>
      </dl>

      <footer className="card__foot">
        <span>
          {engine.location.lat.toFixed(4)}, {engine.location.lng.toFixed(4)}
        </span>
        <span>ping {engine.last_ping.slice(11, 19)}</span>
      </footer>
    </article>
  )
}

export default function App() {
  const counts = data.engines.reduce(
    (acc, e) => ({ ...acc, [e.status]: (acc[e.status] || 0) + 1 }),
    {}
  )

  return (
    <div className="page">
      <header className="page__head">
        <div>
          <p className="page__kicker">Irrigation telemetry · demo data</p>
          <h1 className="page__title">{data.site}</h1>
        </div>
        <div className="summary" aria-label="Engine status summary">
          <span className="summary__item summary__item--running">
            {counts.running || 0} running
          </span>
          <span className="summary__item summary__item--idle">
            {counts.idle || 0} idle
          </span>
          <span className="summary__item summary__item--maintenance">
            {counts.maintenance || 0} maintenance
          </span>
        </div>
      </header>

      <main>
        <section className="grid" aria-label="Engines">
          {data.engines.map((engine) => (
            <EngineCard key={engine.id} engine={engine} />
          ))}
        </section>

        <section className="log" aria-label="Telemetry event log">
          <h2 className="log__title">Event log</h2>
          <table className="log__table">
            <thead>
              <tr>
                <th scope="col">Time</th>
                <th scope="col">Engine</th>
                <th scope="col">Event</th>
                <th scope="col">Detail</th>
              </tr>
            </thead>
            <tbody>
              {data.telemetry_log.map((row, i) => (
                <tr key={i}>
                  <td className="log__time">{row.time}</td>
                  <td>{row.engine_id}</td>
                  <td>
                    <span className={`log__event log__event--${row.event}`}>
                      {row.event}
                    </span>
                  </td>
                  <td className="log__detail">{row.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      <footer className="page__foot">
        Synthetic data — pattern demo only, no connection to any live system.
      </footer>
    </div>
  )
}
