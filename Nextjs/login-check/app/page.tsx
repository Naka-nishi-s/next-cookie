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
    const cooieResponse = await fetch("/api/login-check");

    if (!cooieResponse.ok) {
      return router.push("/login");
    }

    return router.push("/user");
  }

  // 初回はログインチェック
  useEffect(() => {
    loginCheck();
  }, []);

}
