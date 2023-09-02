import mysql from 'mysql2/promise';
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  // Iパスを受け取る
  const { id, pw } = await request.json();

  // DB接続
  const connection = await mysql.createConnection({
    host: "db",
    user: "root",
    password: "root",
    database: "sampleDB",
  })

  // 検索用SQL
  const selectSql = `SELECT * FROM users WHERE id = ?`;

  // Insert用SQL
  const insertSql = `INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)`;

  try {
    // SELECTし、結果をアンパックする（metaデータいらないから）
    const [rows]: any = await connection.execute(selectSql, [id]);

    // パスワード照合
    if (rows[0].password !== pw) {
      // パスワード不一致でエラーを返却
      return new NextResponse(JSON.stringify({ "errMsg": "IDかパスワードが違います。" }), {
        status: 401,
      })
    }

    // セッションIDの作成
    const sessionID = uuidv4();

    // セッション期限の設定（1時間後）
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    // INSERTする
    await connection.execute(insertSql, [sessionID, id, expiresAt]);

    return new NextResponse(JSON.stringify({ auth: true }), {
      status: 200,
      headers: {
        'Set-Cookie': `session-id=${sessionID}; HttpOnly;`
      },
    })

  } catch (err) {
    return new NextResponse(JSON.stringify({ "errMsg": "DB接続時にエラーが発生しました。" }), { status: 500 })
  } finally {
    await connection.end();
  }
}
