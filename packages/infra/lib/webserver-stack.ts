import { Stack, StackProps } from "aws-cdk-lib";
import { ContainerImage } from "aws-cdk-lib/aws-ecs";
import { ApplicationLoadBalancedFargateService } from "aws-cdk-lib/aws-ecs-patterns";
import { Construct } from "constructs";

export class WebserverStack extends Stack {

    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props);

        new ApplicationLoadBalancedFargateService(this, 'Service', {
            memoryLimitMiB: 1024,
            cpu: 512,
            taskImageOptions: {
                image: ContainerImage.fromRegistry('nginx:latest'),
            },
            desiredCount: 1
        });
    }
}