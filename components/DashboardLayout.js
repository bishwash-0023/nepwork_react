'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children, user }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', icon: 'dashboard', href: '/dashboard' },
    { name: 'Jobs', icon: 'work', href: '/jobs' },
    { name: 'Messages', icon: 'mail', href: '/messages' },
    { name: 'Payments', icon: 'payments', href: '/payments' },
    { name: 'Profile', icon: 'person', href: '/profile' },
  ];

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden pb-24 bg-background-light dark:bg-background-dark font-display">
      {/* Top App Bar */}
      <header className="sticky top-0 z-10 flex items-center bg-background-light dark:bg-background-dark p-4 justify-between border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
            style={{
              backgroundImage: `url("${user?.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAgs6fSmkTf_uzSaZF1mOLr6nluNuGwtd7aV42-C1ZSIOzjC5RQR3u5MTkY9-qePhwT5LGzOANqoFo7tPKWEY3q_kmd_BQ3QAfKx0akzDULzrg-GCd1itahuAgu2jhXHFwA_s0Lv0S9Xx7M92br-VZ0hPqafbt0k12uYKncHOFncSlAHU4ELNCDJVHWnhxrUTaQf7mWw8rMc3fZC_6KKy2IVePfDbBYWmMahmJ-3rZq-beq6BZ1IJa2VBscmBaaAdeCFIBx1yUFpX7'}")`,
            }}
          ></div>
          <h1 className="text-gray-900 dark:text-gray-100 text-lg font-bold leading-tight tracking-[-0.015em] flex-1">
            Welcome, {user?.name || 'User'}!
          </h1>
        </div>
        <div className="flex items-center justify-end relative">
          <button className="flex cursor-pointer items-center justify-center rounded-full h-10 w-10 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
            <span className="material-symbols-outlined text-2xl">notifications</span>
          </button>
          <div className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-white text-xs font-bold">
            3
          </div>
        </div>
      </header>

      <main className="flex-grow">{children}</main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-10 bg-white dark:bg-[#192430] border-t border-gray-200 dark:border-gray-800">
        <div className="flex justify-around h-16">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center justify-center w-full gap-1 ${
                  isActive
                    ? 'text-primary'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.icon}
                </span>
                <p className={`text-xs ${isActive ? 'font-bold' : 'font-medium'}`}>
                  {item.name}
                </p>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
