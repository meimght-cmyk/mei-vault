// Drop this into mei-terminal at app/vaults/page.tsx.
// Matches the styling of app/about/page.tsx (Tailwind theme tokens: bg-bg-primary,
// text-text-primary, text-text-secondary, bg-bg-card, border-border-color,
// text-accent-green, accent-green/10, accent-green/30, animate-pulse-dot).

import Link from 'next/link'
import { MarketingHeader } from '@/components/marketing/header'
import { MarketingFooter } from '@/components/marketing/footer'

export const metadata = {
  title: 'Vaults — Mei Terminal',
  description:
    'Three capped vaults on Base. Conservative, Balanced, Edge. Same safety stack. Caps you can read on-chain. Agentic DeFi, eating its own dog food.',
}

type Tier = {
  key: 'conservative' | 'balanced' | 'edge'
  name: string
  symbol: string
  tagline: string
  riskGate: string
  targetAPY: string
  capacityCap: string
  minDeposit: string
  withdrawal: string
  mgmtPerf: string
  access: string
  audience: string
  highlight?: boolean
}

const TIERS: Tier[] = [
  {
    key: 'conservative',
    name: 'Mei Conservative',
    symbol: 'mvUSDC-C',
    tagline: 'Idle USDC, working safely.',
    riskGate: 'riskBps = 0',
    targetAPY: '5 – 9%',
    capacityCap: '$250,000',
    minDeposit: '$100',
    withdrawal: '24h',
    mgmtPerf: '0.5% / 5%',
    access: 'Open',
    audience: 'Treasuries with idle USDC, holders parking stables',
  },
  {
    key: 'balanced',
    name: 'Mei Balanced',
    symbol: 'mvUSDC-B',
    tagline: 'LP yield without the set-and-pray failure mode.',
    riskGate: 'riskBps ≤ 500',
    targetAPY: '10 – 18%',
    capacityCap: '$100,000',
    minDeposit: '$500',
    withdrawal: '7 days',
    mgmtPerf: '1% / 10%',
    access: 'Open',
    audience: 'DeFi-native users with IL tolerance',
    highlight: true,
  },
  {
    key: 'edge',
    name: 'Mei Edge',
    symbol: 'mvUSDC-E',
    tagline: 'Where the agent flexes. Small for a reason.',
    riskGate: 'riskBps ≤ 2000',
    targetAPY: '20 – 40%',
    capacityCap: '$25,000',
    minDeposit: '$1,000',
    withdrawal: '14 days',
    mgmtPerf: '2% / 20%',
    access: 'MEI-gated',
    audience: 'MEI holders testing the agentic DeFi thesis',
  },
]

export default function VaultsPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <MarketingHeader />

      <main className="max-w-5xl mx-auto px-4 py-20">
        {/* Hero */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 bg-accent-green/10 border border-accent-green/30 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-accent-green rounded-full animate-pulse-dot"></span>
            <span className="text-sm text-accent-green font-medium">Coming Aug 2026 — testnet live now</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Mei Vaults
          </h1>
          <p className="text-lg text-text-secondary mb-3">
            Three vaults. One safety stack. Caps you can read on-chain.
          </p>
          <p className="text-text-secondary max-w-2xl">
            We don&apos;t sell the highest yield on Base. We sell the only yield product where every safety decision is logged in public and every position is watched by a daemon that exits before you wake up.
          </p>
          <p className="text-text-secondary max-w-2xl mt-4">
            The vaults are small on purpose. Mei is an experiment in safer agentic DeFi — not a TVL race. When the 90-day ledger proves the system works, we lift the caps. Until then, the caps are the promise.
          </p>
        </div>

        {/* Live strip */}
        <div className="bg-bg-card border border-border-color rounded-lg p-4 mb-12 flex flex-wrap gap-x-8 gap-y-2 text-sm">
          <div>
            <span className="text-text-secondary">Lifetime TVL:</span>{' '}
            <span className="text-text-primary font-mono">$0</span>{' '}
            <span className="text-text-secondary text-xs">(testnet)</span>
          </div>
          <div>
            <span className="text-text-secondary">Probes logged:</span>{' '}
            <span className="text-text-primary font-mono">5,290</span>
          </div>
          <div>
            <span className="text-text-secondary">LOSS events caught:</span>{' '}
            <span className="text-accent-green font-mono">43</span>
          </div>
          <div>
            <span className="text-text-secondary">Days of ledger data:</span>{' '}
            <span className="text-text-primary font-mono">15 / 90</span>
          </div>
        </div>

        {/* Vault cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-16">
          {TIERS.map((t) => (
            <div
              key={t.key}
              className={`bg-bg-card border rounded-lg p-6 ${
                t.highlight ? 'border-accent-green/50' : 'border-border-color'
              }`}
            >
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="text-lg font-semibold text-text-primary">{t.name}</h3>
                <code className="text-xs text-text-secondary font-mono">{t.symbol}</code>
              </div>
              <p className="text-sm text-text-secondary mb-6 italic">{t.tagline}</p>

              <dl className="space-y-2 text-sm mb-6">
                <Row label="Risk gate" value={t.riskGate} mono />
                <Row label="Target net APY" value={t.targetAPY} accent />
                <Row label="Capacity cap" value={t.capacityCap} mono />
                <Row label="Min deposit" value={t.minDeposit} />
                <Row label="Withdrawal" value={t.withdrawal} />
                <Row label="Mgmt / Perf" value={t.mgmtPerf} />
                <Row label="Access" value={t.access} />
              </dl>

              <p className="text-xs text-text-secondary mb-4">{t.audience}</p>

              <button
                disabled
                className="w-full bg-accent-green/10 border border-accent-green/30 text-accent-green text-sm font-medium py-2 rounded cursor-not-allowed opacity-70"
                aria-label={`Join the ${t.name} waitlist (mainnet not yet live)`}
              >
                Waitlist — mainnet Aug 2026
              </button>
            </div>
          ))}
        </div>

        {/* Why us */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">
            Why Mei over Yearn / Beefy / Sommelier
          </h2>
          <div className="space-y-6">
            <Reason
              title="Public HIT/MISS ledger"
              body="Every safety call we've ever made is in the open. 15 days of data live. 5,290 ALLOW probes. 43 LOSS events caught."
              linkText="View the ledger →"
              href="https://github.com/meimght-cmyk/mei-vault/tree/main/ledger"
            />
            <Reason
              title="Polling exiter on every position"
              body="Most 'safe yield' vaults set a strategy and hope. Ours polls riskclaw every 5 minutes per position and unwinds on signal degradation."
              linkText="View the exiter →"
              href="https://github.com/meimght-cmyk/mei-vault/blob/main/metrics/vault-exiter.md"
            />
            <Reason
              title="Riskclaw is MIT-licensed and neutral"
              body="Our safety daemon isn't a black box. It's a public-good repo you can fork, audit, or run yourself."
              linkText="github.com/Truunik/riskclaw-daemon →"
              href="https://github.com/Truunik/riskclaw-daemon"
            />
            <Reason
              title="Bounded delegation by contract"
              body="Even a compromised executor key can only touch contracts on a hard-coded allowlist. The owner cannot drain user assets — by design, not by promise."
              linkText="Read the contract →"
              href="https://sepolia.basescan.org/address/0x5328f7c9b6CE55d1f25c20d903F44d33E8F9B5e6"
            />
            <Reason
              title="Capped, on purpose"
              body="We won't take more money than we'd personally feel okay losing. When the data justifies bigger caps, the caps move. Not before."
            />
          </div>
        </section>

        {/* How it works */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">How it works</h2>
          <ol className="space-y-3 text-text-secondary list-decimal list-inside">
            <li>You deposit USDC. You receive ERC-4626 vault shares.</li>
            <li>The executor agent picks pools from a daily whitelist that passes riskclaw at the vault&apos;s risk gate.</li>
            <li>Capital deploys into Uniswap V3/V4 or Aerodrome LPs through a contract-level allowlist.</li>
            <li>The polling exiter watches every position. On any risk signal, it queues an exit, the operator signs, capital comes home.</li>
            <li>You redeem after the vault&apos;s withdrawal window.</li>
          </ol>
          <p className="text-text-secondary mt-6 text-sm">
            The contract can only touch allowlisted DEX contracts. The executor can only sign with a fresh riskclaw attestation. The owner is a 3-of-5 multisig. Each layer fails closed.
          </p>
        </section>

        {/* Honest disclosures */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Honest disclosures</h2>
          <p className="text-text-secondary mb-4">
            This is an experiment. Things we believe but haven&apos;t proven:
          </p>
          <ul className="list-disc list-inside space-y-2 text-text-secondary mb-8">
            <li>That a 90-day ledger of safety calls predicts a safe 91st day. (We&apos;ll know in August.)</li>
            <li>That the polling exiter exits in time on pools we haven&apos;t seen drain yet.</li>
            <li>That the contract is bug-free. (External audit pending — earliest mainnet deploy: <span className="font-mono">2026-08-07</span>.)</li>
          </ul>
          <p className="text-text-secondary mb-4">Things you should not believe:</p>
          <ul className="list-disc list-inside space-y-2 text-text-secondary mb-8">
            <li>That past LP yields predict future ones.</li>
            <li>That &quot;safe&quot; means &quot;no loss possible.&quot;</li>
            <li>That we&apos;re better than a multisig holding USDC if all you want is to not lose money.</li>
          </ul>
          <p className="text-text-secondary">
            If your timeline is &quot;I need this money in 30 days&quot; — use a money market. If your timeline is &quot;I want to test what safer agentic DeFi feels like with bounded downside&quot; — welcome.
          </p>
        </section>

        {/* The bigger picture */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">The bigger picture</h2>
          <p className="text-text-secondary mb-4">
            If these three vaults work, we don&apos;t grow them. We license the system underneath — the riskclaw integration, the polling exiter, the bounded-delegation contract — to treasuries, DAOs, and other agents that need a safe DeFi allocator.
          </p>
          <p className="text-text-primary font-medium">
            The vaults are the proof. The system is the product.
          </p>
        </section>

        {/* CTA */}
        <div className="flex flex-wrap gap-3">
          <Link
            href="/vaults/waitlist"
            className="bg-accent-green text-bg-primary font-medium px-5 py-2.5 rounded hover:opacity-90 transition-opacity"
          >
            Join the waitlist
          </Link>
          <a
            href="https://github.com/meimght-cmyk/mei-vault"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-border-color text-text-primary px-5 py-2.5 rounded hover:border-accent-green/50 transition-colors"
          >
            Read the docs
          </a>
          <a
            href="https://github.com/meimght-cmyk/mei-vault/tree/main/ledger"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-border-color text-text-primary px-5 py-2.5 rounded hover:border-accent-green/50 transition-colors"
          >
            View the ledger
          </a>
        </div>
      </main>

      <MarketingFooter />
    </div>
  )
}

function Row({
  label,
  value,
  mono,
  accent,
}: {
  label: string
  value: string
  mono?: boolean
  accent?: boolean
}) {
  return (
    <div className="flex justify-between gap-2">
      <dt className="text-text-secondary">{label}</dt>
      <dd
        className={`${mono ? 'font-mono text-sm' : ''} ${
          accent ? 'text-accent-green' : 'text-text-primary'
        }`}
      >
        {value}
      </dd>
    </div>
  )
}

function Reason({
  title,
  body,
  linkText,
  href,
}: {
  title: string
  body: string
  linkText?: string
  href?: string
}) {
  return (
    <div className="border-l-2 border-accent-green/40 pl-4">
      <h3 className="text-text-primary font-semibold mb-1">{title}</h3>
      <p className="text-text-secondary mb-1">{body}</p>
      {linkText && href && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-green text-sm hover:underline"
        >
          {linkText}
        </a>
      )}
    </div>
  )
}
