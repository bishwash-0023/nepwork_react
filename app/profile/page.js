'use client';
import Link from 'next/link';

export default function Profile() {
  return (
    <div className="relative min-h-screen w-full bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200">
      {/* Top App Bar */}
      <header className="sticky top-0 z-20 flex items-center justify-between bg-background-light/80 p-4 backdrop-blur-sm dark:bg-background-dark/80">
        <Link href="/discover">
            <button className="flex h-10 w-10 items-center justify-center rounded-full text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
            </button>
        </Link>
        <h1 className="text-lg font-bold leading-tight tracking-[-0.015em] text-gray-900 dark:text-white">
          Profile
        </h1>
        <button className="flex h-10 w-10 items-center justify-center rounded-full text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
          <span className="material-symbols-outlined">share</span>
        </button>
      </header>

      <main className="flex w-full flex-col pb-40">
        {/* Profile Header */}
        <div className="p-4">
          <div className="flex w-full flex-col items-start gap-4">
            <div className="relative">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-32 w-32 ring-4 ring-offset-4 ring-offset-background-light dark:ring-offset-background-dark ring-primary cursor-pointer"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCo0nPyQMi7AUXUtnHq7K_80UWNNsbWN1y03REQvh6-JvsmH_cAdYvrrkPho5mG2UNU-0uGaHLXzOorN1Z0PJXJGosdkbcpq-wkX0kmehFFkmOY5gtDok1bPSv__DWQD7mOeGZpnKKO8n_Z99MwXLgvSt4vVzivuLrQfOhTDCMDdvDe8q4vCNzX8OisploKkk3ogh7a8xsmBZzXmzHLLxLS3pPngcQqLJ4GhPev4bwtjeV23C0Qu5aIHPxMmnPm8PWsUWG8fREMwWS1")',
                }}
              ></div>
              <div className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/90 text-white backdrop-blur-sm">
                <span className="material-symbols-outlined text-base">
                  play_arrow
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-1">
              <div className="flex items-center gap-2">
                <h2 className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">
                  Alex Doe
                </h2>
                <span
                  className="material-symbols-outlined text-yellow-500 !text-xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-base font-normal leading-normal">
                Senior UI/UX Designer
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-sm font-normal leading-normal">
                San Francisco, CA •{' '}
                <span className="text-green-500">Available for new projects</span>
              </p>
            </div>
            <div className="flex w-full max-w-[480px] gap-3">
              <button className="flex flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-200 dark:bg-gray-700/50 text-gray-800 dark:text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">
                <span className="truncate">Follow</span>
              </button>
              <button className="flex flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary/20 text-primary text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/30 transition-colors">
                <span className="truncate">Message</span>
              </button>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="px-4 pt-5">
          <h3 className="text-gray-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] pb-2">
            About
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-base font-normal leading-relaxed">
            A passionate UI/UX designer with over 8 years of experience creating
            intuitive and engaging digital experiences. I specialize in mobile-first
            design, prototyping, and user research. Let's build something amazing
            together.
          </p>
        </div>

        {/* Skills Section */}
        <div className="px-4 pt-8">
          <h3 className="text-gray-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] pb-3">
            Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              'UI Design',
              'UX Design',
              'Figma',
              'Prototyping',
              'Mobile Apps',
              'Web Design',
            ].map((skill) => (
              <span
                key={skill}
                className="cursor-pointer rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary dark:bg-primary/20 hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Portfolio Section */}
        <div className="pt-8">
          <h3 className="text-gray-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] px-4 pb-3">
            Portfolio
          </h3>
          <div className="grid grid-cols-2 gap-2 px-4">
            <div className="grid gap-2">
              <img
                className="h-auto max-w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOSdhKRMlINbkC4VQWz6EPfQ-iHfZWeLiCvwG-TAMsBN_qem7sJldlHjEBg8LexoNZ_fKcX_Gy7YJw-PLW2Zr-vXyRkQ-QSmU57Bfn_Q8HVag0sHYIIvyFlfH1_841tTkg3US7oZhIhs94BgI5y_GlyXrbDjwhKvF8owL6ULlxwQKNRHT4tWoXRW0zFk2eGnnILKYen4kXgEn2BnH33EZLU4AS36ZC0fvWCMDRBJ-co8q2gkMcRRmxQTZAdChsyMWKfekoi6BVs_DZ"
                alt="Workspace"
              />
              <img
                className="h-auto max-w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxUDRjISACNA5bdifPPTioCTXTIBeE8LjfX3omL3mDI_zCHNcJKpn3MyaZyq-KLbu3FHg6czfeKB46JKcF69yJ8-VB30iY-XKJ35Yw5stEk_n8uIEg6_QaIzEyTdumkjXxRwG-r-igpzN5tL3gcucuZZzIJ1t9ToaEpTBJ4hYvvav5m2LAJRHhi1LvwJvPrg-kK-n41_U-YV-LPVao8hQbNc7Q6qPveNEK2HL9c5KlnzQe6k7FgnBRHE1EgNuqzpDWhv4tHKVabkw_"
                alt="Mobile app UI"
              />
            </div>
            <div className="grid gap-2">
              <img
                className="h-auto max-w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOU_izJE6OhvYfv-T6SeN0D5gEElbMdrn-fHC8CrnuGKHTUt6fkaVA2Syy_l9n9JyL1BPoM6vs8VIJMha59Pc77S-SGBVMHYBSW2XxApBHjWheqCevtz87j3AH3MT-2rS1ehRPfzHFews89Hg6n40-NVZ8Gitz85LOmF741zZcPa0idWTencgAOn-mpurSjQZy1b-432GeaXxRKaihURnhIfryNR5VLWdWxMZFKoAh_FeZtJfh33ulhEX7423kpo3ocGaLRBzywl0U"
                alt="Illustration"
              />
              <img
                className="h-auto max-w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRVbywGH7UUFnq3w3uZpjGkGarSIHzrGl-SghHH_-6t6UZ0iqCAwzTjwZ8JhcT30-KWUlik7vWRdpyjwQwEE1wtZDQv8M63SuBo3BI4jF4N0Oni3dOJjbsHRxderjskWaulGKq_xL-9XGKxRf_k5bN8wMb84fH0MSF4NisLt5hO8AXUAyYof97C0l1mae902wmQSJRqPiqVXAprBaBCbEhlH35czZ8OoQZJOQmrSz7K14YubEiZh8kI6FWvMKmvw0CMWvGekeHWykI"
                alt="Desk"
              />
            </div>
          </div>
        </div>

        {/* Ratings & Reviews Section */}
        <div className="px-4 pt-8">
          <h3 className="text-gray-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] pb-3">
            Ratings & Reviews
          </h3>
          <div className="space-y-6 rounded-xl bg-white p-4 dark:bg-gray-800/50">
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <p className="text-4xl font-bold text-gray-900 dark:text-white">
                  4.9
                </p>
                <div className="flex text-yellow-500">
                  {[...Array(4)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined !text-base"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                  <span
                    className="material-symbols-outlined !text-base"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star_half
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  (124 reviews)
                </p>
              </div>
              <div className="flex-1 space-y-2">
                {[
                  { label: 'Communication', width: '95%' },
                  { label: 'Quality', width: '98%' },
                  { label: 'Speed', width: '92%' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-sm">
                    <span className="w-24 text-gray-600 dark:text-gray-300">
                      {item.label}
                    </span>
                    <div className="h-2 flex-1 rounded-full bg-gray-200 dark:bg-gray-700">
                      <div
                        className="h-2 rounded-full bg-primary"
                        style={{ width: item.width }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
              <div className="flex items-start gap-3">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAukm3yKfmoHX1sOZgNLyJVex3GU4ZugHH8zeO9aQ_7D5tBfmU-WgfB9ly_DissVay57_2cloIKqZIuDtj74yoCZWxL4OKOQbYuXkzxfBKxmthE8pHXZPfZ4Eu4hmoyerFJvBlvpBC1jmnSg97c6maG_ENOY8VFGzAB3spIh3f3NTbkn2fSr8JOFCM-eiNIy4ttsqBeO4fNuAwutQUUVxmKxP6cGOwoiIqRNws00LdCeMSsdwff795Q2BOnDqPmYfqpgm5Gtc-cw2RK"
                  alt="Client avatar"
                />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    John Smith
                  </h4>
                  <div className="flex text-yellow-500 -ml-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined !text-sm"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    "Alex is an incredible designer. The communication was flawless
                    and the final delivery exceeded all expectations. Highly
                    recommended!"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Action Card */}
      <footer className="fixed bottom-0 left-0 right-0 z-20 w-full bg-background-light/80 p-4 backdrop-blur-sm dark:bg-background-dark/80">
        <div className="mx-auto flex max-w-md items-center justify-between gap-4 rounded-xl">
          <div className="flex-shrink-0">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Starting from
            </p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              $75/hr
            </p>
          </div>
          <button className="flex min-w-[84px] max-w-[480px] flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-6 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
            <span className="truncate">Hire Me</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
