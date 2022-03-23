#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PipelineStack } from '../lib/pipeline-stack';

const REGION = 'eu-west-3';


const app = new cdk.App();

new PipelineStack(app, 'QuickstartContainerPipelineStack', {
  repositoryName: 'stevehouel/2022-do-01-devops-pipeline',
  branchName: 'master',
  connectionArn: 'arn:aws:codestar-connections:eu-west-1:653738050483:connection/b90f8f6b-016c-43b7-bee8-3623264daf58',
  selfMutating: true,
  env: {
    region: REGION
  },
  stages: [
    {
      name: 'testing'
    }
  ]
});