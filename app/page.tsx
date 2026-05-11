'use client'

import { useState, useEffect } from 'react'

const rates: Record<string, Record<string, number>> = {
  USDT: { BTC: 0.0000234, ETH: 0.000387, UAH: 41.2 },
  BTC: { USDT: 42735, ETH: 16.54, UAH: 1760000 },
  ETH: { USDT: 2584, BTC: 0.0605, UAH: 106400 },
  UAH: { USDT: 0.0243, BTC: 0.00000057, ETH: 0.0000094 },
}

const coins = ['USDT', 'BTC', 'ETH', 'UAH']

export default function Home() {
  const [fromCoin, setFromCoin] = useState('USDT')
  const [toCoin, setToCoin] = useState('BTC')
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [step, setStep] = useState(1)
  const [wallet, setWallet] = useState('')
  const [ticker, setTicker] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setTicker(t => t + 1), 3000)
    return () => clearInterval(interval)
  }, [])

  const getRate = () => {
    if (fromCoin === toCoin) return 1
    return rates[fromCoin]?.[toCoin] || 0
  }

  const handleFromAmount = (val: string) => {
    setFromAmount(val)
    const rate = getRate()
    const spread = 0.985
    setToAmount(val ? (parseFloat(val) * rate * spread).toFixed(6) : '')
  }

  const swap = () => {
    const tmp = fromCoin
    setFromCoin(toCoin)
    setToCoin(tmp)
    setFromAmount('')
    setToAmount('')
  }

  const tickerData = [
    { pair: 'BTC/USDT', price: (42735 + Math.sin(ticker) * 50).toFixed(0), change: '+2.4%' },
    { pair: 'ETH/USDT', price: (2584 + Math.sin(ticker * 1.3) * 20).toFixed(0), change: '+1.8%' },
    { pair: 'USDT/UAH', price: (41.2 + Math.sin(ticker * 0.7) * 0.1).toFixed(2), change: '+0.3%' },
    { pair: 'BTC/UAH', price: '1,760,000', change: '+2.7%' },
  ]

  return (
    <main className="min-h-screen bg-black text-white font-mono">
      <div className="border-b border-green-900 bg-black overflow-hidden">
        <div className="flex gap-8 px-4 py-2 text-xs animate-scroll">
          {[...tickerData, ...tickerData].map((t, i) => (
            <span key={i} className="whitespace-nowrap flex gap-2">
              <span className="text-gray-500">{t.pair}</span>
              <span className="text-white">{t.price}</span>
              <span className="text-green-400">{t.change}</span>
            </span>
          ))}
        </div>
      </div>

      <header className="border-b border-green-900 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-400 rounded-sm flex items-center justify-center">
            <span className="text-black font-bold text-sm">H</span>
          </div>
          <div>
            <span className="text-white font-bold tracking-widest text-sm">HADEX</span>
            <span className="text-green-400 font-bold tracking-widest text-sm"> EXCHANGE</span>
          </div>
        </div>
        <div className="flex items-center gap-6 text-xs">
          <span className="text-gray-500">Ужгород, Україна</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400">ONLINE</span>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <div className="text-xs text-green-400 tracking-widest mb-4">// CRYPTO EXCHANGE</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-none">
            ОБМІН<br />
            <span className="text-green-400">КРИПТОВАЛЮТ</span>
          </h1>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Прозорі транзакції. Реальний курс. Без прихованих комісій.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="border border-green-900 bg-black p-6">
            <div className="text-xs text-gray-500 mb-6 flex justify-between">
              <span>ОБМІННИК</span>
              <span className="text-green-400">КРОК {step}/3</span>
            </div>

            {step === 1 && (
              <div className="space-y-4">
                <div className="border border-green-900 p-4">
                  <div className="text-xs text-gray-500 mb-2">ВІДДАЄТЕ</div>
                  <div className="flex gap-3 items-center">
                    <input
                      type="number"
                      value={fromAmount}
                      onChange={e => handleFromAmount(e.target.value)}
                      placeholder="0.00"
                      className="bg-transparent text-white text-xl flex-1 outline-none"
                    />
                    <select
                      value={fromCoin}
                      onChange={e => { setFromCoin(e.target.value); setFromAmount(''); setToAmount('') }}
                      className="bg-black border border-green-900 text-green-400 px-2 py-1 text-sm outline-none"
                    >
                      {coins.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <button onClick={swap} className="w-full py-2 text-gray-500 hover:text-green-400 text-xs transition-colors">
                  ⇅ ЗМІНИТИ НАПРЯМОК
                </button>

                <div className="border border-green-900 p-4 bg-green-950/10">
                  <div className="text-xs text-gray-500 mb-2">ОТРИМУЄТЕ</div>
                  <div className="flex gap-3 items-center">
                    <div className="text-white text-xl flex-1">{toAmount || '0.000000'}</div>
                    <select
                      value={toCoin}
                      onChange={e => { setToCoin(e.target.value); handleFromAmount(fromAmount) }}
                      className="bg-black border border-green-900 text-green-400 px-2 py-1 text-sm outline-none"
                    >
                      {coins.filter(c => c !== fromCoin).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <button
                  onClick={() => fromAmount && parseFloat(fromAmount) > 0 && setStep(2)}
                  className={`w-full py-4 text-sm font-bold tracking-widest transition-all ${
                    fromAmount && parseFloat(fromAmount) > 0
                      ? 'bg-green-400 text-black hover:bg-green-300'
                      : 'bg-green-900/30 text-gray-600 cursor-not-allowed'
                  }`}
                >
                  ДАЛІ →
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="border border-green-900 p-4 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">ВІДДАЄТЕ</span>
                    <span className="text-white">{fromAmount} {fromCoin}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">ОТРИМУЄТЕ</span>
                    <span className="text-green-400">{toAmount} {toCoin}</span>
                  </div>
                  <div className="border-t border-green-900 pt-2 flex justify-between">
                    <span className="text-gray-500">КУРС</span>
                    <span className="text-white">1 {fromCoin} = {(getRate() * 0.985).toFixed(6)} {toCoin}</span>
                  </div>
                </div>

                <div className="border border-green-900 p-4">
                  <div className="text-xs text-gray-500 mb-2">ВАША АДРЕСА {toCoin}</div>
                  <input
                    type="text"
                    value={wallet}
                    onChange={e => setWallet(e.target.value)}
                    placeholder="Вставте адресу гаманця..."
                    className="bg-transparent text-white text-sm w-full outline-none placeholder-gray-700"
                  />
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="flex-1 py-3 border border-green-900 text-gray-500 text-sm hover:text-white transition-colors">
                    ← НАЗАД
                  </button>
                  <button
                    onClick={() => wallet.length > 10 && setStep(3)}
                    className={`flex-1 py-3 text-sm font-bold tracking-widest transition-all ${
                      wallet.length > 10
                        ? 'bg-green-400 text-black hover:bg-green-300'
                        : 'bg-green-900/30 text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    ПІДТВЕРДИТИ →
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 text-center">
                <div className="w-16 h-16 border-2 border-green-400 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-green-400 text-2xl">✓</span>
                </div>
                <div>
                  <div className="text-green-400 font-bold mb-2">ЗАЯВКУ ПРИЙНЯТО</div>
                  <div className="text-xs text-gray-500">
                    З вами зв'яжеться менеджер у Telegram протягом 5 хвилин
                  </div>
                </div>
                <div className="border border-green-900 p-4 text-xs text-left space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">ОБМІН</span>
                    <span className="text-white">{fromAmount} {fromCoin} → {toAmount} {toCoin}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">ГАМАНЕЦЬ</span>
                    <span className="text-white truncate max-w-32">{wallet}</span>
                  </div>
                </div>
                
                  href="https://t.me/hadex_exchange"
                  className="block w-full py-4 bg-green-400 text-black font-bold text-sm tracking-widest hover:bg-green-300 transition-colors"
                >
                  НАПИСАТИ В TELEGRAM →
                </a>
                <button onClick={() => { setStep(1); setFromAmount(''); setToAmount(''); setWallet('') }} className="text-xs text-gray-600 hover:text-gray-400">
                  Новий обмін
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-px mt-px">
            {[
              { label: 'ОПЕРАЦІЙ', value: '2,847+' },
              { label: 'КЛІЄНТІВ', value: '1,200+' },
              { label: 'РОКИ РОБОТИ', value: '4+' },
            ].map((item) => (
              <div key={item.label} className="border border-green-900 p-4 text-center">
                <div className="text-green-400 font-bold text-lg">{item.value}</div>
                <div className="text-gray-600 text-xs mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-px mt-16">
          {[
            { icon: '◈', title: 'ПРОЗОРІ ТРАНЗАКЦІЇ', desc: 'Всі операції фіксуються. Курс формується чесно.' },
            { icon: '◉', title: 'ШВИДКИЙ ОБМІН', desc: 'Від заявки до виплати — 5-30 хвилин.' },
            { icon: '◎', title: 'БЕЗ KYC', desc: 'Обмін без реєстрації. Конфіденційність гарантована.' },
          ].map((f) => (
            <div key={f.title} className="border border-green-900 p-6">
              <div className="text-green-400 text-2xl mb-3">{f.icon}</div>
              <div className="text-white text-xs font-bold mb-2 tracking-widest">{f.title}</div>
              <div className="text-gray-500 text-xs leading-relaxed">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <footer className="border-t border-green-900 px-6 py-6 mt-12 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
        <span>© 2025 HADEX GROUP — УЖГОРОД</span>
        <a href="https://t.me/hadex_exchange" className="text-green-400 hover:text-green-300 transition-colors">
          TELEGRAM: @hadex_exchange
        </a>
      </footer>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
          width: max-content;
        }
      `}</style>
    </main>
  )
}
