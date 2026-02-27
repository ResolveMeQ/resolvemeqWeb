import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const CookiePolicy = () => (
  <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-16">
    <Helmet>
      <title>Cookie Policy | ResolveMeQ</title>
      <meta name="description" content="ResolveMeQ Cookie Policy. How we use cookies and similar technologies." />
    </Helmet>
    <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
      <Link to="/" className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium mb-8">
        ← Back to Home
      </Link>
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">Cookie Policy</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-10">Last updated: February 2025</p>

      <div className="prose prose-gray dark:prose-invert max-w-none space-y-8 text-gray-700 dark:text-gray-300">
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">1. What Are Cookies</h2>
          <p>
            Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences, keep you signed in, and understand how you use the service. We also use similar technologies such as local storage and session storage where relevant.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">2. How We Use Cookies</h2>
          <p>We use cookies and similar technologies to:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li><strong>Strictly necessary:</strong> enable core functionality (e.g. authentication, security, load balancing). These are essential and cannot be disabled.</li>
            <li><strong>Functional:</strong> remember your choices (e.g. language, theme, region) to improve your experience.</li>
            <li><strong>Analytics and performance:</strong> understand how visitors use our website (e.g. pages visited, errors) so we can improve our services.</li>
            <li><strong>Marketing (if any):</strong> deliver relevant content or measure campaign effectiveness, only where we have your consent where required by law.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">3. Types of Cookies We Use</h2>
          <div className="overflow-x-auto -mx-4 sm:mx-0 my-4">
            <table className="w-full min-w-[280px] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">Purpose</th>
                <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">Type</th>
                <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="p-3">Session / authentication</td>
                <td className="p-3">Strictly necessary</td>
                <td className="p-3">Session or as needed</td>
              </tr>
              <tr>
                <td className="p-3">Theme preference (e.g. light/dark)</td>
                <td className="p-3">Functional</td>
                <td className="p-3">Persistent</td>
              </tr>
              <tr>
                <td className="p-3">Analytics (e.g. usage stats)</td>
                <td className="p-3">Analytics</td>
                <td className="p-3">As per provider</td>
              </tr>
            </tbody>
          </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">4. Third-Party Cookies</h2>
          <p>We may allow third-party services (e.g. analytics, support widgets) to set cookies when you use our website. Their use is governed by their own privacy and cookie policies. We recommend reviewing those policies.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">5. Your Choices</h2>
          <p>You can control cookies in several ways:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li><strong>Browser settings:</strong> most browsers let you block or delete cookies. Note that blocking all cookies may affect site functionality.</li>
            <li><strong>Our consent tool:</strong> where we use non-essential cookies, we may offer a consent banner or settings page to let you choose categories.</li>
            <li><strong>Opt-out links:</strong> for specific third-party analytics or advertising, we may provide opt-out links where applicable.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">6. Updates</h2>
          <p>We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our practices. We will post the updated version on this page and indicate the "Last updated" date. We encourage you to review it periodically.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">7. More Information</h2>
          <p>For more on how we process personal data, see our <Link to="/privacy" className="text-primary-600 dark:text-primary-400 hover:underline">Privacy Policy</Link>. For general terms of use, see our <Link to="/terms" className="text-primary-600 dark:text-primary-400 hover:underline">Terms of Service</Link>.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">8. Contact Us</h2>
          <p>For questions about cookies or this policy: <a href="mailto:contact@resolvemeq.net" className="text-primary-600 dark:text-primary-400 hover:underline">contact@resolvemeq.net</a>. Phone: <a href="tel:+237681775574" className="text-primary-600 dark:text-primary-400 hover:underline">+237 681 775 574</a>. Website: <a href="https://www.resolvemeq.net" className="text-primary-600 dark:text-primary-400 hover:underline">www.resolvemeq.net</a>.</p>
        </section>
      </div>
    </div>
  </main>
);

export default CookiePolicy;
