import { useState, useEffect, useRef } from 'react'
import './index.css'
import Header from './components/layout/Header'
import panoCampus from './assets/20260601_112014_603.jpg'

/* ── Configuração do tour ─────────────────────────────────────────────── */
const TOUR_BASE    = 'https://tour.panoee.net/695bf5bbd9acedda1b757040'
const CENA_INICIAL = '20260517_144128_493'

const grupos = [
  {
    id: 'entrada',
    nome: 'Entrada principal',
    cenas: [{ id: 1, nome: 'LAB_LOVELACE', sceneId: '20260517_155443_286' }],
  },
  { id: 'tecnologico', nome: 'Centro Tecnológico', cenas: [] },
  {
    id: 'veterinaria',
    nome: 'Medicina Veterinária',
    cenas: [{ id: 1, nome: 'LAB_LOVELACE', sceneId: '20260517_155443_286' }],
  },
  {
    id: 'agroecologia',
    nome: 'Agroecologia',
    cenas: [{ id: 1, nome: 'LAB_LOVELACE', sceneId: '20260517_155443_286' }],
  },
  {
    id: 'agropecuaria',
    nome: 'Agropecuária',
    cenas: [{ id: 1, nome: 'LAB_LOVELACE', sceneId: '20260517_155443_286' }],
  },
  {
    id: 'esportes',
    nome: 'Área de esportes',
    cenas: [{ id: 1, nome: 'LAB_LOVELACE', sceneId: '20260517_155443_286' }],
  },
]

/* ── Bandeirinha IFAM ────────────────────────────────────────────────── */
function IfamFlag({ size = 12 }) {
  const cells = [
    ['red','green','green'],
    ['green','green','green'],
    ['green','green','green'],
  ]
  return (
    <div style={{ display:'grid', gridTemplateColumns:`repeat(3,${size}px)`, gridTemplateRows:`repeat(3,${size}px)`, gap:3 }}>
      {cells.flat().map((cor, i) => (
        <div key={i} style={{ width:size, height:size, borderRadius:2, background: cor==='red' ? 'var(--ifam-red)' : 'var(--ifam-green)' }} />
      ))}
    </div>
  )
}

/* ── Dica adaptativa (mouse vs touch) ────────────────────────────────── */
function SplashHint() {
  const isTouch = typeof window !== 'undefined' &&
    (navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches)
  return (
    <div className="splash-hint">
      <div className="splash-hint__icon">{isTouch ? '👆' : '🖱️'}</div>
      <p>
        {isTouch
          ? <>Toque e arraste para navegar<br />ou use dois dedos para zoom.</>
          : <>Clique e arraste para navegar<br />ou use o scroll para zoom.</>}
      </p>
    </div>
  )
}

/* ── Splash ────────────────────────────────────────────────────────────── */
function SplashScreen({ onEntrar }) {
  const viewerRef = useRef(null)

  useEffect(() => {
    if (!document.getElementById('pannellum-css')) {
      const link = document.createElement('link')
      link.id = 'pannellum-css'
      link.rel = 'stylesheet'
      link.href = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css'
      document.head.appendChild(link)
    }
    const initViewer = () => {
      if (!viewerRef.current || !window.pannellum) return
      window.pannellum.viewer(viewerRef.current, {
        type: 'equirectangular', panorama: panoCampus,
        autoLoad: true, autoRotate: -2, compass: false,
        showControls: false, showFullscreenCtrl: false,
        showZoomCtrl: false, mouseZoom: false, friction: 0.15, hfov: 100,
      })
    }
    if (window.pannellum) { initViewer(); return }
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js'
    script.onload = initViewer
    document.head.appendChild(script)
  }, [])

  return (
    <div className="splash">
      <div className="splash__bg" ref={viewerRef} />
      <div className="splash__dim" />
      <div className="splash__center">
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
            <button className="splash-enter-btn" onClick={onEntrar} aria-label="Entrar no tour">›</button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── App principal ────────────────────────────────────────────────────── */
export default function App() {
  const [menuAberto,    setMenuAberto]    = useState(false)
  const [splashVisivel, setSplashVisivel] = useState(true)
  const [cenaAtiva,     setCenaAtiva]     = useState(CENA_INICIAL)
  const [abertos,       setAbertos]       = useState({})
  const [telaCheia,     setTelaCheia]     = useState(false)
  const tourCardRef = useRef(null)

  const toggleGrupo = (id) => setAbertos((prev) => ({ ...prev, [id]: !prev[id] }))
  const irParaCena  = (sceneId) => { setCenaAtiva(sceneId); setMenuAberto(false) }

  /* ── Tela cheia via Fullscreen API ──────────────────────────────────── */
  const toggleTelaCheia = () => {
    if (!document.fullscreenElement) {
      tourCardRef.current?.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  useEffect(() => {
    const onFsChange = () => setTelaCheia(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onFsChange)
    return () => document.removeEventListener('fullscreenchange', onFsChange)
  }, [])

  if (splashVisivel) return <SplashScreen onEntrar={() => setSplashVisivel(false)} />

  return (
    <div className="ifam-layout">
      <Header />

      <main className="ifam-main">
        <div className="page-heading">
          <h2>Tour Virtual do Campus</h2>
          <p>Navegue pelas instalações do IFAM — Campus Manaus Zona Leste em 360°.</p>
        </div>

        <div className="card">
          {/* Cabeçalho do card com botão de tela cheia */}
          <div className="card-header">
            <div className="card-header__info">
              <h3><span aria-hidden="true">🎥</span> Panorama interativo</h3>
              <p>Use o menu lateral para navegar entre os ambientes do campus.</p>
            </div>
            <button
              className="tour-fullscreen-btn"
              onClick={toggleTelaCheia}
              aria-label={telaCheia ? 'Sair da tela cheia' : 'Ampliar para tela cheia'}
              title={telaCheia ? 'Sair da tela cheia' : 'Tela cheia'}
            >
              {telaCheia ? (
                /* ícone sair fullscreen ⊡ */
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3v3a2 2 0 0 1-2 2H3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/>
                  <path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M16 21v-3a2 2 0 0 1 2-2h3"/>
                </svg>
              ) : (
                /* ícone entrar fullscreen ⤢ */
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 7V3h4"/><path d="M21 7V3h-4"/>
                  <path d="M3 17v4h4"/><path d="M21 17v4h-4"/>
                </svg>
              )}
              <span>{telaCheia ? 'Sair' : 'Tela cheia'}</span>
            </button>
          </div>

          <div className="card-body">
            {/* Container do tour — é ele que entra em fullscreen */}
            <div className="tour-card" ref={tourCardRef}>
              <iframe
                key={cenaAtiva}
                name="panoee-tour-embeded"
                src={`${TOUR_BASE}/${cenaAtiva}`}
                allow="vr; xr; accelerometer; gyroscope; autoplay"
                allowFullScreen
                title="Tour Virtual 360° IFAM"
              />

              {/* Hambúrguer — sempre visível, inclusive em fullscreen */}
              <button
                className="tour-menu-btn"
                onClick={() => setMenuAberto(!menuAberto)}
                aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu de cenas'}
              >
                {menuAberto
                  ? <span style={{ color:'#fff', fontSize:18, lineHeight:1 }}>✕</span>
                  : <>
                      <div className="bar" style={{ width:20 }} />
                      <div className="bar" style={{ width:14 }} />
                      <div className="bar" style={{ width:20 }} />
                    </>
                }
              </button>

              {/* Drawer e overlay ficam DENTRO do tour-card para aparecerem em fullscreen */}
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
                      {abertos[grupo.id] && grupo.cenas.map((cena) => {
                        const ativo = cena.sceneId === cenaAtiva
                        return (
                          <button
                            key={cena.id}
                            className={`tour-scene-btn ${ativo ? 'active' : ''}`}
                            onClick={() => irParaCena(cena.sceneId)}
                          >
                            <span>{cena.nome}</span>
                            {ativo && <span style={{ color:'var(--ifam-green)', fontSize:16 }}>›</span>}
                          </button>
                        )
                      })}
                    </div>
                  ))}
                </div>
                <div className="tour-drawer__foot">
                  <div className="tour-drawer__foot-dot" />
                  Tour Virtual 360° · IFAM CMZL
                </div>
              </nav>

              {menuAberto && (
                <div className="tour-overlay" onClick={() => setMenuAberto(false)} aria-hidden="true" />
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="ifam-footer">
        IFAM — Instituto Federal de Educação, Ciência e Tecnologia do Amazonas
      </footer>
    </div>
  )
}
