import { motion } from "framer-motion";

const LogoCard = ({ children, label }) => (
  <div className="flex items-center gap-3 rounded-2xl border border-zinc-200/90 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-950/55 backdrop-blur-sm px-4 py-3 shadow-[0_1px_0_rgba(0,0,0,0.04)] dark:shadow-[0_1px_0_rgba(255,255,255,0.04)]">
    <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
      {children}
    </span>
    <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
      {label}
    </span>
  </div>
);

const SlackLogo = () => (
  <svg viewBox="0 0 122.8 122.8" className="h-5 w-5" aria-hidden="true">
    <path fill="#E01E5A" d="M26.3 77.6c0 7.3-5.9 13.2-13.2 13.2S0 84.9 0 77.6s5.9-13.2 13.2-13.2h13.1v13.2z"/>
    <path fill="#E01E5A" d="M32.9 77.6c0-7.3 5.9-13.2 13.2-13.2s13.2 5.9 13.2 13.2v33c0 7.3-5.9 13.2-13.2 13.2s-13.2-5.9-13.2-13.2v-33z"/>
    <path fill="#36C5F0" d="M45.9 26.3c-7.3 0-13.2-5.9-13.2-13.2S38.6 0 45.9 0s13.2 5.9 13.2 13.2v13.1H45.9z"/>
    <path fill="#36C5F0" d="M45.9 32.9c7.3 0 13.2 5.9 13.2 13.2s-5.9 13.2-13.2 13.2h-33C5.9 59.3 0 53.4 0 46.1s5.9-13.2 13.2-13.2h32.7z"/>
    <path fill="#2EB67D" d="M96.5 45.9c0-7.3 5.9-13.2 13.2-13.2s13.2 5.9 13.2 13.2-5.9 13.2-13.2 13.2H96.5V45.9z"/>
    <path fill="#2EB67D" d="M89.9 45.9c0 7.3-5.9 13.2-13.2 13.2s-13.2-5.9-13.2-13.2v-33C63.5 5.9 69.4 0 76.7 0s13.2 5.9 13.2 13.2v32.7z"/>
    <path fill="#ECB22E" d="M76.7 96.5c7.3 0 13.2 5.9 13.2 13.2s-5.9 13.2-13.2 13.2-13.2-5.9-13.2-13.2V96.5h13.2z"/>
    <path fill="#ECB22E" d="M76.7 89.9c-7.3 0-13.2-5.9-13.2-13.2s5.9-13.2 13.2-13.2h33c7.3 0 13.2 5.9 13.2 13.2s-5.9 13.2-13.2 13.2h-33z"/>
  </svg>
);

const TeamsLogo = () => (
  <svg viewBox="0 0 64 64" className="h-5 w-5" aria-hidden="true">
    <path fill="#5059C9" d="M41.6 18.4H23.2c-3 0-5.6 2.6-5.6 5.6v18.4c0 3 2.6 5.6 5.6 5.6h18.4c3 0 5.6-2.6 5.6-5.6V24c0-3-2.6-5.6-5.6-5.6z"/>
    <path fill="#7B83EB" d="M49.8 24.2h-2.4v15.6h2.4c3.1 0 5.6-2.5 5.6-5.6v-4.4c0-3.1-2.5-5.6-5.6-5.6z"/>
    <circle cx="50.6" cy="21" r="4" fill="#7B83EB"/>
    <path fill="#4B53BC" d="M31.4 28h8.8v4.2h-3.2v12.4h-2.4V32.2h-3.2V28z"/>
    <circle cx="26.4" cy="28.6" r="3.4" fill="#9AA2FF"/>
    <path fill="#9AA2FF" d="M26.4 33c-3 0-5.4 2.4-5.4 5.4v6.2h10.8v-6.2c0-3-2.4-5.4-5.4-5.4z"/>
  </svg>
);

const IntegrationsStrip = () => {
  return (
    <section
      id="integrations"
      className="relative py-14 md:py-16 bg-white dark:bg-[#09090b] border-y border-zinc-200/60 dark:border-zinc-800/80"
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="type-eyebrow mb-3"
            >
              Integrations
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="type-section-title"
            >
              Meet users where they already work
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="type-lede mt-4"
            >
              Connect ResolveMeQ to chat channels so tickets can be created and updated without leaving Slack or
              Microsoft Teams.
            </motion.p>
          </div>
          <div className="flex flex-wrap gap-3">
            <LogoCard label="Slack">
              <SlackLogo />
            </LogoCard>
            <LogoCard label="Microsoft Teams">
              <TeamsLogo />
            </LogoCard>
          </div>
        </header>
      </div>
    </section>
  );
};

export default IntegrationsStrip;

