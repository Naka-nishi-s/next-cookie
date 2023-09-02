'use client'

import { User } from "@/types/User";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function User() {

  // ユーザー情報
  const [user, setUser] = useState<User>();

  // ルーター
  const router = useRouter();

  /**
   * ユーザー情報を取りに行く関数
   */
  const getUserData = async () => {
    // user情報を取りに行く
    const response = await fetch("/api/user")
    const { userData } = await response.json();

    if (!response.ok) {
      alert(userData.errMsg);
      router.push("/login")
    }

    setUser({ name: userData.name, email: userData.email })
  }

  console.log("user", user);

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
        </>
      )}
    </div>
  )
}
