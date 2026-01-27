import React from 'react';

// Simple SVG France map approximation using a lon/lat linear projection over France bounds.
// This is an approximate projection (not geographically accurate) intended for UI display.

const bbox = {
    lonMin: -5.5, // west
    lonMax: 9.5,  // east (includes Corsica)
    latMin: 41.0, // south (Corsica)
    latMax: 51.5, // north
};

function project(lon, lat, width, height) {
    const x = ((lon - bbox.lonMin) / (bbox.lonMax - bbox.lonMin)) * width;
    const y = ((bbox.latMax - lat) / (bbox.latMax - bbox.latMin)) * height;
    return { x, y };
}

export default function FranceMap({ events = [], width = 800, height = 600 }) {
    // category color map
    const colors = {
        meeting: '#06b6d4',
        race: '#ef4444',
        salon: '#f59e0b',
        rally: '#10b981',
        auction: '#8b5cf6',
        default: '#64748b',
    };

    return (
        <div className="w-full overflow-hidden rounded-lg bg-background/50 p-4">
            <div className="mb-2 flex items-center justify-between">
                <h3 className="font-medium">Carte — événements en France</h3>
                <div className="text-sm text-muted-foreground">Survolez un point pour voir l'événement</div>
            </div>

            <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="400" preserveAspectRatio="xMidYMid meet">
                {/* simple background to suggest land */}
                <rect x="0" y="0" width={width} height={height} fill="#f8fafc" />

                {/* optional graticule */}
                {[...Array(5)].map((_, i) => (
                    <line
                        key={`grid-x-${i}`}
                        x1={(i / 4) * width}
                        x2={(i / 4) * width}
                        y1={0}
                        y2={height}
                        stroke="#e6eef6"
                        strokeWidth={0.5}
                    />
                ))}
                {[...Array(5)].map((_, i) => (
                    <line
                        key={`grid-y-${i}`}
                        y1={(i / 4) * height}
                        y2={(i / 4) * height}
                        x1={0}
                        x2={width}
                        stroke="#e6eef6"
                        strokeWidth={0.5}
                    />
                ))}

                {/* coastline hint: draw a rough hexagon-ish shape to suggest France silhouette */}
                <path
                    d={`M ${0.12 * width} ${0.12 * height}
              L ${0.3 * width} ${0.02 * height}
              L ${0.55 * width} ${0.06 * height}
              L ${0.85 * width} ${0.18 * height}
              L ${0.82 * width} ${0.45 * height}
              L ${0.65 * width} ${0.8 * height}
              L ${0.35 * width} ${0.92 * height}
              L ${0.15 * width} ${0.7 * height}
              Z`}
                    fill="#e6f2ff"
                    stroke="#cfe8ff"
                    strokeWidth={1}
                />

                {/* Plot event points */}
                {events.map((ev) => {
                    if (!ev.coords) return null;
                    const { x, y } = project(ev.coords.lon, ev.coords.lat, width, height);
                    const color = colors[ev.category] || colors.default;
                    return (
                        <g key={ev.id} transform={`translate(${x}, ${y})`} style={{ cursor: 'pointer' }}>
                            <circle r={8} fill={color} stroke="#fff" strokeWidth={1.5} />
                            <circle r={4} fill="#fff" />
                            <title>{`${ev.title} — ${ev.location}`}</title>
                        </g>
                    );
                })}

            </svg>

            {/* legend */}
            <div className="mt-3 flex flex-wrap gap-3 text-sm">
                {Object.entries(colors).map(([k, v]) => (
                    <div key={k} className="flex items-center gap-2">
                        <span style={{ background: v }} className="inline-block h-3 w-3 rounded-full" />
                        <span className="text-xs text-muted-foreground">{k}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
