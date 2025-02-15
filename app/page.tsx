"use client"
import { ExploreView } from "@/components/Explore/ExploreView";
import { useAppContext } from "@/hooks/useAppContext";
import React from "react";

function Page() {
  const { onError, userContext } = useAppContext();
  return <ExploreView onError={onError} userContext={userContext} />;
}

export default Page;
