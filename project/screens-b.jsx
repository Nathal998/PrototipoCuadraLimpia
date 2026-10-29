// Cuadra Limpia — Reportar, Punto crítico, Comunidad, Aprende, Avisos
const { useState: useStateB } = React;

const PROBLEMAS = ['Bolsas fuera de horario', 'Muebles o colchones', 'Escombros', 'Bloquea escalas o andén', 'Residuos en zona verde o quebrada', 'Malos olores o plagas'];

function Reportar({ go, back, onReport }) {
  const [step, setStep] = useStateB(0);
  const [foto, setFoto] = useStateB(null);
  const [probs, setProbs] = useStateB([]);
  const [lugar, setLugar] = useStateB('Esquina de la cuadra · cruce calle-carrera');
  const [nota, setNota] = useStateB('');
  const toggle = (t) => setProbs(probs.includes(t) ? probs.filter(x => x !== t) : [...probs, t]);
  const fotos = ['img/foto1.jpg', 'img/foto2.jpg', 'img/foto4.jpg'];

  if (step === 3) return (
    <div style={{ padding: '40px 24px', textAlign: 'center' }}>
      <div className="cl-pop" style={{ width: 92, height: 92, borderRadius: 46, background: CL.amber, color: '#fff', display: 'grid', placeItems: 'center', margin: '30px auto 18px' }}><Icon name="check" size={44} stroke={2.6} /></div>
      <div className="cl-display" style={{ fontSize: 28, color: CL.ink }}>¡Gracias por reportar!</div>
      <div style={{ fontSize: 15, color: CL.mute, marginTop: 8, lineHeight: 1.5 }}>Reporte <b style={{ color: CL.ink }}>PC-2026-1093</b> enviado al prestador del servicio de aseo y a la Alcaldía.</div>
      <Card style={{ textAlign: 'left', marginTop: 22 }}>
        {[['Recibido', true], ['En revisión por la entidad', false], ['Visita de evaluación', false], ['Resuelto', false]].map(([t, on], i) => (
          <div key={t} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '7px 0' }}>
            <span style={{ width: 22, height: 22, borderRadius: 11, background: on ? CL.amber : '#fff', border: `2px solid ${on ? CL.amber : CL.line}`, color: '#fff', display: 'grid', placeItems: 'center' }}>{on && <Icon name="check" size={13} stroke={3} />}</span>
            <span style={{ fontWeight: on ? 800 : 600, color: on ? CL.ink : CL.mute, fontSize: 14.5 }}>{t}</span>
          </div>
        ))}
      </Card>
      <PrimaryBtn color={CL.amber} onClick={() => go('punto')} style={{ marginTop: 20 }}>Seguir el punto crítico</PrimaryBtn>
    </div>
  );

  const canNext = [!!foto, probs.length > 0, true][step];
  return (
    <div style={{ padding: '0 16px 24px', display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      <ScreenHeader title="Reportar un punto" sub={`Paso ${step + 1} de 3`} onBack={step ? () => setStep(step - 1) : back} />
      <div style={{ display: 'flex', gap: 6, padding: '0 4px 16px' }}>
        {[0, 1, 2].map(i => <div key={i} style={{ flex: 1, height: 5, borderRadius: 3, background: i <= step ? CL.amber : CL.line, transition: 'background .3s' }} />)}
      </div>

      {step === 0 && <>
        <div style={{ fontSize: 15, color: CL.ink, padding: '0 4px 12px', fontWeight: 600 }}>Toma una foto del punto (sin mostrar rostros).</div>
        <div style={{ height: 200, borderRadius: 20, overflow: 'hidden', background: '#1c2420', position: 'relative', display: 'grid', placeItems: 'center' }}>
          {foto ? <img src={foto} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} className="cl-fade" />
            : <div style={{ color: '#fff', opacity: .7, textAlign: 'center' }}><Icon name="camera" size={40} /><div style={{ fontSize: 13, marginTop: 6 }}>Cámara</div></div>}
        </div>
        <div style={{ fontSize: 13, color: CL.mute, margin: '14px 4px 8px', fontWeight: 600 }}>O elige de tu galería</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
          {fotos.map(f => (
            <button key={f} onClick={() => setFoto(f)} className="cl-press" style={{ height: 84, padding: 0, borderRadius: 14, overflow: 'hidden', cursor: 'pointer', border: `3px solid ${foto === f ? CL.amber : 'transparent'}` }}>
              <img src={f} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </button>
          ))}
        </div>
      </>}

      {step === 1 && <>
        <div style={{ fontSize: 15, color: CL.ink, padding: '0 4px 12px', fontWeight: 600 }}>¿Qué está pasando? Puedes marcar varias.</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {PROBLEMAS.map(p => <Chip key={p} active={probs.includes(p)} onClick={() => toggle(p)} color={CL.amber}>{p}</Chip>)}
        </div>
        <Card style={{ marginTop: 18, background: '#fbf8f1', border: `1px dashed ${CL.line}`, fontSize: 13, color: CL.mute, lineHeight: 1.5 }}>
          Describe la situación, no a las personas. El reporte se enfoca en conductas y condiciones del lugar.
        </Card>
      </>}

      {step === 2 && <>
        <div style={{ fontSize: 15, color: CL.ink, padding: '0 4px 12px', fontWeight: 600 }}>Confirma la ubicación</div>
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <MiniMapa />
          <div style={{ padding: 12, display: 'flex', gap: 10, alignItems: 'center' }}>
            <Icon name="pin" color={CL.amber} />
            <input value={lugar} onChange={e => setLugar(e.target.value)} style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14.5, fontWeight: 700, color: CL.ink, fontFamily: 'inherit', background: 'transparent' }} />
          </div>
        </Card>
        <textarea value={nota} onChange={e => setNota(e.target.value)} placeholder="Comentario opcional (ej. las bolsas bloquean las escalas del subpiso)"
          style={{ marginTop: 12, width: '100%', boxSizing: 'border-box', height: 84, borderRadius: 16, border: `1px solid ${CL.line}`, padding: 12, fontSize: 14, fontFamily: 'inherit', resize: 'none', outline: 'none' }} />
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
          <Pill bg={CL.amberL} color={CL.amber}>Para: Prestador de aseo</Pill>
          <Pill bg={CL.amberL} color={CL.amber}>Alcaldía · Espacio público</Pill>
        </div>
      </>}

      <div style={{ flex: 1 }} />
      <PrimaryBtn color={CL.amber} disabled={!canNext} style={{ marginTop: 20 }}
        onClick={() => { if (step === 2) { onReport(); } setStep(step + 1); }}>
        {step === 2 ? <><Icon name="send" size={19} />Enviar reporte</> : 'Continuar'}
      </PrimaryBtn>
    </div>
  );
}

function PuntoCritico({ go, back, state }) {
  const [img, setImg] = useStateB(0);
  const gal = ['img/foto1.jpg', 'img/foto3.jpg', 'img/foto5.jpg', 'img/foto6.jpg', 'img/foto7.jpg', 'img/foto2.jpg'];
  return (
    <div style={{ paddingBottom: 24 }}>
      <div style={{ position: 'relative', height: 250 }}>
        <img src={gal[img]} alt="" key={img} className="cl-fade" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(0,0,0,.35),transparent 40%,rgba(0,0,0,.5))' }} />
        <button onClick={back} className="cl-press" style={{ position: 'absolute', top: 56, left: 16, width: 40, height: 40, borderRadius: 20, border: 'none', background: 'rgba(255,255,255,.92)', display: 'grid', placeItems: 'center', cursor: 'pointer', color: CL.ink }}><Icon name="back" size={20} /></button>
        <div style={{ position: 'absolute', bottom: 12, left: 16, right: 16, display: 'flex', gap: 6 }}>
          {gal.map((g, i) => (
            <button key={g} onClick={() => setImg(i)} style={{ flex: 1, height: 40, padding: 0, borderRadius: 8, overflow: 'hidden', border: `2px solid ${i === img ? '#fff' : 'transparent'}`, cursor: 'pointer', opacity: i === img ? 1 : .7 }}>
              <img src={g} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding: '16px 16px 0' }}>
        <Pill bg={CL.redL} color={CL.red}><Icon name="alert" size={13} />Punto crítico · Acumulación alta</Pill>
        <div className="cl-display" style={{ fontSize: 24, color: CL.ink, marginTop: 10, lineHeight: 1.15 }}>Esquina de la cuadra, junto a zona verde y escalas</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginTop: 14 }}>
          {[[state.reports, 'reportes'], ['~2 m', 'altura máx.'], ['4–5 a. m.', 'inicia acumulación']].map(([n, l]) => (
            <div key={l} style={{ background: '#fff', border: `1px solid ${CL.line}`, borderRadius: 16, padding: '10px 8px', textAlign: 'center' }}>
              <div className="cl-display" style={{ fontSize: 20, color: CL.ink }}>{n}</div>
              <div style={{ fontSize: 11.5, color: CL.mute, fontWeight: 600 }}>{l}</div>
            </div>
          ))}
        </div>

        <SectionLabel>Afectaciones</SectionLabel>
        <Card style={{ display: 'grid', gap: 10 }}>
          {['Obstruye las escalas: personas enfermas o con movilidad reducida no pueden salir.', 'Ambulancias deben parquear a casi una cuadra.', 'Residuos ruedan hacia la zona verde, la quebrada y las casas del subpiso.', 'Malos olores y ruido nocturno de la recolección.'].map(t => (
            <div key={t} style={{ display: 'flex', gap: 10, fontSize: 14, color: CL.ink, lineHeight: 1.4 }}>
              <span style={{ width: 6, height: 6, borderRadius: 3, background: CL.red, marginTop: 7, flexShrink: 0 }} />{t}
            </div>
          ))}
        </Card>

        <SectionLabel>Gestión con las entidades</SectionLabel>
        <Card>
          {[
            ['Reporte formal radicado', 'Prestador de aseo y Alcaldía', true],
            ['Visita de evaluación', 'Acceso del vehículo recolector y riesgos del terreno', true],
            ['Ruta diferenciada', 'Ordinarios · reciclables · voluminosos', false],
            ['Revisión del terreno', 'Entidad responsable y autoridades', false],
          ].map(([t, d, on], i, a) => (
            <div key={t} style={{ display: 'flex', gap: 12 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ width: 22, height: 22, borderRadius: 11, background: on ? CL.green : '#fff', border: `2px solid ${on ? CL.green : CL.line}`, color: '#fff', display: 'grid', placeItems: 'center' }}>{on && <Icon name="check" size={13} stroke={3} />}</span>
                {i < a.length - 1 && <span style={{ flex: 1, width: 2, background: on ? CL.green : CL.line, minHeight: 18 }} />}
              </div>
              <div style={{ paddingBottom: 12 }}>
                <div style={{ fontWeight: 800, fontSize: 14.5, color: on ? CL.ink : CL.mute }}>{t}</div>
                <div style={{ fontSize: 12.5, color: CL.mute }}>{d}</div>
              </div>
            </div>
          ))}
        </Card>
        <PrimaryBtn color={CL.amber} onClick={() => go('reportar')} style={{ marginTop: 16 }}><Icon name="camera" size={19} />Agregar un nuevo reporte</PrimaryBtn>
      </div>
    </div>
  );
}

function Comunidad({ state, setState }) {
  const compromisos = ['Sacar la basura solo en el horario de la ruta.', 'Usar el punto autorizado, nunca escaleras ni zonas verdes.', 'Separar en bolsa negra, blanca y verde.', 'Solicitar recogida especial para muebles y escombros.', 'Respetar y apoyar a quienes reciclan.'];
  const [checks, setChecks] = useStateB(state.signed ? compromisos.map(() => true) : compromisos.map(() => false));
  const all = checks.every(Boolean);
  return (
    <div style={{ padding: '0 16px 24px' }}>
      <ScreenHeader title="Acuerdo de la cuadra" sub="Participación comunitaria" />
      <Card style={{ background: CL.greenL, border: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span className="cl-display" style={{ fontSize: 36, color: CL.greenD }}>{state.signers}</span>
          <span style={{ fontWeight: 700, color: CL.greenD }}>de 120 hogares</span>
        </div>
        <div style={{ height: 8, borderRadius: 4, background: '#fff', marginTop: 8 }}>
          <div style={{ width: `${state.signers / 120 * 100}%`, height: '100%', borderRadius: 4, background: CL.green, transition: 'width .5s' }} />
        </div>
      </Card>
      <SectionLabel>Me comprometo a</SectionLabel>
      <div style={{ display: 'grid', gap: 8 }}>
        {compromisos.map((c, i) => (
          <Card key={c} onClick={state.signed ? undefined : () => setChecks(checks.map((v, j) => j === i ? !v : v))} style={{ padding: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ width: 26, height: 26, borderRadius: 8, border: `2px solid ${checks[i] ? CL.green : CL.line}`, background: checks[i] ? CL.green : '#fff', color: '#fff', display: 'grid', placeItems: 'center', flexShrink: 0 }}>{checks[i] && <Icon name="check" size={16} stroke={3} />}</span>
            <span style={{ fontSize: 14.5, color: CL.ink, lineHeight: 1.35, fontWeight: 600 }}>{c}</span>
          </Card>
        ))}
      </div>
      <PrimaryBtn disabled={!all || state.signed} onClick={() => setState(s => ({ ...s, signed: true, signers: s.signers + 1 }))} style={{ marginTop: 14 }}>
        {state.signed ? <><Icon name="check" size={19} />Acuerdo firmado</> : 'Firmar el acuerdo'}
      </PrimaryBtn>

      <SectionLabel>Grupo de apoyo comunitario</SectionLabel>
      <Card style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{ display: 'flex' }}>
          {['SF', 'NZ', 'YQ', 'LJ'].map((x, i) => <span key={x} style={{ width: 36, height: 36, borderRadius: 18, background: [CL.green, CL.blue, CL.amber, CL.greenD][i], color: '#fff', fontSize: 12, fontWeight: 800, display: 'grid', placeItems: 'center', marginLeft: i ? -10 : 0, border: '2px solid #fff' }}>{x}</span>)}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, color: CL.ink, fontSize: 14.5 }}>Revisión mensual · sáb 7 nov</div>
          <div style={{ fontSize: 12.5, color: CL.mute }}>Registrar cambios y proponer ajustes</div>
        </div>
      </Card>

      <SectionLabel>Reciclaje coordinado</SectionLabel>
      <Card style={{ display: 'flex', gap: 12 }}>
        <span style={{ width: 42, height: 42, borderRadius: 12, background: CL.greenL, color: CL.green, display: 'grid', placeItems: 'center' }}><Icon name="hand" /></span>
        <div style={{ fontSize: 13.5, color: CL.ink, lineHeight: 1.45 }}>
          <b>Punto de entrega para recicladores</b>: martes y viernes, 8–10 a. m., sobre el andén ancho. Material ya separado, sin bloquear la vía ni dejar residuos dispersos.
        </div>
      </Card>
    </div>
  );
}

const ITEMS = [
  { t: 'Cáscaras y restos de comida', b: 'verde' }, { t: 'Botella plástica limpia', b: 'blanca' },
  { t: 'Servilleta usada', b: 'negra' }, { t: 'Cartón seco', b: 'blanca' },
  { t: 'Pañal', b: 'negra' }, { t: 'Lata de aluminio', b: 'blanca' },
];
const BOLSAS = { negra: ['#1e1e1e', 'No aprovechables'], blanca: ['#a8afac', 'Aprovechables'], verde: [CL.green, 'Orgánicos'] };

function Aprende() {
  const [i, setI] = useStateB(0);
  const [pick, setPick] = useStateB(null);
  const [score, setScore] = useStateB(0);
  const done = i >= ITEMS.length;
  const it = ITEMS[i];
  const answer = (b) => { if (pick) return; setPick(b); if (b === it.b) setScore(score + 1); };
  return (
    <div style={{ padding: '0 16px 24px' }}>
      <ScreenHeader title="¿En qué bolsa va?" sub="Aprende a separar" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
        {Object.entries(BOLSAS).map(([k, [c, l]]) => (
          <div key={k} style={{ background: '#fff', border: `1px solid ${CL.line}`, borderRadius: 16, padding: 10, textAlign: 'center' }}>
            <div style={{ width: 30, height: 36, margin: '0 auto 6px', background: c, borderRadius: '6px 6px 10px 10px', position: 'relative' }}>
              <span style={{ position: 'absolute', top: -6, left: 9, width: 12, height: 8, background: c, borderRadius: '4px 4px 0 0' }} />
            </div>
            <div style={{ fontWeight: 800, fontSize: 13, color: CL.ink, textTransform: 'capitalize' }}>{k}</div>
            <div style={{ fontSize: 11, color: CL.mute }}>{l}</div>
          </div>
        ))}
      </div>

      <SectionLabel>Reto rápido {done ? '' : `· ${i + 1}/${ITEMS.length}`}</SectionLabel>
      {done ? (
        <Card style={{ textAlign: 'center', padding: 24 }}>
          <div className="cl-display" style={{ fontSize: 44, color: CL.green }}>{score}/{ITEMS.length}</div>
          <div style={{ fontWeight: 700, color: CL.ink, marginTop: 4 }}>{score >= 5 ? '¡Eres experta en separar!' : 'Vas bien, ¡inténtalo de nuevo!'}</div>
          <PrimaryBtn onClick={() => { setI(0); setScore(0); setPick(null); }} style={{ marginTop: 16 }}>Repetir reto</PrimaryBtn>
        </Card>
      ) : (
        <Card style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: CL.mute, fontWeight: 600 }}>¿Dónde va?</div>
          <div className="cl-display" style={{ fontSize: 24, color: CL.ink, margin: '4px 0 16px' }}>{it.t}</div>
          <div style={{ display: 'grid', gap: 8 }}>
            {Object.entries(BOLSAS).map(([k, [c]]) => {
              const right = pick && k === it.b, wrong = pick === k && k !== it.b;
              return (
                <button key={k} onClick={() => answer(k)} className="cl-press" style={{
                  height: 50, borderRadius: 14, cursor: 'pointer', fontFamily: 'inherit', fontSize: 15, fontWeight: 700,
                  display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px',
                  border: `2px solid ${right ? CL.green : wrong ? CL.red : CL.line}`,
                  background: right ? CL.greenL : wrong ? CL.redL : '#fff', color: CL.ink,
                }}>
                  <span style={{ width: 16, height: 16, borderRadius: 5, background: c }} />Bolsa {k}
                  <span style={{ flex: 1 }} />{right && <Icon name="check" color={CL.green} />}
                </button>
              );
            })}
          </div>
          {pick && <PrimaryBtn onClick={() => { setI(i + 1); setPick(null); }} style={{ marginTop: 14 }}>Siguiente</PrimaryBtn>}
        </Card>
      )}

      <SectionLabel>Recuerda</SectionLabel>
      <Card style={{ fontSize: 14, color: CL.ink, lineHeight: 1.55 }}>
        Colchones, neveras, muebles y escombros <b>no van en ninguna bolsa</b>: solicita la recogida especial desde la app.
      </Card>
    </div>
  );
}

function Avisos({ back }) {
  const list = [
    ['truck', CL.green, 'El carro pasa hoy desde las 7:00 p. m.', 'Hace 1 h'],
    ['check', CL.green, 'La entidad programó visita de evaluación al punto crítico', 'Ayer'],
    ['sofa', CL.blue, 'Ruta de voluminosos este sábado 31 de octubre', 'Hace 2 días'],
    ['people', CL.amber, '3 vecinos nuevos firmaron el acuerdo', 'Hace 3 días'],
  ];
  return (
    <div style={{ padding: '0 16px 24px' }}>
      <ScreenHeader title="Avisos" onBack={back} />
      <div style={{ display: 'grid', gap: 8 }}>
        {list.map(([ic, c, t, w]) => (
          <Card key={t} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 14 }}>
            <span style={{ width: 42, height: 42, borderRadius: 21, background: c, color: '#fff', display: 'grid', placeItems: 'center' }}><Icon name={ic} size={20} /></span>
            <div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: 14.5, color: CL.ink, lineHeight: 1.3 }}>{t}</div><div style={{ fontSize: 12, color: CL.mute, marginTop: 2 }}>{w}</div></div>
          </Card>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { Reportar, PuntoCritico, Comunidad, Aprende, Avisos });
