import React from 'react'

export default function RefundPolicy() {
    return (
        <div className="max-w-[1000px] mx-auto px-4 py-16 bg-white pt-[15vh]">
            <h1 className="text-3xl font-bold mb-6">Refund Policy</h1>
            <p className="mb-4">
                KC Online is committed to providing high-quality educational content. We want you to be satisfied with your purchase, and we have established the following refund policy to ensure fairness to both our customers and our business.
            </p>
            <p className="mb-4">
                Our refund policy is designed to be transparent and customer-friendly, while also protecting the integrity of our platform and the rights of our instructors.
            </p>

            <h1 className="text-2xl font-bold mb-4 mt-10">1. Course Purchases</h1>
            <p className="mb-4">
                For course purchases, we offer a 7-day money-back guarantee. If you are not satisfied with a course for any reason, you may request a full refund within 7 days of your purchase, provided you have not completed more than 25% of the course content.
            </p>
            <ul className="list-disc pl-6 mb-4">
                <li>Refunds will not be issued if more than 25% of the course has been completed.</li>
                <li>Refund requests must be submitted within 7 days of the original purchase date.</li>
                <li>Refunds are processed to the original payment method within 5-10 business days after approval.</li>
            </ul>

            <h1 className="text-2xl font-bold mb-4 mt-10">2. Subscription Plans</h1>
            <p className="mb-4">
                For subscription plans, we offer prorated refunds for the unused portion of your current billing cycle if you cancel your subscription. No refunds will be issued for past billing cycles.
            </p>
            <ul className="list-disc pl-6 mb-4">
                <li>To be eligible for a prorated refund, you must cancel your subscription before the end of the current billing cycle.</li>
                <li>Refunds are calculated based on the number of unused days remaining in your subscription period.</li>
                <li>Promotional or discounted subscriptions may be subject to different refund terms, as specified at the time of purchase.</li>
            </ul>

            <h1 className="text-2xl font-bold mb-4 mt-10">3. How to Request a Refund</h1>
            <p className="mb-4">
                To request a refund, please contact our customer support team through the contact form on our website or email us at <a href="mailto:support@kceducation.com" className="text-blue-600 underline">support@kceducation.com</a>. Please include your order number, the course or subscription details, and the reason for your refund request.
            </p>
            <ul className="list-disc pl-6 mb-4">
                <li>Our support team will review your request and may contact you for additional information if needed.</li>
                <li>Refund requests are typically processed within 3-5 business days.</li>
            </ul>

            <h1 className="text-2xl font-bold mb-4 mt-10">4. Exceptions and Additional Information</h1>
            <p className="mb-4">
                We reserve the right to deny refund requests that do not comply with the conditions outlined in this policy or that we determine to be fraudulent or abusive. In certain cases, such as technical issues or duplicate purchases, we may offer refunds outside the standard policy at our discretion.
            </p>
            <p className="mb-4">
                If you have any questions about our refund policy or need assistance with your request, please do not hesitate to contact our support team. Your satisfaction is important to us, and we are here to help.
            </p>
        </div>
    )
}
