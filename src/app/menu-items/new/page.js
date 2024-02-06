"use client";
import { useProfile } from "../../Components/UseProfile";
import UserTabs from "../../Components/Layout/UserTabs.js";
import EditableImage from "../../Components/Layout/EditableImage.js";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import Left from "../../Components/Icons/Left";
import {redirect} from "next/navigation";
import MenuItemForm from "../../Components/Layout/MenuItemForm";
function NewMenuItemPage() {
  const { loading, data } = useProfile();
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");
    const [redirectToItems, setRedirectToItems] = useState(false)
  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    const savingPromise = new Promise(async(resolve, reject) =>{
        const response = await  fetch("/api/menu-items", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
          });
          if(response.ok) resolve();
          else reject()
    })

     
   

    await toast.promise(savingPromise, {
      loading: "Saving this tasty item...",
      success: "Saved",
      error: "Error",
    });

     setRedirectToItems(true);
    
  }

  if(redirectToItems){
    return redirect('/menu-items')
  }

  if (loading) {
    return "Loading user info...";
  }

  if (!data.admin) {
    return "not an Admin.";
  }
  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="max-w-2xl mx-auto mt-8">
        <Link href={"/menu-items"} className="button">
          <Left/>
          <span>Show all menu items</span>
          
        </Link>
      </div>
     <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
    </section>
  );
}

export default NewMenuItemPage;
