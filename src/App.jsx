import { useEffect, useMemo, useState } from 'react'
import Spline from '@splinetool/react-spline'

function useParallax(factors = { slow: 0.15, base: 0.3, fast: 0.5 }) {
  const [y, setY] = useState(0)
  useEffect(() => {
    const onScroll = () => setY(window.scrollY || window.pageYOffset)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return useMemo(
    () => ({
      y,
      slow: `translateY(${-(y * factors.slow)}px)`,
      base: `translateY(${-(y * factors.base)}px)`,
      fast: `translateY(${-(y * factors.fast)}px)`,
    }),
    [y, factors]
  )
}

function App() {
  const p = useParallax()

  return (
    <div className="min-h-screen w-full text-gray-900 bg-gradient-to-b from-white via-white to-purple-50">
      {/* HERO */}
      <section className="relative h-[100svh] w-full overflow-hidden">
        {/* Spline 3D Background */}
        <div className="absolute inset-0">
          <Spline
            scene="https://prod.spline.design/ESO6PnMadasO0hU3/scene.splinecode"
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* Soft gradient overlays (non-blocking) */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/70 via-white/20 to-white/80" />
        <div className="pointer-events-none absolute inset-0" style={{
          background:
            'radial-gradient(60% 60% at 50% 20%, rgba(147, 51, 234, 0.25) 0%, rgba(255,255,255,0) 60%), radial-gradient(40% 40% at 80% 80%, rgba(59, 130, 246, 0.18) 0%, rgba(255,255,255,0) 60%)',
        }} />

        {/* Parallax floating orbs */}
        <div
          className="absolute -left-10 top-20 h-52 w-52 rounded-full bg-fuchsia-400/30 blur-2xl"
          style={{ transform: p.slow }}
        />
        <div
          className="absolute right-6 top-28 h-40 w-40 rounded-full bg-blue-400/30 blur-2xl"
          style={{ transform: p.base }}
        />
        <div
          className="absolute left-16 bottom-16 h-24 w-24 rounded-full bg-cyan-400/40 blur-xl"
          style={{ transform: p.fast }}
        />

        {/* Content */}
        <div className="relative z-10 h-full max-w-6xl mx-auto px-6 flex items-center">
          <div className="w-full">
            <div className="mx-auto max-w-2xl">
              <p className="text-sm tracking-[0.3em] uppercase text-gray-700/80 mb-4">Undangan Pernikahan</p>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold leading-[1.1] text-gray-900">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 to-blue-600">Ayla</span>
                <span className="mx-3 text-gray-400">&</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">Raka</span>
              </h1>

              {/* Glass card */}
              <div className="mt-8 backdrop-blur-xl bg-white/40 border border-white/60 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.25)] rounded-2xl p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="text-gray-700">Sabtu, 21 Desember 2025</p>
                    <p className="text-gray-500">Gedung Serbaguna Nusantara, Jakarta</p>
                  </div>
                  <a href="#rsvp" className="inline-flex items-center justify-center rounded-xl px-5 py-3 bg-gradient-to-r from-fuchsia-600 to-blue-600 text-white font-medium shadow-lg shadow-fuchsia-500/20 transition-transform hover:scale-[1.03] active:scale-95">
                    Buka Undangan
                  </a>
                </div>
              </div>

              <p className="mt-6 text-gray-600 max-w-xl">
                Dengan penuh sukacita, kami mengundang Anda untuk hadir dan berbagi momen bahagia dalam pernikahan kami.
              </p>
            </div>
          </div>
        </div>

        {/* Subtle scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-gray-600/70">
          <div className="h-10 w-[2px] bg-gradient-to-b from-transparent via-gray-400/60 to-transparent animate-pulse" />
        </div>
      </section>

      {/* DETAILS SECTION */}
      <section id="details" className="relative py-20 sm:py-28">
        <div className="absolute inset-0 -z-0 overflow-hidden">
          <div className="absolute -top-10 right-10 h-72 w-72 rounded-full bg-fuchsia-300/20 blur-3xl" style={{ transform: p.slow }} />
          <div className="absolute bottom-0 left-10 h-64 w-64 rounded-full bg-blue-300/20 blur-3xl" style={{ transform: p.base }} />
        </div>

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">Detail Acara</h2>
            <p className="mt-3 text-gray-600">Kami menantikan kehadiran Anda dalam rangkaian acara berikut.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-white/70 bg-white/60 backdrop-blur-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Akad Nikah</h3>
              <p className="text-gray-600">09.00 - 10.00 WIB</p>
              <p className="text-gray-500 mt-2">Masjid Al-Ikhlas, Jakarta</p>
            </div>
            <div className="rounded-2xl border border-white/70 bg-white/60 backdrop-blur-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Resepsi</h3>
              <p className="text-gray-600">11.00 - 14.00 WIB</p>
              <p className="text-gray-500 mt-2">Gedung Serbaguna Nusantara</p>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="relative py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">Galeri</h2>
            <p className="mt-3 text-gray-600">Kilasan momen kebersamaan kami.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {[1,2,3,4,5,6].map((i) => (
              <div key={i} className="group relative overflow-hidden rounded-xl aspect-[4/5] bg-gradient-to-br from-fuchsia-200/40 to-blue-200/40">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center opacity-80 transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP SECTION */}
      <section id="rsvp" className="relative py-20 sm:py-24">
        <div className="absolute inset-0 -z-0 overflow-hidden">
          <div className="absolute -right-10 top-0 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" style={{ transform: p.base }} />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">Konfirmasi Kehadiran</h2>
          <p className="mt-3 text-gray-600">Mohon isi konfirmasi agar kami dapat menyiapkan yang terbaik untuk Anda.</p>

          <form className="mt-8 grid sm:grid-cols-3 gap-3">
            <input required placeholder="Nama Lengkap" className="sm:col-span-2 w-full rounded-xl border border-gray-200/70 bg-white/70 backdrop-blur-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/50 focus:border-fuchsia-300 transition" />
            <select className="w-full rounded-xl border border-gray-200/70 bg-white/70 backdrop-blur-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/50 focus:border-fuchsia-300 transition">
              <option>Hadir</option>
              <option>Tidak Hadir</option>
              <option>Masih Pertimbangan</option>
            </select>
            <button type="submit" className="sm:col-span-3 inline-flex items-center justify-center rounded-xl px-5 py-3 bg-gradient-to-r from-fuchsia-600 to-blue-600 text-white font-medium shadow-lg shadow-fuchsia-500/20 transition-transform hover:scale-[1.02] active:scale-95">
              Kirim RSVP
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-500">Catatan: Form ini hanya simulasi tampilan.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-gray-500">
        <p>
          Dengan cinta, Ayla & Raka • 2025
        </p>
      </footer>
    </div>
  )
}

export default App
