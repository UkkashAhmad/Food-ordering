// its like we are making protected routes so user and admin can access only their pages
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function UserTabs({ isAdmin }) {
  const path = usePathname();
  return (
    <div className="flex mx-auto gap-2 tabs justify-center flex-wrap">
      <Link className={path === "/profile" ? "active" : ""} href={"/profile"}>
        Profile
      </Link>
      {isAdmin && (
        <>
          <Link
            href={"/categories"}
            className={path === "/categories" ? "active" : ""}
          >
            Categories
          </Link>
          <Link
            href={"/menu-items"}
            className={path.includes("menu-items") ? "active" : ""}
          >
            Menu Items
          </Link>
          {/* this path.includes mean whatever/wherever  with this path u have to avtive it  */}
          <Link href={"/users"} className={path.includes('/users') ? "active" : ""}>
            Users
          </Link>
          
        </>
      )}
      <Link href={"/orders"} className={path === "/orders" ? "active" : ""}>
            Orders
          </Link>
    </div>
  );
}

export default UserTabs;
