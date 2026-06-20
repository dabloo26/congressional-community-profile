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

type CommunityContextValue = {
  profile: CommunityProfile;
  communityId: string;
  setCommunityId: (id: string) => void;
  surpriseMe: () => void;
  allCommunities: CommunityProfile[];
  transitioning: boolean;
};

const CommunityContext = createContext<CommunityContextValue | null>(null);

export function CommunityProvider({ children }: { children: ReactNode }) {
  const [communityId, setCommunityIdState] = useState(defaultCommunityId);
  const [transitioning, setTransitioning] = useState(false);

  const setCommunityId = useCallback(
    (id: string) => {
      if (id === communityId) return;
      setTransitioning(true);
      window.setTimeout(() => {
        setCommunityIdState(id);
        setTransitioning(false);
      }, 180);
    },
    [communityId]
  );

  const surpriseMe = useCallback(() => {
    setCommunityId(randomCommunityId(communityId));
  }, [communityId, setCommunityId]);

  const value = useMemo(
    () => ({
      profile: getCommunityById(communityId),
      communityId,
      setCommunityId,
      surpriseMe,
      allCommunities: communities,
      transitioning,
    }),
    [communityId, setCommunityId, surpriseMe, transitioning]
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
