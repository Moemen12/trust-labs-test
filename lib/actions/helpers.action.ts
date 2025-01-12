"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function clearCookiesOnAuthError() {
  const cookieStore = await cookies();
  cookieStore.getAll().forEach((cookie) => {
    cookieStore.delete(cookie.name);
  });
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function handleError(error: any) {
  if (
    error?.status === 401 ||
    error?.status === 403 ||
    error.name === "Not authenticated"
  ) {
    await clearCookiesOnAuthError();
    redirect("/guide");
  }
  throw error;
}
