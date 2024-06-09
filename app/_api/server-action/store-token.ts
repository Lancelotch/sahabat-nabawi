"use server";

import { ILoginResponse } from "@/app/_interface/login.interface";
import { cookies } from "next/headers";

export async function storeToken(request: ILoginResponse) {
  cookies().set({
    name: "accessToken",
    value: request.access_token,
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  cookies().set({
    name: "refreshToken",
    value: request.refresh_token,
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });
}
