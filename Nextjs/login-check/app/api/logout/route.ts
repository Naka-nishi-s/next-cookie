import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Max-Age=0にすることで、クッキーを即時削除
  return new NextResponse(JSON.stringify({ msg: "ログアウト処理が完了しました。" }), {
    status: 200,
    headers: {
      'Set-Cookie': 'session-id=; HttpOnly Max-Age=0;'
    }
  })
}
