"use client";

import Link from "next/link";

type Props = {
  currentUser: { id: string; email: string } | null;
};

function Header({ currentUser }: Props) {
  const links = [
    !currentUser && { label: "Sign Up", href: "/auth/signup" },
    !currentUser && { label: "Sign In", href: "/auth/signin" },
    currentUser && { label: "Sign Out", href: "/auth/signout" },
  ]
    .filter((link) => link)
    .map(({ label, href }) => {
      return (
        <li key={href}>
          <Link href={href}>{label}</Link>
        </li>
      );
    });

  return (
    <nav className="flex p-2">
      <Link className="mr-auto" href="/">
        Homepage
      </Link>
      <div>
        <ul className="flex gap-2">{links}</ul>
      </div>
    </nav>
  );
}

export default Header;
