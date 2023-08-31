'use client'

import { useForm } from "react-hook-form";

export default function login() {

  const { register, handleSubmit } = useForm();
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

    if (!response.ok) {
      return alert(responseJson.msg);
    }

    //TODO: ここでサーバー側からSet-Cookieのヘッダが返り、見た目上はCookieがブラウザに保存されているように見える。
    // ブラウザ保存されたCookieは、リロードやリダイレクトしても残るはず。
    // だが、残っていない。
    // これは、Cookieがちゃんとブラウザに保存されていない、
    // もしくはSet-Cookieのオプション設定をしていないことが原因の可能性がある。
    // リロードやリダイレクトでCookieが残るようになったら、"/"にリクエストを送ってmiddleware発動して終わり。
  }



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
