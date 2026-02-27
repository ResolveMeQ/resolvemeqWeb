import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const TermsOfService = () => (
  <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-16">
    <Helmet>
      <title>Terms of Service | ResolveMeQ</title>
      <meta name="description" content="ResolveMeQ Terms of Service. Rules and conditions for using our platform." />
    </Helmet>
    <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
      <Link to="/" className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium mb-8">
        ← Back to Home
      </Link>
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">Terms of Service</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-10">Last updated: February 2025</p>

      <div className="prose prose-gray dark:prose-invert max-w-none space-y-8 text-gray-700 dark:text-gray-300">
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing or using ResolveMeQ ("Service") at resolvemeq.net and app.resolvemeq.net, you agree to be bound by these Terms of Service ("Terms"). If you do not agree, do not use the Service. If you are using the Service on behalf of an organization, you represent that you have authority to bind that organization to these Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">2. Description of Service</h2>
          <p>
            ResolveMeQ provides AI-powered IT helpdesk and support automation tools, including ticket management, routing, and related features. We reserve the right to modify, suspend, or discontinue any part of the Service with reasonable notice where feasible.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">3. Account and Registration</h2>
          <p>You must provide accurate registration information and keep your account secure. You are responsible for all activity under your account. You must notify us promptly of any unauthorized use at <a href="mailto:contact@resolvemeq.net" className="text-primary-600 dark:text-primary-400 hover:underline">contact@resolvemeq.net</a>.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">4. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Use the Service for any illegal purpose or in violation of any laws</li>
            <li>Infringe intellectual property or other rights of others</li>
            <li>Transmit malware, spam, or harmful content</li>
            <li>Attempt to gain unauthorized access to our or any third-party systems or data</li>
            <li>Resell or sublicense the Service without our written consent</li>
            <li>Use the Service in a way that could harm, overload, or impair our infrastructure or other users</li>
          </ul>
          <p className="mt-3">We may suspend or terminate accounts that violate these terms.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">5. Payment and Subscription</h2>
          <p>Paid plans are subject to the pricing and billing terms presented at signup or on our website. Fees are due in advance. We may change pricing with notice; continued use after changes constitutes acceptance. Refunds are handled according to our refund policy stated at the time of purchase.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">6. Intellectual Property</h2>
          <p>We retain all rights in the Service, including software, design, and content. You receive a limited, non-exclusive license to use the Service in accordance with these Terms. You retain rights in content you submit; you grant us a license to use that content to provide and improve the Service.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">7. Confidentiality and Data</h2>
          <p>Your use of the Service is also governed by our <Link to="/privacy" className="text-primary-600 dark:text-primary-400 hover:underline">Privacy Policy</Link>. We will process your data as described there and in any applicable data processing agreement.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">8. Disclaimers</h2>
          <p>The Service is provided "as is" and "as available." We disclaim all warranties, express or implied, including merchantability and fitness for a particular purpose. We do not guarantee uninterrupted or error-free operation.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">9. Limitation of Liability</h2>
          <p>To the maximum extent permitted by law, ResolveMeQ and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or loss of profits or data, arising from your use of the Service. Our total liability shall not exceed the fees you paid to us in the twelve (12) months preceding the claim.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">10. Indemnification</h2>
          <p>You agree to indemnify and hold harmless ResolveMeQ and its affiliates from any claims, damages, or expenses (including legal fees) arising from your use of the Service, your content, or your violation of these Terms or any law.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">11. Termination</h2>
          <p>You may cancel your account at any time. We may suspend or terminate your access for breach of these Terms, non-payment, or for our convenience with reasonable notice. Upon termination, your right to use the Service ceases. Provisions that by their nature should survive (e.g. liability, indemnity, IP) will survive.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">12. General</h2>
          <p>These Terms constitute the entire agreement regarding the Service. We may modify these Terms; we will notify you of material changes. Continued use after changes constitutes acceptance. If any provision is held invalid, the remainder remains in effect. Our failure to enforce a right does not waive that right.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">13. Contact</h2>
          <p>Questions about these Terms: <a href="mailto:contact@resolvemeq.net" className="text-primary-600 dark:text-primary-400 hover:underline">contact@resolvemeq.net</a>. Phone: <a href="tel:+237681775574" className="text-primary-600 dark:text-primary-400 hover:underline">+237 681 775 574</a>. Website: <a href="https://www.resolvemeq.net" className="text-primary-600 dark:text-primary-400 hover:underline">www.resolvemeq.net</a>.</p>
        </section>
      </div>
    </div>
  </main>
);

export default TermsOfService;
