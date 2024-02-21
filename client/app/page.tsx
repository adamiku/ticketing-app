import buildClient from "./lib/build-client";

export default async function Home() {
  const { data } = await (await buildClient()).get("/api/users/currentuser");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {data.currentUser ? <h1>Signed In</h1> : <h1>Signed out</h1>}
    </main>
  );
}
