export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <section className="flex min-h-screen items-center justify-center px-6">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-6 inline-flex rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600">
            AI-powered visual menus for restaurants
          </div>

          <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl">
            Turn your boring Menu into a{" "}
            <span className="text-orange-500">visual menu</span> with PlateView
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 sm:text-xl">
            Upload your restaurant menu and food photos. PlateView transforms
            them into a beautiful visual menu your customers can explore
            instantly.
          </p>

          <div className="mt-10 flex justify-center">
            <a
              href="/onboarding"
              className="rounded-full bg-black px-8 py-4 text-lg font-semibold text-white transition duration-200 hover:scale-105 hover:bg-gray-800"
            >
              Create Your Menu
            </a>
          </div>

          <p className="mt-5 text-sm text-gray-400">
            Upload. Enhance. Publish.
          </p>
        </div>
      </section>
    </main>
  );
}
