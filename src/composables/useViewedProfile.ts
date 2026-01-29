import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores';

// Composable hook to manage a "viewed" profile as a local copy.
// - If initialProfile is provided, it will be used as the starting point.
// - Otherwise it reads the profile from the auth store.
// - Exposes viewedProfile, setField, reset, save and loadById (placeholder without backend).

export default function useViewedProfile(initialProfile = null) {
  const storeProfile = useAuthStore((s) => s.profile);
  const setProfileInStore = useAuthStore((s) => s.setProfile);

  const [viewedProfile, setViewedProfile] = useState(() => initialProfile || storeProfile);
  const [isDirty, setIsDirty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // keep in sync when store profile changes and no explicit initialProfile was provided
  useEffect(() => {
    if (!initialProfile) setViewedProfile(storeProfile);
  }, [storeProfile, initialProfile]);

  useEffect(() => {
    setIsDirty(JSON.stringify(viewedProfile) !== JSON.stringify(storeProfile));
  }, [viewedProfile, storeProfile]);

  function setField<K extends keyof any>(key: string, value: any) {
    setViewedProfile((p) => ({ ...(p || {}), [key]: value }));
  }

  function reset() {
    setViewedProfile(storeProfile);
  }

  async function save() {
    // Save to store. If the viewed profile corresponds to current user, update store.
    setIsLoading(true);
    try {
      if (storeProfile && viewedProfile && storeProfile.id === viewedProfile.id) {
        setProfileInStore(viewedProfile);
      } else {
        // For now we don't have a users backend here; in a real app you should
        // call an API (Supabase) to update other users' profiles.
        console.warn('Saving viewedProfile: no backend integration implemented.');
      }
      setIsLoading(false);
      setIsDirty(false);
      return true;
    } catch (err) {
      setIsLoading(false);
      console.error(err);
      return false;
    }
  }

  async function loadById(id: string) {
    setIsLoading(true);
    // Since there is no users backend in the project, we simulate loading.
    // Replace this with a real API call to fetch a user's profile by id.
    await new Promise((r) => setTimeout(r, 200));
    setViewedProfile((p) => ({ id, full_name: 'Utilisateur ' + id, email: '', avatar_url: null }));
    setIsLoading(false);
  }

  return {
    viewedProfile,
    setField,
    reset,
    save,
    isDirty,
    isLoading,
    loadById,
    setViewedProfile,
  };
}
