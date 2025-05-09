import React from 'react';
import Modal from '../Modal';

const TermsAndConditions = ({ isOpen, onClose, userRole = 'user', }) => {
    const writerSpecificTerms = (userRole === 'writer' || userRole === 'admin') ? [
        {
            title: "Original Content",
            content: "All blogs and samples you submit must be your own original work. Plagiarized or AI-generated content without substantial editing and personal voice may lead to rejection or permanent ban from the platform."
        },
        {
            title: "Content Rights",
            content: "Once published, your content may be edited for clarity, SEO optimization, or formatting. The platform retains non-exclusive rights to distribute and showcase your content, though you maintain copyright ownership."
        },
        {
            title: "Review Period",
            content: "Submitted applications and articles may take up to 5–7 working days for review. Approval and publication decisions are at the sole discretion of our editorial team."
        },
        {
            title: "Writer Conduct",
            content: "As a writer, you're expected to maintain professional standards in all communications, meet deadlines, and engage constructively with editors and readers."
        },
        {
            title: "Compensation",
            content: "Payment terms, rates, and schedules will be outlined in a separate agreement upon acceptance. All payments are subject to tax regulations in your jurisdiction."
        }
    ] : [];

    const generalTerms =  [
        {
            title: "Acceptable Use",
            content: "You agree not to use the platform to publish content that is illegal, harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable."
        },
        {
            title: "Privacy",
            content: "We collect and process personal data in accordance with our Privacy Policy. By using our services, you consent to this data processing."
        },
        {
            title: "Account Security",
            content: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account."
        }
    ];

    const adminSpecificTerms = userRole === 'admin' ? [
        {
            title: "Administrative Authority",
            content: "As an admin, you have elevated privileges including content moderation and user management. These privileges must not be abused."
        },
        {
            title: "Data Handling",
            content: "You agree to handle user data with utmost confidentiality and only for legitimate platform management purposes."
        }
    ] : [];

    const allTerms = [
        ...generalTerms,
        ...writerSpecificTerms,
        ...adminSpecificTerms
    ];

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`${userRole === 'writer' ? 'Writer' : userRole === 'admin' ? 'Administrator' : 'User'} Terms & Conditions`}
            size="lg"
            animation="slide"
            ariaLabelledby="terms-modal-title"
            overlayClassName="bg-black/50 backdrop-blur-sm"
        >
            <div className="p-6 space-y-4 text-neutral-700 dark:text-neutral-300">
                <p className="text-sm leading-relaxed">
                    By using our platform{userRole === 'writer' ? ' as a writer' : userRole === 'admin' ? ' as an administrator' : ''}, you agree to the following terms and conditions. Please read them carefully.
                </p>

                <ol className="space-y-4">
                    {allTerms.map((term, index) => (
                        <li key={index} className="flex gap-3">
                            <span className="flex-shrink-0 font-semibold text-blue dark:text-golden">
                                {index + 1}.
                            </span>
                            <div>
                                <h4 className="font-semibold text-neutral-900 dark:text-white">
                                    {term.title}:
                                </h4>
                                <p className="text-sm mt-1 leading-relaxed">
                                    {term.content}
                                </p>
                            </div>
                        </li>
                    ))}
                </ol>

                <div className="pt-4 mt-4 border-t border-neutral-200 dark:border-neutral-700">
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <p className="text-sm mt-2">
                        By continuing to use the platform, you confirm that you have read, understood, and agree to these terms.
                    </p>
                </div>
            </div>
        </Modal>
    );
};

export default TermsAndConditions;