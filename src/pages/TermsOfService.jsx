export default function TermsOfService() {
  return (
    <div className="pt-16 min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300 mb-6">Last updated: January 2024</p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 dark:text-gray-300">
              By accessing and using CIDCO Mitra's services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Use of Services</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You agree to use our services only for lawful purposes and in accordance with these Terms. You agree not to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Use the services in any way that violates applicable laws</li>
              <li>Engage in any conduct that restricts or inhibits anyone's use of the services</li>
              <li>Attempt to gain unauthorized access to any portion of the services</li>
              <li>Use the services to transmit any harmful or malicious code</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Intellectual Property</h2>
            <p className="text-gray-600 dark:text-gray-300">
              All content, features, and functionality of our services are owned by CIDCO Mitra and are protected by international copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Service Modifications</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We reserve the right to modify or discontinue our services at any time without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Limitation of Liability</h2>
            <p className="text-gray-600 dark:text-gray-300">
              CIDCO Mitra shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Governing Law</h2>
            <p className="text-gray-600 dark:text-gray-300">
              These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Contact Information</h2>
            <p className="text-gray-600 dark:text-gray-300">
              For questions about these Terms, please contact us at:
              <br />
              Email: info@cidcomitra.gov.in
              <br />
              Phone: +91 1234567890
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
