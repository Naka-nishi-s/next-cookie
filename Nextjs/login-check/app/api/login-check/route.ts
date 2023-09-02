import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Cookieの取り出し
  const userId = request.cookies.get("session-id");

  // Cookieがなかった場合
  if (!userId) {
    return new NextResponse(JSON.stringify({ auth: false },), { status: 401 })
  }

  // Cookieがあった場合
  // user画面に遷移
  return new NextResponse(JSON.stringify({ auth: true },), { status: 200 })
}


