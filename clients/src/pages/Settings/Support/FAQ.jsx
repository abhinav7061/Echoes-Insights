import React from 'react'
import Accorion2 from '../../../components/Accordion/Accorion2';

const FAQ = () => {
    const faqs = [
        {
            question: "How do I reset my password?",
            answer: "You can reset your password by going to Settings > Security > Reset Password. A link will be sent to your email."
        },
        {
            question: "How can I update my profile information?",
            answer: "Navigate to your Settings page > Profile here your current data will be shown change them update your details and click on Save Changes."
        },
        {
            question: "Where can I find my reading history?",
            answer: "Your reading history is available in the Space section."
        },
        {
            question: "How do I report inappropriate content?",
            answer: "Click the three-dot menu on any content and select 'Report'. Our team will review it within 24 hours."
        }
    ];
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
            {faqs.map((faq, index) => (
                <Accorion2 key={index} title={faq.question} description={faq.answer} />
            ))}
        </div>
    )
}

export default FAQ