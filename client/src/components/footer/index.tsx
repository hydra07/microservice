/**
 * v0 by Vercel.
 * @see https://v0.dev/t/WiLtJAZn62N
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import React from "react"

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-8 dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-start gap-4">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <LeafIcon className="h-6 w-6 text-green-500" />
            <span className="font-bold text-lg">Organic Eats</span>
          </Link>
          <p className="text-gray-500 dark:text-gray-400">
            Discover the finest organic ingredients for your kitchen. We source locally and sustainably to bring you the
            best.
          </p>
        </div>
        <nav className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <h4 className="font-semibold text-gray-700 dark:text-gray-300">Quick Links</h4>
            <Link
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              Home
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              Shop
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              About
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              Contact
            </Link>
          </div>
          <div className="grid gap-2">
            <h4 className="font-semibold text-gray-700 dark:text-gray-300">Resources</h4>
            <Link
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              Recipes
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              Blog
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              FAQ
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              Sustainability
            </Link>
          </div>
        </nav>
        <div className="flex flex-col items-start gap-4">
          <h4 className="font-semibold text-gray-700 dark:text-gray-300">Contact Us</h4>
          <p className="text-gray-500 dark:text-gray-400">
            123 Main Street, Anytown USA
            <br />
            info@organiceats.com
            <br />
            (555) 555-5555
          </p>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-4">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-500 dark:text-gray-400 text-sm">&copy; 2024 Organic Eats. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm">
            <Link
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

type LeafIconProps = React.SVGProps<SVGSVGElement>;

function LeafIcon(props: LeafIconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  )
}
