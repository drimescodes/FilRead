// hooks/useProfile.ts
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";

export interface Profile {
  username: string;
  profile_picture: string | null;
}

export function useProfile(address?: string) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [totalReads, setTotalReads] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch profile + analytics in parallel
  useEffect(() => {
    if (!address) return;

    setLoading(true);
    Promise.all([
      supabase
        .from<Profile>("users")
        .select("username, profile_picture")
        .eq("wallet_address", address.toLowerCase())
        .single(),
      supabase
        .from("blog_reads")
        .select("id", { count: "exact", head: true })
        .eq("wallet_address", address.toLowerCase()),
    ])
      .then(([{ data: prof, error: profErr }, { count, error: readErr }]) => {
        if (profErr) throw profErr;
        if (readErr) throw readErr;

        setProfile({
          username: prof?.username ?? "",
          profile_picture: prof?.profile_picture ?? null,
        });
        setTotalReads(count ?? 0);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [address]);

  const updateProfile = useCallback(
    async (username: string, file?: File) => {
      if (!address) throw new Error("No wallet connected");

      let pictureUrl = profile?.profile_picture ?? null;

      // 1️⃣ Upload picture (if provided)
      if (file) {
        const path = `public/${address.toLowerCase()}.jpg`;
        const { error: upErr } = await supabase.storage
          .from("profile-pictures")
          .upload(path, file, {
            upsert: true,
            contentType: file.type,
          });
        if (upErr) throw upErr;

        const {
          data: { publicUrl },
          error: urlErr,
        } = supabase.storage.from("profile-pictures").getPublicUrl(path);
        if (urlErr) throw urlErr;
        pictureUrl = publicUrl;
      }

      // 2️⃣ Upsert user row, using wallet_address as the conflict target
      const { error: dbErr } = await supabase
        .from("users")
        .upsert(
          {
            wallet_address: address.toLowerCase(),
            username,
            profile_picture: pictureUrl,
          },
          { onConflict: ["wallet_address"] }
        );
      if (dbErr) throw dbErr;

      setProfile({ username, profile_picture: pictureUrl });
    },
    [address, profile]
  );

  const trackBlogRead = useCallback(
    async (slug: string) => {
      if (!address) throw new Error("No wallet connected");
      await supabase.from("blog_reads").insert({
        wallet_address: address.toLowerCase(),
        blog_slug: slug,
      });
      setTotalReads((n) => n + 1);
    },
    [address]
  );

  return { profile, totalReads, loading, error, updateProfile, trackBlogRead };
}
