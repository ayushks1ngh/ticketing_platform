'use client'

import { useState, useEffect } from 'react'
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import EventSkeleton from '@/components/EventSkeleton'

interface Event {
  id: number
  title: string
  date: string
  image: string
  price: string
  category: string
  location: string
  description: string
}

const mockEvents: Event[] = [
  {
    id: 1,
    title: "Summer Music Festival",
    date: "July 15, 2025",
    image: "/images/summer-fest.jpg",
    price: "$99",
    category: "Music",
    location: "Central Park",
    description: "A day of amazing music under the sun"
  },
  {
    id: 2,
    title: "Tech Conference 2025",
    date: "August 20, 2025",
    image: "/images/tech-conf.jpg",
    price: "$199",
    category: "Technology",
    location: "Convention Center",
    description: "Join the biggest tech gathering of the year"
  },
  {
    id: 3,
    title: "Food & Wine Festival",
    date: "September 5, 2025",
    image: "/images/food-fest.jpg",
    price: "$75",
    category: "Food & Drink",
    location: "Waterfront Plaza",
    description: "Taste the finest cuisines and wines"
  },
  // Add more mock events here...
]

const categories = ["All", "Music", "Technology", "Food & Drink", "Sports", "Arts"]

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [priceRange, setPriceRange] = useState([0, 500])
  const [isLoading, setIsLoading] = useState(true)
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    // Simulate API call
    const fetchEvents = async () => {
      setIsLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate network delay
        setEvents(mockEvents)
      } catch (error) {
        console.error('Failed to fetch events:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory
    const price = parseInt(event.price.replace('$', ''))
    const matchesPrice = price >= priceRange[0] && price <= priceRange[1]
    return matchesSearch && matchesCategory && matchesPrice
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-lg">
            <label htmlFor="search" className="sr-only">Search events</label>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              id="search"
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search events"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <FunnelIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            <label htmlFor="category" className="sr-only">Filter by category</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              aria-label="Filter by category"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="flex items-center gap-4">
            <label htmlFor="price-range" className="text-sm text-gray-500 dark:text-gray-400">
              Price Range:
            </label>
            <input
              id="price-range"
              type="range"
              min="0"
              max="500"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-32"
              aria-label={`Price range up to $${priceRange[1]}`}
            />
            <span className="text-sm font-medium text-gray-900 dark:text-white" aria-live="polite">
              ${priceRange[0]} - ${priceRange[1]}
            </span>
          </div>
        </div>

        {/* Events Grid with Loading State */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Show multiple skeleton loaders while loading
            [...Array(6)].map((_, index) => (
              <div key={index} className="opacity-0 animate-fade-up" style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}>
                <EventSkeleton />
              </div>
            ))
          ) : (
            filteredEvents.map((event, index) => (
              <div
                key={event.id}
                className="opacity-0 animate-fade-up group bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all hover:scale-105"
                style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
              >
                <Link href={`/events/${event.id}`} className="block">
                  <div className="relative h-48">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                    />
                    <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {event.price}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                        {event.category}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {event.date}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {event.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        📍 {event.location}
                      </span>
                      <span className="inline-flex px-4 py-2 rounded-lg text-white bg-indigo-600 group-hover:bg-indigo-700 transition-colors">
                        Get Tickets
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>

        {!isLoading && filteredEvents.length === 0 && (
          <div className="text-center py-12 animate-fade-up">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              No events found
            </h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  )
}