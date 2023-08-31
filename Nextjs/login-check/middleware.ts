import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // ミドルとしてcookieのチェックを行う。
  // cookieにsession-idがあれば/api/loginにリダイレクト、なかったら/loginにリダイレクト
  // このミドルがいつ発動するか分からない。毎回じゃなくて初回のみ発動にしたい。

  // cookieをheaderから取得
  const cookie = cookies();
  const session_id = cookie.get('session-id')

  console.log("Middleが発動中")
  console.log("cookie", cookie);
  console.log("session_id", session_id);

  // session-idがなかったらリダイレクト
  if (!session_id) {
    console.log("オメーセッションIDないからやり直し");
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
}
