#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { HazemBurner1CdkStack } from '../lib/hazem-burner1-cdk-stack';
import { HazemBurner1CdkPipeline } from '../lib/hazem-burner1-cdk-pipeline';

const app = new cdk.App();
new HazemBurner1CdkPipeline(app, 'HazemBurner1PipelineStack', {
  env: { account: '947475729988', region: 'eu-north-1' },
});