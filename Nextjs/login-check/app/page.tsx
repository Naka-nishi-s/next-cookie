'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {

  // ルーター
  const router = useRouter();

  /**
   * ログインチェック
   */
  const loginCheck = async () => {
    const cookieResponse = await fetch("/api/login-check",
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

    if (!cookieResponse.ok) {
      return router.push("/login");
    }

    return router.push("/user");
  }

  // 初回はログインチェック
  useEffect(() => {
    loginCheck();
  }, []);

}
