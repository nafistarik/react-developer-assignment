import Board from "@/features/tic-tac-toe/components/board";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Board />
      </div>
    </main>
  );
}