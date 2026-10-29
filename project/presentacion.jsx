// Cuadra Limpia — shell: phone + project panel
const { useState, useEffect, useRef } = React;

const TAB_OF = { inicio: 'inicio', horarios: 'horarios', reportar: 'reportar', comunidad: 'comunidad', aprende: 'aprende', punto: 'inicio', voluminosos: 'inicio', avisos: 'inicio' };

const PANTALLAS = [
  ['bienvenida', 'Bienvenida'], ['inicio', 'Inicio · hoy en tu cuadra'], ['horarios', 'Horarios y lugares'],
  ['reportar', 'Reportar punto crítico'], ['punto', 'Seguimiento del punto'], ['voluminosos', 'Muebles y escombros'],
  ['comunidad', 'Acuerdo comunitario'], ['aprende', '¿En qué bolsa va?'], ['avisos', 'Avisos'],
];

function App() {
  const [screen, setScreen] = useState(() => localStorage.getItem('cl_screen') || 'bienvenida');
  const [history, setHistory] = useState([]);
  const [state, setState] = useState({ reports: 23, signers: 47, signed: false });
  const [scale, setScale] = useState(1);
  const scrollRef = useRef(null);

  useEffect(() => { localStorage.setItem('cl_screen', screen); if (scrollRef.current) scrollRef.current.scrollTop = 0; }, [screen]);
  useEffect(() => {
    const fit = () => setScale(Math.min(1, (window.innerHeight - 40) / 874, (window.innerWidth - 24) / 402));
    fit(); window.addEventListener('resize', fit); return () => window.removeEventListener('resize', fit);
  }, []);

  const go = (s) => { setHistory(h => [...h, screen]); setScreen(s); };
  const back = () => { setHistory(h => { const p = h[h.length - 1] || 'inicio'; setScreen(p); return h.slice(0, -1); }); };
  const jump = (s) => { setHistory([]); setScreen(s); };
  const onReport = () => setState(s => ({ ...s, reports: s.reports + 1 }));

  const props = { go, back, state, setState, onReport };
  const body = {
    inicio: <Inicio {...props} />, horarios: <Horarios {...props} />, reportar: <Reportar {...props} />,
    punto: <PuntoCritico {...props} />, voluminosos: <Voluminosos {...props} />, comunidad: <Comunidad {...props} />,
    aprende: <Aprende />, avisos: <Avisos {...props} />,
  }[screen];
  const fullBleed = screen === 'punto';

  return (
    <div style={{ height: '100vh', display: 'flex' }}>
      <ProjectPanel current={screen} jump={jump} />
      <div style={{ flex: 1, display: 'grid', placeItems: 'center', position: 'relative', minWidth: 0 }}>
        <div style={{ width: 402 * scale, height: 874 * scale }}>
          <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }} data-screen-label={screen}>
            <IOSDevice>
              {screen === 'bienvenida' ? (
                <div style={{ position: 'absolute', inset: 0, zIndex: 5 }}><Bienvenida go={jump} /></div>
              ) : (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: CL.paper, zIndex: 5 }}>
                  <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', paddingTop: fullBleed ? 0 : 54 }}>
                    <div key={screen} className="cl-screen" style={{ minHeight: '100%' }}>{body}</div>
                  </div>
                  <TabBar tab={TAB_OF[screen]} go={jump} />
                </div>
              )}
            </IOSDevice>
          </div>
        </div>
      </div>
    </div>
  );
}

function Block({ n, title, children, open, onToggle }) {
  return (
    <div style={{ borderTop: '1px solid #d8d1bf' }}>
      <button onClick={onToggle} style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '14px 0', display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left', color: CL.ink }}>
        <span className="cl-display" style={{ fontSize: 13, width: 30, height: 30, borderRadius: 15, background: open ? CL.green : '#fff', color: open ? '#fff' : CL.green, border: `1.5px solid ${CL.green}`, display: 'grid', placeItems: 'center', flexShrink: 0 }}>{n}</span>
        <span style={{ flex: 1, fontWeight: 800, fontSize: 15 }}>{title}</span>
        <span style={{ transform: open ? 'rotate(90deg)' : 'none', transition: 'transform .2s', display: 'flex' }}><Icon name="chev" size={16} color={CL.mute} /></span>
      </button>
      {open && <div className="cl-fade" style={{ padding: '0 0 18px 42px', fontSize: 13.5, lineHeight: 1.55, color: '#33413a' }}>{children}</div>}
    </div>
  );
}

const MATRIZ = [
  ['Plan comunitario integral (recomendada)', 5, 4, 4],
  ['Campaña educativa y afiches', 4, 5, 5],
  ['Solo reporte a entidades', 3, 4, 4],
  ['Instalar contenedores', 3, 2, 2],
];

function ProjectPanel({ current, jump }) {
  const [open, setOpen] = useState(() => +(localStorage.getItem('cl_open') ?? 4));
  const tog = (i) => { const v = open === i ? -1 : i; setOpen(v); localStorage.setItem('cl_open', v); };
  const [lb, setLb] = useState(null);
  return (
    <aside className="side" style={{ width: 400, flexShrink: 0, height: '100vh', overflowY: 'auto', background: '#f6f3ec', borderRight: '1px solid #d8d1bf', padding: '28px 28px 40px', display: window.innerWidth < 900 ? 'none' : 'block' }}>
      <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 1.2, color: CL.green, textTransform: 'uppercase' }}>Pensamiento crítico · Prototipo digital</div>
      <div className="cl-display" style={{ fontSize: 34, lineHeight: 1.02, margin: '10px 0 10px' }}>Cuadra Limpia</div>
      <div style={{ fontSize: 14, lineHeight: 1.5, color: '#33413a', textWrap: 'pretty' }}>
        App comunitaria para el plan de manejo adecuado de residuos: horarios, reportes de puntos críticos, recogida de voluminosos y acuerdos vecinales.
      </div>
      <div style={{ fontSize: 12.5, color: CL.mute, margin: '12px 0 20px', lineHeight: 1.5 }}>
        Sandra C. Flórez B. · Nathaly Zabala · Yennifer Quintero Ch. · Leidy J. Jaramillo T. — Octubre 2026
      </div>

      <Block n="1" title="Problema" open={open === 1} onToggle={() => tog(1)}>
        <b>Acumulación y disposición inadecuada de residuos</b> en los espacios públicos de la comunidad: bolsas, colchones, neveras y escombros de hasta ~2 m en la esquina de una cuadra, que bloquean escalas y aceras, invaden la zona verde y la quebrada, y dificultan el paso de peatones y ambulancias.
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6, marginTop: 10 }}>
          {[1, 3, 5, 2, 6, 7].map(i => <img key={i} onClick={() => setLb(`img/foto${i}.jpg`)} src={`img/foto${i}.jpg`} alt="" style={{ width: '100%', height: 64, objectFit: 'cover', borderRadius: 8, cursor: 'zoom-in' }} />)}
        </div>
      </Block>
      <Block n="2" title="Causas, efectos y actores" open={open === 2} onToggle={() => tog(2)}>
        Árbol de problemas: horarios inadecuados, mezcla con voluminosos, hábitos, acceso difícil del vehículo, falta de información y de coordinación institucional.
        <img onClick={() => setLb('img/arbol.jpg')} src="img/arbol.jpg" alt="Árbol de problemas" style={{ width: '100%', borderRadius: 10, marginTop: 10, cursor: 'zoom-in' }} />
        <div style={{ marginTop: 10 }}><b>Actores:</b> habitantes, recicladores, prestador de aseo, Alcaldía, vecinos junto al punto y entidad responsable del terreno.</div>
      </Block>
      <Block n="3" title="Pregunta reto e ideas" open={open === 3} onToggle={() => tog(3)}>
        <i>“¿Cómo podríamos coordinar a los habitantes y a las entidades responsables para reducir la acumulación de residuos, mejorar su disposición y mantener libres los pasos peatonales?”</i>
        <div style={{ marginTop: 10 }}>Lluvia de ideas → propuestas <b>educativas</b>, <b>organizacionales</b>, <b>institucionales</b> y <b>operativas</b>.</div>
      </Block>
      <Block n="4" title="Matriz de decisión" open={open === 4} onToggle={() => tog(4)}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
          <thead><tr style={{ color: CL.mute, textAlign: 'center' }}><th style={{ textAlign: 'left', fontWeight: 700, paddingBottom: 6 }}>Alternativa</th><th title="Deseabilidad">Des.</th><th title="Factibilidad">Fac.</th><th title="Viabilidad">Via.</th><th>Total</th></tr></thead>
          <tbody>{MATRIZ.map(([t, a, b, c], i) => (
            <tr key={t} style={{ borderTop: '1px solid #e2dccb', background: i === 0 ? CL.greenL : 'none', fontWeight: i === 0 ? 800 : 500, textAlign: 'center' }}>
              <td style={{ textAlign: 'left', padding: '7px 4px' }}>{t}</td><td>{a}</td><td>{b}</td><td>{c}</td><td style={{ color: i === 0 ? CL.green : CL.ink }}>{a + b + c}</td>
            </tr>))}</tbody>
        </table>
        <div style={{ fontSize: 12, color: CL.mute, marginTop: 8 }}>Escala 1–5. La campaña sola es más barata, pero el plan integral ataca más causas a la vez; los contenedores se desbordan y pueden rodar hacia el subpiso.</div>
        <img onClick={() => setLb('img/solucion.jpg')} src="img/solucion.jpg" alt="Plan de acción" style={{ width: '100%', borderRadius: 10, marginTop: 10, cursor: 'zoom-in' }} />
      </Block>

      <div style={{ borderTop: '1px solid #d8d1bf', paddingTop: 18 }}>
        <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 1.2, color: CL.mute, textTransform: 'uppercase', marginBottom: 10 }}>Pantallas del prototipo</div>
        <div style={{ display: 'grid', gap: 4 }}>
          {PANTALLAS.map(([id, l], i) => (
            <button key={id} onClick={() => jump(id)} style={{
              display: 'flex', alignItems: 'center', gap: 10, minHeight: 38, padding: '0 12px', borderRadius: 10, cursor: 'pointer', textAlign: 'left',
              border: 'none', background: current === id ? CL.ink : 'transparent', color: current === id ? '#fff' : CL.ink, fontSize: 14, fontWeight: 600,
            }}>
              <span style={{ fontSize: 11, opacity: .6, width: 18, fontVariantNumeric: 'tabular-nums' }}>{String(i + 1).padStart(2, '0')}</span>{l}
            </button>
          ))}
        </div>
      </div>

      {lb && (
        <div onClick={() => setLb(null)} className="cl-fade" style={{ position: 'fixed', inset: 0, background: 'rgba(10,20,15,.85)', zIndex: 100, display: 'grid', placeItems: 'center', padding: 30, cursor: 'zoom-out' }}>
          <img src={lb} alt="" style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: 12 }} />
        </div>
      )}
    </aside>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
