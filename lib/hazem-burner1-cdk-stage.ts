import * as cdk from "aws-cdk-lib"
import { Construct } from "constructs";
import { HazemBurner1CdkStack } from "./hazem-burner1-cdk-stack";
import { EC2Stack } from "./ec2-stack";

export class HazemBurner1CdkStage extends cdk.Stage {
      constructor(scope: Construct, id: string, props?: cdk.StageProps) {
        super(scope, id, props);

        new EC2Stack(this, "EC2Service");
    }
}