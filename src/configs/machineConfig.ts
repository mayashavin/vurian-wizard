import { WizardContext, WizardStepConfig } from "@/types/WizardStepConfig";
import { assign } from "xstate";

export const computeStep = ({ state, stateId, prevState, nextState} : {state: WizardStepConfig, stateId: string, prevState?: WizardStepConfig, nextState?: WizardStepConfig}) => {
  const step = {
    ...state,
    on: {
      ...(state.on || {}),
    }
  }

  step.on.NEXT = nextState ? {
    meta: {
      description: `Go to next step ${nextState.title}`,
    },
    target: nextState.id,
    ...(state.on?.NEXT || {}),
    actions: assign({
        currentView: () => nextState.stepView,
        completedSteps: (context: WizardContext) => [...context.completedSteps, state.id || stateId]
    }),
  } : undefined;

  step.on.PREV = prevState ? {
    meta: {
      description: `Go to previous step ${prevState.title}`,
    },
    target: prevState.id,
    ...(state.on?.PREV || {}),
    actions: assign({
        currentView: () => prevState.stepView,
        completedSteps: (context: WizardContext) => [...context.completedSteps.slice(0, -1)]
    }),
  } : undefined;

  return step;
}