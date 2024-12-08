import React from 'react';
import { Link } from 'react-router-dom';

const LearnMore = () => {
  return (
    <div className="bg-gradient-to-r from-blue-400 to-purple-500 min-h-screen text-white">
      {/* Header */}
      <header className="shadow sticky z-50 top-0">
        <nav className="bg-white px-4 lg:px-6 py-2.5">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link to="/" className="flex items-center">
              <h1 className="text-3xl font-bold text-purple-500">Payment Portal</h1>
            </Link>
            <div className="flex items-center lg:order-2">
              <Link
                to="/login"
                className="text-gray-800 hover:bg-purple-400 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-gray-800 hover:bg-purple-400 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
              >
                Register
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Section */}
      <main className="py-16 px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Learn More About Us</h1>
          <p className="text-lg">
            Discover how we are transforming the payment experience with security, speed, and simplicity.
          </p>
        </div>

        {/* Feature Cards Section */}
        <section className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Secure Payments",
              text: "We prioritize your security with end-to-end encryption and fraud detection to keep your data safe.",
              colors: "from-purple-500 to-pink-500",
            },
            {
              title: "Fast Transactions",
              text: "Experience blazing-fast payment processing to ensure your transactions are seamless and instant.",
              colors: "from-blue-500 to-teal-400",
            },
            {
              title: "User-Friendly",
              text: "Our platform is designed for everyone, offering an intuitive interface and simple navigation.",
              colors: "from-indigo-400 to-purple-400",
            },
            {
              title: "Global Reach",
              text: "Send and receive payments across the globe with our multi-currency support and global partnerships.",
              colors: "from-green-400 to-blue-400",
            },
            {
              title: "24/7 Support",
              text: "Our dedicated support team is available around the clock to assist you with any issues or questions.",
              colors: "from-red-400 to-pink-400",
            },
            {
              title: "Innovative Technology",
              text: "Leveraging the latest technology to provide you with a payment experience that's always ahead.",
              colors: "from-yellow-400 to-orange-400",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${feature.colors} text-white p-6 rounded-lg shadow-lg`}
            >
              <h2 className="text-2xl font-bold mb-4">{feature.title}</h2>
              <p>{feature.text}</p>
            </div>
          ))}
        </section>

        {/* Call to Action */}
        <section className="mt-16 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-6">
            Join thousands of users who trust our platform for their payment needs.
          </p>
          <Link
            to="/register"
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg"
          >
            Register Now
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-purple-600 py-6">
        <div className="text-center">
          <p>&copy; 2024 Payment Portal. All rights reserved.</p>
          <p>
            <Link to="/terms" className="underline hover:text-pink-200">
              Terms of Service
            </Link>{' '}
            |{' '}
            <Link to="/privacy" className="underline hover:text-pink-200">
              Privacy Policy
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LearnMore;
