import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // ミドルとしてcookieのチェックを行う。
  // cookieにsession-idがあれば/api/loginにリダイレクト、なかったら/loginにリダイレクト
  // このミドルがいつ発動するか分からない。毎回じゃなくて初回のみ発動にしたい。

  // cookieをheaderから取得
  const cookie = cookies();
  const session_id = cookie.get('session-id');

  // session-idがなかったらリダイレクト
  if (!session_id) {
    redirect('/login');
  }

  // ここでsession_idを別途渡す?それとも/api/loginで取り出す?
  // 別途渡した方がスマートかも?
  redirect('/api/login');

}
