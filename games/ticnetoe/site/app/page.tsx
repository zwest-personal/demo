import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">


        <div className="flex gap-4 items-center flex-col sm:flex-row">
          Live refresh finally working after a lot of tweaking.

          Turbo (Rust compiler) seems to not like setup.

          Thankfully the UI of this will never be *that* big so webpack is fine.
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        Built using the Next.js framework.  Not a serious project, but wanted to put together a bit of a full game here.
      </footer>
    </div>
  );
}
