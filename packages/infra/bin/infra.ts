#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PipelineStack } from '../lib/pipeline-stack';

const REGION = 'eu-west-3';


const app = new cdk.App();

new PipelineStack(app, 'QuickstartContainerPipelineStack', {
  repositoryName: 'stevehouel/2022-do-01-devops-pipeline',
  branchName: 'master',
  connectionArn: 'arn:aws:codestar-connections:eu-west-3:653738050483:connection/24aa1d43-208d-4708-8c99-ab3925169db1',
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