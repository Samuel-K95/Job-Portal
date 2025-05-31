'use client';

import { Company } from '@/types/company';
import { Building2, MapPin, Users, Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CompanyCardProps {
  company: Company;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <Image
            src={company.logo_url || '/company-placeholder.png'}
            alt={company.name}
            width={64}
            height={64}
            className="rounded-lg"
          />
        </div>
        
        <div className="flex-grow">
          <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600">
            <Link href={`/dashboard/companies/${company.id}`}>{company.name}</Link>
          </h3>
          
          <div className="mt-2 space-y-2">
            <div className="flex items-center text-gray-600">
              <Building2 className="w-4 h-4 mr-2" />
              <span>{company.industry}</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{company.location}</span>
            </div>
          </div>
          
          <p className="mt-2 text-gray-600 line-clamp-2">{company.description}</p>
          
          <div className="mt-4 flex items-center gap-6 text-sm text-gray-500">
            {company.employee_count && (
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                <span>{company.employee_count.toLocaleString()} employees</span>
              </div>
            )}
            
            {company.founded_year && (
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>Founded {company.founded_year}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 