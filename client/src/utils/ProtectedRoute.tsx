import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import React from "react";
import type { RootState } from "../store/store";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = useSelector<RootState, RootState["auth"]["user"]>(state => state.auth.user);

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
}
