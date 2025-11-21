"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, clearAuth } from "../utils/auth";

const navigation = [
  { name: "Dashboard", href: "/" },
  { name: "Medicines", href: "/medicines" },
  { name: "Orders", href: "/orders" },
  { name: "User login", href: "/user_login" },
  { name: "Admin login", href: "/admin_login" },
];

export default function Navbar() {
  const [authUser, setAuthUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const syncAuth = () => {
      const user = getAuth();
      setAuthUser(user);
    };


    syncAuth();

 
    window.addEventListener("auth-changed", syncAuth);

    return () => {
      window.removeEventListener("auth-changed", syncAuth);
    };
  }, []);

  const handleLogout = () => {
    clearAuth();

    window.dispatchEvent(new Event("auth-changed"));
    router.push("/user_login");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="pill-icon" />
        <span className="logo-text">Pharmacy Hope</span>
      </div>

      <div style={{ padding: "10px 20px", color: "white", fontWeight: "bold" }}>
        {authUser ? (
          <>
            Logged in: {authUser.username}
            <br />
            <span style={{ fontSize: "12px", opacity: 0.8 }}>
              Role: {authUser.role}
            </span>
          </>
        ) : (
          "Not logged in"
        )}
      </div>

      <ul className="sidebar-menu">
        {navigation.map((item) => {
          if (authUser?.role === "ADMIN" && item.name === "User login") return null;
          if (authUser?.role === "USER" && item.name === "Admin login") return null;

          if (authUser?.role === "ADMIN" && item.name === "Admin login") {
            return (
              <li key="admin-logout">
                <button
                  onClick={handleLogout}
                  className="sidebar-link"
                  style={{
                    width: "100%",
                    textAlign: "left",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                >
                  <span className="pill-icon" />
                  Logout
                </button>
              </li>
            );
          }

          if (authUser?.role === "USER" && item.name === "User login") {
            return (
              <li key="user-logout">
                <button
                  onClick={handleLogout}
                  className="sidebar-link"
                  style={{
                    width: "100%",
                    textAlign: "left",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                >
                  <span className="pill-icon" />
                  Logout
                </button>
              </li>
            );
          }

          return (
            <li key={item.name}>
              <Link href={item.href} className="sidebar-link">
                <span className="pill-icon" />
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
