import { useEffect } from "react";
import { useChessContext } from "./ChessContext";

export function Pieces() {
  const { startPieces, player, setPlayer, reverseIds, revertIds } =
    useChessContext();

  let width = 8;

  useEffect(() => {
    const pieces = document.querySelectorAll(".piece");
    const opponentPlayer = player === "white" ? "black" : "white";
    const squares = document.querySelectorAll(".square");
    const kings = Array.from(document.querySelectorAll("#king"));
    const infoDisplay = document.getElementById("info-display");

    console.log(kings);

    if (kings.length === 1) {
      console.log(kings[0].classList);
      infoDisplay.innerHTML = `${
        kings[0].classList.contains("black") ? "Black " : "White"
      } Player Wins!`;

      setTimeout(() => {
        location.reload();
      }, 3000);

      squares.forEach((square) =>
        square.firstChild?.setAttribute("draggable", false)
      );
    }

    squares.forEach((square) => {
      if (square.children.length > 1) {
        square.firstChild.remove();
      }
      if (!square.firstChild) {
        const div = document.createElement("div");
        div.classList.add("empty");
        div.setAttribute("draggable", true);

        square.appendChild(div);
      }
    });

    pieces.forEach((piece) => {
      if (!piece.firstChild) {
        piece.classList.remove("piece");
        piece.classList.add("empty");
      }
    });

    if (opponentPlayer === "black") {
      reverseIds();
    } else {
      revertIds();
    }
  });

  let startPostitionId;
  let draggedElement;

  function dragStart(e) {
    startPostitionId = e.target.parentNode.getAttribute("square-id");
    draggedElement = e.target;
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function dragDrop(e) {
    e.stopPropagation();
    const infoDisplay = document.getElementById("info-display");
    const correctPlayer = draggedElement.classList.contains(player);
    const taken = e.target.classList.contains("piece");
    const opponentPlayer = player === "white" ? "black" : "white";
    const takenByOpponent = e.target.classList.contains(opponentPlayer);
    const valid = ckeckIfValid(e.target);

    if (correctPlayer) {
      if (player === "black") {
        setPlayer("white");
      } else {
        setPlayer("black");
      }

      if (!valid) {
        if (player === "white") {
          setPlayer("white");
        } else {
          setPlayer("black");
        }
      }

      if (takenByOpponent && valid) {
        e.target.parentNode.append(draggedElement);
        e.target.remove();
        return;
      }

      if (taken && !takenByOpponent) {
        infoDisplay.innerHTML = "You Can't Go Here";
        setTimeout(() => (infoDisplay.textContent = "Enjoy Playing :)"), 2000);
        if (player === "white") {
          setPlayer("white");
          checkForWiner();
        } else {
          setPlayer("black");
          checkForWiner();
        }
        return;
      }

      if (valid) {
        e.target.append(draggedElement);

        return;
      }
    }
  }

  function ckeckIfValid(target) {
    const targetId =
      Number(target.getAttribute("square-id")) ||
      Number(target.parentNode.getAttribute("square-id"));
    const startId = Number(startPostitionId);
    const piece = draggedElement.id;

    console.log("target id", targetId);
    console.log("start id", startId);
    console.log("piece", piece);

    switch (piece) {
      case "pawn":
        const starterRow = [8, 9, 10, 11, 12, 13, 14, 15];
        if (
          (starterRow.includes(Number(startId)) &&
            Number(startId) + width * 2 === Number(targetId)) ||
          Number(startId) + width === Number(targetId) ||
          (Number(startId) + width - 1 === Number(targetId) &&
            document.querySelector(
              `[square-id="${Number(startId) + width - 1}"]`
            ).firstChild) ||
          (Number(startId) + width + 1 === Number(targetId) &&
            document.querySelector(
              `[square-id="${Number(startId) + width + 1}"]`
            ).firstChild)
        ) {
          return true;
        }
        break;
      case "knight":
        if (
          startId + width * 2 + 1 === targetId ||
          startId + width * 2 - 1 === targetId ||
          startId + 2 + width === targetId ||
          startId - 2 + width === targetId ||
          //..
          startId - width * 2 + 1 === targetId ||
          startId - width * 2 - 1 === targetId ||
          startId + 2 - width === targetId ||
          startId - 2 - width === targetId
        ) {
          console.log("you did it");
          return true;
        }
        break;
      case "bishop":
        if (
          startId + width + 1 === targetId ||
          (startId + width * 2 + 2 === targetId &&
            document
              .querySelector(`[square-id="${startId + width + 1}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId + width * 3 + 3 === targetId &&
            document
              .querySelector(`[square-id="${startId + width + 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 2 + 2}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId + width * 4 + 4 === targetId &&
            document
              .querySelector(`[square-id="${startId + width + 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 2 + 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 3 + 3}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId + width * 5 + 5 === targetId &&
            document
              .querySelector(`[square-id="${startId + width + 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 2 + 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 3 + 3}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 4 + 4}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId + width * 6 + 6 === targetId &&
            document
              .querySelector(`[square-id="${startId + width + 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 2 + 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 3 + 3}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 4 + 4}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 5 + 5}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId + width * 7 + 7 === targetId &&
            document
              .querySelector(`[square-id="${startId + width + 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 2 + 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 3 + 3}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 4 + 4}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 5 + 5}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 6 + 6}"]`)
              .firstChild.classList.contains("empty")) ||
          //..

          startId + width - 1 === targetId ||
          (startId + width * 2 - 2 === targetId &&
            document
              .querySelector(`[square-id="${startId + width - 1}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId + width * 3 - 3 === targetId &&
            document
              .querySelector(`[square-id="${startId + width - 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 2 - 2}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId + width * 4 - 4 === targetId &&
            document
              .querySelector(`[square-id="${startId + width - 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 2 - 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 3 - 3}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId + width * 5 - 5 === targetId &&
            document
              .querySelector(`[square-id="${startId + width - 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 2 - 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 3 - 3}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 4 - 4}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId + width * 6 - 6 === targetId &&
            document
              .querySelector(`[square-id="${startId + width - 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 2 - 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 3 - 3}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 4 - 4}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 5 - 5}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId + width * 7 - 7 === targetId &&
            document
              .querySelector(`[square-id="${startId + width - 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 2 - 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 3 - 3}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 4 - 4}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 5 - 5}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 6 - 6}"]`)
              .firstChild.classList.contains("empty")) ||
          //..

          startId - width - 1 === targetId ||
          (startId - width * 2 - 2 === targetId &&
            document
              .querySelector(`[square-id="${startId - width - 1}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId - width * 3 - 3 &&
            document
              .querySelector(`[square-id="${startId - width - 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 2 - 2}"]`)
              .firstChild.classList.contains("empty") === targetId) ||
          (startId - width * 4 - 4 === targetId &&
            document
              .querySelector(`[square-id="${startId - width - 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 2 - 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 3 - 3}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId - width * 5 - 5 === targetId &&
            document
              .querySelector(`[square-id="${startId - width - 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 2 - 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 3 - 3}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 4 - 4}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId - width * 6 - 6 === targetId &&
            document
              .querySelector(`[square-id="${startId - width - 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 2 - 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 3 - 3}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 4 - 4}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 5 - 5}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId - width * 7 - 7 === targetId &&
            document
              .querySelector(`[square-id="${startId - width - 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 2 - 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 3 - 3}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 4 - 4}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 5 - 5}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 6 - 6}"]`)
              .firstChild.classList.contains("empty")) ||
          //..

          startId - width + 1 === targetId ||
          (startId - width * 2 + 2 === targetId &&
            document
              .querySelector(`[square-id="${startId - width + 1}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId - width * 3 + 3 === targetId &&
            document
              .querySelector(`[square-id="${startId - width + 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 2 + 2}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId - width * 4 + 4 === targetId &&
            document
              .querySelector(`[square-id="${startId - width + 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 2 + 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 3 + 3}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId - width * 5 + 5 === targetId &&
            document
              .querySelector(`[square-id="${startId - width + 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 2 + 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 3 + 3}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 4 + 4}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId - width * 6 + 6 === targetId &&
            document
              .querySelector(`[square-id="${startId - width + 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 2 + 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 3 + 3}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 4 + 4}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 5 + 5}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId - width * 7 + 7 === targetId &&
            document
              .querySelector(`[square-id="${startId - width + 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 2 + 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 3 + 3}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 4 + 4}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 5 + 5}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 6 + 6}"]`)
              .firstChild.classList.contains("empty"))
        ) {
          console.log("you did it");
          return true;
        }
        break;
      case "rook":
        if (
          startId + 1 === targetId ||
          (startId + 2 === targetId &&
            document
              .querySelector(`[square-id="${startId + 1}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId + 3 === targetId &&
            document
              .querySelector(`[square-id="${startId + 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + 2}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId + 4 === targetId &&
            document
              .querySelector(`[square-id="${startId + 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + 3}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId + 5 === targetId &&
            document
              .querySelector(`[square-id="${startId + 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + 3}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + 4}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId + 6 === targetId &&
            document
              .querySelector(`[square-id="${startId + 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + 3}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + 4}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + 5}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId + 7 === targetId &&
            document
              .querySelector(`[square-id="${startId + 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + 3}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + 4}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + 5}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + 6}"]`)
              .firstChild.classList.contains("empty")) ||
          //..

          startId - 1 === targetId ||
          (startId - 2 === targetId &&
            document
              .querySelector(`[square-id="${startId - 1}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId - 3 === targetId &&
            document
              .querySelector(`[square-id="${startId - 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - 2}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId - 4 === targetId &&
            document
              .querySelector(`[square-id="${startId - 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - 3}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId - 5 === targetId &&
            document
              .querySelector(`[square-id="${startId - 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - 3}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - 4}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId - 6 === targetId &&
            document
              .querySelector(`[square-id="${startId - 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - 3}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - 4}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - 5}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId - 7 === targetId &&
            document
              .querySelector(`[square-id="${startId - 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - 3}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - 4}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - 5}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - 6}"]`)
              .firstChild.classList.contains("empty")) ||
          //..

          startId + width === targetId ||
          (startId + width * 2 === targetId &&
            document
              .querySelector(`[square-id="${startId + width}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId + width * 3 === targetId &&
            document
              .querySelector(`[square-id="${startId + width}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 2}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId + width * 4 === targetId &&
            document
              .querySelector(`[square-id="${startId + width}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 3}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId + width * 5 === targetId &&
            document
              .querySelector(`[square-id="${startId + width}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 3}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 4}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId + width * 6 === targetId &&
            document
              .querySelector(`[square-id="${startId + width}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 3}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 4}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 5}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId + width * 7 === targetId &&
            document
              .querySelector(`[square-id="${startId + width}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 3}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 4}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 5}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 6}"]`)
              .firstChild.classList.contains("empty")) ||
          //..

          startId - width === targetId ||
          (startId - width * 2 === targetId &&
            document
              .querySelector(`[square-id="${startId - width}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId - width * 3 === targetId &&
            document
              .querySelector(`[square-id="${startId - width}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 2}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId - width * 4 === targetId &&
            document
              .querySelector(`[square-id="${startId - width}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 3}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId - width * 5 === targetId &&
            document
              .querySelector(`[square-id="${startId - width}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 3}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 4}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId - width * 6 === targetId &&
            document
              .querySelector(`[square-id="${startId - width}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 3}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 4}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 5}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId - width * 7 === targetId &&
            document
              .querySelector(`[square-id="${startId - width}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 3}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 4}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 5}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 6}"]`)
              .firstChild.classList.contains("empty"))
        ) {
          console.log("you did it");
          return true;
        }
        break;
      case "queen":
        if (
          startId + 1 === targetId ||
          (startId + 2 === targetId &&
            document
              .querySelector(`[square-id="${startId + 1}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId + 3 === targetId &&
            document
              .querySelector(`[square-id="${startId + 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + 2}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId + 4 === targetId &&
            document
              .querySelector(`[square-id="${startId + 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + 3}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId + 5 === targetId &&
            document
              .querySelector(`[square-id="${startId + 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + 3}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + 4}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId + 6 === targetId &&
            document
              .querySelector(`[square-id="${startId + 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + 3}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + 4}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + 5}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId + 7 === targetId &&
            document
              .querySelector(`[square-id="${startId + 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + 3}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + 4}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + 5}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + 6}"]`)
              .firstChild.classList.contains("empty")) ||
          //..

          startId - 1 === targetId ||
          (startId - 2 === targetId &&
            document
              .querySelector(`[square-id="${startId - 1}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId - 3 === targetId &&
            document
              .querySelector(`[square-id="${startId - 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - 2}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId - 4 === targetId &&
            document
              .querySelector(`[square-id="${startId - 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - 3}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId - 5 === targetId &&
            document
              .querySelector(`[square-id="${startId - 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - 3}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - 4}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId - 6 === targetId &&
            document
              .querySelector(`[square-id="${startId - 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - 3}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - 4}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - 5}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId - 7 === targetId &&
            document
              .querySelector(`[square-id="${startId - 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - 3}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - 4}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - 5}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - 6}"]`)
              .firstChild.classList.contains("empty")) ||
          //..

          startId + width === targetId ||
          (startId + width * 2 === targetId &&
            document
              .querySelector(`[square-id="${startId + width}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId + width * 3 === targetId &&
            document
              .querySelector(`[square-id="${startId + width}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 2}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId + width * 4 === targetId &&
            document
              .querySelector(`[square-id="${startId + width}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 3}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId + width * 5 === targetId &&
            document
              .querySelector(`[square-id="${startId + width}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 3}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 4}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId + width * 6 === targetId &&
            document
              .querySelector(`[square-id="${startId + width}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 3}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 4}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 5}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId + width * 7 === targetId &&
            document
              .querySelector(`[square-id="${startId + width}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 3}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 4}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 5}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 6}"]`)
              .firstChild.classList.contains("empty")) ||
          //..

          startId - width === targetId ||
          (startId - width * 2 === targetId &&
            document
              .querySelector(`[square-id="${startId - width}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId - width * 3 === targetId &&
            document
              .querySelector(`[square-id="${startId - width}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 2}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId - width * 4 === targetId &&
            document
              .querySelector(`[square-id="${startId - width}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 3}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId - width * 5 === targetId &&
            document
              .querySelector(`[square-id="${startId - width}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 3}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 4}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId - width * 6 === targetId &&
            document
              .querySelector(`[square-id="${startId - width}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 3}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 4}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 5}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId - width * 7 === targetId &&
            document
              .querySelector(`[square-id="${startId - width}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 3}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 4}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 5}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 6}"]`)
              .firstChild.classList.contains("empty")) ||
          startId + width + 1 === targetId ||
          (startId + width * 2 + 2 === targetId &&
            document
              .querySelector(`[square-id="${startId + width + 1}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId + width * 3 + 3 === targetId &&
            document
              .querySelector(`[square-id="${startId + width + 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 2 + 2}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId + width * 4 + 4 === targetId &&
            document
              .querySelector(`[square-id="${startId + width + 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 2 + 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 3 + 3}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId + width * 5 + 5 === targetId &&
            document
              .querySelector(`[square-id="${startId + width + 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 2 + 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 3 + 3}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 4 + 4}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId + width * 6 + 6 === targetId &&
            document
              .querySelector(`[square-id="${startId + width + 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 2 + 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 3 + 3}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 4 + 4}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 5 + 5}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId + width * 7 + 7 === targetId &&
            document
              .querySelector(`[square-id="${startId + width + 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 2 + 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 3 + 3}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 4 + 4}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 5 + 5}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 6 + 6}"]`)
              .firstChild.classList.contains("empty")) ||
          //..

          startId + width - 1 === targetId ||
          (startId + width * 2 - 2 === targetId &&
            document
              .querySelector(`[square-id="${startId + width - 1}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId + width * 3 - 3 === targetId &&
            document
              .querySelector(`[square-id="${startId + width - 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 2 - 2}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId + width * 4 - 4 === targetId &&
            document
              .querySelector(`[square-id="${startId + width - 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 2 - 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 3 - 3}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId + width * 5 - 5 === targetId &&
            document
              .querySelector(`[square-id="${startId + width - 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 2 - 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 3 - 3}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 4 - 4}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId + width * 6 - 6 === targetId &&
            document
              .querySelector(`[square-id="${startId + width - 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 2 - 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 3 - 3}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 4 - 4}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 5 - 5}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId + width * 7 - 7 === targetId &&
            document
              .querySelector(`[square-id="${startId + width - 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 2 - 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 3 - 3}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 4 - 4}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 5 - 5}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId + width * 6 - 6}"]`)
              .firstChild.classList.contains("empty")) ||
          //..

          startId - width - 1 === targetId ||
          (startId - width * 2 - 2 === targetId &&
            document
              .querySelector(`[square-id="${startId - width - 1}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId - width * 3 - 3 &&
            document
              .querySelector(`[square-id="${startId - width - 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 2 - 2}"]`)
              .firstChild.classList.contains("empty") === targetId) ||
          (startId - width * 4 - 4 === targetId &&
            document
              .querySelector(`[square-id="${startId - width - 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 2 - 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 3 - 3}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId - width * 5 - 5 === targetId &&
            document
              .querySelector(`[square-id="${startId - width - 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 2 - 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 3 - 3}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 4 - 4}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId - width * 6 - 6 === targetId &&
            document
              .querySelector(`[square-id="${startId - width - 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 2 - 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 3 - 3}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 4 - 4}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 5 - 5}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId - width * 7 - 7 === targetId &&
            document
              .querySelector(`[square-id="${startId - width - 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 2 - 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 3 - 3}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 4 - 4}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 5 - 5}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 6 - 6}"]`)
              .firstChild.classList.contains("empty")) ||
          //..

          startId - width + 1 === targetId ||
          (startId - width * 2 + 2 === targetId &&
            document
              .querySelector(`[square-id="${startId - width + 1}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId - width * 3 + 3 === targetId &&
            document
              .querySelector(`[square-id="${startId - width + 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 2 + 2}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId - width * 4 + 4 === targetId &&
            document
              .querySelector(`[square-id="${startId - width + 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 2 + 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 3 + 3}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId - width * 5 + 5 === targetId &&
            document
              .querySelector(`[square-id="${startId - width + 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 2 + 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 3 + 3}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 4 + 4}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId - width * 6 + 6 === targetId &&
            document
              .querySelector(`[square-id="${startId - width + 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 2 + 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 3 + 3}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 4 + 4}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 5 + 5}"]`)
              .firstChild.classList.contains("empty")) ||
          (startId - width * 7 + 7 === targetId &&
            document
              .querySelector(`[square-id="${startId - width + 1}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 2 + 2}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 3 + 3}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 4 + 4}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 5 + 5}"]`)
              .firstChild.classList.contains("empty") &&
            document
              .querySelector(`[square-id="${startId - width * 6 + 6}"]`)
              .firstChild.classList.contains("empty"))
        ) {
          console.log("you did it");
          return true;
        }
        break;
      case "king":
        if (
          startId + 1 === targetId ||
          startId - 1 === targetId ||
          startId + width === targetId ||
          startId - width === targetId ||
          startId + width + 1 === targetId ||
          startId + width - 1 === targetId ||
          startId - width + 1 === targetId ||
          startId - width - 1 === targetId
        ) {
          return true;
        }
        break;
    }
  }

  return (
    <>
      {startPieces.map((piece, index) => {
        const row = Math.floor((63 - index) / width) + 1;
        const classNames = ["square"];

        if (row % 2 === 0) {
          classNames.push(index % 2 === 0 ? "odd" : "even");
        } else {
          classNames.push(index % 2 === 0 ? "even" : "odd");
        }

        return (
          <div
            className={classNames.join(" ")}
            square-id={index}
            onDragStart={dragStart}
            onDragOver={dragOver}
            onDrop={dragDrop}
            key={index}
          >
            <div
              className={`piece ${
                index >= 48 ? "white" : index <= 15 ? "black" : ""
              }`}
              draggable="true"
              id={piece.id}
            >
              {piece.icon}
            </div>
          </div>
        );
      })}
    </>
  );
}
