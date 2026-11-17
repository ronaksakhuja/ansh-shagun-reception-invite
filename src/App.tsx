import { useEffect, useRef, useState } from 'react'

const TARGET = new Date('2026-12-19T19:30:00+05:30').getTime()
const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Rajmahal+Barsat+Road+Panipat+132103'
const CALENDAR_URL =
  'https://calendar.google.com/calendar/render?action=TEMPLATE' +
  '&text=Reception+of+Dr.+Ansh+%26+Shagun' +
  '&dates=20261219T140000Z/20261219T180000Z' +
  '&details=Wedding+reception+of+Dr.+Ansh+Ahuja+and+Shagun+Kathuria' +
  '&location=Rajmahal,+Barsat+Road,+Panipat+132103'

function useCountdown() {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])
  const diff = Math.max(0, TARGET - now)
  return {
    days: Math.floor(diff / 86400000),
    hours: String(Math.floor(diff / 3600000) % 24).padStart(2, '0'),
    mins: String(Math.floor(diff / 60000) % 60).padStart(2, '0'),
    secs: String(Math.floor(diff / 1000) % 60).padStart(2, '0'),
  }
}

export default function App() {
  const [gateOpen, setGateOpen] = useState(false)
  const [gateHidden, setGateHidden] = useState(false)
  const [musicOn, setMusicOn] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { days, hours, mins, secs } = useCountdown()

  useEffect(() => {
    document.body.classList.add('locked')
    return () => document.body.classList.remove('locked')
  }, [])

  const openGate = () => {
    setGateOpen(true)
    document.body.classList.remove('locked')
    window.scrollTo(0, 0)
    setTimeout(() => setGateHidden(true), 1100)
    const a = audioRef.current
    if (a) {
      a.volume = 0.5
      a.play().then(() => setMusicOn(true)).catch(() => setMusicOn(false))
    }
  }

  const toggleMusic = () => {
    const a = audioRef.current
    if (!a) return
    if (a.paused) {
      a.play().then(() => setMusicOn(true)).catch(() => {})
    } else {
      a.pause()
      setMusicOn(false)
    }
  }

  return (
    <>
      <audio ref={audioRef} src="/audio/shehnai-loop.mp3" loop preload="none" />

      {!gateHidden && (
        <div className={`gate${gateOpen ? ' open' : ''}`} role="dialog" aria-label="Invitation cover">
          <div className="gate-door gate-left" />
          <div className="gate-door gate-right" />
          <div className="gate-card">
            <p className="gate-symbol" aria-hidden="true">ੴ</p>
            <p className="gate-kicker">With the heavenly blessings of<br />Smt. Nirmal &amp; Dr. Ram Parkash Ahuja</p>
            <p className="gate-names">
              Dr. Ansh
              <span className="gate-amp">&amp;</span>
              Shagun
            </p>
            <p className="gate-date">DEC 19 &middot; 2026 &middot; PANIPAT</p>
            <button className="open-button" type="button" onClick={openGate}>
              Open the invitation
            </button>
          </div>
        </div>
      )}

      <button
        className={`music-toggle${musicOn ? '' : ' off'}`}
        type="button"
        onClick={toggleMusic}
        aria-label={musicOn ? 'Pause music' : 'Play music'}
      >
        {musicOn ? (
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
            <path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
            <path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        )}
      </button>

      <main>
        <section className="hero">
          <div className="hero-content">
            <p className="hero-symbol" aria-hidden="true">ੴ</p>
            <p className="eyebrow">With the heavenly blessings of<br />Smt. Nirmal &amp; Dr. Ram Parkash Ahuja</p>
            <p className="names">
              <span className="first">Dr. Ansh</span>
              <span className="ampersand">&amp;</span>
              Shagun
            </p>
            <p className="invitation-copy">
              Neelam &amp; Arun Ahuja request the honour of your presence at the
              wedding reception of their beloved son, Dr. Ansh, and Shagun,
              daughter of Anshu &amp; Harsh Kathuria.
            </p>
            <p className="invitation-copy">
              Come be a part of an evening filled with love, laughter, music,
              and cherished memories. Your presence will make the celebration complete.
            </p>
            <p className="venue-lockup">DEC 19 &middot; 7:30 PM onwards &middot; Rajmahal, Panipat</p>
          </div>
          <div className="scroll-cue">Scroll</div>
        </section>

        <section className="section countdown-section">
          <div className="section-inner">
            <p className="eyebrow">Countdown</p>
            <h2>Until we celebrate</h2>
            <div className="countdown" role="timer" aria-label="Countdown to the reception">
              <div className="countdown-cell"><strong>{days}</strong><span>Days</span></div>
              <div className="countdown-cell"><strong>{hours}</strong><span>Hours</span></div>
              <div className="countdown-cell"><strong>{mins}</strong><span>Minutes</span></div>
              <div className="countdown-cell"><strong>{secs}</strong><span>Seconds</span></div>
            </div>
            <p className="countdown-label">Saturday, 19 December 2026, 7:30 PM onwards</p>
          </div>
        </section>

        <section className="section card-section">
          <div className="section-inner">
            <p className="eyebrow">The invitation</p>
            <h2>An evening to remember</h2>
            <div className="gold-rule"><span /></div>
            <div className="card-frame">
              <img src="/invitation-card.jpg" alt="Wedding reception invitation for Dr. Ansh Ahuja and Shagun Kathuria, 19 December 2026, Rajmahal, Panipat" />
            </div>
            <p className="card-note">
              This is the invitation card the family shared, shown here exactly as they made it.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="section-inner" style={{ textAlign: 'center' }}>
            <p className="eyebrow">When &amp; where</p>
            <h2>Reception</h2>
            <div className="gold-rule"><span /></div>
            <div className="details-grid">
              <div className="detail">
                <div className="detail-icon" aria-hidden="true">▣</div>
                <h3>Date</h3>
                <p>19th December, 2026</p>
                <small>Saturday</small>
              </div>
              <div className="detail">
                <div className="detail-icon" aria-hidden="true">◷</div>
                <h3>Time</h3>
                <p>7:30 PM onwards</p>
                <small>Evening reception</small>
              </div>
              <div className="detail">
                <div className="detail-icon" aria-hidden="true">◎</div>
                <h3>Venue</h3>
                <p>Rajmahal</p>
                <small>Barsat Road, Panipat 132103</small>
              </div>
            </div>
            <div className="button-row" style={{ marginTop: 32 }}>
              <a className="button solid" href={MAPS_URL} target="_blank" rel="noreferrer">Get directions</a>
              <a className="button" href={CALENDAR_URL} target="_blank" rel="noreferrer">Add to calendar</a>
            </div>
          </div>
        </section>

        <section className="section hosts">
          <div className="section-inner">
            <p className="eyebrow">With love from the families</p>
            <p className="parents">Neelam &amp; Arun Ahuja</p>
            <p>request the honour of your presence at the wedding reception of their beloved son</p>
            <p className="parents" style={{ marginTop: 16 }}>Dr. Ansh &amp; Shagun</p>
            <p>Shagun is the daughter of Anshu &amp; Harsh Kathuria.</p>

            <div className="gold-rule"><span /></div>
            <p className="eyebrow">RSVP</p>
            <div className="rsvp-list">
              <p>Mrs. Uma &amp; Dr. Sunil Ahuja</p>
              <p>Mrs. Savitri &amp; Meher Chand Bhargav</p>
              <p>Mrs. Diksha &amp; Shashank Ahuja</p>
              <p>Apram Ahuja</p>
            </div>

            <p className="compliments">
              <strong>Best compliments from</strong>
              Sakhuja&rsquo;s, Choudhary&rsquo;s, Kukreja&rsquo;s, Batra&rsquo;s, and Bhargav&rsquo;s
            </p>
          </div>
        </section>

        <section className="section closing">
          <div className="section-inner">
            <p className="eyebrow">We cannot wait to see you</p>
            <h2>Your presence will make the celebration complete</h2>
            <p className="lede">
              Join us at Rajmahal on the evening of 19 December for love, laughter, music, and cherished memories.
            </p>
            <p className="names-small">Dr. Ansh &amp; Shagun</p>
          </div>
        </section>
      </main>
    </>
  )
}
