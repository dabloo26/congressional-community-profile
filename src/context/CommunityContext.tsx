import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  communities,
  defaultCommunityId,
  getCommunityById,
  randomCommunityId,
} from "../data/communities";
import type { CommunityProfile } from "../types/community";

export type TextSize = "normal" | "large";

type CommunityContextValue = {
  profile: CommunityProfile;
  communityId: string;
  setCommunityId: (id: string) => void;
  surpriseMe: () => void;
  allCommunities: CommunityProfile[];
  transitioning: boolean;
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
  textClass: string;
};

const CommunityContext = createContext<CommunityContextValue | null>(null);

export function CommunityProvider({ children }: { children: ReactNode }) {
  const [communityId, setCommunityIdState] = useState(defaultCommunityId);
  const [transitioning, setTransitioning] = useState(false);
  const [textSize, setTextSize] = useState<TextSize>("normal");

  const setCommunityId = useCallback(
    (id: string) => {
      if (id === communityId) return;
      setTransitioning(true);
      window.setTimeout(() => {
        setCommunityIdState(id);
        setTransitioning(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 180);
    },
    [communityId]
  );

  const surpriseMe = useCallback(() => {
    setCommunityId(randomCommunityId(communityId));
  }, [communityId, setCommunityId]);

  const textClass = textSize === "large" ? "text-lg leading-relaxed" : "";

  const value = useMemo(
    () => ({
      profile: getCommunityById(communityId),
      communityId,
      setCommunityId,
      surpriseMe,
      allCommunities: communities,
      transitioning,
      textSize,
      setTextSize,
      textClass,
    }),
    [communityId, setCommunityId, surpriseMe, transitioning, textSize]
  );

  return (
    <CommunityContext.Provider value={value}>{children}</CommunityContext.Provider>
  );
}

export function useCommunity() {
  const ctx = useContext(CommunityContext);
  if (!ctx) throw new Error("useCommunity must be used within CommunityProvider");
  return ctx;
}
