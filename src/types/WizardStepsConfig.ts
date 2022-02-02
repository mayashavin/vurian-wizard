import { StatesConfig } from "xstate";
import { WizardContext, WizardEvent, WizardStepConfig } from "./WizardStepConfig";

export interface WizardStepsConfig extends StatesConfig<WizardContext, any, WizardEvent> {
    [key: string]: WizardStepConfig;
}