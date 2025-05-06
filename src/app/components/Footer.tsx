"use client"

import { FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Company</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="/about" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">About</a></li>
              <li><a href="/contact" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Support</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="/faq" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">FAQ</a></li>
              <li><a href="/help" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Help Center</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="/privacy" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Privacy Policy</a></li>
              <li><a href="/terms" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Social</h3>
            <ul className="mt-4 flex space-x-6">
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">GitHub</span>
                  <FaGithub className="h-6 w-6" />
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Twitter</span>
                  <FaTwitter className="h-6 w-6" />
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Instagram</span>
                  <FaInstagram className="h-6 w-6" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 dark:border-gray-700">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; {new Date().getFullYear()} Party Ticketing System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}