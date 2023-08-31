import crypto from 'crypto';
import mysql from 'mysql2/promise';
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  // 別途Contextを作成し、そこに突っ込む。
  // CookieにSessionIDを入れる?
  const { id, pw } = await request.json();

  // DB接続情報
  const connection = mysql.createConnection({
    host: "db",
    user: "root",
    password: "root",
    database: "sampleDB",
  })

  // 検索用SQL
  const sql = `SELECT * FROM users WHERE id = ${id}`;

  // セッションIDの作成
  const sessionID = uuidv4();

  try {
    // 結果をアンパックする（metaデータいらないから）
    const [rows]: any = await (await connection).execute(sql);

    // ソルトを取り出して受け取ったpwをハッシュ化
    const salt = rows[0].salt;
    const hash_pw = crypto.pbkdf2Sync(pw, salt, 1000, 64, 'sha256').toString('hex');

    // パスワード照合
    if (rows[0].password !== hash_pw) {
      return new NextResponse(JSON.stringify({ msg: "IDかPWが違うヨ" }), {
        status: 401,
      })
    }

    return new NextResponse(JSON.stringify({ msg: "Nice!" }), {
      status: 200,
      headers: {
        'Set-Cookie': `session-id=${sessionID}`
      },

    })

  } catch (err) {
    console.error(err);
  }
}
