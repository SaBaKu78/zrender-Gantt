import { createHashMap } from "zrender/src/core/util";
import { ComponentMainType, ComponentOption } from "../util/types";
import GlobalModel from "./Global";

interface InternalOptionCreator {
  (piModel: GlobalModel): ComponentOption[]
}
const internalOptionCreatorMap = createHashMap<InternalOptionCreator, string>()


export function concatInternalOptions(
  piModel: GlobalModel,
  mainType: ComponentMainType,
  newCmptOptionList: ComponentOption[]
): ComponentOption[] {
  const internalOptionCreator = internalOptionCreatorMap.get(mainType);
  if (!internalOptionCreator) {
      return newCmptOptionList;
  }
  const internalOptions = internalOptionCreator(piModel);
  if (!internalOptions) {
      return newCmptOptionList;
  }
  return newCmptOptionList.concat(internalOptions);
}