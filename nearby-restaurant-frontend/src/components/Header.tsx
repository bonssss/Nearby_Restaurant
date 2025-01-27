"use client";

import { useState } from 'react';
import { Bars3Icon, PlayCircleIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { ChartPieIcon, CursorArrowRaysIcon, FingerPrintIcon, SquaresPlusIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';

type Product = {
  name: string;
  description: string;
  href: string;
  icon: React.ElementType;
};

type CallToAction = {
  name: string;
  href: string;
  icon: React.ElementType;
};

const products: Product[] = [
  { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
  { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
  { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
  { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
  { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
];

const callsToAction: CallToAction[] = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">NEAR_BY</span>
            <img alt="Image" src="/image.png" className="h-8 w-auto" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Link href="/about" className="text-sm font-semibold text-gray-900">
            About
          </Link>
          <Link href="#" className="text-sm font-semibold text-gray-900">
            Contact
          </Link>
          <Link href="#" className="text-sm font-semibold text-gray-900">
            Service
          </Link>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link href="#" className="text-sm font-semibold text-gray-900">
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-500">
          <div className="flex justify-end p-4">
            <button onClick={() => setMobileMenuOpen(false)} className="text-white">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-col items-center space-y-4 bg-white p-6 z-10">
            <Link href="/about" className="text-lg font-semibold text-gray-900">About</Link>
            <Link href="#" className="text-lg font-semibold text-gray-900">Contact</Link>
            <Link href="#" className="text-lg font-semibold text-gray-900">Service</Link>
            <Link href="#" className="text-lg font-semibold text-gray-900">Log in</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
