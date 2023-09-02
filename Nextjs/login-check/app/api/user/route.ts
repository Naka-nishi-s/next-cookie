import mysql from 'mysql2/promise';
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Cookie取得
  const sessionCookie = request.cookies.get("session-id")

  if (!sessionCookie) {
    return new NextResponse(JSON.stringify({ errMsg: "一定時間が経過したので、再ログインが必要です。" }), { status: 400 })
  }

  // sessionのcookieからidを取り出す
  const sessionId = sessionCookie.value;

  // SessionIdを使用してユーザーデータを取り出す
  // DB接続
  const connection = await mysql.createConnection({
    host: "db",
    user: "root",
    password: "root",
    database: "sampleDB",
  })

  // 検索用SQL
  const selectSqlToSessions = `SELECT * FROM sessions WHERE id = ?`;
  const selectSqlToUsers = `SELECT * FROM users WHERE id = ?`;

  try {
    // sessionテーブルからSELECTし、結果をアンパックする
    const [sessionRows]: any = await connection.execute(selectSqlToSessions, [sessionId]);

    // sessionsテーブルのuser_idを使用してusersテーブルから名前とかをSELECTし、結果をアンパックする
    const [userRows]: any = await connection.execute(selectSqlToUsers, [sessionRows[0].user_id])

    // 返却するユーザーデータをまとめる
    const userData = {
      name: userRows[0].name,
      email: userRows[0].email
    }

    return new NextResponse(JSON.stringify({ userData }), { status: 200 });

  } catch (err) {
    return new NextResponse(JSON.stringify({ errMsg: "DB接続が失敗しました。" }), { status: 500 })
  }
  finally {
    await connection.end();
  }
}
