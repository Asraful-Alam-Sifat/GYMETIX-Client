"use client";

import { useEffect } from "react";
import { toast } from "react-toastify";

export default function DashboardToast() {
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch("/api/user/first-login", {
          credentials: "include",
          cache: "no-store",
        });

        if (!res.ok) return;
        const data = await res.json();
      

        if (!data.authenticated) return;

        if (data.firstLogin) {
          toast.success(" Welcome! Your account has been created.");
          data.firstLogin = false;
        } else {
          toast.info(" Welcome back!");
        }
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
