"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";

export type Tab = "dashboard" | "floor" | "hours";

export default function AppShell() {
  const [tab, setTab] = useState<Tab>("dashboard");

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#000000",
        color: "#fff",
        overflow: "hidden",
        fontFamily: "var(--font-onest, system-ui, sans-serif)",
      }}
    >
      {/* Ambient background gradients */}
      <div
        className="anim-drift"
        style={{
          position: "absolute",
          top: "-30%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "1100px",
          height: "700px",
          background:
            "radial-gradient(ellipse at center, rgba(120,120,160,0.10), transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-20%",
          right: "-5%",
          width: "700px",
          height: "600px",
          background:
            "radial-gradient(ellipse at center, rgba(80,90,120,0.08), transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <Navbar activeTab={tab} onTabChange={setTab} />

      <main
        style={{
          position: "relative",
          zIndex: 10,
          height: "calc(100% - 62px)",
        }}
      >
        {tab === "dashboard" && <Dashboard />}
        {tab === "floor" && (
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-jetbrains-mono, monospace)",
                fontSize: "11px",
                letterSpacing: "0.18em",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              TULOSSA PIAN
            </div>
            <div style={{ fontSize: "18px", fontWeight: 600 }}>
              Tilanne kerroksittain
            </div>
          </div>
        )}
        {tab === "hours" && (
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-jetbrains-mono, monospace)",
                fontSize: "11px",
                letterSpacing: "0.18em",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              TULOSSA PIAN
            </div>
            <div style={{ fontSize: "18px", fontWeight: 600 }}>
              Tehdyt tunnit
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
