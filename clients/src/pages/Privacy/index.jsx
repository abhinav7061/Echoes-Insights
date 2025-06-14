import React from 'react';

const PrivacyPolicyPage = () => {
    return (
        <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6 md:p-8">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
                <p className="text-neutral-700 dark:text-neutral-300 mb-4">
                    Welcome to our platform. We are committed to protecting your privacy and ensuring the security of your personal information.
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
                </p>
                <p className="text-neutral-700 dark:text-neutral-300">
                    By accessing or using our platform, you agree to the terms of this Privacy Policy. If you do not agree with our policies and practices,
                    please do not use our services.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">2. Information We Collect</h2>
                <p className="text-neutral-700 dark:text-neutral-300 mb-4">
                    We collect several types of information from and about users of our platform, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-neutral-700 dark:text-neutral-300">
                    <li>
                        <strong>Personal Information:</strong> Name, email address, username, profile picture, and other information you provide when
                        registering or using our services.
                    </li>
                    <li>
                        <strong>Usage Data:</strong> Information about how you interact with our platform, including pages visited, time spent, and
                        features used.
                    </li>
                    <li>
                        <strong>Device Information:</strong> IP address, browser type, operating system, and other technical details about the device
                        you use to access our services.
                    </li>
                    <li>
                        <strong>Cookies and Tracking Technologies:</strong> We use cookies and similar tracking technologies to enhance your experience
                        and analyze platform usage.
                    </li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">3. How We Use Your Information</h2>
                <p className="text-neutral-700 dark:text-neutral-300 mb-4">
                    We use the information we collect for various purposes, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-neutral-700 dark:text-neutral-300">
                    <li>To provide, maintain, and improve our services</li>
                    <li>To personalize your experience and content recommendations</li>
                    <li>To communicate with you about your account, updates, and promotional offers</li>
                    <li>To monitor and analyze usage trends and preferences</li>
                    <li>To detect, prevent, and address technical issues or security breaches</li>
                    <li>To comply with legal obligations and enforce our terms of service</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">4. Information Sharing and Disclosure</h2>
                <p className="text-neutral-700 dark:text-neutral-300 mb-4">
                    We may share your information in the following situations:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-neutral-700 dark:text-neutral-300">
                    <li>
                        <strong>With Service Providers:</strong> We may employ third-party companies to facilitate our services, provide services on our
                        behalf, or assist in analyzing how our services are used.
                    </li>
                    <li>
                        <strong>For Legal Reasons:</strong> We may disclose your information if required by law or in response to valid requests by
                        public authorities.
                    </li>
                    <li>
                        <strong>Business Transfers:</strong> In connection with any merger, sale of company assets, or acquisition of all or a portion
                        of our business by another company.
                    </li>
                    <li>
                        <strong>With Your Consent:</strong> We may disclose your personal information for any other purpose with your explicit consent.
                    </li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">5. Data Security</h2>
                <p className="text-neutral-700 dark:text-neutral-300 mb-4">
                    We implement appropriate technical and organizational measures to protect your personal information. However, no method of
                    transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
                <p className="text-neutral-700 dark:text-neutral-300">
                    You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">6. Your Data Rights</h2>
                <p className="text-neutral-700 dark:text-neutral-300 mb-4">
                    Depending on your location, you may have certain rights regarding your personal information:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-neutral-700 dark:text-neutral-300">
                    <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
                    <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data</li>
                    <li><strong>Deletion:</strong> Request deletion of your personal data under certain circumstances</li>
                    <li><strong>Restriction:</strong> Request restriction of processing of your personal data</li>
                    <li><strong>Portability:</strong> Request transfer of your data to another service provider</li>
                    <li><strong>Objection:</strong> Object to certain types of processing</li>
                </ul>
                <p className="text-neutral-700 dark:text-neutral-300 mt-4">
                    To exercise these rights, please contact us using the information provided below.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">7. Cookies and Tracking Technologies</h2>
                <p className="text-neutral-700 dark:text-neutral-300 mb-4">
                    We use cookies and similar tracking technologies to track activity on our platform and hold certain information. You can instruct
                    your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not
                    be able to use some portions of our service.
                </p>
                <p className="text-neutral-700 dark:text-neutral-300">
                    We use both session and persistent cookies for the purposes set out below:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-neutral-700 dark:text-neutral-300 mt-2">
                    <li><strong>Essential Cookies:</strong> Necessary for the website to function properly</li>
                    <li><strong>Preference Cookies:</strong> Remember your preferences and settings</li>
                    <li><strong>Analytics Cookies:</strong> Collect information about how you use our website</li>
                    <li><strong>Marketing Cookies:</strong> Track visitors across websites for advertising purposes</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">8. Children's Privacy</h2>
                <p className="text-neutral-700 dark:text-neutral-300">
                    Our services are not intended for children under the age of 13. We do not knowingly collect personally identifiable information
                    from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal data,
                    please contact us.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">9. Changes to This Privacy Policy</h2>
                <p className="text-neutral-700 dark:text-neutral-300 mb-4">
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this
                    page and updating the "Last updated" date.
                </p>
                <p className="text-neutral-700 dark:text-neutral-300">
                    You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they
                    are posted on this page.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-4">10. Contact Us</h2>
                <p className="text-neutral-700 dark:text-neutral-300">
                    If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-neutral-700 dark:text-neutral-300 mt-2">
                    <li>Email: <b>privacy@echosights.com</b></li>
                    <li>Mailing Address: <b>Navi Mumbai, India</b></li>
                    <li>Through our platform's contact form</li>
                </ul>
            </section>
        </div>
    );
};

export default PrivacyPolicyPage;