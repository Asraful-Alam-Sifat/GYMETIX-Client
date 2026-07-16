"use client";

import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

export default function DashboardToast() {
  const hasFetched = useRef(false);

  useEffect(() => {
    // 1. Prevent React double-render triggers in development
    if (hasFetched.current) return;

    // 2. Prevent triggering if the user has already been welcomed across ANY tab
    const hasBeenWelcomed = localStorage.getItem("gymetix_welcomed");
    if (hasBeenWelcomed) return; 

    hasFetched.current = true;

    const checkLogin = async () => {
      try {
        const res = await fetch("/api/user/first-login", {
          credentials: "include",
          cache: "no-store",
        });

        if (!res.ok) return;
        const data = await res.json();

        if (!data.authenticated) return;

        console.log("CLIENT FIRST LOGIN VALUE:", data.firstLogin);

        // 3. Display the appropriate toast
        if (data.firstLogin) {
          toast.success("Welcome! Your account has been created.");
        } else {
          toast.info("Welcome back!");
        }

        // 4. Mark as welcomed in localStorage (persists across tabs and reloads)
        localStorage.setItem("gymetix_welcomed", "true");

      } catch (err) {
        console.error(err);
      }
    };

    checkLogin();

    return () => {
      toast.dismiss();
    };
  }, []);

  return null;
}