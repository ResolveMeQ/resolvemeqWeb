import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => (
  <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-16">
    <Helmet>
      <title>Privacy Policy | ResolveMeQ</title>
      <meta name="description" content="ResolveMeQ Privacy Policy. How we collect, use, and protect your data." />
    </Helmet>
    <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
      <Link to="/" className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium mb-8">
        ← Back to Home
      </Link>
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">Privacy Policy</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-10">Last updated: February 2025</p>

      <div className="prose prose-gray dark:prose-invert max-w-none space-y-8 text-gray-700 dark:text-gray-300">
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">1. Introduction</h2>
          <p>
            ResolveMeQ ("we", "our", or "us") operates resolvemeq.net and the ResolveMeQ application. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services. Please read it carefully.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">2. Information We Collect</h2>
          <p className="mb-2">We may collect:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Account data:</strong> name, email address, company name, and password when you register.</li>
            <li><strong>Usage data:</strong> how you use our platform, tickets, and support interactions.</li>
            <li><strong>Technical data:</strong> IP address, browser type, device information, and logs.</li>
            <li><strong>Communications:</strong> when you contact us (e.g. contact form, email, phone +237 681 775 574).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">3. How We Use Your Information</h2>
          <p>We use collected information to:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Provide, maintain, and improve our services</li>
            <li>Process and manage your account and support requests</li>
            <li>Send service-related and marketing communications (with your consent where required)</li>
            <li>Analyze usage and improve security and performance</li>
            <li>Comply with legal obligations and enforce our terms</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">4. Data Sharing and Disclosure</h2>
          <p>
            We do not sell your personal data. We may share data with service providers who assist our operations (e.g. hosting, analytics, email), under strict confidentiality. We may disclose data when required by law or to protect our rights and safety.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">5. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your data against unauthorized access, alteration, disclosure, or destruction. No method of transmission over the Internet is 100% secure; we strive to use industry best practices.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">6. Data Retention</h2>
          <p>
            We retain your information for as long as your account is active or as needed to provide services, comply with legal obligations, resolve disputes, and enforce agreements.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">7. Your Rights</h2>
          <p>Depending on your location, you may have the right to:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Access, correct, or delete your personal data</li>
            <li>Object to or restrict certain processing</li>
            <li>Data portability</li>
            <li>Withdraw consent</li>
            <li>Lodge a complaint with a supervisory authority</li>
          </ul>
          <p className="mt-3">To exercise these rights, contact us at <a href="mailto:contact@resolvemeq.net" className="text-primary-600 dark:text-primary-400 hover:underline">contact@resolvemeq.net</a>.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">8. Cookies</h2>
          <p>We use cookies and similar technologies as described in our <Link to="/cookies" className="text-primary-600 dark:text-primary-400 hover:underline">Cookie Policy</Link>.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">9. International Transfers</h2>
          <p>Your data may be processed in countries other than your own. We ensure appropriate safeguards are in place where required by applicable law.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">10. Children</h2>
          <p>Our services are not directed to individuals under 16. We do not knowingly collect personal data from children under 16.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">11. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of material changes via email or a notice on our website. Continued use after changes constitutes acceptance.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">12. Contact Us</h2>
          <p>
            For privacy-related questions: <a href="mailto:contact@resolvemeq.net" className="text-primary-600 dark:text-primary-400 hover:underline">contact@resolvemeq.net</a>. Phone: <a href="tel:+237681775574" className="text-primary-600 dark:text-primary-400 hover:underline">+237 681 775 574</a>. Website: <a href="https://www.resolvemeq.net" className="text-primary-600 dark:text-primary-400 hover:underline">www.resolvemeq.net</a>.
          </p>
        </section>
      </div>
    </div>
  </main>
);

export default PrivacyPolicy;
