import Link from "next/link";
import CreateYourMenuButton from "@/components/createYourMenuButton.component";

const steps = [
  {
    number: "01",
    title: "Upload your menu",
    text: "Add your current menu and let PlateView organize the dishes, descriptions, and prices.",
  },
  {
    number: "02",
    title: "Add your photos",
    text: "Upload each dish from your phone. Present every item with a clear, appetizing visual.",
  },
  {
    number: "03",
    title: "Share and update",
    text: "Publish your visual menu with one QR code, then make changes whenever your menu evolves.",
  },
];

const metrics = [
  ["1", "QR code for your complete menu"],
  ["24/7", "Access on any guest’s phone"],
  ["0", "Reprints when a dish changes"],
  ["∞", "Room to keep your menu fresh"],
];

export default function WelcomePage() {
  return (
    <main className="overflow-hidden bg-[#f4f2ea] text-[#142019]">
      <header className="page-shell">
        <nav className="flex h-[82px] items-center justify-between border-b border-[#142019]/10">
          <a
            href="#top"
            className="flex items-center gap-3 font-display text-xl font-extrabold"
          >
            <span className="grid size-9 place-items-center rounded-[10px] bg-[#142019] text-[#d9ff5b]">
              P
            </span>
            PlateView
          </a>

          <div className="hidden gap-9 text-[15px] text-[#526058] md:flex">
            <a className="transition hover:text-[#142019]" href="#how">
              How it works
            </a>
            <a className="transition hover:text-[#142019]" href="#results">
              Why PlateView
            </a>
          </div>

          <CreateYourMenuButton />
        </nav>
      </header>

      <section
        id="top"
        className="page-shell grid min-h-[700px] items-center gap-11 py-16 lg:grid-cols-[1.05fr_.95fr]"
      >
        <div>
          <p className="eyebrow">Visual menus for modern restaurants</p>
          <h1 className="mt-5 max-w-3xl font-display text-5xl font-extrabold leading-[.98] tracking-[-.055em] sm:text-7xl xl:text-[86px]">
            Make every dish <span className="marker">impossible</span> to
            ignore.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[#607067]">
            Turn your ordinary menu into a beautiful visual experience. Upload
            your dishes, share one QR code, and give guests the confidence to
            order.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CreateYourMenuButton />
            <a className="secondary-button" href="#how">
              See how it works
            </a>
          </div>

          <div className="mt-9 flex items-center gap-3.5 text-sm text-[#526058]">
            <div className="flex" aria-hidden="true">
              <span className="avatar bg-[#8d5a48]" />
              <span className="avatar -ml-2 bg-[#714631]" />
              <span className="avatar -ml-2 bg-[#3b2d2d]" />
            </div>
            <span>Built for independent restaurants and growing teams</span>
          </div>
        </div>

        <div
          className="relative grid min-h-[590px] place-items-center"
          aria-label="PlateView mobile menu preview"
        >
          <div className="absolute size-[510px] max-w-[92vw] rotate-[-7deg] rounded-[44%_56%_59%_41%/54%_41%_59%_46%] bg-[#d9ff5b]" />

          <div className="absolute left-0 top-28 z-20 flex items-center gap-3 rounded-2xl border border-[#142019]/10 bg-white px-4 py-3.5 font-bold shadow-card sm:left-4">
            <span className="size-10 rounded border-[6px] border-dotted border-[#142019]" />
            <span>
              Scan. See.
              <br />
              Order.
            </span>
          </div>

          <div className="relative z-10 h-[554px] w-[280px] rotate-[4deg] overflow-hidden rounded-[42px] border-[7px] border-[#101512] bg-white shadow-phone">
            <span className="absolute left-1/2 top-2 z-30 h-[22px] w-[82px] -translate-x-1/2 rounded-full bg-[#101512]" />
            <div
              className="h-[235px] bg-cover bg-center"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, transparent 62%, rgba(0,0,0,.65)), url('https://assets.lummi.ai/assets/QmcXwARPpEM7GfrJRipamrTotjwMqht9QArTjZZU7VZVKu')",
              }}
            />
            <div className="p-[22px]">
              <p className="text-[11px] font-bold uppercase tracking-[.12em] text-[#879189]">
                Chef&apos;s special
              </p>
              <h2 className="mt-1 font-display text-2xl font-extrabold">
                Garden Filet
              </h2>
              <p className="mt-1 text-[13px] leading-5 text-[#718078]">
                Charred seasonal vegetables, herb jus, and crispy shallots.
              </p>
              <div className="mt-4 flex items-center justify-between">
                <strong>$24</strong>
                <span className="grid size-10 place-items-center rounded-full bg-[#d9ff5b] text-xl">
                  +
                </span>
              </div>
              <div className="mt-5 flex items-center gap-3 border-t border-[#e5e8e5] pt-4">
                <div
                  className="size-14 rounded-xl bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://media1.agfg.com.au/images/content/7569/28075.jpg')",
                  }}
                />
                <div>
                  <strong className="block text-sm">More to discover</strong>
                  <span className="text-xs text-[#7d8881]">
                    Explore the full menu
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-24 right-0 z-20 rounded-2xl border border-[#142019]/10 bg-white px-5 py-4 shadow-card sm:right-2">
            <strong className="block text-xl text-[#173e2d]">
              More clarity
            </strong>
            <span className="text-sm text-[#607067]">before guests order</span>
          </div>
        </div>
      </section>

      <div className="overflow-hidden bg-[#142019] py-4 text-white">
        <div className="ticker whitespace-nowrap font-display font-bold tracking-wide">
          UPLOAD YOUR MENU <span>✦</span> ADD DISH PHOTOS <span>✦</span> SHARE
          ONE QR CODE <span>✦</span> UPDATE ANYTIME <span>✦</span>
          UPLOAD YOUR MENU <span>✦</span> ADD DISH PHOTOS <span>✦</span> SHARE
          ONE QR CODE <span>✦</span> UPDATE ANYTIME <span>✦</span>
        </div>
      </div>

      <section id="how" className="page-shell py-24">
        <div className="mb-12 grid items-end gap-6 md:grid-cols-[.8fr_1.2fr] md:gap-16">
          <h2 className="section-title">From printed menu to visual story.</h2>
          <p className="max-w-xl text-lg leading-8 text-[#607067]">
            No complicated setup. PlateView organizes your dishes into a
            polished mobile menu that looks good and stays easy to update.
          </p>
        </div>

        <div className="grid overflow-hidden rounded-[28px] border border-[#d7dbd3] bg-[#f9f8f3] md:grid-cols-3">
          {steps.map((step) => (
            <article
              key={step.number}
              className="relative min-h-[250px] border-b border-[#d7dbd3] p-9 last:border-0 md:border-b-0 md:border-r md:last:border-r-0"
            >
              <span className="font-display text-sm font-extrabold text-[#173e2d]">
                {step.number}
              </span>
              <span className="absolute right-7 top-7 grid size-11 place-items-center rounded-full border border-[#d7dbd3]">
                ↗
              </span>
              <h3 className="mt-14 font-display text-2xl font-bold">
                {step.title}
              </h3>
              <p className="mt-3 text-[#607067]">{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="results" className="page-shell">
        <div className="grid gap-14 rounded-[34px] bg-[#173e2d] p-8 text-white sm:p-12 lg:grid-cols-2 lg:p-20">
          <div>
            <p className="eyebrow text-[#d9ff5b] before:bg-[#d9ff5b]">
              Built for better decisions
            </p>
            <h2 className="section-title mt-5 text-white">
              Guests eat with their eyes first.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#c7d5cd]">
              Names describe a dish. Images make it real. PlateView helps guests
              understand unfamiliar dishes, compare options, and order with
              confidence.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {metrics.map(([value, label]) => (
              <div key={label} className="rounded-[19px] bg-white/[.08] p-7">
                <strong className="block font-display text-4xl font-extrabold text-[#d9ff5b]">
                  {value}
                </strong>
                <span className="mt-2 block text-sm text-[#d9e0dc]">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="start" className="px-5 py-32 text-center">
        <h2 className="mx-auto max-w-4xl font-display text-5xl font-extrabold leading-none tracking-[-.05em] sm:text-7xl">
          Turn your boring menu into a visual menu.
        </h2>
        <p className="mx-auto my-6 max-w-xl text-lg text-[#607067]">
          Give every dish the presentation it deserves—and every guest a faster
          path to “I’ll have that.”
        </p>
        <CreateYourMenuButton />
      </section>

      <footer className="border-t border-[#d7dbd3]">
        <div className="page-shell flex flex-col gap-5 py-8 text-sm text-[#607067] sm:flex-row sm:items-center sm:justify-between">
          <a
            href="#top"
            className="flex items-center gap-3 font-display text-xl font-extrabold text-[#142019]"
          >
            <span className="grid size-9 place-items-center rounded-[10px] bg-[#142019] text-[#d9ff5b]">
              P
            </span>
            PlateView
          </a>
          <span>© 2026 PlateView. Visual menus made simple.</span>
        </div>
      </footer>
    </main>
  );
}
