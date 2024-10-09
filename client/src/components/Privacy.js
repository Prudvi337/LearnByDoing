// src/components/Privacy.js
import React from 'react';
import './Term.css';
const Privacy = () => {
    return (
        <>
        <div>
            <h1>Privacy Policy</h1>
        <p>At LearnByDoing, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and protect your personal information when you interact with our platform.</p>

        <h2>1. Information We Collect</h2>
        <p>We collect the following types of information when you use our platform:</p>
        <ul>
            <li><strong>Personal Information:</strong> This may include your name, email address, contact information, and any other details you provide when signing up for our services or engaging with resources and mentors.</li>
            <li><strong>Usage Data:</strong> We collect information about how you use our platform, including the pages you visit, the projects you engage in, and any interactions you have with other users or mentors.</li>
            <li><strong>Cookies and Tracking Data:</strong> We use cookies and similar tracking technologies to monitor activity on our platform and collect information for improving our services.</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect for the following purposes:</p>
        <ul>
            <li><strong>Providing Services:</strong> To facilitate your participation in project-based learning activities and connect you with resources, mentors, and learning communities.</li>
            <li><strong>Improving the Platform:</strong> To analyze user behavior and preferences to enhance the user experience and develop new features and services.</li>
            <li><strong>Communication:</strong> To send you important updates, newsletters, and notifications related to your activities on the platform.</li>
            <li><strong>Compliance:</strong> To comply with any legal requirements and prevent fraudulent or unauthorized activities on our platform.</li>
        </ul>

        <h2>3. Sharing Your Information</h2>
        <p>We do not share your personal information with third parties, except in the following situations:</p>
        <ul>
            <li>With your consent, when you choose to engage with mentors, partners, or other learning communities.</li>
            <li>To comply with legal obligations, such as responding to a subpoena, court order, or legal process.</li>
            <li>In the event of a business transfer, such as a merger or acquisition, where user information may be transferred as part of the transaction.</li>
        </ul>

        <h2>4. Security of Your Information</h2>
        <p>We take the security of your personal information seriously. We use industry-standard security measures to protect your data from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.</p>

        <h2>5. Your Data Protection Rights</h2>
        <p>You have certain rights regarding the personal information we hold about you. These include:</p>
        <ul>
            <li>The right to access your personal data and request a copy of the information we hold.</li>
            <li>The right to request that we correct or update your personal information if it is inaccurate or incomplete.</li>
            <li>The right to request that we delete your personal information in certain circumstances.</li>
            <li>The right to object to the processing of your data or restrict how we use your information.</li>
        </ul>

        <h2>6. Use of Cookies</h2>
        <p>LearnByDoing uses cookies to improve your experience on the platform. Cookies are small text files stored on your device that help us understand how you use the site. You can choose to block or delete cookies through your browser settings, but this may affect the functionality of the platform.</p>

        <h2>7. Changes to This Privacy Policy</h2>
        <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page, and we will notify you via email or platform notifications if the changes are significant. Your continued use of the platform after any updates signifies your acceptance of the revised policy.</p>

        <h2>8. Contact Us</h2>
        <p>If you have any questions or concerns about this Privacy Policy or how we handle your personal information, please contact us at <strong><a href="mailto:privacy@learnbydoing.com" className='text-black'>privacy@learnbydoing.com</a></strong>.</p>
        </div>
         <marquee behavior="alternate" className="bg-dark text-white align-content-center">
         <p>&copy; 2024 LearnByDoing. All rights reserved.</p>
     </marquee>
    </>
    );
};

export default Privacy;
