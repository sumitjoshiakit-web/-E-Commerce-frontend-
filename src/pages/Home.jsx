import { Link } from 'react-router-dom';

export function Home() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gray-900 text-white px-6 py-16 sm:px-12 sm:py-20 lg:px-16">
      <div className="relative max-w-3xl">
        <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-medium">
          Modern • Simple • Fast
        </span>
        <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
          Find products you’ll love.
        </h1>
        <p className="mt-5 text-lg text-gray-300 max-w-2xl leading-relaxed">
          Browse a curated product catalog, open detailed product pages, and keep your cart ready even after a refresh.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/shop"
            className="rounded-full bg-white text-gray-900 px-7 py-3 font-semibold hover:bg-gray-100 transition"
          >
            Start Shopping →
          </Link>
          <Link
            to="/login"
            className="rounded-full border border-white/30 px-7 py-3 font-semibold hover:bg-white/10 transition"
          >
            Login as Guest
          </Link>
        </div>
      </div>
    </section>
  );
}
