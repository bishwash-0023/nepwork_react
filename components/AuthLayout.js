export default function AuthLayout({ children, image, quote, quoteAuthor }) {
  return (
    <div className="group/design-root">
      <div className="flex min-h-screen w-full flex-col lg:flex-row">
        {/* Left Side: Visuals */}
        <div className="relative hidden h-auto min-h-screen flex-col bg-[#111a22] lg:flex lg:w-1/2">
          <div
            className="sticky top-0 flex h-screen flex-col justify-end bg-cover bg-center bg-no-repeat p-10 text-white"
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 50%), url("${image}")`,
            }}
          >
            <div className="flex flex-col gap-4">
              <h1 className="font-display text-4xl font-bold tracking-tight">
                "{quote}"
              </h1>
              <p className="font-display text-lg text-white/80">
                - {quoteAuthor}
              </p>
            </div>
            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 justify-center gap-2 p-5">
              <div className="h-2 w-8 rounded-full bg-white"></div>
              <div className="h-2 w-2 rounded-full bg-white/50"></div>
              <div className="h-2 w-2 rounded-full bg-white/50"></div>
            </div>
          </div>
        </div>
        {/* Right Side: Form */}
        <div className="flex w-full flex-col justify-center bg-background-light px-4 py-10 dark:bg-background-dark sm:px-6 lg:w-1/2 lg:px-8">
          <div className="mx-auto w-full max-w-md">
            <div className="lg:hidden mb-8">
                <div className="bg-cover bg-center flex flex-col justify-end overflow-hidden rounded-xl min-h-60" 
                    style={{ backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 25%), url("${image}")` }}>
                </div>
             </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
