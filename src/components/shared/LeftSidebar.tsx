import { sidebarLinks } from "@/constants";
import { useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { INavLink } from "@/types";
import React, { useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Button } from "../ui/button";

const LeftSidebar = () => {
  const { user } = useUserContext();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate()
  useEffect(() => {
    if (isSuccess) {
        navigate('/sign-in')
    }
}, [isSuccess])
  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={170}
            height={36}
          />
        </Link>
        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
          <img
            src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt="avatar"
            className="h-14 w-14 rounded-full"
          />
          <div className="flex flex-col">
            <p className="body-bold">{user.name}</p>
            <p className="text-light-3 small-regular">@{user.username}</p>
          </div>
        </Link>
        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            return (
              <li key={link.label} className="">
                <NavLink
                  to={link.route}
                  className={({ isActive }) =>
                    [
                      "leftsidebar-link flex gap-4 items-center p-4 group",
                      isActive ? "bg-primary-500" : "",
                    ].join(" ")
                  }
                >
                  {({ isActive }) => (
                    <>
                      <img
                        src={link.imgURL}
                        alt={link.label}
                        className={
                          isActive ? "invert-white" : "group-hover:invert-white"
                        }
                      />
                      {link.label}
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Button
        variant="ghost"
        className="shad-button_ghost"
        onClick={() => signOut()}
      >
        <img src="/assets/icons/logout.svg" alt="logout" />
        <p className="small-medium">Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
