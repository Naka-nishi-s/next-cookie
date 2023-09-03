import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Cookieの取り出し
  const sessionId = request.cookies.get("session-id");

  // Cookieがない、もしくは空の場合
  if (!sessionId || !sessionId.value) {
    return new NextResponse(JSON.stringify({ auth: false },), { status: 401 })
  }

  // Cookieがあった場合
  // user画面に遷移
  return new NextResponse(JSON.stringify({ auth: true },), { status: 200 })
}


