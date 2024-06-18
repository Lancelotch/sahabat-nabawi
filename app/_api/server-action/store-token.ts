"use server";

import { EAuthentication } from "@/app/_constant/authentication";
import { ILoginResponse } from "@/app/_interface/login.interface";
import { cookies } from "next/headers";

export async function storeToken(request: ILoginResponse) {
  cookies().set({
    name: EAuthentication.COOKIES_ACCESS_TOKEN,
    value: request.access_token,
  });

  cookies().set({
    name: EAuthentication.COOKIES_REFRESH_TOKEN,
    value: request.refresh_token,
  });
}
