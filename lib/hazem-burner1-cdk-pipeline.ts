import * as cdk from "aws-cdk-lib";
import * as pipelines from "aws-cdk-lib/pipelines";
import * as codeconnections from "aws-cdk-lib/aws-codeconnections"
import { Construct } from "constructs";
import { ProviderType } from "aws-cdk-lib/aws-codepipeline";

export class HazemBurner1CdkPipeline extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define an AWS Code connection to Your Provider
    const codeConnection = new codeconnections.CfnConnection(this, "github-connection", {
      connectionName: "TestGithubConnection",
      providerType: "GitHub"
    });

    // const pipeline = new pipelines.CodePipeline(this, 'app-pipeline', {
    //   synth: new pipelines.ShellStep("Synth", {
    //     input: pipelines.CodePipelineSource.connection("hazemmousa10/testProject", "master", {
    //       connectionArn: "arn:aws:codeconnections:eu-north-1:947475729988:connection/45a5d74a-a886-4ae8-a4dc-38aee298b45a"
    //     }),
    //     commands:[]
    //   })
    // });
  }
} 