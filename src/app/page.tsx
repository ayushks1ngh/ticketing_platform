import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const featuredEvents = [
    {
      id: 1,
      title: "Summer Music Festival",
      date: "July 15, 2025",
      image: "/images/summer-fest.jpg",
      price: "$99",
      description: "A day of amazing music under the sun"
    },
    {
      id: 2,
      title: "Tech Conference 2025",
      date: "August 20, 2025",
      image: "/images/tech-conf.jpg",
      price: "$199",
      description: "Join the biggest tech gathering of the year"
    },
    {
      id: 3,
      title: "Food & Wine Festival",
      date: "September 5, 2025",
      image: "/images/food-fest.jpg",
      price: "$75",
      description: "Taste the finest cuisines and wines"
    }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/90">
          <Image
            src="/images/hero-bg.jpg"
            alt="Hero background"
            fill
            className="object-cover mix-blend-overlay"
            priority
          />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Get Ready for Amazing Events
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Book tickets for the most exciting events in your city. Early bird offers available!
          </p>
          <Link
            href="/events"
            className="bg-white text-primary-800 px-8 py-3 rounded-full font-semibold hover:bg-primary-50 transition-colors"
          >
            Browse Events
          </Link>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">
            Featured Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105"
              >
                <div className="relative h-48">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">{event.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{event.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-primary-600 dark:text-primary-400 font-medium">
                      {event.date}
                    </span>
                    <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                      {event.price}
                    </span>
                  </div>
                  <Link
                    href={`/events/${event.id}`}
                    className="mt-4 block text-center bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Get Tickets
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">Stay Updated</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Subscribe to our newsletter for the latest events and exclusive offers.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white flex-grow max-w-md"
            />
            <button
              type="submit"
              className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}