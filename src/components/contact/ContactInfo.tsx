'use client';

import { Mail, Phone, MapPin, Clock, Globe } from 'lucide-react';

export default function ContactInfo() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
        <div className="space-y-4">
          <div className="flex items-center text-gray-600">
            <Mail className="w-5 h-5 mr-3 text-blue-600" />
            <div>
              <p className="font-medium">Email</p>
              <a href="mailto:contact@jobsphere.com" className="hover:text-blue-600">
                contact@jobsphere.com
              </a>
            </div>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Phone className="w-5 h-5 mr-3 text-blue-600" />
            <div>
              <p className="font-medium">Phone</p>
              <a href="tel:+1-555-000-0000" className="hover:text-blue-600">
                +1 (555) 000-0000
              </a>
            </div>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Globe className="w-5 h-5 mr-3 text-blue-600" />
            <div>
              <p className="font-medium">Website</p>
              <a href="https://jobsphere.com" className="hover:text-blue-600">
                www.jobsphere.com
              </a>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Office Locations</h3>
        <div className="space-y-6">
          <div className="flex items-start text-gray-600">
            <MapPin className="w-5 h-5 mr-3 text-blue-600 mt-1" />
            <div>
              <p className="font-medium">Main Office</p>
              <p>123 Business Avenue</p>
              <p>San Francisco, CA 94105</p>
              <p>United States</p>
            </div>
          </div>
          
          <div className="flex items-start text-gray-600">
            <Clock className="w-5 h-5 mr-3 text-blue-600 mt-1" />
            <div>
              <p className="font-medium">Business Hours</p>
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect With Us</h3>
        <p className="text-gray-600 mb-4">
          Follow us on social media for the latest job opportunities and career insights.
        </p>
        <div className="flex space-x-4">
          <a
            href="https://twitter.com/jobsphere"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600"
          >
            Twitter
          </a>
          <a
            href="https://linkedin.com/company/jobsphere"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600"
          >
            LinkedIn
          </a>
          <a
            href="https://facebook.com/jobsphere"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600"
          >
            Facebook
          </a>
        </div>
      </div>
    </div>
  );
} 