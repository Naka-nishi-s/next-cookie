'use client'

import { useRouter } from "next/navigation";

export default function Sample() {

  const router = useRouter();

  const niceFetch = () => {
    const response: any = fetch("/api/sample", {
      method: "POST",
      body: JSON.stringify({ nice: "Nice" })
    })

    if (response.ok) {
      console.log("No.....");
    }

    alert("返ってきたよ、いくぜ。")
    router.push("/");
  }

  return (
    <main>
      <p>Sample Page!</p>
      <button onClick={niceFetch}>ボタン</button>
    </main>
  )
}
