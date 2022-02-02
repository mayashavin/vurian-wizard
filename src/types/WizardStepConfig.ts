import { Component } from "vue";
import { EventObject, StateNodeConfig, TransitionConfig } from "xstate/lib/types";

export interface WizardContext {
  currentView?: Component;
  completedSteps: string[];
}

export interface WizardEvent extends EventObject {

}

export interface WizardStepConfig extends StateNodeConfig<WizardContext, any, WizardEvent>{  
  stepView: Component;
  title: string;
  order: number;
  on: {
    NEXT?: TransitionConfig<WizardContext, any>;
    PREV?: TransitionConfig<WizardContext, any>;
    [key: string]: TransitionConfig<WizardContext, any> | undefined;
  }
}
