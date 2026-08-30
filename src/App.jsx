import { useState, useEffect, useRef } from 'react'
import './index.css'
import panoCampus from './assets/20260601_112014_603.jpg'

const TOURS = {
  desktop: {
    principal: 'https://tour.panoee.net/695bf5bbd9acedda1b757040',
    veterinaria: 'https://tour.panoee.net/69dfe0e4cab90791b362e8e5'
  },
  mobile: {
    principal: 'https://tour.panoee.net/69c1a754ece2b7b1e84f6562',
    veterinaria: 'https://tour.panoee.net/6a938b0f44457b0acc6d3da2'
  }
}

const CENAS_INICIAIS = {
  desktop: '20260517_144128_493',
  mobile: '20260612_093642_788'
}

function isDispositivoMovel() {
  if (typeof window === 'undefined') return false
  return (
    navigator.maxTouchPoints > 0 ||
    window.matchMedia('(pointer: coarse)').matches ||
    window.innerWidth <= 820
  )
}

/*
  Cada cena agora tem DUAS configurações separadas:
  desktop: { sceneId, tourBase }
  mobile:  { sceneId, tourBase }

  Quando você criar uma cena mobile nova, preencha SOMENTE o bloco mobile.
  Quando criar/alterar uma cena desktop, mexa SOMENTE no bloco desktop.
*/
const grupos = [
  {
    id: 'entrada',
    nome: 'Entrada principal',
    cenas: [
      {
        id: 'entrada-principal',
        nome: 'Entrada principal',
        desktop: {
          sceneId: CENAS_INICIAIS.desktop,
          tourBase: TOURS.desktop.principal
        },
        mobile: {
          sceneId: CENAS_INICIAIS.mobile,
          tourBase: TOURS.mobile.principal
        }
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
        desktop: {
          sceneId: '6a2d70ff89e7dc4e6a7940fb',
          tourBase: TOURS.desktop.principal
        },
        mobile: {
          sceneId: '20260612_093642_788',
          tourBase: TOURS.mobile.principal
        }
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
            desktop: {
              sceneId: '20260517_155443_286',
              tourBase: TOURS.desktop.principal
            },
            mobile: {
              sceneId: '20260517_155443_286',
              tourBase: TOURS.mobile.principal
            }
          },
          {
            id: 'lab-redes',
            nome: 'Lab de Redes',
            desktop: {
              sceneId: '20260318-222239-417',
              tourBase: TOURS.desktop.principal
            },
            mobile: {
              sceneId: '',
              tourBase: TOURS.mobile.principal
            }
          },
          {
            id: 'lab-turing',
            nome: 'Lab Turing',
            desktop: {
              sceneId: '20260517_155248_880',
              tourBase: TOURS.desktop.principal
            },
            mobile: {
              sceneId: '20260517_155248_880',
              tourBase: TOURS.mobile.principal
            }
          },
          {
            id: 'techthinkers',
            nome: 'Lab TechThinkers',
            desktop: {
              sceneId: '20260318_221914_212',
              tourBase: TOURS.desktop.principal
            },
            mobile: {
              sceneId: '20260318_221914_212',
              tourBase: TOURS.mobile.principal
            }
          },
          {
            id: 'ifmaker',
            nome: 'Lab IFMaker',
            desktop: {
              sceneId: '20260601_192022_923',
              tourBase: TOURS.desktop.principal
            },
            mobile: {
              sceneId: '20260601_192022_923',
              tourBase: TOURS.mobile.principal
            }
          },
          {
            id: 'lab-desenho-tecnico',
            nome: 'Lab Desenho Técnico',
            desktop: {
              sceneId: '20260601_192435_278',
              tourBase: TOURS.desktop.principal
            },
            mobile: {
              sceneId: '20260601_192435_278',
              tourBase: TOURS.mobile.principal
            }
          },
          {
            id: 'copa',
            nome: 'Copa',
            desktop: {
              sceneId: '20260312_132419_322',
              tourBase: TOURS.desktop.principal
            },
            mobile: {
              sceneId: '20260312_132541_120',
              tourBase: TOURS.mobile.principal
            }
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
        id: 'entrada-veterinaria',
        nome: 'Entrada - Medicina Veterinária',
        desktop: {
          sceneId: '20260512_153801_935',
          tourBase: TOURS.desktop.veterinaria
        },
        mobile: {
          sceneId: '20260415_144931_052-1',
          tourBase: TOURS.mobile.veterinaria
        }
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
            desktop: {
              sceneId: '20260428_210844_179',
              tourBase: TOURS.desktop.veterinaria
            },
            mobile: {
              sceneId: '',
              tourBase: TOURS.mobile.veterinaria
            }
          },
          {
            id: 'sala-de-aula',
            nome: 'Sala de Aula',
            desktop: {
              sceneId: '',
              tourBase: TOURS.desktop.veterinaria
            },
            mobile: {
              sceneId: '',
              tourBase: TOURS.mobile.veterinaria
            }
          },
          {
            id: 'lab-microscopia',
            nome: 'Lab de Microscopia',
            desktop: {
              sceneId: '20260428_210130_226',
              tourBase: TOURS.desktop.veterinaria
            },
            mobile: {
              sceneId: '',
              tourBase: TOURS.mobile.veterinaria
            }
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
        id: 'agroecologia-1',
        nome: 'LAB_LOVELACE',
        desktop: {
          sceneId: '20260517_155443_286',
          tourBase: TOURS.desktop.principal
        },
        mobile: {
          sceneId: '',
          tourBase: TOURS.mobile.principal
        }
      }
    ]
  },

  {
    id: 'agropecuaria',
    nome: 'Agropecuária',
    cenas: [
      {
        id: 'agropecuaria-1',
        nome: 'LAB_LOVELACE',
        desktop: {
          sceneId: '20260517_155443_286',
          tourBase: TOURS.desktop.principal
        },
        mobile: {
          sceneId: '',
          tourBase: TOURS.mobile.principal
        }
      }
    ]
  },

  {
    id: 'esportes',
    nome: 'Área Esportiva',
    cenas: [
      {
        id: 'campo',
        nome: 'Campo e Pista de Corrida',
        desktop: {
          sceneId: '20260623_135754_526',
          tourBase: TOURS.desktop.principal
        },
        mobile: {
          sceneId: '',
          tourBase: TOURS.mobile.principal
        }
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
  const dispositivoDetectado = isDispositivoMovel() ? 'mobile' : 'desktop'

  const [menuAberto, setMenuAberto] = useState(false)
  const [tela, setTela] = useState('splash')
  const [tipoDispositivo, setTipoDispositivo] = useState(dispositivoDetectado)
  const [cenaAtiva, setCenaAtiva] = useState(CENAS_INICIAIS[dispositivoDetectado])
  const [tourAtual, setTourAtual] = useState(TOURS[dispositivoDetectado].principal)
  const [abertos, setAbertos] = useState({})
  const [subAbertos, setSubAbertos] = useState({})

  const toggleGrupo = (id) => setAbertos(prev => ({ ...prev, [id]: !prev[id] }))
  const toggleSubgrupo = (id) => setSubAbertos(prev => ({ ...prev, [id]: !prev[id] }))

  const dadosDaCena = (cena) => {
    const dados = cena[tipoDispositivo] || {}
    return {
      sceneId: dados.sceneId || '',
      tourBase: dados.tourBase || TOURS[tipoDispositivo].principal
    }
  }

  const irParaCena = (sceneId, tourBase) => {
    if (!sceneId || sceneId.startsWith('COLOQUE_AQUI')) return
    setCenaAtiva(sceneId)
    setTourAtual(tourBase || TOURS[tipoDispositivo].principal)
    setMenuAberto(false)
  }

  const entrarNoTour = (tipo) => {
    setTipoDispositivo(tipo)
    setCenaAtiva(CENAS_INICIAIS[tipo])
    setTourAtual(TOURS[tipo].principal)
    setTela('tour')
  }

  if (tela === 'splash' || tela === 'device') return (
    <SplashWrapper
      tela={tela}
      onEntrar={() => setTela('device')}
      onContinuar={entrarNoTour}
    />
  )

  const tourBase = tourAtual || TOURS[tipoDispositivo].principal

  return (
    <div className="tour-card">
    <div style={{
        position: 'fixed', bottom: 10, right: 10, zIndex: 99999,
        background: 'rgba(0,0,0,.75)', color: '#fff', fontSize: 11,
        padding: '6px 10px', borderRadius: 6, fontFamily: 'monospace',
        maxWidth: 260, lineHeight: 1.4,
      }}>
        {tipoDispositivo.toUpperCase()}<br />
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
          {grupos.map((grupo) => (
              <div key={grupo.id}>
                <button className="tour-group-btn" onClick={() => toggleGrupo(grupo.id)}>
                  <span>{grupo.nome}</span>
                  <span className={`chevron ${abertos[grupo.id] ? 'open' : ''}`}>›</span>
                </button>

                {abertos[grupo.id] && (
                  <>
                    {grupo.cenas?.map((cena) => {
                      const { sceneId, tourBase } = dadosDaCena(cena)
                      const ativo = sceneId === cenaAtiva
                      const disponivel =
                        Boolean(sceneId) &&
                        !sceneId.startsWith('COLOQUE_AQUI')

                      return (
                        <button
                          key={cena.id}
                          className={`tour-scene-btn ${ativo ? 'active' : ''}`}
                          onClick={() => irParaCena(sceneId, tourBase)}
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
                            const { sceneId, tourBase } = dadosDaCena(cena)
                            const ativo = sceneId === cenaAtiva
                            const disponivel =
                              Boolean(sceneId) &&
                              !sceneId.startsWith('COLOQUE_AQUI')

                            return (
                              <button
                                key={cena.id}
                                className={`tour-scene-btn ${ativo ? 'active' : ''}`}
                                onClick={() => irParaCena(sceneId, tourBase)}
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
