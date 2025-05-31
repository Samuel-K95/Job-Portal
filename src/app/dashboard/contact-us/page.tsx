'use client';

import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';

export default function ContactUsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Have questions or need assistance? We're here to help! Fill out the form below
          or use our contact information to reach out.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h2>
          <ContactForm />
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <ContactInfo />
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              How do I create an account?
            </h3>
            <p className="text-gray-600">
              Click on the "Sign Up" button in the top navigation bar and follow the
              registration process. You'll need to provide some basic information and
              choose whether you're a job seeker or employer.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              How can I post a job?
            </h3>
            <p className="text-gray-600">
              Employers can post jobs by logging into their account, navigating to the
              dashboard, and clicking on the "Post a Job" button. Follow the form to
              provide job details.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Is it free to apply for jobs?
            </h3>
            <p className="text-gray-600">
              Yes, it's completely free for job seekers to create an account, browse
              jobs, and submit applications through our platform.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              How long does it take to hear back about an application?
            </h3>
            <p className="text-gray-600">
              Response times vary by employer. You can check the status of your
              applications in your dashboard. We recommend following up directly with
              employers after a week.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
