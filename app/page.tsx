"use client"
import { ExploreView } from "@/components/Explore/ExploreView";
import React from "react";
import { useAppContext } from "./layout";

function page() {
  const { onError, userContext } = useAppContext();
  return <ExploreView onError={onError} userContext={userContext} />;
}

export default page;
