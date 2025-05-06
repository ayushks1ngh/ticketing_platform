"use client"

import { Fragment, useEffect, useState } from 'react'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, TicketIcon } from '@heroicons/react/24/outline'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Events', href: '/events' },
  { name: 'Tickets', href: '/tickets' },
  { name: 'About', href: '/about' },
]

export default function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Disclosure as="nav" className={`fixed w-full z-50 transition-colors duration-300 ${
      scrolled 
        ? 'bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-md'
        : 'bg-transparent'
    }`}>
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <Link href="/" className="flex flex-shrink-0 items-center">
                  <TicketIcon className={`h-8 w-8 ${
                    scrolled
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-white'
                  }`} />
                  <span className={`ml-2 text-lg font-bold ${
                    scrolled
                      ? 'text-gray-900 dark:text-white'
                      : 'text-white'
                  }`}>
                    Party Tickets
                  </span>
                </Link>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                        pathname === item.href
                          ? scrolled
                            ? 'border-b-2 border-indigo-500 text-gray-900 dark:text-white'
                            : 'border-b-2 border-white text-white'
                          : scrolled
                            ? 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white'
                            : 'border-b-2 border-transparent text-white/90 hover:border-white/50 hover:text-white'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className={`rounded-lg p-2.5 text-sm focus:outline-none focus:ring-4 ${
                    scrolled
                      ? 'text-gray-500 hover:bg-gray-100 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700'
                      : 'text-white hover:bg-white/10 focus:ring-white/20'
                  }`}
                >
                  {theme === 'dark' ? '🌙' : '☀️'}
                </button>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button className={`inline-flex items-center justify-center rounded-md p-2 ${
                  scrolled
                    ? 'text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:hover:bg-gray-700'
                    : 'text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                }`}>
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  href={item.href}
                  className={`block py-2 pl-3 pr-4 text-base font-medium ${
                    pathname === item.href
                      ? scrolled
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-700 dark:bg-gray-700 dark:text-white'
                        : 'bg-white/10 text-white'
                      : scrolled
                        ? 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                        : 'text-white/90 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}