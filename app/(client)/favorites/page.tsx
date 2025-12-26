import FavoritesList from "@/components/FavoritesList";
import NoAccess from "@/components/NoAccess";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const page = async () => {
  const user = await currentUser();
  return <>{user ? <FavoritesList /> : 
  <div className="">
    <NoAccess />
    </div>}</>;
};

export default page;
