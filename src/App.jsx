import { useState, useEffect, useRef } from 'react'
import './index.css'
import panoCampus from './assets/20260601_112014_603.jpg'

const TOUR_BASE_DESKTOP = 'https://tour.panoee.net/695bf5bbd9acedda1b757040'
const TOUR_BASE_MOBILE  = 'https://tour.panoee.net/69c1a754ece2b7b1e84f6562'
const CENA_INICIAL_DESKTOP = '20260517_144128_493'
const CENA_INICIAL_MOBILE  = '20260612_093642_788'


function isDispositivoMovel() {
  if (typeof window === 'undefined') return false
  return (
    navigator.maxTouchPoints > 0 ||
    window.matchMedia('(pointer: coarse)').matches ||
    window.innerWidth <= 820
  )
}

const grupos = [
  {
    id: 'entrada',
    nome: 'Entrada principal',
    cenas: [
      {
        id: 1,
        nome: '',
        sceneId: ''
      }
    ]
  },

  {
  id: 'tecnologico',
  nome: 'Centro Tecnológico',

  cenas: [
    {
      id: 'entrada-tecnologico',
      nome: 'Entrada - Centro Tecnológico',
      sceneId: '6a2d70ff89e7dc4e6a7940fb',
      tourBase: 'https://tour.panoee.net/695bf5bbd9acedda1b757040'
    }
  ],

  subgrupos: [
    {
      id: 'laboratorios-tecnologico',
      nome: 'Laboratórios',

      cenas: [
        {
          id: 'lab-lovelace',
          nome: 'Lab Lovelace',
          sceneId: '20260517_155443_286'
        },

        {
          id: 'lab-redes',
          nome: 'Lab de Redes',
          sceneId: '20260318-222239-417'
        },

        {
          id: 'lab-turing',
          nome: 'Lab Turing',
          sceneId: '20260517_155248_880'
        },

        {
          id: 'TechThinkers',
          nome: 'Lab TechThinkers',
          sceneId: '20260318_221914_212'
        },

        {
          id: 'IfMaker',
          nome: 'Lab IFMaker',
          sceneId: '20260601_192022_923'
        },

        {
          id: 'Lab desenho técnico',
          nome: 'Lab Desenho Técnico',
          sceneId: '20260601_192435_278'
        },

        {
          id: 'copa',
          nome: 'Copa',
          sceneId: '20260312_132419_322'
        }
      ]
    }
  ]
},


  {
  id: 'veterinaria',
  nome: 'Medicina Veterinária',

  cenas: [
    {
      id: 1,
      nome: 'Entrada - Medicina Veterinária',
      sceneId: '20260512_153801_935',
      tourBase: 'https://tour.panoee.net/69dfe0e4cab90791b362e8e5'
    }
  ],

  subgrupos: [
    {
      id: 'laboratorios-veterinaria',
      nome: 'Laboratórios',

      cenas: [
        {
          id: 'lab-anatomia',
          nome: 'Lab de Anatomia',
          sceneId: '20260428_210844_179',
          tourBase: 'https://tour.panoee.net/69dfe0e4cab90791b362e8e5'
        },
        {
          id: 'lab-microscopia',
          nome: 'Lab de Microscopia',
          sceneId: '20260428_210130_226',
          tourBase: 'https://tour.panoee.net/69dfe0e4cab90791b362e8e5'
        }
      ]
    }
  ]
},

  {
    id: 'agroecologia',
    nome: 'Agroecologia',
    cenas: [
      {
        id: 1,
        nome: 'LAB_LOVELACE',
        sceneId: '20260517_155443_286'
      }
    ]
  },

  {
    id: 'agropecuaria',
    nome: 'Agropecuária',
    cenas: [
      {
        id: 1,
        nome: 'LAB_LOVELACE',
        sceneId: '20260517_155443_286'
      }
    ]
  },

  {
    id: 'esportes',
    nome: 'Área de esportes',
    cenas: [
      {
        id: 1,
        nome: 'LAB_LOVELACE',
        sceneId: '20260517_155443_286'
      }
    ]
  }
]

function IfamFlag({ size = 12 }) {
  const cells = [['red','green','green'],['green','green','green'],['green','green','green']]
  return (
    <div style={{ display:'grid', gridTemplateColumns:`repeat(3,${size}px)`, gridTemplateRows:`repeat(3,${size}px)`, gap:3 }}>
      {cells.flat().map((cor, i) => (
        <div key={i} style={{ width:size, height:size, borderRadius:2, background: cor==='red' ? 'var(--ifam-red)' : 'var(--ifam-green)' }} />
      ))}
    </div>
  )
}

function SplashHint() {
  const isTouch = typeof window !== 'undefined' &&
    (navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches)
  return (
    <div className="splash-hint">
      <div className="splash-hint__icon">{isTouch ? '👆' : '🖱️'}</div>
      <p>{isTouch
        ? <>Toque e arraste para navegar<br />ou use dois dedos para zoom.</>
        : <>Clique e arraste para navegar<br />ou use o scroll para zoom.</>}
      </p>
    </div>
  )
}

/* ── Card 1: Boas-vindas ─────────────────────────────────────────────── */
function CardBemVindo({ onEntrar }) {
  return (
    <div className="splash-card">
      <div className="splash-card__hero">
        <h1 className="splash-card__title">TOUR<br />VIRTUAL 360°</h1>
        <p className="splash-card__sub">Seja bem-vindo(a)!</p>
        <div className="splash-card__rule" />
      </div>
      <div className="splash-badge">
        <div className="splash-badge__icon">📍</div>
        <div>
          <p className="splash-badge__name">Instituto Federal do Amazonas</p>
          <p className="splash-badge__campus">Campus Manaus Zona Leste</p>
        </div>
      </div>
      <SplashHint />
      <div className="splash-card__foot">
        <div className="splash-card__logo-area">
          <IfamFlag size={12} />
          <div className="splash-card__logo-text">
            <strong>INSTITUTO<br />FEDERAL</strong>
            <small>Amazonas</small>
            <em>Campus Manaus Zona Leste</em>
          </div>
        </div>
        <button className="splash-enter-btn" onClick={onEntrar} aria-label="Próximo">›</button>
      </div>
    </div>
  )
}

/* ── Card 2: Seleção de dispositivo ─────────────────────────────────── */
function CardDispositivo({ onContinuar }) {
  const [selecionado, setSelecionado] = useState(null)
  return (
    <div className="splash-card">
      <div className="splash-card__hero">
        <h1 className="splash-card__title">Como você<br />está acessando?</h1>
        <p className="splash-card__sub">Escolha para a melhor experiência</p>
        <div className="splash-card__rule" />
      </div>

      <div className="device-options">
        <button
          className={`device-btn ${selecionado === 'mobile' ? 'device-btn--active' : ''}`}
          onClick={() => setSelecionado('mobile')}
        >
          <span className="device-btn__icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18.01"/>
            </svg>
          </span>
          <span className="device-btn__label">Celular ou<br />Tablet</span>
        </button>

        <button
          className={`device-btn ${selecionado === 'desktop' ? 'device-btn--active' : ''}`}
          onClick={() => setSelecionado('desktop')}
        >
          <span className="device-btn__icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
          </span>
          <span className="device-btn__label">Computador<br />ou Notebook</span>
        </button>
      </div>

      <div className="splash-card__foot">
        <div className="splash-card__logo-area">
          <IfamFlag size={12} />
          <div className="splash-card__logo-text">
            <strong>INSTITUTO<br />FEDERAL</strong>
            <small>Amazonas</small>
            <em>Campus Manaus Zona Leste</em>
          </div>
        </div>
        <button
          className="splash-enter-btn"
          onClick={() => selecionado && onContinuar(selecionado)}
          aria-label="Continuar"
          style={{ opacity: selecionado ? 1 : 0.4, cursor: selecionado ? 'pointer' : 'not-allowed' }}
        >›</button>
      </div>
    </div>
  )
}

/* ── Splash wrapper — panorama sempre montado ────────────────────────── */
function SplashWrapper({ tela, onEntrar, onContinuar }) {
  const viewerRef = useRef(null)

  useEffect(() => {
    if (!document.getElementById('pannellum-css')) {
      const link = document.createElement('link')
      link.id = 'pannellum-css'
      link.rel = 'stylesheet'
      link.href = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css'
      document.head.appendChild(link)
    }
    const init = () => {
      if (!viewerRef.current || !window.pannellum) return
      window.pannellum.viewer(viewerRef.current, {
        type: 'equirectangular', panorama: panoCampus,
        autoLoad: true, autoRotate: -2, compass: false,
        showControls: false, showFullscreenCtrl: false,
        showZoomCtrl: false, mouseZoom: false, friction: 0.15, hfov: 100,
      })
    }
    if (window.pannellum) { init(); return }
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js'
    script.onload = init
    document.head.appendChild(script)
  }, [])

  return (
    <div className="splash">
      {/* panorama fica montado durante splash E device */}
      <div className="splash__bg" ref={viewerRef} />
      <div className="splash__dim" />
      <div className="splash__center">
        {tela === 'splash'
          ? <CardBemVindo onEntrar={onEntrar} />
          : <CardDispositivo onContinuar={onContinuar} />
        }
      </div>
    </div>
  )
}

/* ── App principal ───────────────────────────────────────────────────── */
export default function App() {
  const [menuAberto, setMenuAberto] = useState(false)
  const [tela,       setTela]       = useState('splash')
  const [cenaAtiva,  setCenaAtiva]  = useState(() => isDispositivoMovel() ? CENA_INICIAL_MOBILE : CENA_INICIAL_DESKTOP)
  const [abertos,    setAbertos]    = useState({})
  const [subAbertos, setSubAbertos] = useState({})

  const toggleGrupo = (id) => setAbertos(prev => ({ ...prev, [id]: !prev[id] }))
  const toggleSubgrupo = (id) => setSubAbertos(prev => ({ ...prev, [id]: !prev[id] }))
  const [tourAtual, setTourAtual] = useState(null)

const irParaCena = (sceneId, tourBase = null) => {
  if (!sceneId || sceneId.startsWith('COLOQUE_AQUI')) return
  setCenaAtiva(sceneId)
  setTourAtual(tourBase)
  setMenuAberto(false)
}

  if (tela === 'splash' || tela === 'device') return (
    <SplashWrapper
      tela={tela}
      onEntrar={() => setTela('device')}
      onContinuar={() => setTela('tour')}
    />
  )

  const tourBase = tourAtual || (isDispositivoMovel() ? TOUR_BASE_MOBILE : TOUR_BASE_DESKTOP)

  return (
    <div className="tour-card">
    <div style={{
        position: 'fixed', bottom: 10, right: 10, zIndex: 99999,
        background: 'rgba(0,0,0,.75)', color: '#fff', fontSize: 11,
        padding: '6px 10px', borderRadius: 6, fontFamily: 'monospace',
        maxWidth: 260, lineHeight: 1.4,
      }}>
        {isDispositivoMovel() ? 'MOBILE' : 'DESKTOP'}<br />
        touch:{typeof navigator !== 'undefined' ? navigator.maxTouchPoints : '?'}{' '}
        coarse:{typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches ? '1' : '0'}{' '}
        w:{typeof window !== 'undefined' ? window.innerWidth : '?'}
      </div>
      <iframe
        key={`${tourBase}-${cenaAtiva}`}
        name="panoee-tour-embeded"
        src={`${tourBase}/${cenaAtiva}`}
        allow="vr; xr; accelerometer; gyroscope; autoplay"
        allowFullScreen
        title="Tour Virtual 360° IFAM"
      />
      <button className="tour-menu-btn" onClick={() => setMenuAberto(!menuAberto)}
        aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}>
        {menuAberto
          ? <span style={{ color:'#fff', fontSize:18, lineHeight:1 }}>✕</span>
          : <><div className="bar" style={{ width:20 }} /><div className="bar" style={{ width:14 }} /><div className="bar" style={{ width:20 }} /></>
        }
      </button>
      <nav className={`tour-drawer ${menuAberto ? 'open' : ''}`} aria-label="Cenas do tour">
        <div className="tour-drawer__head">
          <p className="tour-drawer__head-institute">INSTITUTO FEDERAL DO AMAZONAS</p>
          <p className="tour-drawer__head-campus">Campus Manaus Zona Leste</p>
        </div>
        <div className="tour-drawer__body">
          <p className="tour-drawer__section-label">Cenas disponíveis</p>
          {grupos
            .filter((grupo) => !isDispositivoMovel() || grupo.id !== 'veterinaria')
            .map((grupo) => (
              <div key={grupo.id}>
                <button className="tour-group-btn" onClick={() => toggleGrupo(grupo.id)}>
                  <span>{grupo.nome}</span>
                  <span className={`chevron ${abertos[grupo.id] ? 'open' : ''}`}>›</span>
                </button>

                {abertos[grupo.id] && (
                  <>
                    {grupo.cenas?.map((cena) => {
                      const ativo = cena.sceneId === cenaAtiva
                      const disponivel =
                        Boolean(cena.sceneId) &&
                        !cena.sceneId.startsWith('COLOQUE_AQUI')

                      return (
                        <button
                          key={cena.id}
                          className={`tour-scene-btn ${ativo ? 'active' : ''}`}
                          onClick={() => irParaCena(cena.sceneId, cena.tourBase)}
                          disabled={!disponivel}
                          title={!disponivel ? 'Adicione o ID desta cena no App.jsx' : undefined}
                          style={!disponivel ? { opacity: 0.55, cursor: 'not-allowed' } : undefined}
                        >
                          <span>{cena.nome || 'Cena sem nome'}</span>
                          {disponivel && (
                            <span style={{ color:'var(--ifam-green)', fontSize:16 }}>›</span>
                          )}
                        </button>
                      )
                    })}

                    {grupo.subgrupos?.map((subgrupo) => (
                      <div key={subgrupo.id}>
                        <button
                          className="tour-scene-btn"
                          onClick={() => toggleSubgrupo(subgrupo.id)}
                          style={{ fontWeight: 600 }}
                        >
                          <span>{subgrupo.nome}</span>
                          <span className={`chevron ${subAbertos[subgrupo.id] ? 'open' : ''}`}>
                            ›
                          </span>
                        </button>

                        {subAbertos[subgrupo.id] &&
                          subgrupo.cenas.map((cena) => {
                            const ativo = cena.sceneId === cenaAtiva
                            const disponivel =
                              Boolean(cena.sceneId) &&
                              !cena.sceneId.startsWith('COLOQUE_AQUI')

                            return (
                              <button
                                key={cena.id}
                                className={`tour-scene-btn ${ativo ? 'active' : ''}`}
                                onClick={() => irParaCena(cena.sceneId, cena.tourBase)}
                                disabled={!disponivel}
                                title={!disponivel ? 'Adicione o ID desta cena no App.jsx' : undefined}
                                style={{
                                  paddingLeft: '38px',
                                  ...(!disponivel
                                    ? { opacity: 0.55, cursor: 'not-allowed' }
                                    : {})
                                }}
                              >
                                <span>{cena.nome}</span>
                                {disponivel && (
                                  <span style={{ color:'var(--ifam-green)', fontSize:16 }}>›</span>
                                )}
                              </button>
                            )
                          })}
                      </div>
                    ))}
                  </>
                )}
              </div>
            ))}
        </div>
        <div className="tour-drawer__foot">
          <div className="tour-drawer__foot-dot" />
          Tour Virtual 360° · IFAM CMZL
        </div>
      </nav>
      {menuAberto && <div className="tour-overlay" onClick={() => setMenuAberto(false)} aria-hidden="true" />}
    </div>
  )
}
