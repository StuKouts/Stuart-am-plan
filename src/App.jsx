import { useState, useEffect, useRef } from "react";

const STORAGE_KEY = "stuart-am-plan-q2-2026";

const defaultClients = [
  { id: "boxmeer", name: "MSD Boxmeer", level: 1, resources: 0, notes: "", goals: [
    { text: "Update contacts on HubSpot, identify key decision makers for opportunities and reach out to develop or improve relationships.", status: "not_started" },
    { text: "Qualify 2 x secondment or project opportunities in Q2", status: "not_started" },
  ]},
  { id: "salamanca", name: "MSD Salamanca", level: 1, resources: 1, notes: "", goals: [
    { text: "Update contacts on HubSpot, identify key decision makers for opportunities and reach out to develop or improve relationships.", status: "not_started" },
    { text: "Qualify 2 x secondment or project opportunities in Q2", status: "not_started" },
    { text: "Establish quarterly catch ups with Sofia", status: "not_started" },
  ]},
  { id: "animal_health", name: "MSD Animal Health", level: 1, resources: 1, notes: "", goals: [
    { text: "Update contacts on HubSpot, identify key decision makers for opportunities and reach out to develop or improve relationships.", status: "not_started" },
    { text: "Qualify 2 x secondment or project opportunities in Q2", status: "not_started" },
    { text: "Continue to grow relationship with Steven Williams, leverage his new position to gain insight into upcoming opportunities", status: "not_started" },
    { text: "Reestablish revenue generation in Q2", status: "not_started" },
  ]},
  { id: "krems", name: "MSD Krems", level: 1, resources: null, notes: "", goals: [
    { text: "Update contacts on HubSpot, identify key decision makers for opportunities and reach out to develop or improve relationships.", status: "not_started" },
    { text: "Qualify 2 x secondment or project opportunities in Q2", status: "not_started" },
  ]},
  { id: "lindesnes", name: "GEHC Lindesnes", level: 1, resources: null, notes: "", goals: [
    { text: "Update contacts on HubSpot, identify key decision makers for opportunities and reach out to develop or improve relationships.", status: "not_started" },
    { text: "Qualify 2 x secondment or project opportunities in Q2", status: "not_started" },
  ]},
  { id: "unterschleissheim", name: "MSD Unterschleißheim", level: 2, resources: 0, notes: "", goals: [
    { text: "Update contacts on HubSpot, identify key decision makers for opportunities and reach out to develop or improve relationships.", status: "not_started" },
    { text: "Qualify 2 x secondment or project opportunities in Q2", status: "not_started" },
  ]},
  { id: "partnerships", name: "Partnerships (Aveva & SolutionsPT)", level: 2, resources: 1, notes: "", goals: [
    { text: "Update contacts on HubSpot, identify key decision makers for opportunities and reach out to develop or improve relationships.", status: "not_started" },
    { text: "Qualify 2 x secondment or project opportunities in Q2", status: "not_started" },
  ]},
  { id: "centrient", name: "Centrient", level: 2, resources: 0, notes: "", goals: [
    { text: "Update contacts on HubSpot, identify key decision makers for opportunities and reach out to develop or improve relationships.", status: "not_started" },
    { text: "Qualify 2 x secondment or project opportunities in Q2", status: "not_started" },
  ]},
  { id: "organon", name: "Organon", level: 2, resources: null, notes: "", goals: [
    { text: "Update contacts on HubSpot, identify key decision makers for opportunities and reach out to develop or improve relationships.", status: "not_started" },
    { text: "Qualify 2 x secondment or project opportunities in Q2", status: "not_started" },
  ]},
  { id: "depuy_uk", name: "DePuy UK", level: 2, resources: null, notes: "", goals: [
    { text: "Update contacts on HubSpot, identify key decision makers for opportunities and reach out to develop or improve relationships.", status: "not_started" },
    { text: "Qualify 2 x secondment or project opportunities in Q2", status: "not_started" },
  ]},
  { id: "janssen_nc", name: "Janssen North Carolina", level: 3, resources: 0, notes: "", goals: [
    { text: "Update contacts on HubSpot, identify key decision makers for opportunities and reach out to develop or improve relationships.", status: "not_started" },
    { text: "Qualify 2 x secondment or project opportunities in Q2", status: "not_started" },
  ]},
  { id: "jj_geel", name: "J&J Geel", level: 3, resources: null, notes: "", goals: [
    { text: "Update contacts on HubSpot, identify key decision makers for opportunities and reach out to develop or improve relationships.", status: "not_started" },
    { text: "Qualify 2 x secondment or project opportunities in Q2", status: "not_started" },
  ]},
  { id: "hovione", name: "Hovione Lisbon", level: 3, resources: null, notes: "", goals: [
    { text: "Update contacts on HubSpot, identify key decision makers for opportunities and reach out to develop or improve relationships.", status: "not_started" },
    { text: "Qualify 2 x secondment or project opportunities in Q2", status: "not_started" },
  ]},
];

const statusConfig = {
  not_started: { label: "Not Started", color: "#9CA3AF", bg: "#F3F4F6", icon: "○" },
  in_progress: { label: "In Progress", color: "#3B82F6", bg: "#EFF6FF", icon: "◐" },
  complete: { label: "Complete", color: "#16A34A", bg: "#F0FDF4", icon: "●" },
  behind: { label: "Behind", color: "#D97706", bg: "#FFFBEB", icon: "◑" },
  failed: { label: "Failed", color: "#E8453C", bg: "#FFF1F0", icon: "✕" },
};

const levelConfig = {
  1: { label: "Level 1", tag: "Top Priority", color: "#E8453C", bg: "#FFF1F0", border: "#FECDC9" },
  2: { label: "Level 2", tag: "Fact Finding", color: "#D97706", bg: "#FFFBEB", border: "#FDE68A" },
  3: { label: "Level 3", tag: "Service & Maintain", color: "#6B7280", bg: "#F9FAFB", border: "#E5E7EB" },
};

function StatusDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const cfg = statusConfig[value];

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        style={{ display: "flex", alignItems: "center", gap: "5px", padding: "4px 10px", borderRadius: "20px", background: cfg.bg, border: `1px solid ${cfg.color}30`, fontSize: "11px", fontWeight: 600, color: cfg.color, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" }}>
        <span style={{ fontSize: "10px" }}>{cfg.icon}</span>
        {cfg.label}
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={cfg.color} strokeWidth="3" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      {open && (
        <div style={{ position: "absolute", top: "100%", right: 0, marginTop: "4px", background: "#fff", borderRadius: "10px", border: "1px solid #E8E8E8", boxShadow: "0 8px 24px rgba(0,0,0,0.12)", zIndex: 50, overflow: "hidden", minWidth: "140px" }}>
          {Object.entries(statusConfig).map(([key, s]) => (
            <button key={key} onClick={(e) => { e.stopPropagation(); onChange(key); setOpen(false); }}
              style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%", padding: "9px 14px", border: "none", background: value === key ? s.bg : "#fff", cursor: "pointer", fontSize: "12px", fontWeight: 500, color: "#374151", fontFamily: "'DM Sans', sans-serif", textAlign: "left" }}>
              <span style={{ color: s.color, fontSize: "11px" }}>{s.icon}</span>{s.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ClientCard({ client, isExpanded, onToggle, onUpdate }) {
  const config = levelConfig[client.level];
  const [newGoal, setNewGoal] = useState("");
  const [editingNote, setEditingNote] = useState(false);
  const [noteText, setNoteText] = useState(client.notes || "");
  const [editingGoalIdx, setEditingGoalIdx] = useState(null);
  const [editGoalText, setEditGoalText] = useState("");

  const completedCount = client.goals.filter((g) => g.status === "complete").length;
  const progress = client.goals.length > 0 ? (completedCount / client.goals.length) * 100 : 0;

  const addGoal = (e) => { e.stopPropagation(); if (!newGoal.trim()) return; onUpdate({ ...client, goals: [...client.goals, { text: newGoal.trim(), status: "not_started" }] }); setNewGoal(""); };
  const deleteGoal = (e, idx) => { e.stopPropagation(); onUpdate({ ...client, goals: client.goals.filter((_, i) => i !== idx) }); };
  const updateGoalStatus = (idx, status) => { const goals = [...client.goals]; goals[idx] = { ...goals[idx], status }; onUpdate({ ...client, goals }); };
  const saveNote = (e) => { e.stopPropagation(); onUpdate({ ...client, notes: noteText }); setEditingNote(false); };
  const startEditGoal = (e, idx) => { e.stopPropagation(); setEditingGoalIdx(idx); setEditGoalText(client.goals[idx].text); };
  const saveEditGoal = (e) => { e.stopPropagation(); if (!editGoalText.trim()) return; const goals = [...client.goals]; goals[editingGoalIdx] = { ...goals[editingGoalIdx], text: editGoalText.trim() }; onUpdate({ ...client, goals }); setEditingGoalIdx(null); };

  return (
    <div style={{ background: "#fff", borderRadius: "14px", border: `1.5px solid ${isExpanded ? config.color : "#E8E8E8"}`, cursor: "pointer", transition: "all 0.25s cubic-bezier(.4,0,.2,1)", boxShadow: isExpanded ? `0 8px 24px -4px ${config.color}18, 0 2px 8px ${config.color}10` : "0 1px 3px rgba(0,0,0,0.04)", overflow: "hidden" }}>
      <div onClick={onToggle} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px", flex: 1, minWidth: 0 }}>
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: config.color, flexShrink: 0, boxShadow: `0 0 0 3px ${config.color}20` }} />
          <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 650, color: "#1a1a1a", fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.01em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{client.name}</h3>
          {client.notes && !isExpanded && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
            </svg>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "4px 10px", background: "#F9FAFB", borderRadius: "20px", border: "1px solid #E5E7EB" }}>
            <div style={{ width: "40px", height: "5px", borderRadius: "3px", background: "#E5E7EB", overflow: "hidden" }}>
              <div style={{ width: `${progress}%`, height: "100%", borderRadius: "3px", background: progress === 100 ? "#16A34A" : "#3B82F6", transition: "width 0.3s ease" }} />
            </div>
            <span style={{ fontSize: "11px", fontWeight: 600, color: "#6B7280", fontFamily: "'DM Sans', sans-serif" }}>{completedCount}/{client.goals.length}</span>
          </div>
          {client.resources !== null && (
            <div style={{ display: "flex", alignItems: "center", gap: "5px", padding: "4px 10px", background: client.resources > 0 ? "#F0FDF4" : "#F9FAFB", borderRadius: "20px", border: `1px solid ${client.resources > 0 ? "#BBF7D0" : "#E5E7EB"}` }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={client.resources > 0 ? "#16A34A" : "#9CA3AF"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
              <span style={{ fontSize: "12px", fontWeight: 600, color: client.resources > 0 ? "#16A34A" : "#9CA3AF", fontFamily: "'DM Sans', sans-serif" }}>{client.resources}</span>
            </div>
          )}
          <div style={{ padding: "4px 10px", borderRadius: "20px", background: config.bg, border: `1px solid ${config.border}`, fontSize: "11px", fontWeight: 700, color: config.color, fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", letterSpacing: "0.04em" }}>L{client.level}</div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "transform 0.25s ease", transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}><polyline points="6 9 12 15 18 9"/></svg>
        </div>
      </div>

      <div style={{ maxHeight: isExpanded ? "2000px" : "0", opacity: isExpanded ? 1 : 0, transition: "all 0.35s cubic-bezier(.4,0,.2,1)", overflow: "hidden" }}>
        <div style={{ padding: "0 22px 22px 22px", borderTop: "1px solid #f0f0f0" }}>
          {/* Notes */}
          <div style={{ margin: "14px 0 16px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
              <p style={{ margin: 0, fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#9CA3AF", fontFamily: "'DM Sans', sans-serif" }}>Notes</p>
              {!editingNote && (
                <button onClick={(e) => { e.stopPropagation(); setEditingNote(true); setNoteText(client.notes || ""); }}
                  style={{ background: "none", border: "none", fontSize: "12px", color: "#3B82F6", cursor: "pointer", fontWeight: 600, fontFamily: "'DM Sans', sans-serif", padding: "2px 6px", borderRadius: "4px" }}>
                  {client.notes ? "Edit" : "+ Add note"}
                </button>
              )}
            </div>
            {editingNote ? (
              <div onClick={(e) => e.stopPropagation()} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <textarea value={noteText} onChange={(e) => setNoteText(e.target.value)} placeholder="Add notes about this client..."
                  style={{ width: "100%", minHeight: "70px", padding: "10px 14px", borderRadius: "10px", border: "1.5px solid #3B82F6", fontSize: "13px", fontFamily: "'DM Sans', sans-serif", color: "#374151", resize: "vertical", outline: "none", background: "#FAFAFA", boxSizing: "border-box" }} />
                <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                  <button onClick={(e) => { e.stopPropagation(); setEditingNote(false); }} style={{ padding: "6px 14px", borderRadius: "8px", border: "1px solid #E5E7EB", background: "#fff", fontSize: "12px", fontWeight: 600, cursor: "pointer", color: "#6B7280", fontFamily: "'DM Sans', sans-serif" }}>Cancel</button>
                  <button onClick={saveNote} style={{ padding: "6px 14px", borderRadius: "8px", border: "none", background: "#111", fontSize: "12px", fontWeight: 600, cursor: "pointer", color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>Save</button>
                </div>
              </div>
            ) : client.notes ? (
              <div style={{ padding: "10px 14px", background: "#FEFCE8", borderRadius: "10px", border: "1px solid #FDE68A", fontSize: "13px", color: "#374151", lineHeight: 1.55, fontFamily: "'DM Sans', sans-serif", whiteSpace: "pre-wrap" }}>{client.notes}</div>
            ) : (
              <div style={{ padding: "10px 14px", background: "#FAFAFA", borderRadius: "10px", border: "1px dashed #D1D5DB", fontSize: "12px", color: "#9CA3AF", fontFamily: "'DM Sans', sans-serif" }}>No notes yet</div>
            )}
          </div>

          {/* Goals */}
          <p style={{ margin: "0 0 10px", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#9CA3AF", fontFamily: "'DM Sans', sans-serif" }}>Q2 Goals</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {client.goals.map((goal, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "10px", padding: "10px 14px", background: goal.status === "complete" ? "#F0FDF4" : "#FAFAFA", borderRadius: "10px", border: `1px solid ${goal.status === "complete" ? "#BBF7D0" : "#f0f0f0"}`, transition: "all 0.2s ease" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  {editingGoalIdx === i ? (
                    <div onClick={(e) => e.stopPropagation()} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <input type="text" value={editGoalText} onChange={(e) => setEditGoalText(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") saveEditGoal(e); if (e.key === "Escape") setEditingGoalIdx(null); }}
                        style={{ width: "100%", padding: "6px 10px", borderRadius: "8px", border: "1.5px solid #3B82F6", fontSize: "13px", fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box" }} autoFocus />
                      <div style={{ display: "flex", gap: "6px" }}>
                        <button onClick={saveEditGoal} style={{ padding: "4px 10px", borderRadius: "6px", border: "none", background: "#111", color: "#fff", fontSize: "11px", fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Save</button>
                        <button onClick={(e) => { e.stopPropagation(); setEditingGoalIdx(null); }} style={{ padding: "4px 10px", borderRadius: "6px", border: "1px solid #E5E7EB", background: "#fff", color: "#6B7280", fontSize: "11px", fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <span onClick={(e) => startEditGoal(e, i)} style={{ fontSize: "13.5px", color: goal.status === "complete" ? "#16A34A" : "#374151", lineHeight: 1.55, fontFamily: "'DM Sans', sans-serif", textDecoration: goal.status === "complete" ? "line-through" : "none", cursor: "text" }}>{goal.text}</span>
                  )}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0, marginTop: "2px" }}>
                  <StatusDropdown value={goal.status} onChange={(s) => updateGoalStatus(i, s)} />
                  <button onClick={(e) => deleteGoal(e, i)} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", borderRadius: "6px", display: "flex", alignItems: "center" }} title="Delete goal">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                </div>
              </div>
            ))}
            <div onClick={(e) => e.stopPropagation()} style={{ display: "flex", gap: "8px", padding: "4px" }}>
              <input type="text" value={newGoal} onChange={(e) => setNewGoal(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") addGoal(e); }}
                placeholder="Add a new goal..."
                style={{ flex: 1, padding: "10px 14px", borderRadius: "10px", border: "1.5px solid #E5E7EB", fontSize: "13px", fontFamily: "'DM Sans', sans-serif", outline: "none", transition: "border-color 0.2s ease", background: "#FAFAFA" }}
                onFocus={(e) => e.target.style.borderColor = "#3B82F6"} onBlur={(e) => e.target.style.borderColor = "#E5E7EB"} />
              <button onClick={addGoal} style={{ padding: "10px 18px", borderRadius: "10px", border: "none", background: newGoal.trim() ? "#111" : "#E5E7EB", color: newGoal.trim() ? "#fff" : "#9CA3AF", fontSize: "13px", fontWeight: 600, cursor: newGoal.trim() ? "pointer" : "default", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s ease", whiteSpace: "nowrap" }}>+ Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [clients, setClients] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : defaultClients;
    } catch { return defaultClients; }
  });
  const [filter, setFilter] = useState("all");
  const [expandedCards, setExpandedCards] = useState(new Set());
  const [saveIndicator, setSaveIndicator] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
      setSaveIndicator(true);
      setTimeout(() => setSaveIndicator(false), 1500);
    } catch (e) { console.error("Failed to save:", e); }
  }, [clients]);

  const updateClient = (updated) => setClients((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  const toggleCard = (idx) => setExpandedCards((prev) => { const next = new Set(prev); if (next.has(idx)) next.delete(idx); else next.add(idx); return next; });

  const filtered = filter === "all" ? clients : clients.filter((c) => c.level === Number(filter));
  const counts = { 1: 0, 2: 0, 3: 0 };
  clients.forEach((c) => counts[c.level]++);
  const totalGoals = clients.reduce((s, c) => s + c.goals.length, 0);
  const totalComplete = clients.reduce((s, c) => s + c.goals.filter((g) => g.status === "complete").length, 0);
  const overallProgress = totalGoals > 0 ? Math.round((totalComplete / totalGoals) * 100) : 0;

  const resetData = () => {
    if (confirm("Reset all data to defaults? This will clear all your changes.")) {
      setClients(defaultClients);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(168deg, #F8F7F4 0%, #F2F1EE 50%, #ECEAE6 100%)", fontFamily: "'DM Sans', sans-serif" }}>
      {/* Save indicator */}
      <div style={{ position: "fixed", top: "16px", right: "16px", zIndex: 100, display: "flex", alignItems: "center", gap: "6px", padding: "8px 14px", borderRadius: "10px", background: "#111", color: "#fff", fontSize: "12px", fontWeight: 600, opacity: saveIndicator ? 1 : 0, transform: saveIndicator ? "translateY(0)" : "translateY(-10px)", transition: "all 0.3s ease", pointerEvents: "none" }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        Saved
      </div>

      {/* Header */}
      <div style={{ padding: "40px 32px 0", maxWidth: "880px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ marginBottom: "6px" }}><span style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#9CA3AF" }}>Q2 2026 · Account Management</span></div>
            <h1 style={{ margin: "0 0 6px", fontSize: "38px", fontWeight: 300, color: "#111", fontFamily: "'Fraunces', serif", letterSpacing: "-0.02em", lineHeight: 1.15 }}>Stuart's Plan</h1>
            <p style={{ margin: "0 0 28px", fontSize: "15px", color: "#6B7280", lineHeight: 1.5 }}>Click goals to edit, use status dropdowns to track progress, and add notes per client. Changes auto-save.</p>
          </div>
          <button onClick={resetData} style={{ padding: "8px 14px", borderRadius: "8px", border: "1px solid #E5E7EB", background: "#fff", fontSize: "11px", fontWeight: 600, cursor: "pointer", color: "#9CA3AF", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap", marginTop: "36px" }}>Reset data</button>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "28px" }}>
          {[
            { label: "Overall Progress", value: `${overallProgress}%`, accent: "#111", extra: `${totalComplete}/${totalGoals} goals` },
            { label: "Level 1 — Priority", value: counts[1], accent: levelConfig[1].color },
            { label: "Level 2 — Develop", value: counts[2], accent: levelConfig[2].color },
            { label: "Level 3 — Maintain", value: counts[3], accent: levelConfig[3].color },
          ].map((stat, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: "12px", padding: "16px 18px", border: "1px solid #E8E8E8" }}>
              <div style={{ fontSize: "28px", fontWeight: 700, color: stat.accent, fontFamily: "'Fraunces', serif", lineHeight: 1, marginBottom: "4px" }}>{stat.value}</div>
              <div style={{ fontSize: "11px", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.04em" }}>{stat.label}</div>
              {stat.extra && <div style={{ fontSize: "11px", color: "#6B7280", marginTop: "2px" }}>{stat.extra}</div>}
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: "6px", marginBottom: "24px", padding: "4px", background: "#fff", borderRadius: "12px", border: "1px solid #E8E8E8", width: "fit-content" }}>
          {[{ key: "all", label: "All" }, { key: "1", label: "Level 1" }, { key: "2", label: "Level 2" }, { key: "3", label: "Level 3" }].map((f) => (
            <button key={f.key} onClick={() => setFilter(f.key)} style={{ padding: "8px 18px", borderRadius: "9px", border: "none", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s ease", background: filter === f.key ? "#111" : "transparent", color: filter === f.key ? "#fff" : "#6B7280" }}>{f.label}</button>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div style={{ padding: "0 32px 60px", maxWidth: "880px", margin: "0 auto" }}>
        {[1, 2, 3].map((level) => {
          const levelClients = filtered.filter((c) => c.level === level);
          if (levelClients.length === 0) return null;
          const config = levelConfig[level];
          return (
            <div key={level} style={{ marginBottom: "32px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px", padding: "0 4px" }}>
                <div style={{ width: "20px", height: "3px", borderRadius: "2px", background: config.color }} />
                <span style={{ fontSize: "13px", fontWeight: 700, color: config.color, textTransform: "uppercase", letterSpacing: "0.06em" }}>{config.label} — {config.tag}</span>
                <span style={{ fontSize: "12px", fontWeight: 500, color: "#9CA3AF" }}>({levelClients.length})</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {levelClients.map((client) => {
                  const globalIdx = clients.indexOf(client);
                  return <ClientCard key={client.id} client={client} isExpanded={expandedCards.has(globalIdx)} onToggle={() => toggleCard(globalIdx)} onUpdate={updateClient} />;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
