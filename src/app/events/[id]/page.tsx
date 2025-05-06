'use client'

import { useParams } from 'next/navigation'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

interface TicketTier {
  id: number
  name: string
  price: number
  description: string
  available: number
}

const mockEvent = {
  id: 1,
  title: "Summer Music Festival",
  date: "July 15, 2025",
  time: "2:00 PM - 11:00 PM",
  image: "/images/summer-fest.jpg",
  description: "Get ready for the biggest summer music festival of 2025! Featuring top artists from around the world, amazing food vendors, and unforgettable experiences.",
  location: "Central Park",
  address: "New York, NY 10024",
  organizer: "EventMasters Inc.",
  ticketTiers: [
    {
      id: 1,
      name: "General Admission",
      price: 99,
      description: "Access to all main stage performances and general festival areas",
      available: 500
    },
    {
      id: 2,
      name: "VIP Pass",
      price: 299,
      description: "Premium viewing areas, exclusive lounge access, complimentary refreshments",
      available: 100
    },
    {
      id: 3,
      name: "Backstage Experience",
      price: 599,
      description: "All VIP benefits plus backstage tours and artist meet-and-greets",
      available: 20
    }
  ]
}

export default function EventDetailsPage() {
  const { id } = useParams()
  const [selectedTier, setSelectedTier] = useState<number | null>(null)
  const [quantity, setQuantity] = useState<number>(1)
  const [isLoading, setIsLoading] = useState(false)

  const selectedTicketTier = useMemo(() => 
    mockEvent.ticketTiers.find(t => t.id === selectedTier),
    [selectedTier]
  )

  const total = useMemo(() => 
    (selectedTicketTier?.price ?? 0) * quantity,
    [selectedTicketTier, quantity]
  )

  const handlePurchase = async () => {
    if (!selectedTier) return
    setIsLoading(true)
    try {
      // TODO: Implement purchase logic
      await new Promise(resolve => setTimeout(resolve, 1500)) // Simulated API call
      console.log('Purchase:', { tierId: selectedTier, quantity, total })
    } catch (error) {
      console.error('Purchase failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          href="/events"
          className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 mb-6"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Events
        </Link>

        {/* Event Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="relative h-[400px] rounded-xl overflow-hidden">
            <img
              src={mockEvent.image}
              alt={mockEvent.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              {mockEvent.title}
            </h1>
            <div className="space-y-2">
              <p className="flex items-center text-gray-600 dark:text-gray-300">
                📅 {mockEvent.date} • {mockEvent.time}
              </p>
              <p className="flex items-center text-gray-600 dark:text-gray-300">
                📍 {mockEvent.location}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                {mockEvent.address}
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                About This Event
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {mockEvent.description}
              </p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-300">
                Organized by: {mockEvent.organizer}
              </p>
            </div>
          </div>
        </div>

        {/* Ticket Selection */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Select Tickets
          </h2>
          <div className="space-y-4">
            {mockEvent.ticketTiers.map((tier) => (
              <div
                key={tier.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedTier === tier.id
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 ring-2 ring-indigo-500'
                    : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700'
                }`}
                onClick={() => setSelectedTier(tier.id)}
                role="button"
                tabIndex={0}
                aria-pressed={selectedTier === tier.id}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelectedTier(tier.id)
                  }
                }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {tier.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      {tier.description}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      {tier.available} tickets remaining
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${tier.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Purchase Section */}
          {selectedTier && (
            <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <label htmlFor="quantity" className="text-gray-700 dark:text-gray-300">
                    Quantity:
                  </label>
                  <select
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    disabled={isLoading}
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  Total: ${total.toFixed(2)}
                </p>
              </div>
              <button
                onClick={handlePurchase}
                disabled={isLoading}
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  isLoading
                    ? 'bg-indigo-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                } text-white`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Purchase Tickets'
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}