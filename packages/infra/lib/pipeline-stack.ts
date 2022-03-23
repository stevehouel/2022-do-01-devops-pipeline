import { Stack, StackProps } from 'aws-cdk-lib';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { InfraStage, InfraStageProps } from './infra-stage';

export interface StageEnvironment extends InfraStageProps {
  readonly name: string;
}

interface PipelineStackProps extends StackProps {
  readonly selfMutating: boolean;
  readonly repositoryName: string;
  readonly branchName: string;
  readonly connectionArn: string;
  stages: StageEnvironment[];
}

export class PipelineStack extends Stack {
  constructor(scope: Construct, id: string, props: PipelineStackProps) {
    super(scope, id, props);

    const source = CodePipelineSource.connection(props.repositoryName, props?.branchName, {
      connectionArn: props?.connectionArn,
    });

    const pipeline = new CodePipeline(this, 'pipeline', {
      selfMutation: props.selfMutating,
      synth: new ShellStep('Synth', {
        input: source,
        commands: [
          'make install',
          'make build',
          'make synth'
        ],
        primaryOutputDirectory: 'packages/infra/cdk.out'
      }),
    });

    for(const stage of props.stages) {
      const infraStage = new InfraStage(this, stage.name, stage);
      pipeline.addStage(infraStage);
    }
  }
}
