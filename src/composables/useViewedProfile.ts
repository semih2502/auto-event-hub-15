import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores';
import { supabase } from '@/integrations/supabase/client';


export default function useViewedProfile(initialProfile = null) {
  const storeProfile = useAuthStore((s) => s.profile);
  const setProfileInStore = useAuthStore((s) => s.setProfile);

  const [viewedProfile, setViewedProfile] = useState(() => initialProfile || storeProfile);
  const [isDirty, setIsDirty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    try {
      if (storeProfile && viewedProfile && storeProfile.id === viewedProfile.id) {
        // updating own profile: update store
        setProfileInStore(viewedProfile);
      } else {
        // updating another user's profile: try Supabase if available
        if (typeof supabase !== 'undefined' && import.meta.env.VITE_SUPABASE_URL) {
          const { data, error } = await (supabase as any).from('profiles').upsert(viewedProfile).select().single();
          if (error) {
            console.error('Supabase save error', error);
            throw error;
          }
          // reflect saved data locally
          setViewedProfile(data as any);
        } else {
          console.warn('Saving viewedProfile: no backend configured, skipping remote save.');
        }
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
    try {
      if (typeof supabase !== 'undefined' && import.meta.env.VITE_SUPABASE_URL) {
  const { data, error } = await (supabase as any).from('profiles').select('*').eq('id', id).single();
        if (error) {
          console.warn('Supabase fetch profile error', error);
          setViewedProfile({ id, full_name: 'Utilisateur ' + id, email: '', avatar_url: null });
        } else {
          setViewedProfile(data as any);
        }
      } else {
        // simulate network latency
        await new Promise((r) => setTimeout(r, 200));
        setViewedProfile({ id, full_name: 'Utilisateur ' + id, email: '', avatar_url: null });
      }
    } catch (err) {
      console.error(err);
      setViewedProfile({ id, full_name: 'Utilisateur ' + id, email: '', avatar_url: null });
    } finally {
      setIsLoading(false);
    }
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
