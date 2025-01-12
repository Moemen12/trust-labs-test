"use server";

import { auth, signIn } from "@/auth";
import { AuthSession } from "@/types";
import { google } from "googleapis";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function handleGoogleSignIn(): Promise<never> {
  return signIn("google", {
    redirectTo: "/guide?showgcpselector=true",
    redirect: true,
  });
}

async function clearCookiesOnAuthError() {
  const cookieStore = await cookies();
  cookieStore.getAll().forEach((cookie) => {
    cookieStore.delete(cookie.name);
  });
}

export async function getGcpProjects() {
  try {
    const session: AuthSession = await auth();

    const oauth2Client = new google.auth.OAuth2(
      process.env.AUTH_GOOGLE_ID,
      process.env.AUTH_GOOGLE_SECRET,
      process.env.NEXTAUTH_URL
    );

    oauth2Client.setCredentials({
      access_token: session?.accessToken,
      scope: "https://www.googleapis.com/auth/cloud-platform",
    });

    const cloudResourceManager = google.cloudresourcemanager({
      version: "v1",
      auth: oauth2Client,
    });

    const response = await cloudResourceManager.projects.list({});

    return response.data.projects || [];

    /* eslint-disable @typescript-eslint/no-explicit-any */
  } catch (error: any) {
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
}

export async function getStorageBuckets(projectId: string) {
  try {
    const session: AuthSession = await auth();

    const oauth2Client = new google.auth.OAuth2(
      process.env.AUTH_GOOGLE_ID,
      process.env.AUTH_GOOGLE_SECRET,
      process.env.NEXTAUTH_URL
    );

    oauth2Client.setCredentials({
      access_token: session?.accessToken,
      scope: "https://www.googleapis.com/auth/cloud-platform",
    });

    const storage = google.storage({
      version: "v1",
      auth: oauth2Client,
    });

    const response = await storage.buckets.list({
      project: projectId,
    });

    return response.data.items || [];
  } catch (error: any) {
    if (
      error?.status === 401 ||
      error?.status === 403 ||
      error.name === "Not authenticated"
    ) {
      await clearCookiesOnAuthError();
    }
    throw error;
  }
}
