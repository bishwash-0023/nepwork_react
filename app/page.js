import Header from '@/components/Header';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-grow">
        <div className="relative -mt-[72px] h-screen w-full overflow-hidden">
          <img
            alt="Diverse freelancers collaborating in a modern office setting"
            className="absolute top-0 left-0 h-full w-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_ZmlsAjJ3dg6GGwsA66_YSdRsF-CSaLi7pUGAfD67vLjZNKbAmHIkVaPKgTw_wCcDghmi6uEI03oU-9YnTzyjxhLBU_HzyVM1oP6vI4XVxU1lJmu3n_FR5C_OAHA3m4tSnf_9a84_-8uMSQ5lNFPaA2zPo2eyP4BeyknTsbbOXQR9CPq6oHEDYCyKIq3HeqFgBfkJotpPrIK2JbFdP_xGho8QY8UyhrpHwP5fP7aPH2N3FeImPnKjIekoM3_-orYEp3-jcaMuUQ55"
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
            <h1 className="text-white text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              The Future of Work is Here
            </h1>
            <p className="mt-4 text-lg text-gray-200">
              Connect with top freelance talent instantly.
            </p>
            <div className="w-full max-w-md mt-8 p-2 rounded-xl glassmorphism">
              <div className="flex w-full items-stretch rounded-lg h-full bg-[#233648]/50">
                <div className="text-[#92adc9] flex items-center justify-center pl-4">
                  <span className="material-symbols-outlined text-white">search</span>
                </div>
                <input
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white placeholder:text-gray-300 focus:outline-0 focus:ring-0 border-none bg-transparent h-full pl-2 text-base font-normal leading-normal"
                  placeholder="Search for 'logo design'..."
                />
              </div>
            </div>
          </div>
        </div>

        <section className="bg-gray-100 dark:bg-gray-900 py-16 px-4">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            What Our Users Say
          </h3>
          <div className="grid grid-cols-1 gap-8">
            <div className="bg-white dark:bg-background-dark p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <img
                  alt="Client photo"
                  className="w-14 h-14 rounded-full object-cover mr-4"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-rqNbReB1VdjdzFPL8kJwcdxGGK8AZ2ULdYOL-x62GX0FobkSul2jHPkpY68npwCCphF---lMQC1AWkgHhG6urBO0E8wwLiLxzVWx-Ak-ZJShjjfzR9bDfO6jGBBqJnms-D6cKNopmyVo8FY__SwJJA86AV4PCYwbWBhfg4m1k0J8LdJyamE4kcalJc5O5u3o7GFEm-OFiVhW9kFQOq9qFWjuBMgJtrqnryLVrOhamaT6oInVQ38m34IzLO6EZkjA6jvgiOu3w5nt"
                />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    Sarah K., Project Manager
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Client</p>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-yellow-400 text-base"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                "Finding a talented developer for our mobile app was incredibly fast and
                easy. The quality of work exceeded our expectations. Highly
                recommended!"
              </p>
            </div>
            <div className="bg-white dark:bg-background-dark p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <img
                  alt="Freelancer photo"
                  className="w-14 h-14 rounded-full object-cover mr-4"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHaddvfg_K9JEOqKP2DbvFtKKvhyDsdf0P-DP2icTIlilDL8phFUbyEz0u5LCf7TZFs3-vZ11LnrqUXqBqixS5d8Qahv6GnTiI0UhcY1toVLO2CydfcNvdEhK5FZLur6G5DP4RjcHCPkFF8aoPk8ZDrUJjMs7hEJm2g6UYfmZpMlPzw6O-YPr640EpG9DYmR0HAMZCs2ujx_LIJceDDWVvni1MKKfTAJNTWexBhIaT8Ncs9uWZd_cXSYQVzSXDk3RNsdg92Jq5mERA"
                />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    David L., UI/UX Designer
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Freelancer
                  </p>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-yellow-400 text-base"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                "This platform has been a game-changer for my freelance career. I'm
                consistently finding high-quality projects that match my skills. The
                payment protection gives me peace of mind."
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Popular Categories
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="#"
              className="group relative col-span-2 row-span-1 h-40 flex flex-col justify-end p-4 rounded-xl overflow-hidden text-white transition-transform duration-300 ease-in-out hover:scale-[1.02]"
            >
              <div className="absolute inset-0 grid-item-gradient-1"></div>
              <div
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAffa4_q2T5fuq-Jw9LvQVWA6R-J6AJZVZHEeouL3OfHcdM2Ndahb0SNmsOsClpIZv7-v0MJ0afeeqd0SEloTLtTCeB9nc2y-ZzLzhgsUvcfHuEWaL3VpqOatnnVDa5M-1-djIKeYsBGAQY9io_ame5C0zQvZLoS06ylReCzHl6pBrNfOyoVYLpSufvFRB-mH1hAoHEozgaUH1wWKJ7LNZIMWQRAd8NLhIApNkrUBm7JQUp2csRm_pzkGZCav71ZOFS9YyBHssg7ENH')",
                }}
              ></div>
              <div className="relative z-10">
                <span className="material-symbols-outlined mb-2 text-3xl">code</span>
                <h4 className="font-bold text-lg">Development & IT</h4>
              </div>
            </Link>
            <Link
              href="#"
              className="group relative col-span-1 row-span-1 h-48 flex flex-col justify-end p-4 rounded-xl overflow-hidden text-white transition-transform duration-300 ease-in-out hover:scale-[1.02]"
            >
              <div className="absolute inset-0 grid-item-gradient-2"></div>
              <div
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBIx-U62yZRawttNunQdUUrAwStHCAPqcRI1Qs6mn6ltk3L0CbSXaId90eAJMxRRCTOdSpo-q16ziLJUnhPuSQayTwDiKItFOre_vfw0wVEm5lsBW7OmLTeiTV9vbazYJF7QeF0nLjXnm_nInq4JUU3dF4G5KTfv1BXf4Hz2AziQR0XnKtb55m_9Y0UmT3-RgpdncGIExB_PNLpL3QI0dKJyuWqn5fZDBWOgKP-gNh4keOS-6nE2SFFZmcnABiSrOUBDz0h0D-a5GG5')",
                }}
              ></div>
              <div className="relative z-10">
                <span className="material-symbols-outlined mb-2 text-3xl">
                  design_services
                </span>
                <h4 className="font-bold text-lg">Design & Creative</h4>
              </div>
            </Link>
            <Link
              href="#"
              className="group relative col-span-1 row-span-1 h-48 flex flex-col justify-end p-4 rounded-xl overflow-hidden text-white transition-transform duration-300 ease-in-out hover:scale-[1.02]"
            >
              <div className="absolute inset-0 grid-item-gradient-3"></div>
              <div
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD31DQYdtzuUc8_FRV4aGauegvSSznzoVDgRdBi5QKbnbEuOlhtlC1S3CENuywdGXCfkog7U6afaTGshxOuOL7MzHs-kK4M-te2-sqRwCb5BqSPFqTZCp8PEYICCkQYVP-MaoOjdnEwOUVfeodpcZD3wkvtr6G0AOTMKWIa1yHAdX8M7l-5stVf7X6S53fJXvZisQRw6LqRRIUI9DisxwlkQCpkhya8-MllC3eK6RbFYLQM850UXaIJLQzTmXe0ayicypC7CN1MSGOK')",
                }}
              ></div>
              <div className="relative z-10">
                <span className="material-symbols-outlined mb-2 text-3xl">
                  campaign
                </span>
                <h4 className="font-bold text-lg">Marketing</h4>
              </div>
            </Link>
            <Link
              href="#"
              className="group relative col-span-1 row-span-1 h-40 flex flex-col justify-end p-4 rounded-xl overflow-hidden text-white transition-transform duration-300 ease-in-out hover:scale-[1.02]"
            >
              <div className="absolute inset-0 grid-item-gradient-4"></div>
              <div
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCLIW-m2Va5XsSnULZPSnwADZwXWX77wjJdroQRw8kXtE87ucaOIq9ahBitCDvG5aOQbrxt2SlQfc-Gxw_zKH0cNgQLesrzDnxbOz-am5rFx39zuF7ZJ0Mp9B4bOtHZ6Spxa_B-N2ZiYg9YOCLWCLjdHv7cWFyD7HwhDJzLsmE39_UjndnLfsi2yyJCZJ0NI_Ettcy_HDSfOKygTY9G7A9XF6X3yJIoPJtXBJxxZpwvFeyDCuW_L9-GcDtUCXJTrg9M8PBrbpdxHl-N')",
                }}
              ></div>
              <div className="relative z-10">
                <span className="material-symbols-outlined mb-2 text-3xl">
                  translate
                </span>
                <h4 className="font-bold text-lg">Writing</h4>
              </div>
            </Link>
            <Link
              href="#"
              className="group relative col-span-1 row-span-1 h-40 flex flex-col justify-end p-4 rounded-xl overflow-hidden text-white transition-transform duration-300 ease-in-out hover:scale-[1.02]"
            >
              <div className="absolute inset-0 grid-item-gradient-5"></div>
              <div
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAf9ScxZQO-_Gcy742wew4wuD_2gnOq9i_PyHx9D1dI2n5kKT3BrnDivyZcwa1gghgcnG2LjLTbyh8oC56GmZqWewuj_NPmM0F5gFhstuDArx6A_vSfKhXKOD3EfwIyEa1jHmFUfHNFkK5X3MXjefk-4p1-7viyjzD-luZ4HS92WGSGGkdGbtqlbzaea5KVqZKZKQceFDt8TRzjqvB2xneyqRezC2ZSItpU67IEfwpmgFzkJGePJ8REVkVrKoS3Nwbr55jb6qGWFk87')",
                }}
              ></div>
              <div className="relative z-10">
                <span className="material-symbols-outlined mb-2 text-3xl">
                  psychology
                </span>
                <h4 className="font-bold text-lg">AI Services</h4>
              </div>
            </Link>
          </div>
        </section>

        <section className="pb-28 pt-8 px-4">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Trusted by Industry Leaders
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
            Powering teams at the world's most innovative companies.
          </p>
          <div className="flex items-center justify-center space-x-8 overflow-x-auto grayscale opacity-60 dark:invert dark:opacity-80 pb-8">
            <img
              className="h-8"
              alt="Google logo"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBU-kWtLbvC_FVFWdn5QZVfOAK5CFf-zdpYXvfa2eyLpXKg56e5arKStZgJXKnFXSiLZTjqzvsnYX9bWemQ7Py7aG9kbHM8WxFfl9Ffc_o8yFRKtCY_CFpQ4u_9iriLRnsIGNM5iIU40tWRfKcjaqCgByiLjvNU1NDUdQdJMjCeXiJ-KL1MdchJnFhBQI-epIFQyfMU-er5uw71nFLFS0XeAsxKVqOF9HCeeeogJ9oscwO1LI4_F1mVAEnbaB1VRGRK2GDM8T7RO971"
            />
            <img
              className="h-8"
              alt="Amazon logo"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEnJQc4rCckzXtU6gGF5OuzlbnG51LMiuAfFZrguptdj42vRN1IJmOIBbiUEbvUWS9y7FpZJXX4_WXdKliWOkUUFcAyaJDOTsj_ESPubQ0K3FWFr2FmCAnSUidZ7gL8X_2szfyWVXCGK59CYk2eROccOJcwyZVeNk1HGRDzVcKkXtI8pPUiwxBLSzIQcaHqKvK-tzTVaDuQqJSqnxyeB7Z4phX2XV21uYtZ6VKBCy9W9cNGNJRSgtRwz3k0dFabWGZDE927ZzkEYcP"
            />
            <img
              className="h-8"
              alt="Netflix logo"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbmIGwJq__MuMoT1yqryIWjR-6xIfUJoH2PMcMjRe-Mdwj720zvLJrzCZCDGnt3hfR8qX5_GB8sC0KOvU03_tjHMD8R3QyI_Fs73jAiJgP3PzA0nR13iEd5ErJiFe1KFpvJnOpnzf_lUgawK-6x2DoiXeu63MK_c5nsBZKw_e-vpDT5TfZ_34slOp4_Px4I5-xNjOdW97Wu68kBU3cZE9wqi8gKzMu5MeGsUXipwscvOTM2n8jBJ0gAOJu4RX9MaKz0-oI87kvExr1"
            />
            <img
              className="h-8"
              alt="Adobe logo"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuATWB6whAmvK_U-kUO21PxKC53mmR46cWWtjANsbOME4BeAngEJ3qOSmE9INA4ckdMfQmXs8fy2pAfmQzwoljngDqBidfpMNo2lRoyvcYcZau_muwvsucFnkFV5CGLIxwNfd0DBRb0bLBLwtvbhLEReTZ8XtHIflFjaUm0a_Y_bHSrNSR6homDrI0J79ONOeWWyICfTf_jNbn9ji2_oEulQuyO9rf4QeCrdna1dTBAN6_x-zcfzMvw3xCwskE1YxDi3tWTz1AqUY9bv"
            />
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 text-center">
            <div className="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-xl">
              <p className="text-3xl font-bold text-primary">1,500+</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Jobs Posted Today
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-xl">
              <p className="text-3xl font-bold text-primary">50k+</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Skilled Freelancers
              </p>
            </div>
          </div>
        </section>
      </main>
      <div className="fixed bottom-6 right-6 z-40">
        <button className="flex items-center gap-2 h-14 pl-5 pr-6 rounded-full text-white font-semibold shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 gradient-fab">
          <span className="material-symbols-outlined">auto_awesome</span>
          <span>AI Match</span>
        </button>
      </div>
    </div>
  );
}
