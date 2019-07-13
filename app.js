import state from "./state.js";
import drawer from "./drawer.js";

var count = 0;
const moves = ["AB","AC","BC"]

window.draw = () => drawer.draw(0, "AB");
window.move = _ => {
    if(state.getTowerC().length == state.DISk_COUNT) {
        return;
    }

    const move = moves[count % moves.length];
    switch(move) {
        case "AB": state.moveLegalAB(); break;
        case "AC": state.moveLegalAC(); break;
        case "BC": state.moveLegalBC(); break;
    }

    count++;
    const upcomingMove = moves[count % moves.length];
    drawer.draw(count, upcomingMove);
}

draw();