'use client';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Link from 'next/link';

export default function Navbar2() {
  const pathname = usePathname();
  const links = [
      {"name":"Scouting","href":"/admin/scouting"},
      {"name":"Photos","href":"/admin/photos"},
      {"name":"Sponsors","href":"/admin/sponsors"},
      {"name":"Resources","href":"/admin/resources"},
      {"name":"Engineering","href":"/admin/engineering"},
      {"name":"Business","href":"/admin/business"},
      {"name":"Mentors","href":"/admin/mentors"},
      {"name":"Robots","href":"/admin/robots"},
      {"name":"Users","href":"/admin/users"},
      {"name":"Invites", "href":"/admin/invites"},
  ]
  return (
    <div className="flex z-10 w-full">
      <div className="flex overflow-x-auto bg-gray-200 h-25 w-full justify-center items-center px-2">
        {links.map((link) => (
          <Link
            key={link.name}
            className="text-xl flex items-center justify-center p-4 text-black flex-shrink-0"
            href={link.href}
          >
            <p
              className={clsx(
                "transition hover:border-blue-500 border-4 px-2 py-1.5",
                {
                  "border-blue-500": pathname.includes(link.href),
                  "border-transparent": !pathname.includes(link.href),
                }
              )}
            >
              {link.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
    )
}