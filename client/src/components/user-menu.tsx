import React from "react";
import { useSupabaseSession } from "../hooks/useSupabaseSession";
import { supabase } from "../lib/supabaseClient";

export default function UserMenu() {
  const { session, loading } = useSupabaseSession();

  if (loading) return null;
  if (!session) return null;

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div style={{ position: "absolute", top: 10, right: 10 }}>
      <span>Signed in as {session.user.email}</span>
      <button onClick={handleSignOut} style={{ marginLeft: 8 }}>Sign Out</button>
    </div>
  );
}
