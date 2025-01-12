"use server";

import { auth, signIn } from "@/auth";
import { AuthSession } from "@/types";
import { google } from "googleapis";
import { handleError } from "./helpers.action";

export async function handleGoogleSignIn(): Promise<never> {
  return signIn("google", {
    redirectTo: "/guide?showgcpselector=true",
    redirect: true,
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
    handleError(error);
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
    handleError(error);
  }
}
