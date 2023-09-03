'use client'

import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

export default function User() {

  // 全体で管理しているユーザー情報
  const { user, setUser } = useContext(UserContext);

  // ルーター
  const router = useRouter();

  /**
   * ユーザー情報を取りに行く関数
   */
  const getUserData = async () => {
    // user情報を取りに行く
    const response = await fetch("/api/user")
    const responseJson = await response.json();

    if (!response.ok) {
      alert(responseJson.errMsg);
      return router.replace("/login")
    }

    // レスポンスからuserDataを取り出す
    const { userData } = responseJson;

    // 名前とemailをセット
    setUser({ name: userData.name, email: userData.email })
  }

  /**
   * ログアウト処理
   */
  const logout = async () => {
    // ログアウト用のAPIを叩く
    const response = await fetch("/api/logout",
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

    const responseJson: any = await response.json();

    if (!response.ok) {
      alert("サーバーの調子が悪いようです。\nもう一度ログインしてください。");
      return router.push("/login");
    }

    alert(responseJson.msg);
    return router.push("/login");
  }

  // ユーザー情報の取得
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      <p>userPageです。</p>
      {user && (
        <>
          <p>ユーザー名:{user.name}</p>
          <p>ユーザーMail:{user.email}</p>
          <button onClick={logout}>ログアウト</button>
        </>
      )}
    </div>
  )
}
