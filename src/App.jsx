import { useState, useEffect, useRef } from "react";

const STORAGE_KEY = "stuart-am-plan-data-v2";

const defaultQuarters = [
  {
    id: "q2_2026",
    label: "Q2 2026",
    clients: [
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
    ],
  },
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
  useEffect(() => { const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }; document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h); }, []);
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        style={{ display: "flex", alignItems: "center", gap: "5px", padding: "4px 10px", borderRadius: "20px", background: cfg.bg, border: `1px solid ${cfg.color}30`, fontSize: "11px", fontWeight: 600, color: cfg.color, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" }}>
        <span style={{ fontSize: "10px" }}>{cfg.icon}</span>{cfg.label}
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

function LevelDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const cfg = levelConfig[value];
  useEffect(() => { const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }; document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h); }, []);
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        style={{ padding: "4px 10px", borderRadius: "20px", background: cfg.bg, border: `1px solid ${cfg.border}`, fontSize: "11px", fontWeight: 700, color: cfg.color, fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", letterSpacing: "0.04em", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>
        L{value}
        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={cfg.color} strokeWidth="3" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      {open && (
        <div style={{ position: "absolute", top: "100%", right: 0, marginTop: "4px", background: "#fff", borderRadius: "10px", border: "1px solid #E8E8E8", boxShadow: "0 8px 24px rgba(0,0,0,0.12)", zIndex: 50, overflow: "hidden", minWidth: "160px" }}>
          {Object.entries(levelConfig).map(([key, l]) => (
            <button key={key} onClick={(e) => { e.stopPropagation(); onChange(Number(key)); setOpen(false); }}
              style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%", padding: "9px 14px", border: "none", background: value === Number(key) ? l.bg : "#fff", cursor: "pointer", fontSize: "12px", fontWeight: 500, color: "#374151", fontFamily: "'DM Sans', sans-serif", textAlign: "left" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: l.color }} />
              {l.label} — {l.tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ClientCard({ client, isExpanded, onToggle, onUpdate, onDelete }) {
  const config = levelConfig[client.level];
  const [newGoal, setNewGoal] = useState("");
  const [editingNote, setEditingNote] = useState(false);
  const [noteText, setNoteText] = useState(client.notes || "");
  const [editingGoalIdx, setEditingGoalIdx] = useState(null);
  const [editGoalText, setEditGoalText] = useState("");
  const [editingName, setEditingName] = useState(false);
  const [nameText, setNameText] = useState(client.name);

  const completedCount = client.goals.filter((g) => g.status === "complete").length;
  const progress = client.goals.length > 0 ? (completedCount / client.goals.length) * 100 : 0;

  const addGoal = (e) => { e.stopPropagation(); if (!newGoal.trim()) return; onUpdate({ ...client, goals: [...client.goals, { text: newGoal.trim(), status: "not_started" }] }); setNewGoal(""); };
  const deleteGoal = (e, idx) => { e.stopPropagation(); onUpdate({ ...client, goals: client.goals.filter((_, i) => i !== idx) }); };
  const updateGoalStatus = (idx, status) => { const goals = [...client.goals]; goals[idx] = { ...goals[idx], status }; onUpdate({ ...client, goals }); };
  const saveNote = (e) => { e.stopPropagation(); onUpdate({ ...client, notes: noteText }); setEditingNote(false); };
  const startEditGoal = (e, idx) => { e.stopPropagation(); setEditingGoalIdx(idx); setEditGoalText(client.goals[idx].text); };
  const saveEditGoal = (e) => { e.stopPropagation(); if (!editGoalText.trim()) return; const goals = [...client.goals]; goals[editingGoalIdx] = { ...goals[editingGoalIdx], text: editGoalText.trim() }; onUpdate({ ...client, goals }); setEditingGoalIdx(null); };
  const saveName = (e) => { e.stopPropagation(); if (!nameText.trim()) return; onUpdate({ ...client, name: nameText.trim() }); setEditingName(false); };
  const updateLevel = (level) => { onUpdate({ ...client, level }); };

  return (
    <div style={{ background: "#fff", borderRadius: "14px", border: `1.5px solid ${isExpanded ? config.color : "#E8E8E8"}`, cursor: "pointer", transition: "all 0.25s cubic-bezier(.4,0,.2,1)", boxShadow: isExpanded ? `0 8px 24px -4px ${config.color}18, 0 2px 8px ${config.color}10` : "0 1px 3px rgba(0,0,0,0.04)", overflow: "hidden" }}>
      <div onClick={onToggle} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px", flex: 1, minWidth: 0 }}>
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: config.color, flexShrink: 0, boxShadow: `0 0 0 3px ${config.color}20` }} />
          {editingName ? (
            <div onClick={(e) => e.stopPropagation()} style={{ flex: 1 }}>
              <input type="text" value={nameText} onChange={(e) => setNameText(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") saveName(e); if (e.key === "Escape") { setEditingName(false); setNameText(client.name); } }}
                onBlur={saveName}
                style={{ width: "100%", padding: "4px 8px", borderRadius: "6px", border: "1.5px solid #3B82F6", fontSize: "16px", fontWeight: 650, fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box" }}
                autoFocus />
            </div>
          ) : (
            <h3 onDoubleClick={(e) => { e.stopPropagation(); setEditingName(true); setNameText(client.name); }}
              style={{ margin: 0, fontSize: "16px", fontWeight: 650, color: "#1a1a1a", fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.01em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
              title="Double-click to edit name">
              {client.name}
            </h3>
          )}
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
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={client.resources > 0 ? "#16A34A" : "#9CA3AF"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <span style={{ fontSize: "12px", fontWeight: 600, color: client.resources > 0 ? "#16A34A" : "#9CA3AF", fontFamily: "'DM Sans', sans-serif" }}>{client.resources}</span>
            </div>
          )}
          <LevelDropdown value={client.level} onChange={updateLevel} />
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
          <p style={{ margin: "0 0 10px", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#9CA3AF", fontFamily: "'DM Sans', sans-serif" }}>Goals</p>
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

          {/* Delete client */}
          <div style={{ marginTop: "16px", paddingTop: "14px", borderTop: "1px solid #f0f0f0", display: "flex", justifyContent: "flex-end" }}>
            <button onClick={(e) => { e.stopPropagation(); if (confirm(`Remove ${client.name} from this quarter?`)) onDelete(client.id); }}
              style={{ background: "none", border: "none", fontSize: "12px", color: "#D1D5DB", cursor: "pointer", fontWeight: 500, fontFamily: "'DM Sans', sans-serif", padding: "4px 8px", borderRadius: "6px" }}
              onMouseEnter={(e) => e.target.style.color = "#E8453C"}
              onMouseLeave={(e) => e.target.style.color = "#D1D5DB"}>
              Remove client
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AddClientModal({ onAdd, onClose }) {
  const [name, setName] = useState("");
  const [level, setLevel] = useState(2);
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: "16px", padding: "28px", maxWidth: "420px", width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
        <h3 style={{ margin: "0 0 20px", fontSize: "18px", fontWeight: 700, fontFamily: "'DM Sans', sans-serif", color: "#111" }}>Add New Client</h3>
        <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#6B7280", marginBottom: "6px", fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", letterSpacing: "0.04em" }}>Client Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Pfizer Dublin"
          onKeyDown={(e) => { if (e.key === "Enter" && name.trim()) { onAdd(name.trim(), level); onClose(); } }}
          style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1.5px solid #E5E7EB", fontSize: "14px", fontFamily: "'DM Sans', sans-serif", outline: "none", marginBottom: "16px", boxSizing: "border-box" }}
          autoFocus />
        <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#6B7280", marginBottom: "8px", fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", letterSpacing: "0.04em" }}>Priority Level</label>
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
          {[1, 2, 3].map((l) => {
            const cfg = levelConfig[l];
            return (
              <button key={l} onClick={() => setLevel(l)}
                style={{ flex: 1, padding: "10px", borderRadius: "10px", border: `2px solid ${level === l ? cfg.color : "#E5E7EB"}`, background: level === l ? cfg.bg : "#fff", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s ease" }}>
                <div style={{ fontSize: "13px", fontWeight: 700, color: cfg.color }}>Level {l}</div>
                <div style={{ fontSize: "10px", color: "#6B7280", marginTop: "2px" }}>{cfg.tag}</div>
              </button>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ padding: "10px 20px", borderRadius: "10px", border: "1px solid #E5E7EB", background: "#fff", fontSize: "13px", fontWeight: 600, cursor: "pointer", color: "#6B7280", fontFamily: "'DM Sans', sans-serif" }}>Cancel</button>
          <button onClick={() => { if (name.trim()) { onAdd(name.trim(), level); onClose(); } }}
            style={{ padding: "10px 20px", borderRadius: "10px", border: "none", background: name.trim() ? "#111" : "#E5E7EB", fontSize: "13px", fontWeight: 600, cursor: name.trim() ? "pointer" : "default", color: name.trim() ? "#fff" : "#9CA3AF", fontFamily: "'DM Sans', sans-serif" }}>Add Client</button>
        </div>
      </div>
    </div>
  );
}

function AddQuarterModal({ onAdd, onClose, existingLabels }) {
  const [label, setLabel] = useState("");
  const [copyFrom, setCopyFrom] = useState("empty");
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: "16px", padding: "28px", maxWidth: "420px", width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
        <h3 style={{ margin: "0 0 20px", fontSize: "18px", fontWeight: 700, fontFamily: "'DM Sans', sans-serif", color: "#111" }}>Add New Quarter</h3>
        <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#6B7280", marginBottom: "6px", fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", letterSpacing: "0.04em" }}>Quarter Name</label>
        <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="e.g. Q3 2026"
          onKeyDown={(e) => { if (e.key === "Enter" && label.trim()) { onAdd(label.trim(), copyFrom); onClose(); } }}
          style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1.5px solid #E5E7EB", fontSize: "14px", fontFamily: "'DM Sans', sans-serif", outline: "none", marginBottom: "16px", boxSizing: "border-box" }}
          autoFocus />
        <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#6B7280", marginBottom: "8px", fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", letterSpacing: "0.04em" }}>Start from</label>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "24px" }}>
          <button onClick={() => setCopyFrom("empty")}
            style={{ padding: "10px 14px", borderRadius: "10px", border: `2px solid ${copyFrom === "empty" ? "#111" : "#E5E7EB"}`, background: copyFrom === "empty" ? "#F9FAFB" : "#fff", cursor: "pointer", fontSize: "13px", fontWeight: 500, color: "#374151", fontFamily: "'DM Sans', sans-serif", textAlign: "left" }}>
            Empty quarter — start fresh
          </button>
          {existingLabels.map((el) => (
            <button key={el.id} onClick={() => setCopyFrom(el.id)}
              style={{ padding: "10px 14px", borderRadius: "10px", border: `2px solid ${copyFrom === el.id ? "#111" : "#E5E7EB"}`, background: copyFrom === el.id ? "#F9FAFB" : "#fff", cursor: "pointer", fontSize: "13px", fontWeight: 500, color: "#374151", fontFamily: "'DM Sans', sans-serif", textAlign: "left" }}>
              Copy clients from {el.label} (goals reset to Not Started)
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ padding: "10px 20px", borderRadius: "10px", border: "1px solid #E5E7EB", background: "#fff", fontSize: "13px", fontWeight: 600, cursor: "pointer", color: "#6B7280", fontFamily: "'DM Sans', sans-serif" }}>Cancel</button>
          <button onClick={() => { if (label.trim()) { onAdd(label.trim(), copyFrom); onClose(); } }}
            style={{ padding: "10px 20px", borderRadius: "10px", border: "none", background: label.trim() ? "#111" : "#E5E7EB", fontSize: "13px", fontWeight: 600, cursor: label.trim() ? "pointer" : "default", color: label.trim() ? "#fff" : "#9CA3AF", fontFamily: "'DM Sans', sans-serif" }}>Add Quarter</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [quarters, setQuarters] = useState(() => {
    try { const s = localStorage.getItem(STORAGE_KEY); return s ? JSON.parse(s) : defaultQuarters; } catch { return defaultQuarters; }
  });
  const [activeQuarter, setActiveQuarter] = useState(() => {
    try { const s = localStorage.getItem(STORAGE_KEY); const q = s ? JSON.parse(s) : defaultQuarters; return q[q.length - 1]?.id || "q2_2026"; } catch { return "q2_2026"; }
  });
  const [filter, setFilter] = useState("all");
  const [expandedCards, setExpandedCards] = useState(new Set());
  const [saveIndicator, setSaveIndicator] = useState(false);
  const [showAddClient, setShowAddClient] = useState(false);
  const [showAddQuarter, setShowAddQuarter] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(quarters)); setSaveIndicator(true); setTimeout(() => setSaveIndicator(false), 1500); } catch (e) { console.error("Save failed:", e); }
  }, [quarters]);

  const currentQ = quarters.find((q) => q.id === activeQuarter) || quarters[0];
  const clients = currentQ?.clients || [];

  const updateClient = (updated) => {
    setQuarters((prev) => prev.map((q) => q.id === activeQuarter ? { ...q, clients: q.clients.map((c) => c.id === updated.id ? updated : c) } : q));
  };
  const deleteClient = (clientId) => {
    setQuarters((prev) => prev.map((q) => q.id === activeQuarter ? { ...q, clients: q.clients.filter((c) => c.id !== clientId) } : q));
  };
  const addClient = (name, level) => {
    const newClient = { id: `client_${Date.now()}`, name, level, resources: null, notes: "", goals: [] };
    setQuarters((prev) => prev.map((q) => q.id === activeQuarter ? { ...q, clients: [...q.clients, newClient] } : q));
  };
  const addQuarter = (label, copyFrom) => {
    const id = `q_${Date.now()}`;
    let newClients = [];
    if (copyFrom !== "empty") {
      const source = quarters.find((q) => q.id === copyFrom);
      if (source) {
        newClients = source.clients.map((c) => ({
          ...c, id: `${c.id}_${Date.now()}`,
          goals: c.goals.map((g) => ({ ...g, status: "not_started" })),
          notes: "",
        }));
      }
    }
    setQuarters((prev) => [...prev, { id, label, clients: newClients }]);
    setActiveQuarter(id);
    setExpandedCards(new Set());
  };
  const deleteQuarter = (qId) => {
    if (quarters.length <= 1) return;
    if (!confirm(`Delete this quarter? This can't be undone.`)) return;
    setQuarters((prev) => prev.filter((q) => q.id !== qId));
    if (activeQuarter === qId) setActiveQuarter(quarters.find((q) => q.id !== qId)?.id);
  };
  const toggleCard = (idx) => setExpandedCards((prev) => { const n = new Set(prev); if (n.has(idx)) n.delete(idx); else n.add(idx); return n; });
  const filtered = filter === "all" ? clients : clients.filter((c) => c.level === Number(filter));
  const counts = { 1: 0, 2: 0, 3: 0 }; clients.forEach((c) => counts[c.level]++);
  const totalGoals = clients.reduce((s, c) => s + c.goals.length, 0);
  const totalComplete = clients.reduce((s, c) => s + c.goals.filter((g) => g.status === "complete").length, 0);
  const overallProgress = totalGoals > 0 ? Math.round((totalComplete / totalGoals) * 100) : 0;

  const resetData = () => {
    if (confirm("Reset ALL data to defaults? This clears every quarter and change you've made.")) {
      setQuarters(defaultQuarters);
      setActiveQuarter("q2_2026");
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(168deg, #F8F7F4 0%, #F2F1EE 50%, #ECEAE6 100%)", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ position: "fixed", top: "16px", right: "16px", zIndex: 100, display: "flex", alignItems: "center", gap: "6px", padding: "8px 14px", borderRadius: "10px", background: "#111", color: "#fff", fontSize: "12px", fontWeight: 600, opacity: saveIndicator ? 1 : 0, transform: saveIndicator ? "translateY(0)" : "translateY(-10px)", transition: "all 0.3s ease", pointerEvents: "none" }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>Saved
      </div>

      <div style={{ padding: "40px 32px 0", maxWidth: "880px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ marginBottom: "6px" }}><span style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#9CA3AF" }}>{currentQ?.label || ""} · Account Management</span></div>
            <h1 style={{ margin: "0 0 6px", fontSize: "38px", fontWeight: 300, color: "#111", fontFamily: "'Fraunces', serif", letterSpacing: "-0.02em", lineHeight: 1.15 }}>Stuart's Plan</h1>
            <p style={{ margin: "0 0 20px", fontSize: "15px", color: "#6B7280", lineHeight: 1.5 }}>Double-click client names to edit. Click goals to update. Changes auto-save.</p>
          </div>
          <button onClick={resetData} style={{ padding: "8px 14px", borderRadius: "8px", border: "1px solid #E5E7EB", background: "#fff", fontSize: "11px", fontWeight: 600, cursor: "pointer", color: "#9CA3AF", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap", marginTop: "36px" }}>Reset data</button>
        </div>

        {/* Quarter tabs */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "24px", flexWrap: "wrap" }}>
          {quarters.map((q) => (
            <div key={q.id} style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <button onClick={() => { setActiveQuarter(q.id); setExpandedCards(new Set()); setFilter("all"); }}
                style={{ padding: "10px 18px", borderRadius: "10px", border: `2px solid ${activeQuarter === q.id ? "#111" : "#E5E7EB"}`, background: activeQuarter === q.id ? "#111" : "#fff", color: activeQuarter === q.id ? "#fff" : "#6B7280", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s ease" }}>
                {q.label}
              </button>
              {quarters.length > 1 && activeQuarter === q.id && (
                <button onClick={() => deleteQuarter(q.id)}
                  style={{ position: "absolute", top: "-6px", right: "-6px", width: "18px", height: "18px", borderRadius: "50%", border: "1.5px solid #E5E7EB", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}
                  title="Delete quarter">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              )}
            </div>
          ))}
          <button onClick={() => setShowAddQuarter(true)}
            style={{ padding: "10px 14px", borderRadius: "10px", border: "2px dashed #D1D5DB", background: "transparent", color: "#9CA3AF", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
            + Quarter
          </button>
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
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <div style={{ display: "flex", gap: "6px", padding: "4px", background: "#fff", borderRadius: "12px", border: "1px solid #E8E8E8", width: "fit-content" }}>
            {[{ key: "all", label: "All" }, { key: "1", label: "Level 1" }, { key: "2", label: "Level 2" }, { key: "3", label: "Level 3" }].map((f) => (
              <button key={f.key} onClick={() => setFilter(f.key)} style={{ padding: "8px 18px", borderRadius: "9px", border: "none", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s ease", background: filter === f.key ? "#111" : "transparent", color: filter === f.key ? "#fff" : "#6B7280" }}>{f.label}</button>
            ))}
          </div>
          <button onClick={() => setShowAddClient(true)}
            style={{ padding: "10px 18px", borderRadius: "10px", border: "none", background: "#111", color: "#fff", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: "6px" }}>
            + Add Client
          </button>
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
                  return <ClientCard key={client.id} client={client} isExpanded={expandedCards.has(globalIdx)} onToggle={() => toggleCard(globalIdx)} onUpdate={updateClient} onDelete={deleteClient} />;
                })}
              </div>
            </div>
          );
        })}
        {clients.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <p style={{ fontSize: "15px", color: "#9CA3AF", marginBottom: "16px" }}>No clients in this quarter yet.</p>
            <button onClick={() => setShowAddClient(true)}
              style={{ padding: "12px 24px", borderRadius: "10px", border: "none", background: "#111", color: "#fff", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
              + Add your first client
            </button>
          </div>
        )}
      </div>

      {showAddClient && <AddClientModal onAdd={addClient} onClose={() => setShowAddClient(false)} />}
      {showAddQuarter && <AddQuarterModal onAdd={addQuarter} onClose={() => setShowAddQuarter(false)} existingLabels={quarters.map((q) => ({ id: q.id, label: q.label }))} />}
    </div>
  );
}
    </div>
  );
}
