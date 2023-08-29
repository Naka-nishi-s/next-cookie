'use client'

import { useForm } from "react-hook-form";

export default function login() {
  // ログインフォーム作って、そこからAPIを叩いてログイン。

  const { register, handleSubmit } = useForm();
  const onSubmit = async (data: any) => {
    const response: any = await fetch("/api/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });

    const responseJson = await response.json();
    console.log(responseJson);

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
