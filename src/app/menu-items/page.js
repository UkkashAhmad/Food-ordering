"use client";
import Link from "next/link.js";
import UserTabs from "../Components/Layout/UserTabs";
import { useProfile } from "../Components/UseProfile.js";
import Right from "../Components/Icons/Right.js";
import { useEffect, useState } from "react";
import { MenuItem } from "../api/models/MenuItem.js";
import Image from "next/image.js";
function MenuItemsPage() {
  // we are checking profile by this
  const { loading, data } = useProfile();
  const [menuitems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch("/api/menu-items").then((response) => {
      response.json().then((menuitems) => {
        setMenuItems(menuitems);
      });
    });
  }, []);

  if (loading) {
    return "Loading user info...";
  }

  if (!data.admin) {
    return "not an Admin.";
  }
  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <Link className="button flex" href={"/menu-items/new"}>
          <span>Create new menu item</span>
          <Right />
        </Link>
      </div>
      <div>
        <h2 className="text-sm text-gray-500 mt-8">Edit menu item</h2>
        <div className="grid grid-cols-3 gap-2">
          {menuitems?.length > 0 &&
            menuitems.map((item) => (
              <Link
              key={item._id}
                href={"/menu-items/edit/" + item._id}
                className="bg-gray-200 rounded-lg p-4"
              >
                <div className="relative">
                  {" "}
                  <Image
                  className="rounded-md"
                    src={item.image}
                    alt=""
                    width="200"
                    height="200"
                  />{" "}
                </div>
                <div className="text-center">{item.name}</div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}

export default MenuItemsPage;
