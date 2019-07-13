import state from "./state.js";
import drawer from "./drawer.js";

window.draw = () => drawer.draw();

const moves = [state.moveLegalAB, state.moveLegalAC, state.moveLegalBC];
function move(count) {
    if(state.getTowerC().length == state.DISk_COUNT) {
        return;
    }

    const limitedCount = count > 2 ? 0 : count;
    moves[limitedCount]()
    drawer.draw();
    setTimeout(() => move(limitedCount+1), 300);
}

move(0);