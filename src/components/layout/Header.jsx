import ifamLogo from '../../assets/ifam.png'

export default function Header() {
  return (
    <header className="ifam-header">
      <div className="ifam-header__inner">
        <img
          src={ifamLogo}
          alt="Instituto Federal do Amazonas"
          className="ifam-header__logo"
          draggable={false}
        />
        <div className="ifam-header__divider">
          <p className="ifam-header__institute">Instituto Federal do Amazonas</p>
          <h1 className="ifam-header__title">Tour Virtual 360° — Campus Manaus Zona Leste</h1>
        </div>
      </div>
    </header>
  )
}
