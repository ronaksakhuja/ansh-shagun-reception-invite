import { useEffect, useRef, useState } from 'react'

const TARGET = new Date('2026-12-19T19:30:00+05:30').getTime()
const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Rajmahal+Barsat+Road+Panipat+132103'
const CALENDAR_URL =
  'https://calendar.google.com/calendar/render?action=TEMPLATE' +
  '&text=Reception+of+Dr.+Ansh+%26+Shagun' +
  '&dates=20261219T140000Z/20261219T180000Z' +
  '&details=Wedding+reception+of+Dr.+Ansh+Ahuja+and+Shagun+Kathuria' +
  '&location=Rajmahal,+Barsat+Road,+Panipat+132103'

const PETALS = [
  { left: '6%', delay: '0s', dur: '11s', color: '#f4a7b9' },
  { left: '14%', delay: '3s', dur: '14s', color: '#e8c88a' },
  { left: '24%', delay: '1.5s', dur: '12s', color: '#f9c5d5' },
  { left: '36%', delay: '5s', dur: '15s', color: '#f4a7b9' },
  { left: '48%', delay: '2s', dur: '11s', color: '#e8c88a' },
  { left: '58%', delay: '6s', dur: '13s', color: '#f9c5d5' },
  { left: '68%', delay: '0.8s', dur: '12s', color: '#f4a7b9' },
  { left: '78%', delay: '4s', dur: '14s', color: '#e8c88a' },
  { left: '88%', delay: '2.5s', dur: '11s', color: '#f9c5d5' },
  { left: '94%', delay: '7s', dur: '15s', color: '#f4a7b9' },
]

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
  const [burst, setBurst] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { days, hours, mins, secs } = useCountdown()

  useEffect(() => {
    document.body.classList.add('locked')
    return () => document.body.classList.remove('locked')
  }, [])

  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal'))
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 },
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [gateOpen])

  const openGate = () => {
    setGateOpen(true)
    document.body.classList.remove('locked')
    window.scrollTo(0, 0)
    setBurst(true)
    window.setTimeout(() => setBurst(false), 1200)
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
      <audio ref={audioRef} src="/audio/krishna-bansuri.mp3" loop preload="none" />

      {burst && (
        <div className="burst" aria-hidden="true">
          {Array.from({ length: 26 }).map((_, i) => {
            const angle = (i / 26) * Math.PI * 2
            const dist = 90 + (i % 5) * 55
            return (
              <span
                key={i}
                style={{
                  background: i % 3 === 0 ? '#e8c88a' : i % 3 === 1 ? '#f4a7b9' : '#f9c5d5',
                  ['--dx' as string]: `${Math.cos(angle) * dist}px`,
                  ['--dy' as string]: `${Math.sin(angle) * dist - 60}px`,
                  ['--rot' as string]: `${(i * 137) % 360}deg`,
                }}
              />
            )
          })}
        </div>
      )}

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
        className="music-toggle"
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
          <div className="petals" aria-hidden="true">
            {PETALS.map((p, i) => (
              <span key={i} className="petal" style={{ left: p.left, animationDelay: p.delay, animationDuration: p.dur, background: p.color }} />
            ))}
          </div>
          <img className="floral floral-tl" src="/invite/floral-tl.png" alt="" aria-hidden="true" />
          <img className="floral floral-br" src="/invite/floral-br.png" alt="" aria-hidden="true" />
          <div className="hero-content">
            <p className="hero-symbol" aria-hidden="true">ੴ</p>
            <p className="eyebrow">With the heavenly blessings of<br />Smt. Nirmal &amp; Dr. Ram Parkash Ahuja</p>
            <p className="names">
              Dr. Ansh
              <span className="ampersand">&amp;</span>
              Shagun
            </p>
            <p className="hero-sub">Wedding Reception</p>
            <p className="venue-lockup">DEC 19 &middot; 7:30 PM onwards<br />Rajmahal, Panipat</p>
          </div>
          <div className="scroll-cue">Scroll</div>
        </section>

        <section className="section countdown-section">
          <div className="section-inner reveal">
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

        <section className="section invite-section">
          <div className="section-inner reveal">
            <p className="eyebrow">The invitation</p>
            <h2>An evening to remember</h2>
            <div className="gold-rule"><span /></div>
            <div className="invite-card">
              <img className="floral floral-tl" src="/invite/floral-tl.png" alt="" aria-hidden="true" />
              <img className="floral floral-br" src="/invite/floral-br.png" alt="" aria-hidden="true" />
                <p className="arch-symbol" aria-hidden="true">ੴ</p>
                <p className="arch-blessing">With the heavenly blessings of<br />Smt. Nirmal &amp; Dr. Ram Parkash Ahuja</p>
                <p className="arch-parents shimmer">NEELAM &amp; ARUN AHUJA</p>
                <p className="arch-request">Request the honour of your presence at the wedding reception of their beloved son</p>
                <p className="arch-names">
                  Dr. Ansh
                  <span className="ampersand">&amp;</span>
                  Shagun
                </p>
                <p className="arch-daughter">D/O Anshu &amp; Harsh Kathuria</p>
                <div className="gold-rule"><span /></div>
                <p className="arch-copy">
                  Come be a part of an evening filled with love, laughter, music, and cherished memories.
                </p>
                <p className="arch-presence">Your presence will make the celebration complete.</p>
                <div className="arch-when">
                  <div><h4>Date</h4><p>19th Dec, 2026</p><small>Saturday</small></div>
                  <div><h4>Time</h4><p>7:30 PM</p><small>Onwards</small></div>
                  <div><h4>Venue</h4><p>Rajmahal</p><small>Panipat</small></div>
                </div>
                <img className="card-palace" src="/invite/palace.png" alt="Gold palace" />
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-inner reveal" style={{ textAlign: 'center' }}>
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
          <div className="section-inner reveal">
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
          <div className="petals" aria-hidden="true">
            {PETALS.slice(0, 6).map((p, i) => (
              <span key={i} className="petal" style={{ left: p.left, animationDelay: p.delay, animationDuration: p.dur, background: p.color }} />
            ))}
          </div>
          <div className="section-inner reveal">
            <img className="palace" src="/invite/palace.png" alt="Gold palace" />
            <p className="eyebrow">We cannot wait to see you</p>
            <h2>Your presence will make the celebration complete</h2>
            <p className="lede">
              Join us at Rajmahal on the evening of 19 December for love, laughter, music, and cherished memories.
            </p>
            <p className="names-small">Dr. Ansh &amp; Shagun</p>
            <p style={{ marginTop: 28, fontSize: 11, letterSpacing: '.08em', color: '#d8a8b2' }}>
              Music: Krishna Bansuri by Alex Morgan, CC BY 4.0
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
