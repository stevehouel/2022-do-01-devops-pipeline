import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { ContainerImage } from "aws-cdk-lib/aws-ecs";
import { ApplicationLoadBalancedFargateService } from "aws-cdk-lib/aws-ecs-patterns";
import { Construct } from "constructs";

export class WebserverStack extends Stack {

    public loadbalancedService: ApplicationLoadBalancedFargateService;

    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props);

        this.loadbalancedService = new ApplicationLoadBalancedFargateService(this, 'Service', {
            memoryLimitMiB: 1024,
            cpu: 512,
            taskImageOptions: {
                image: ContainerImage.fromRegistry('amazon/amazon-ecs-sample'),
            },
            desiredCount: 2
        });

        const scalableTarget = this.loadbalancedService.service.autoScaleTaskCount({
            minCapacity: 1,
            maxCapacity: 20,
        });
        
        scalableTarget.scaleOnCpuUtilization('CpuScaling', {
            targetUtilizationPercent: 50,
        });
        
        scalableTarget.scaleOnMemoryUtilization('MemoryScaling', {
            targetUtilizationPercent: 50,
        });
    }
}