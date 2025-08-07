import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { calculateWinner } from "../utils/calculate-winner";
import { resetBoard } from "@/redux/features/boardSlice";

export default function ResultPage() {
  const squares = useAppSelector((state) => state.board.squares);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(Boolean);

  let message = "";

  if (winner) {
    message = `Player ${winner} Wins!`;
  } else if (isDraw) {
    message = "It's a Draw!";
  } else {
    message = "Game not finished.";
  }

  function handlePlayAgain() {
    dispatch(resetBoard());
    router.push("/board");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--background)] text-[var(--foreground)]">
      <div className="text-center p-6 bg-[var(--card)] rounded-xl shadow-xl">
        <h1 className="text-3xl font-bold mb-4">{message}</h1>
        <button
          onClick={handlePlayAgain}
          className="mt-4 px-6 py-2 bg-[var(--foreground)] text-[var(--background)] rounded hover:opacity-90 transition"
        >
          Play Again
        </button>
      </div>
    </main>
  );
}
