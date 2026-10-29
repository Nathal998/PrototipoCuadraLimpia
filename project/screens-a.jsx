// Cuadra Limpia — Inicio, Horarios, Voluminosos, Bienvenida
const { useState: useStateA } = React;

function Bienvenida({ go }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: CL.green, color: '#fff' }}>
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <img src="img/foto5.jpg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(.35) contrast(1.05)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(20,88,58,.15) 30%, rgba(20,88,58,1) 96%)' }} />
        <div style={{ position: 'absolute', left: 24, right: 24, bottom: 18 }}>
          <Pill bg="rgba(255,255,255,.18)" color="#fff"><Icon name="leaf" size={14} />Plan comunitario de residuos</Pill>
          <div className="cl-display" style={{ fontSize: 44, lineHeight: 1, marginTop: 14 }}>Cuadra<br/>Limpia</div>
          <div style={{ fontSize: 16, lineHeight: 1.45, marginTop: 12, opacity: .92, textWrap: 'pretty' }}>
            Consulta cuándo y dónde sacar la basura, pide la recogida de escombros y reporta los puntos críticos de tu barrio.
          </div>
        </div>
      </div>
      <div style={{ padding: '18px 24px 44px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <PrimaryBtn color="#fff" onClick={() => go('inicio')} style={{ color: CL.greenD }}>Entrar a mi sector</PrimaryBtn>
        <div style={{ textAlign: 'center', fontSize: 13, opacity: .8 }}>“¡Un sector limpio lo construimos entre todos!”</div>
      </div>
    </div>
  );
}

function Inicio({ go, state }) {
  return (
    <div style={{ padding: '0 16px 24px' }}>
      <div style={{ padding: '6px 4px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 13, color: CL.mute, fontWeight: 600 }}>Hola, vecina · Sector La Cuadra</div>
          <div className="cl-display" style={{ fontSize: 27, color: CL.ink, lineHeight: 1.1 }}>Hoy en tu cuadra</div>
        </div>
        <button className="cl-press" onClick={() => go('avisos')} style={{ width: 44, height: 44, borderRadius: 22, border: `1px solid ${CL.line}`, background: '#fff', position: 'relative', cursor: 'pointer', display: 'grid', placeItems: 'center', color: CL.ink }}>
          <Icon name="bell" />
          <span style={{ position: 'absolute', top: 9, right: 10, width: 9, height: 9, borderRadius: 5, background: CL.amber, border: '2px solid #fff' }} />
        </button>
      </div>

      {/* Próxima recolección */}
      <div style={{ background: CL.green, color: '#fff', borderRadius: 24, padding: 18, position: 'relative', overflow: 'hidden' }}>
        <div style={{ fontSize: 13, fontWeight: 700, opacity: .85, letterSpacing: .3 }}>PRÓXIMA RECOLECCIÓN</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, marginTop: 6 }}>
          <div className="cl-display" style={{ fontSize: 40, lineHeight: 1 }}>Hoy</div>
          <div style={{ fontSize: 17, fontWeight: 700, paddingBottom: 4 }}>· desde 7:00 p. m.</div>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
          <Pill bg="#fff" color={CL.greenD}>◼ Bolsa negra · no aprovechables</Pill>
          <Pill bg="rgba(255,255,255,.2)" color="#fff">◻ Blanca · reciclables</Pill>
        </div>
        <div style={{ marginTop: 14, padding: '10px 12px', borderRadius: 14, background: 'rgba(0,0,0,.16)', fontSize: 13.5, lineHeight: 1.4, display: 'flex', gap: 8 }}>
          <Icon name="clock" size={18} />
          <span>Saca las bolsas máximo <b>2 horas antes</b>. No las dejes en escaleras ni accesos.</span>
        </div>
      </div>

      {/* Punto crítico */}
      <SectionLabel>Punto crítico que seguimos</SectionLabel>
      <Card onClick={() => go('punto')} style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ position: 'relative', height: 138 }}>
          <img src="img/foto1.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', top: 10, left: 10 }}><Pill bg={CL.red} color="#fff"><Icon name="alert" size={13} />Acumulación alta</Pill></div>
        </div>
        <div style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: 16, color: CL.ink }}>Esquina de la cuadra · cruce calle-carrera</div>
            <div style={{ fontSize: 13, color: CL.mute, marginTop: 3 }}>{state.reports} reportes este mes · bloquea escalas del subpiso</div>
          </div>
          <Icon name="chev" size={18} color={CL.mute} />
        </div>
      </Card>

      {/* Acciones */}
      <SectionLabel>¿Qué necesitas hacer?</SectionLabel>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {[
          ['camera', 'Reportar un punto', CL.amber, CL.amberL, 'reportar'],
          ['sofa', 'Recoger muebles o escombros', CL.blue, CL.blueL, 'voluminosos'],
          ['cal', 'Ver horarios', CL.green, CL.greenL, 'horarios'],
          ['leaf', '¿En qué bolsa va?', CL.greenD, '#eef3e2', 'aprende'],
        ].map(([ic, t, c, bg, to]) => (
          <Card key={t} onClick={() => go(to)} style={{ padding: 14, minHeight: 104, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <span style={{ width: 40, height: 40, borderRadius: 12, background: bg, color: c, display: 'grid', placeItems: 'center' }}><Icon name={ic} /></span>
            <div style={{ fontWeight: 700, fontSize: 14.5, color: CL.ink, lineHeight: 1.25, marginTop: 10 }}>{t}</div>
          </Card>
        ))}
      </div>

      {/* Acuerdo */}
      <SectionLabel>Acuerdo comunitario</SectionLabel>
      <Card onClick={() => go('comunidad')} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <span style={{ width: 46, height: 46, borderRadius: 23, background: state.signed ? CL.green : CL.greenL, color: state.signed ? '#fff' : CL.green, display: 'grid', placeItems: 'center' }}>
          <Icon name={state.signed ? 'check' : 'hand'} />
        </span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, color: CL.ink }}>{state.signed ? 'Ya firmaste el acuerdo' : 'Firma el acuerdo de tu cuadra'}</div>
          <div style={{ fontSize: 13, color: CL.mute, marginTop: 2 }}>{state.signers} vecinos comprometidos de 120</div>
          <div style={{ height: 6, borderRadius: 3, background: CL.greenL, marginTop: 8 }}>
            <div style={{ width: `${state.signers / 120 * 100}%`, height: '100%', borderRadius: 3, background: CL.green, transition: 'width .5s' }} />
          </div>
        </div>
      </Card>
    </div>
  );
}

const RUTAS = [
  { d: 'Lun', t: 'Ordinarios', c: '#1e1e1e', bag: 'Bolsa negra', h: '7:00 p. m.' },
  { d: 'Mar', t: 'Reciclables', c: '#9aa3a0', bag: 'Bolsa blanca', h: '8:00 a. m.' },
  { d: 'Mié', t: 'Orgánicos', c: CL.green, bag: 'Bolsa verde', h: '7:00 p. m.' },
  { d: 'Jue', t: 'Ordinarios', c: '#1e1e1e', bag: 'Bolsa negra', h: '7:00 p. m.' },
  { d: 'Vie', t: 'Reciclables', c: '#9aa3a0', bag: 'Bolsa blanca', h: '8:00 a. m.' },
  { d: 'Sáb', t: 'Voluminosos y escombros', c: CL.blue, bag: 'Con solicitud previa', h: 'Ruta especial' },
  { d: 'Dom', t: 'Sin recolección', c: '#d6d2c6', bag: 'No sacar residuos', h: '—' },
];

function Horarios({ go }) {
  const [sel, setSel] = useStateA(0);
  const r = RUTAS[sel];
  return (
    <div style={{ padding: '0 16px 24px' }}>
      <ScreenHeader title="Horarios y lugares" sub="Ruta de tu sector" />
      <div style={{ display: 'flex', gap: 6, padding: '0 4px' }}>
        {RUTAS.map((x, i) => (
          <button key={i} onClick={() => setSel(i)} className="cl-press" style={{
            flex: 1, height: 64, borderRadius: 16, cursor: 'pointer', fontFamily: 'inherit',
            border: `1.5px solid ${sel === i ? CL.ink : CL.line}`, background: sel === i ? CL.ink : '#fff',
            color: sel === i ? '#fff' : CL.ink, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>
            <span style={{ fontSize: 12.5, fontWeight: 700 }}>{x.d}</span>
            <span style={{ width: 12, height: 12, borderRadius: 6, background: x.c, border: '2px solid #fff', boxShadow: `0 0 0 1px ${CL.line}` }} />
          </button>
        ))}
      </div>
      <Card style={{ marginTop: 14, display: 'flex', gap: 14, alignItems: 'center' }}>
        <span style={{ width: 54, height: 54, borderRadius: 16, background: r.c, color: '#fff', display: 'grid', placeItems: 'center' }}>
          <Icon name={sel === 5 ? 'sofa' : sel === 6 ? 'clock' : 'truck'} size={26} />
        </span>
        <div style={{ flex: 1 }}>
          <div className="cl-display" style={{ fontSize: 21, color: CL.ink }}>{r.t}</div>
          <div style={{ fontSize: 14, color: CL.mute, marginTop: 2 }}>{r.bag} · {r.h}</div>
        </div>
      </Card>
      {sel === 5 && <PrimaryBtn color={CL.blue} onClick={() => go('voluminosos')} style={{ marginTop: 10 }}><Icon name="sofa" size={20} />Solicitar recogida especial</PrimaryBtn>}

      <SectionLabel>Dónde sacar la basura</SectionLabel>
      <Card style={{ padding: 0, overflow: 'hidden' }}>
        <MiniMapa />
        <div style={{ padding: 14, display: 'grid', gap: 10 }}>
          {[
            [CL.green, 'Punto autorizado', 'Andén ancho, sobre la carrera. Lejos de escalas.'],
            [CL.red, 'No sacar aquí', 'Esquina frente a las escalas del subpiso y zona verde.'],
          ].map(([c, t, d]) => (
            <div key={t} style={{ display: 'flex', gap: 10 }}>
              <span style={{ width: 14, height: 14, borderRadius: 7, background: c, marginTop: 3, flexShrink: 0 }} />
              <div><div style={{ fontWeight: 700, fontSize: 14.5, color: CL.ink }}>{t}</div><div style={{ fontSize: 13, color: CL.mute }}>{d}</div></div>
            </div>
          ))}
        </div>
      </Card>
      <div style={{ fontSize: 12, color: CL.mute, margin: '12px 6px 0', lineHeight: 1.45 }}>
        Horarios de referencia del prototipo. Se confirman con el prestador del servicio de aseo.
      </div>
    </div>
  );
}

function MiniMapa() {
  return (
    <div style={{ height: 170, background: '#e9ece2', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 70, height: 34, background: '#fff' }} />
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: 150, width: 30, background: '#fff' }} />
      <div style={{ position: 'absolute', top: 104, left: 0, width: 150, bottom: 0, background: '#cfe3c6' }} />
      <div style={{ position: 'absolute', top: 120, left: 16, fontSize: 11, color: CL.greenD, fontWeight: 700 }}>Zona verde · quebrada</div>
      <div style={{ position: 'absolute', top: 104, left: 126, width: 22, height: 50, background: 'repeating-linear-gradient(0deg,#bdb7a6 0 4px,#e9ece2 4px 8px)' }} />
      <div style={{ position: 'absolute', top: 156, left: 112, fontSize: 10, color: CL.mute, fontWeight: 700 }}>Escalas</div>
      <div style={{ position: 'absolute', top: 8, left: 190, fontSize: 11, color: CL.mute, fontWeight: 700 }}>Carrera</div>
      <div style={{ position: 'absolute', top: 78, left: 14, fontSize: 11, color: CL.mute, fontWeight: 700 }}>Calle</div>
      <MapPin x={128} y={60} c={CL.red} x2 />
      <MapPin x={220} y={40} c={CL.green} />
    </div>
  );
}
function MapPin({ x, y, c, x2 }) {
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: 'translate(-50%,-100%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <span style={{ width: 30, height: 30, borderRadius: 15, background: c, color: '#fff', display: 'grid', placeItems: 'center', boxShadow: '0 3px 8px rgba(0,0,0,.25)', border: '2px solid #fff' }}>
        <Icon name={x2 ? 'alert' : 'check'} size={15} stroke={2.4} />
      </span>
      <span style={{ width: 2, height: 8, background: c }} />
    </div>
  );
}

const TIPOS_VOL = [
  ['Colchón', 'sofa'], ['Nevera o electrodoméstico', 'building'], ['Muebles o armarios', 'sofa'], ['Escombros de construcción', 'truck'],
];

function Voluminosos({ go, back }) {
  const [tipo, setTipo] = useStateA([]);
  const [cant, setCant] = useStateA(1);
  const [fecha, setFecha] = useStateA(null);
  const [sent, setSent] = useStateA(false);
  const toggle = (t) => setTipo(tipo.includes(t) ? tipo.filter(x => x !== t) : [...tipo, t]);

  if (sent) return (
    <div style={{ padding: '40px 24px', textAlign: 'center' }}>
      <div style={{ width: 92, height: 92, borderRadius: 46, background: CL.blue, color: '#fff', display: 'grid', placeItems: 'center', margin: '30px auto 18px' }} className="cl-pop"><Icon name="check" size={44} stroke={2.6} /></div>
      <div className="cl-display" style={{ fontSize: 28, color: CL.ink }}>Solicitud enviada</div>
      <div style={{ fontSize: 15, color: CL.mute, marginTop: 8, lineHeight: 1.5 }}>Radicado <b style={{ color: CL.ink }}>VOL-2026-0418</b><br/>Recogida: sábado {fecha}, ruta especial.</div>
      <Card style={{ textAlign: 'left', marginTop: 22, background: CL.blueL, border: 'none' }}>
        <div style={{ fontWeight: 800, color: CL.blue, marginBottom: 6 }}>Mientras tanto</div>
        <div style={{ fontSize: 14, color: CL.ink, lineHeight: 1.5 }}>Guarda los objetos dentro de tu casa. Sácalos solo el día de la recogida y nunca en escaleras o zonas verdes.</div>
      </Card>
      <PrimaryBtn color={CL.blue} onClick={() => go('inicio')} style={{ marginTop: 22 }}>Volver al inicio</PrimaryBtn>
    </div>
  );

  return (
    <div style={{ padding: '0 16px 24px' }}>
      <ScreenHeader title="Muebles y escombros" sub="Recogida especial" onBack={back} />
      <Card style={{ background: CL.blueL, border: 'none', display: 'flex', gap: 10 }}>
        <Icon name="alert" color={CL.blue} />
        <div style={{ fontSize: 13.5, color: CL.ink, lineHeight: 1.45 }}>Estos residuos <b>no van en el carro de basura ordinaria</b>: lo dañan, demoran la ruta y generan ruido en la madrugada.</div>
      </Card>
      <SectionLabel>¿Qué vas a entregar?</SectionLabel>
      <div style={{ display: 'grid', gap: 8 }}>
        {TIPOS_VOL.map(([t, ic]) => {
          const on = tipo.includes(t);
          return (
            <Card key={t} onClick={() => toggle(t)} style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 12, borderColor: on ? CL.blue : CL.line, borderWidth: on ? 2 : 1 }}>
              <span style={{ width: 40, height: 40, borderRadius: 12, background: on ? CL.blue : CL.blueL, color: on ? '#fff' : CL.blue, display: 'grid', placeItems: 'center' }}><Icon name={ic} /></span>
              <span style={{ flex: 1, fontWeight: 700, color: CL.ink }}>{t}</span>
              <span style={{ width: 24, height: 24, borderRadius: 7, border: `2px solid ${on ? CL.blue : CL.line}`, background: on ? CL.blue : '#fff', color: '#fff', display: 'grid', placeItems: 'center' }}>{on && <Icon name="check" size={15} stroke={3} />}</span>
            </Card>
          );
        })}
      </div>
      <SectionLabel>Cantidad aproximada</SectionLabel>
      <Card style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontWeight: 700, color: CL.ink }}>Objetos o bultos</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          
          <button className="cl-press" onClick={() => setCant(Math.max(1, cant - 1))} style={stepBtn}>−</button>
          <span className="cl-display" style={{ fontSize: 22, minWidth: 22, textAlign: 'center' }}>{cant}</span>
          <button className="cl-press" onClick={() => setCant(cant + 1)} style={stepBtn}>+</button>
        </div>
      </Card>
      <SectionLabel>Elige el sábado</SectionLabel>
      <div style={{ display: 'flex', gap: 8 }}>
        {['31 oct', '7 nov', '14 nov'].map(f => <Chip key={f} active={fecha === f} onClick={() => setFecha(f)} color={CL.blue}>{f}</Chip>)}
      </div>
      <PrimaryBtn color={CL.blue} disabled={!tipo.length || !fecha} onClick={() => setSent(true)} style={{ marginTop: 22 }}>
        <Icon name="send" size={19} />Enviar solicitud al prestador
      </PrimaryBtn>
    </div>
  );
}
const stepBtn = { width: 40, height: 40, borderRadius: 20, border: `1.5px solid ${CL.line}`, background: '#fff', fontSize: 20, fontWeight: 700, cursor: 'pointer', color: CL.ink, fontFamily: 'inherit' };

Object.assign(window, { Bienvenida, Inicio, Horarios, Voluminosos });
