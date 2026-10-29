// Cuadra Limpia — UI primitives + icons
const CL = {
  green: '#1f7a4d', greenD: '#14583a', greenL: '#e3f1e7',
  blue: '#1d4f91', blueL: '#e4ecf7',
  amber: '#d9822b', amberL: '#fbeedd',
  red: '#c2412d', redL: '#f9e3de',
  ink: '#16241c', mute: '#5f6d64', line: '#e4e1d8',
  paper: '#f6f3ec', card: '#ffffff',
};

function Icon({ name, size = 22, color = 'currentColor', stroke = 1.9 }) {
  const p = {
    home: <><path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/></>,
    cal: <><rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    people: <><circle cx="9" cy="8" r="3.2"/><path d="M3 19c.6-3.3 3-5 6-5s5.4 1.7 6 5"/><circle cx="17" cy="9" r="2.4"/><path d="M16.5 14c2.4.2 4 1.7 4.5 4"/></>,
    leaf: <><path d="M5 19C5 10 10 5 20 4c0 10-5 15-13 15"/><path d="M5 19l8-8"/></>,
    camera: <><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></>,
    pin: <><path d="M12 21s7-6.2 7-11.5A7 7 0 005 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></>,
    truck: <><path d="M3 6h11v10H3zM14 9h4l3 3.5V16h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/></>,
    sofa: <><path d="M5 11V8a2 2 0 012-2h10a2 2 0 012 2v3"/><path d="M3 12a2 2 0 014 0v2h10v-2a2 2 0 014 0v5H3z"/><path d="M5 17v2M19 17v2"/></>,
    check: <><path d="M5 12.5l4.5 4.5L19 7.5"/></>,
    back: <><path d="M15 5l-7 7 7 7"/></>,
    chev: <><path d="M9 5l7 7-7 7"/></>,
    bell: <><path d="M6 16V11a6 6 0 0112 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 004 0"/></>,
    hand: <><path d="M8 13V6.5a1.5 1.5 0 013 0V12M11 11V5a1.5 1.5 0 013 0v6M14 11V6.5a1.5 1.5 0 013 0V14c0 4-2.5 7-6 7-2.5 0-4-1.3-5.5-3.5L3.8 14.6a1.4 1.4 0 012.2-1.7L8 15"/></>,
    clock: <><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></>,
    alert: <><path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17v.5"/></>,
    book: <><path d="M4 5.5A2 2 0 016 4h13v15H6a2 2 0 00-2 2z"/><path d="M4 19.5V5.5"/></>,
    send: <><path d="M4 12l16-8-6 16-2.5-6.5z"/></>,
    building: <><path d="M3 20h18M5 20V10M19 20V10M9 20v-6M15 20v-6M3 10l9-6 9 6z"/></>,
    eye: <><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/></>,
  }[name];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>{p}</svg>
  );
}

function ScreenHeader({ title, sub, onBack, right }) {
  return (
    <div style={{ padding: '6px 20px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
      {onBack && (
        <button onClick={onBack} className="cl-press" style={{
          width: 40, height: 40, borderRadius: 20, border: `1px solid ${CL.line}`, background: '#fff',
          display: 'grid', placeItems: 'center', cursor: 'pointer', color: CL.ink,
        }}><Icon name="back" size={20} /></button>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        {sub && <div style={{ fontSize: 12.5, color: CL.mute, fontWeight: 600, letterSpacing: .2 }}>{sub}</div>}
        <div className="cl-display" style={{ fontSize: 26, lineHeight: 1.1, color: CL.ink }}>{title}</div>
      </div>
      {right}
    </div>
  );
}

function Card({ children, style, onClick }) {
  return (
    <div onClick={onClick} className={onClick ? 'cl-press' : ''} style={{
      background: CL.card, borderRadius: 20, border: `1px solid ${CL.line}`,
      padding: 16, cursor: onClick ? 'pointer' : 'default', ...style,
    }}>{children}</div>
  );
}

function Chip({ active, children, onClick, color = CL.green }) {
  return (
    <button onClick={onClick} className="cl-press" style={{
      minHeight: 40, padding: '0 14px', borderRadius: 20, cursor: 'pointer',
      border: `1.5px solid ${active ? color : CL.line}`,
      background: active ? color : '#fff', color: active ? '#fff' : CL.ink,
      fontSize: 14, fontWeight: 600, fontFamily: 'inherit',
      display: 'inline-flex', alignItems: 'center', gap: 6,
    }}>{active && <Icon name="check" size={15} />}{children}</button>
  );
}

function PrimaryBtn({ children, onClick, disabled, color = CL.green, style }) {
  return (
    <button onClick={disabled ? undefined : onClick} className="cl-press" style={{
      width: '100%', height: 54, borderRadius: 27, border: 'none',
      background: disabled ? '#cfd5cf' : color, color: '#fff', cursor: disabled ? 'default' : 'pointer',
      fontSize: 16, fontWeight: 700, fontFamily: 'inherit',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, ...style,
    }}>{children}</button>
  );
}

function Pill({ children, bg, color }) {
  return <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 5, height: 24, padding: '0 10px',
    borderRadius: 12, background: bg, color, fontSize: 12, fontWeight: 700,
  }}>{children}</span>;
}

function SectionLabel({ children, style }) {
  return <div style={{ fontSize: 13, fontWeight: 700, color: CL.mute, textTransform: 'uppercase',
    letterSpacing: 1, margin: '22px 4px 10px', ...style }}>{children}</div>;
}

function TabBar({ tab, go }) {
  const tabs = [
    ['inicio', 'home', 'Inicio'], ['horarios', 'cal', 'Horarios'], ['reportar', 'plus', 'Reportar'],
    ['comunidad', 'people', 'Comunidad'], ['aprende', 'leaf', 'Aprende'],
  ];
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start',
      padding: '8px 6px 30px', background: 'rgba(255,255,255,.94)', backdropFilter: 'blur(12px)',
      borderTop: `1px solid ${CL.line}`, flexShrink: 0,
    }}>
      {tabs.map(([id, ic, label]) => {
        const on = tab === id;
        if (id === 'reportar') return (
          <button key={id} onClick={() => go('reportar')} className="cl-press" style={{
            border: 'none', background: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 3, marginTop: -22, fontFamily: 'inherit',
          }}>
            <span style={{ width: 56, height: 56, borderRadius: 28, background: CL.amber, color: '#fff',
              display: 'grid', placeItems: 'center', boxShadow: '0 6px 16px rgba(217,130,43,.4)', border: '4px solid #fff' }}>
              <Icon name="plus" size={26} stroke={2.4} /></span>
            <span style={{ fontSize: 11, fontWeight: 700, color: on ? CL.amber : CL.mute }}>{label}</span>
          </button>
        );
        return (
          <button key={id} onClick={() => go(id)} className="cl-press" style={{
            border: 'none', background: 'none', cursor: 'pointer', width: 64, minHeight: 44,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            color: on ? CL.green : CL.mute, fontFamily: 'inherit',
          }}>
            <Icon name={ic} size={23} stroke={on ? 2.3 : 1.8} />
            <span style={{ fontSize: 11, fontWeight: on ? 800 : 600 }}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}

Object.assign(window, { CL, Icon, ScreenHeader, Card, Chip, PrimaryBtn, Pill, SectionLabel, TabBar });
