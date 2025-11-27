'use client';
import { useState } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';

export default function Discover() {
  const [selectedFreelancers, setSelectedFreelancers] = useState([2, 3]); // Dummy selected IDs

  const freelancers = [
    {
      id: 1,
      name: 'Jane Doe',
      title: 'Senior UX Designer',
      rating: 4.9,
      reviews: 212,
      rate: '$75/hr',
      skills: ['Figma', 'UI/UX', 'Prototyping'],
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_8DVbjdHH0l-dHJpb35MgBliO2omGuPfl1RLJN-T1Ue6999AsORyMMdZcWGxqR0qjC7Dp1j0jjafXI84E7eILhHOcLMe5HjP3zTeVdQEAwkhv8e7iI2RylPq2RXkdiQ8xLD1rt_CeNlUm9Si2Fhz0dBuzkeUso06SJ394DUOrHtCUzfVJUd9AUbmGReAGKK-GXz32YHozVPwH6cGhyWjjQl7YuxkluEhP5ZvCrBgTs2ZVW7Wmsd31ESGuE6Eb8K4NoMZi56Hrj_2k',
      online: true,
      liked: false
    },
    {
      id: 2,
      name: 'John Smith',
      title: 'Full-Stack Developer',
      rating: 5.0,
      reviews: 158,
      rate: '$90/hr',
      skills: ['React', 'Node.js', 'AWS'],
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_ALew5Dsovw0YBFSb5KEF7-HlnF1WLV2FH9uiJkbzSUgbm8Lzh9rRYskv3v98yzBja9Qa3Pal3PfZye2JD0eij1RtyWHoKKo6DDMu4kHcwSdK4Ht-aIESJv_W5mrK1cy1TDFngROV3qWbNwQBFKwwFwvFxhVGxwbogIKPm24v1hn40x-gYiq0TLdsXP-hjC9bRcr80v2mHw2XDezfVBe_EfO2wHX-vaRXlH8yAcdfNal0_eqcI-fFF_c1I__lCQnru5N9GIPKv2KH',
      online: false,
      liked: true
    },
    {
      id: 3,
      name: 'Emily White',
      title: 'Brand Strategist',
      rating: 4.8,
      reviews: 97,
      rate: '$60/hr',
      skills: ['Marketing', 'SEO'],
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaXea7DzbTjFAGkXkp7Z2S-pY2QQVjwEWCtlzRvkKzCV1RYpgjL4rHLduPmxg0OQ9AnbLWJlo4EgX-7dCAyt4jXYz7FIWK0Oe6wRgZWVsGBIDhQEOL_lGBjYgb5-K2SLbDluNd6FJaV4vfQI0U0Mmwdg3Mr1iY3hqo4PMqhAm0AqmRRja1g_XsOtV-n7nf4D-tO6yDQd0Lo2oADgDNDyP2tl6c1eP8fLPooLMhXCDF6NCwlZRGeTS2HMphnU68LyM8y-X5NNOUuTUR',
      online: true,
      liked: false
    }
  ];

  const toggleSelection = (id) => {
    if (selectedFreelancers.includes(id)) {
      setSelectedFreelancers(selectedFreelancers.filter(fid => fid !== id));
    } else {
      setSelectedFreelancers([...selectedFreelancers, id]);
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen w-full overflow-x-hidden bg-background-light dark:bg-background-dark font-display">
      {/* Top App Bar */}
      <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
        <div className="flex items-center p-4 pb-2 justify-between">
          <h1 className="text-gray-900 dark:text-gray-100 text-xl font-bold leading-tight flex-1">
            Find Talent
          </h1>
          <div className="flex items-center justify-end">
            <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 text-primary gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0 hover:bg-primary/10 transition-colors">
              <span className="material-symbols-outlined text-3xl">tune</span>
            </button>
          </div>
        </div>
        <div className="px-4 py-3">
          <div className="flex w-full flex-1 items-stretch rounded-xl h-12 bg-gray-200 dark:bg-[#192633]">
            <div className="text-gray-500 dark:text-gray-400 flex items-center justify-center pl-4">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-xl text-gray-900 dark:text-white focus:outline-0 focus:ring-0 border-none bg-transparent h-full placeholder:text-gray-500 dark:placeholder:text-gray-400 px-4 pl-2 text-base font-normal leading-normal"
              placeholder="Search skills, name, or category"
            />
          </div>
        </div>
        <div className="flex gap-3 px-4 py-2 overflow-x-auto">
          <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary/20 dark:bg-primary/30 px-4 hover:bg-primary/30 transition-colors">
            <span className="material-symbols-outlined text-primary text-base">
              swap_vert
            </span>
            <p className="text-primary text-sm font-medium leading-normal">
              Sort: Relevance
            </p>
            <span className="material-symbols-outlined text-primary text-base">
              expand_more
            </span>
          </button>
          <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-gray-200 dark:bg-[#192633] px-4 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">
            <span className="material-symbols-outlined text-gray-900 dark:text-gray-100 text-base">
              attach_money
            </span>
            <p className="text-gray-900 dark:text-gray-100 text-sm font-medium leading-normal">
              Price
            </p>
          </button>
          <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-gray-200 dark:bg-[#192633] px-4 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">
            <span className="material-symbols-outlined text-gray-900 dark:text-gray-100 text-base">
              location_on
            </span>
            <p className="text-gray-900 dark:text-gray-100 text-sm font-medium leading-normal">
              Location
            </p>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 space-y-4 pb-24">
        {freelancers.map((freelancer) => (
          <div
            key={freelancer.id}
            className="flex items-start justify-between gap-4 rounded-xl bg-white dark:bg-[#192633] p-4 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex flex-1 items-start gap-4">
              <div className="flex flex-col items-center gap-2">
                <div className="relative">
                  <img
                    className="h-16 w-16 rounded-full object-cover"
                    src={freelancer.avatar}
                    alt={`Profile picture of ${freelancer.name}`}
                  />
                  {freelancer.online && (
                    <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-secondary border-2 border-white dark:border-[#192633]"></div>
                  )}
                </div>
                <input
                  type="checkbox"
                  checked={selectedFreelancers.includes(freelancer.id)}
                  onChange={() => toggleSelection(freelancer.id)}
                  className="form-checkbox h-5 w-5 rounded border-gray-400 dark:border-gray-500 text-primary focus:ring-primary focus:ring-offset-0"
                />
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <Link href="/profile" className="text-gray-900 dark:text-white text-lg font-bold leading-tight hover:underline">
                  {freelancer.name}
                </Link>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-normal leading-normal">
                  {freelancer.title}
                </p>
                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                  <span
                    className="material-symbols-outlined text-yellow-500 !text-base"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <p className="text-sm font-medium">
                    {freelancer.rating}{' '}
                    <span className="font-normal text-gray-500">
                      ({freelancer.reviews} reviews)
                    </span>
                  </p>
                </div>
                <p className="text-gray-900 dark:text-white font-semibold pt-1">
                  {freelancer.rate}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {freelancer.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-medium bg-primary/20 text-primary px-2 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <button className={`${freelancer.liked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}>
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: freelancer.liked ? "'FILL' 1" : "'FILL' 0" }}
              >
                {freelancer.liked ? 'favorite' : 'favorite_border'}
              </span>
            </button>
          </div>
        ))}
      </main>

      {/* Comparison Bar */}
      {selectedFreelancers.length > 0 && (
        <footer className="fixed bottom-0 z-10 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-sm p-4 border-t border-gray-200 dark:border-gray-700 w-full">
          <div className="flex items-center justify-between gap-4 max-w-md mx-auto">
            <div className="flex items-center -space-x-3">
              {selectedFreelancers.map((id) => {
                const f = freelancers.find(fr => fr.id === id);
                return (
                  <img
                    key={id}
                    className="h-10 w-10 rounded-full object-cover border-2 border-white dark:border-background-dark"
                    src={f.avatar}
                    alt={f.name}
                  />
                );
              })}
            </div>
            <button className="flex items-center justify-center rounded-lg bg-primary h-12 px-6 text-white text-base font-bold w-full max-w-xs hover:bg-primary/90 transition-colors">
              Compare ({selectedFreelancers.length})
            </button>
          </div>
        </footer>
      )}
    </div>
  );
}
