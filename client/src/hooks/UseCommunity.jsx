import { useContext } from "react";
import { CommunityContext } from "../context/commmunityContext";

export const useCommunity = () => {
  const context = useContext(CommunityContext);
  if (!context) throw new Error("useCommunity must be used within CommunityProvider");
  return context;
};
