"use client";

// Mock data representing the window washing project state
const PRICE = 35;
const FLOORS = ["K", "1", "2", "3", "4", "5"] as const;

const mock = {
  total: 123,
  washed: 37,
  kesken: 12,
  p1: { total: 76, washed: 22, kesken: 8 },
  p2: { total: 47, washed: 15, kesken: 4 },
  floors: {
    K: { total: 18, washed: 5, kesken: 2 },
    "1": { total: 22, washed: 7, kesken: 2 },
    "2": { total: 20, washed: 6, kesken: 3 },
    "3": { total: 22, washed: 7, kesken: 3 },
    "4": { total: 19, washed: 5, kesken: 1 },
    "5": { total: 22, washed: 7, kesken: 1 },
  } as Record<string, { total: number; washed: number; kesken: number }>,
};

// Finnish locale number formatting
function fmt(n: number): string {
  return Math.round(n).toLocaleString("fi-FI");
}
function euro(n: number): string {
  return fmt(n) + " €";
}

// SVG ring circumference for r=80
const CIRC_LARGE = 2 * Math.PI * 80;

const computed = (() => {
  const { total, washed, kesken, p1, p2 } = mock;
  const unwashed = total - washed - kesken;
  const pct = total > 0 ? (washed / total) * 100 : 0;

  const p1Pct = p1.total > 0 ? (p1.washed / p1.total) * 100 : 0;
  const p2Pct = p2.total > 0 ? (p2.washed / p2.total) * 100 : 0;

  const revNow = washed * PRICE;
  const revMax = total * PRICE;

  return {
    total,
    washed,
    kesken,
    unwashed,
    pct,
    ringDash: `${((pct / 100) * CIRC_LARGE).toFixed(1)} ${CIRC_LARGE.toFixed(1)}`,
    pctStr: Math.round(pct) + " %",
    revNowStr: euro(revNow),
    revMaxStr: euro(revMax),
    revPctStr: Math.round(pct) + " %",
    p1: {
      ...p1,
      pct: p1Pct,
      pctStr: Math.round(p1Pct) + " %",
      revStr: euro(p1.washed * PRICE),
    },
    p2: {
      ...p2,
      pct: p2Pct,
      pctStr: Math.round(p2Pct) + " %",
      revStr: euro(p2.washed * PRICE),
    },
  };
})();

// Shared card style
const cardBase: React.CSSProperties = {
  background: "rgba(255,255,255,0.035)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "20px",
  backdropFilter: "blur(22px)",
  WebkitBackdropFilter: "blur(22px)",
};

const monoLabel: React.CSSProperties = {
  fontFamily: "var(--font-jetbrains-mono, monospace)",
  fontSize: "11px",
  letterSpacing: "0.14em",
  color: "rgba(255,255,255,0.4)",
};

export default function Dashboard() {
  const d = computed;

  return (
    <div
      style={{ height: "100%", overflowY: "auto", padding: "26px 30px 40px" }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Page header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <div>
            <div
              style={{
                ...monoLabel,
                letterSpacing: "0.18em",
                marginBottom: "7px",
              }}
            >
              KOKONAISTILANNE
            </div>
            <h1
              style={{
                margin: 0,
                fontSize: "30px",
                fontWeight: 700,
                letterSpacing: "-0.01em",
              }}
            >
              Projektin yleiskatsaus
            </h1>
          </div>
          <div
            style={{
              fontFamily: "var(--font-jetbrains-mono, monospace)",
              fontSize: "11px",
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.06em",
            }}
          >
            6 KERROSTA · {d.total} IKKUNAA
          </div>
        </div>

        {/* Row 1: Progress ring + Revenue */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.35fr 1fr",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          {/* Progress ring card */}
          <div
            className="anim-fadeUp-0"
            style={{
              ...cardBase,
              borderRadius: "22px",
              display: "flex",
              gap: "26px",
              alignItems: "center",
              padding: "30px",
            }}
          >
            {/* SVG ring */}
            <div
              style={{
                position: "relative",
                width: "184px",
                height: "184px",
                flexShrink: 0,
              }}
            >
              <svg
                width="184"
                height="184"
                viewBox="0 0 184 184"
                style={{ transform: "rotate(-90deg)" }}
              >
                <circle
                  cx="92"
                  cy="92"
                  r="80"
                  fill="none"
                  stroke="rgba(255,255,255,0.07)"
                  strokeWidth="11"
                />
                <circle
                  cx="92"
                  cy="92"
                  r="80"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="11"
                  strokeLinecap="round"
                  strokeDasharray={d.ringDash}
                  style={{ transition: "stroke-dasharray .7s cubic-bezier(.2,.8,.2,1)" }}
                />
              </svg>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "38px",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  {d.pctStr}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-jetbrains-mono, monospace)",
                    fontSize: "10px",
                    letterSpacing: "0.12em",
                    color: "rgba(255,255,255,0.45)",
                    marginTop: "3px",
                  }}
                >
                  VALMIS
                </div>
              </div>
            </div>

            {/* Stats column */}
            <div style={{ flex: 1 }}>
              <div
                style={{ ...monoLabel, letterSpacing: "0.14em", marginBottom: "10px" }}
              >
                KOKONAISEDISTYMINEN
              </div>
              <div
                style={{
                  fontSize: "34px",
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                  marginBottom: "2px",
                }}
              >
                {d.washed}{" "}
                <span
                  style={{ color: "rgba(255,255,255,0.35)", fontWeight: 500 }}
                >
                  / {d.total}
                </span>
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: "20px",
                }}
              >
                ikkunaa pesty
              </div>
              {/* Mini stat cards */}
              <div style={{ display: "flex", gap: "10px" }}>
                <div
                  style={{
                    flex: 1,
                    padding: "12px 14px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "13px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      marginBottom: "5px",
                    }}
                  >
                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "rgb(188,150,255)",
                        boxShadow: "0 0 7px rgba(188,150,255,0.7)",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontSize: "11px",
                        color: "rgba(255,255,255,0.5)",
                      }}
                    >
                      Kesken
                    </span>
                  </div>
                  <div style={{ fontSize: "21px", fontWeight: 600 }}>
                    {d.kesken}
                  </div>
                </div>
                <div
                  style={{
                    flex: 1,
                    padding: "12px 14px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "13px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      marginBottom: "5px",
                    }}
                  >
                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.4)",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontSize: "11px",
                        color: "rgba(255,255,255,0.5)",
                      }}
                    >
                      Pesemättä
                    </span>
                  </div>
                  <div style={{ fontSize: "21px", fontWeight: 600 }}>
                    {d.unwashed}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Revenue card */}
          <div
            className="anim-fadeUp-1"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "26px",
              background:
                "linear-gradient(155deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
              border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: "22px",
              backdropFilter: "blur(22px)",
              WebkitBackdropFilter: "blur(22px)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={monoLabel}>LIIKEVAIHTO</div>
              <div
                style={{
                  fontFamily: "var(--font-jetbrains-mono, monospace)",
                  fontSize: "10.5px",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                {PRICE} € / IKKUNA
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: "46px",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                }}
              >
                {d.revNowStr}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.45)",
                  marginTop: "4px",
                }}
              >
                / {d.revMaxStr} sopimusarvo
              </div>
            </div>
            <div>
              <div
                style={{
                  height: "9px",
                  borderRadius: "6px",
                  background: "rgba(255,255,255,0.08)",
                  overflow: "hidden",
                  marginBottom: "9px",
                }}
              >
                <div
                  style={{
                    width: `${d.pct.toFixed(1)}%`,
                    height: "100%",
                    borderRadius: "6px",
                    background:
                      "linear-gradient(90deg, rgba(255,255,255,0.55), #fff)",
                    boxShadow: "0 0 12px rgba(255,255,255,0.4)",
                    transition: "width .6s",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: "var(--font-jetbrains-mono, monospace)",
                  fontSize: "10.5px",
                  color: "rgba(255,255,255,0.45)",
                }}
              >
                <span>
                  {d.washed} × {PRICE} €
                </span>
                <span>{d.revPctStr} kerätty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: P1 + P2 + mini cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          {/* Prioriteetti 1 */}
          <div
            className="anim-fadeUp-2"
            style={{ ...cardBase, padding: "22px" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "18px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "9px" }}
              >
                <span
                  style={{
                    width: "11px",
                    height: "11px",
                    borderRadius: "50%",
                    background: "rgb(255,72,72)",
                    boxShadow: "0 0 10px rgba(255,72,72,0.8)",
                  }}
                />
                <span style={{ fontSize: "14px", fontWeight: 600 }}>
                  Prioriteetti 1
                </span>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-jetbrains-mono, monospace)",
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                {d.p1.pctStr}
              </span>
            </div>
            <div
              style={{
                fontSize: "28px",
                fontWeight: 700,
                marginBottom: "3px",
              }}
            >
              {d.p1.washed}{" "}
              <span
                style={{
                  color: "rgba(255,255,255,0.32)",
                  fontWeight: 500,
                  fontSize: "22px",
                }}
              >
                / {d.p1.total}
              </span>
            </div>
            <div
              style={{
                height: "6px",
                borderRadius: "5px",
                background: "rgba(255,255,255,0.08)",
                overflow: "hidden",
                margin: "13px 0 14px",
              }}
            >
              <div
                style={{
                  width: `${d.p1.pct.toFixed(1)}%`,
                  height: "100%",
                  borderRadius: "5px",
                  background: "rgb(255,72,72)",
                  boxShadow: "0 0 10px rgba(255,72,72,0.6)",
                  transition: "width .6s",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "12px",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              <span>
                Kesken{" "}
                <b style={{ color: "#fff", fontWeight: 600 }}>
                  {d.p1.kesken}
                </b>
              </span>
              <span>{d.p1.revStr}</span>
            </div>
          </div>

          {/* Prioriteetti 2 */}
          <div
            className="anim-fadeUp-3"
            style={{ ...cardBase, padding: "22px" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "18px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "9px" }}
              >
                <span
                  style={{
                    width: "11px",
                    height: "11px",
                    borderRadius: "50%",
                    background: "rgb(255,205,40)",
                    boxShadow: "0 0 10px rgba(255,205,40,0.8)",
                  }}
                />
                <span style={{ fontSize: "14px", fontWeight: 600 }}>
                  Prioriteetti 2
                </span>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-jetbrains-mono, monospace)",
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                {d.p2.pctStr}
              </span>
            </div>
            <div
              style={{
                fontSize: "28px",
                fontWeight: 700,
                marginBottom: "3px",
              }}
            >
              {d.p2.washed}{" "}
              <span
                style={{
                  color: "rgba(255,255,255,0.32)",
                  fontWeight: 500,
                  fontSize: "22px",
                }}
              >
                / {d.p2.total}
              </span>
            </div>
            <div
              style={{
                height: "6px",
                borderRadius: "5px",
                background: "rgba(255,255,255,0.08)",
                overflow: "hidden",
                margin: "13px 0 14px",
              }}
            >
              <div
                style={{
                  width: `${d.p2.pct.toFixed(1)}%`,
                  height: "100%",
                  borderRadius: "5px",
                  background: "rgb(255,205,40)",
                  boxShadow: "0 0 10px rgba(255,205,40,0.6)",
                  transition: "width .6s",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "12px",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              <span>
                Kesken{" "}
                <b style={{ color: "#fff", fontWeight: 600 }}>
                  {d.p2.kesken}
                </b>
              </span>
              <span>{d.p2.revStr}</span>
            </div>
          </div>

          {/* Two mini cards stacked */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div
              className="anim-fadeUp-4"
              style={{
                ...cardBase,
                flex: 1,
                padding: "18px 20px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-jetbrains-mono, monospace)",
                  fontSize: "10px",
                  letterSpacing: "0.12em",
                  color: "rgba(255,255,255,0.4)",
                  marginBottom: "9px",
                }}
              >
                TÄNÄÄN TEHTY
              </div>
              <div
                style={{ display: "flex", alignItems: "baseline", gap: "8px" }}
              >
                <span style={{ fontSize: "25px", fontWeight: 700 }}>0</span>
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)" }}>
                  ikkunaa · 0 €
                </span>
              </div>
            </div>
            <div
              className="anim-fadeUp-5"
              style={{
                ...cardBase,
                flex: 1,
                padding: "18px 20px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-jetbrains-mono, monospace)",
                  fontSize: "10px",
                  letterSpacing: "0.12em",
                  color: "rgba(255,255,255,0.4)",
                  marginBottom: "9px",
                }}
              >
                ARVIO JÄLJELLÄ
              </div>
              <div
                style={{ display: "flex", alignItems: "baseline", gap: "8px" }}
              >
                <span style={{ fontSize: "25px", fontWeight: 700 }}>
                  {d.total - d.washed}
                </span>
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)" }}>
                  ikkunaa · —
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Row 3: Floor breakdown + Recent activity */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.7fr 1fr",
            gap: "16px",
          }}
        >
          {/* Floor breakdown */}
          <div
            className="anim-fadeUp-6"
            style={{ ...cardBase, padding: "22px 24px" }}
          >
            <div style={{ ...monoLabel, marginBottom: "16px" }}>
              KERROKSITTAIN
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              {FLOORS.map((f) => {
                const fd = mock.floors[f];
                const fpct = fd.total > 0 ? (fd.washed / fd.total) * 100 : 0;
                return (
                  <button
                    key={f}
                    className="floor-row-btn"
                  >
                    <span
                      style={{
                        width: "34px",
                        height: "34px",
                        flexShrink: 0,
                        borderRadius: "9px",
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.09)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        fontSize: "14px",
                        color: "#fff",
                      }}
                    >
                      {f}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          height: "7px",
                          borderRadius: "5px",
                          background: "rgba(255,255,255,0.08)",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${fpct.toFixed(1)}%`,
                            height: "100%",
                            borderRadius: "5px",
                            background:
                              "linear-gradient(90deg, rgba(255,255,255,0.5), #fff)",
                            transition: "width .6s",
                          }}
                        />
                      </div>
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-jetbrains-mono, monospace)",
                        fontSize: "12px",
                        color: "rgba(255,255,255,0.6)",
                        width: "74px",
                        textAlign: "right",
                      }}
                    >
                      {fd.washed}/{fd.total}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-jetbrains-mono, monospace)",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#fff",
                        width: "50px",
                        textAlign: "right",
                      }}
                    >
                      {Math.round(fpct)} %
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recent activity */}
          <div
            className="anim-fadeUp-7"
            style={{ ...cardBase, padding: "22px 24px" }}
          >
            <div style={{ ...monoLabel, marginBottom: "16px" }}>
              VIIMEISIN TOIMINTA
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "rgba(255,255,255,0.35)",
                padding: "8px 0",
              }}
            >
              Ei vielä kirjattua toimintaa. Avaa kerrosnäkymä ja merkitse
              ikkunat pestyiksi.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
