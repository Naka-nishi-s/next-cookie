'use client'

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function login() {

  // ルーター作成
  const router = useRouter();

  /**
   * ログイン処理
   */
  const onSubmit = async (data: any) => {
    const response: any = await fetch("/api/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });

    // 返ってきたレスポンスをjsonにパース
    const responseJson = await response.json();

    // IDかパスワードが違った場合
    if (!response.ok) {
      return alert(responseJson.errMsg);
    }

    router.push("/user");
  }

  // フォーム用
  const { register, handleSubmit } = useForm();

  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            ID:
            <input type='text' {...register('id')} />
          </label>
        </div>
        <div>
          <label>
            PW:
            <input type='text' {...register('pw')} />
          </label>
        </div>
        <div>
          <button type="submit">送信</button>
        </div>
      </form>
    </main>
  )
}
