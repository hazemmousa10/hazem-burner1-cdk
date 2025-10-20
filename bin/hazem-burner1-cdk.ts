#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { HazemBurner1CdkStack } from '../lib/hazem-burner1-cdk-stack';
import { HazemBurner1CdkPipeline } from '../lib/hazem-burner1-cdk-pipeline';

const app = new cdk.App();
new HazemBurner1CdkPipeline(app, 'HazemBurner1PipelineStack', {
  env: { account: '947475729988', region: 'eu-north-1' },
});
new HazemBurner1CdkStack(app, 'HazemBurner1CdkStack', {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  env: { account: '947475729988', region: 'eu-north-1' },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});