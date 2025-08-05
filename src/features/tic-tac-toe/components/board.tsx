import React from "react";
import Square from "./square";

export default function Board() {
  return (
    <div className="grid grid-cols-3 gap-3 w-64 h-64">
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
    </div>
  );
}
