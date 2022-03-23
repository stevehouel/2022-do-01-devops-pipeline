import { Stage, StageProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { WebserverStack } from "./webserver-stack";

export interface InfraStageProps extends StageProps {

}

export class InfraStage extends Stage {
    constructor(scope: Construct, id: string, props: InfraStageProps) {
        super(scope, id, props);

        const webserverStack = new WebserverStack(this, 'WebserverStack', {});
    }
}