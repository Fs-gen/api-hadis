export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 font-sans text-slate-900 dark:text-zinc-50 selection:bg-emerald-500 selection:text-white">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-[120px] dark:bg-emerald-500/20" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-teal-500/10 blur-[120px] dark:bg-teal-500/20" />
      </div>

      <main className="relative z-10 w-full max-w-5xl mx-auto px-6 py-20 sm:py-32 flex flex-col gap-16">
        {/* Header / Hero Section */}
        <header className="flex flex-col gap-6 items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            v1.0.0 API Aktif
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            Dokumentasi{' '}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">
              API Hadis
            </span>
          </h1>
          <p className="max-w-2xl text-lg text-slate-600 dark:text-zinc-400">
            RESTful API gratis dan super cepat untuk mengakses ribuan data hadis dari berbagai kitab ternama. Dibangun dengan memprioritaskan privasi data dan kecepatan.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#endpoints" className="px-6 py-3 rounded-full bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/25">
              Jelajahi Endpoint
            </a>
            <a href="https://github.com/Fs-gen/api-hadis" target="_blank" rel="noreferrer" className="px-6 py-3 rounded-full bg-slate-200 dark:bg-zinc-800 text-slate-900 dark:text-white font-medium hover:bg-slate-300 dark:hover:bg-zinc-700 transition-colors">
              Repository
            </a>
          </div>
        </header>

        {/* Endpoints Grid */}
        <section id="endpoints" className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-10">

          {/* Card 1: Books */}
          <div className="group flex flex-col p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-bold rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">GET</span>
              <code className="text-sm font-mono text-slate-800 dark:text-zinc-200 bg-slate-100 dark:bg-zinc-800 px-2 py-1 rounded">/books</code>
            </div>
            <h3 className="text-xl font-bold mb-2">Daftar Kitab</h3>
            <p className="text-slate-600 dark:text-zinc-400 text-sm mb-6 flex-1">
              Mengambil daftar lengkap seluruh kitab hadis yang tersedia beserta jumlah total hadis yang ada di dalamnya.
            </p>
            <div className="w-full bg-slate-950 rounded-xl p-4 overflow-x-auto border border-slate-800">
              <pre className="text-xs text-emerald-400 font-mono">
                {`{
  "code": 200,
  "data": [
    {
      "id": "bukhari",
      "name": "Bukhari",
      "available": 7008
    }
  ]
}`}
              </pre>
            </div>
            <a href="/books" target="_blank" className="mt-4 text-sm font-medium text-emerald-500 hover:text-emerald-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Coba Endpoint →
            </a>
          </div>

          {/* Card 2: Range */}
          <div className="group flex flex-col p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300">
            <div className="flex items-center gap-3 flex-wrap mb-4">
              <span className="px-3 py-1 text-xs font-bold rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">GET</span>
              <code className="text-sm font-mono text-slate-800 dark:text-zinc-200 bg-slate-100 dark:bg-zinc-800 px-2 py-1 rounded">/books/{"{id}"}?range=1-50</code>
            </div>
            <h3 className="text-xl font-bold mb-2">Rentang Hadis (Range)</h3>
            <p className="text-slate-600 dark:text-zinc-400 text-sm mb-6 flex-1">
              Mengambil kumpulan hadis berdasarkan rentang nomor. Untuk performa, batas maksimal hadis yang dikembalikan adalah 300 data sekali panggil.
            </p>
            <div className="w-full bg-slate-950 rounded-xl p-4 overflow-x-auto border border-slate-800">
              <pre className="text-xs text-blue-400 font-mono">
                {`{
  "code": 200,
  "data": {
    "name": "Bukhari",
    "requested": 50,
    "hadiths": [ ... ]
  }
}`}
              </pre>
            </div>
            <a href="/books/bukhari?range=1-50" target="_blank" className="mt-4 text-sm font-medium text-emerald-500 hover:text-emerald-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Coba Endpoint →
            </a>
          </div>

          {/* Card 3: Spesifik */}
          <div className="group flex flex-col p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-bold rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">GET</span>
              <code className="text-sm font-mono text-slate-800 dark:text-zinc-200 bg-slate-100 dark:bg-zinc-800 px-2 py-1 rounded">/books/{"{id}"}/{"{nomor}"}</code>
            </div>
            <h3 className="text-xl font-bold mb-2">Hadis Spesifik</h3>
            <p className="text-slate-600 dark:text-zinc-400 text-sm mb-6 flex-1">
              Mengambil satu buah hadis secara spesifik berdasarkan nama kitab dan nomor urut hadis tesebut.
            </p>
            <div className="w-full bg-slate-950 rounded-xl p-4 overflow-x-auto border border-slate-800">
              <pre className="text-xs text-purple-400 font-mono">
                {`{
  "code": 200,
  "data": {
    "name": "Bukhari",
    "contents": {
      "number": 1,
      "arab": "...",
      "id": "..."
    }
  }
}`}
              </pre>
            </div>
            <a href="/books/bukhari/1" target="_blank" className="mt-4 text-sm font-medium text-emerald-500 hover:text-emerald-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Coba Endpoint →
            </a>
          </div>

          {/* Card 4: Topik */}
          <div className="group flex flex-col p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-bold rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">GET</span>
              <code className="text-sm font-mono text-slate-800 dark:text-zinc-200 bg-slate-100 dark:bg-zinc-800 px-2 py-1 rounded">/topik</code>
            </div>
            <h3 className="text-xl font-bold mb-2">Topik Hadis</h3>
            <p className="text-slate-600 dark:text-zinc-400 text-sm mb-6 flex-1">
              Mencari hadis berdasarkan kategori topik tertentu, berisi pemetaan indeks kitab dan nomor hadis yang sesuai dengan topik tesebut.
            </p>
            <div className="w-full bg-slate-950 rounded-xl p-4 overflow-x-auto border border-slate-800">
              <pre className="text-xs text-orange-400 font-mono">
                {`{
  "code": 200,
  "data": {
    "Akhlak": [
      { "kitab": "ahmad", "nomor": 10 }
    ]
  }
}`}
              </pre>
            </div>
            <a href="/topik?name=Akhlak" target="_blank" className="mt-4 text-sm font-medium text-emerald-500 hover:text-emerald-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Coba Endpoint →
            </a>
          </div>

        </section>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-slate-200 dark:border-zinc-800 text-center text-slate-500 dark:text-zinc-500 text-sm">
          <p className="mb-2">
            Dibuat dengan ❤️ untuk kemudahan akses informasi Islam. <br />
            Proyek ini bersifat open source dan bebas untuk digunakan.
          </p>
          <p className="text-xs opacity-75">
            Sumber Data: <a href="https://github.com/gadingnst/hadith-api/" target="_blank" rel="noreferrer" className="underline hover:text-emerald-500 transition-colors">gadingnst/hadith-api</a>
          </p>
        </footer>
      </main>
    </div>
  );
}
