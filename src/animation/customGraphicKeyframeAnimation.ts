import { Element } from "zrender";
import { makeInner } from "../util/model";
import { Dictionary } from "../util/types";


type StateToRestore = Dictionary<any>;
const getStateToRestore = makeInner<StateToRestore, Element>();

export function stopPreviousKeyframeAnimationAndRestore(el: Element) {
    // Stop previous keyframe animation.
    el.stopAnimation('keyframe');
    // Restore
    el.attr(getStateToRestore(el));
}