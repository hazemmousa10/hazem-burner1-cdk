import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as codedeploy from 'aws-cdk-lib/aws-codedeploy';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class EC2Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a VPC (or use an existing one)
    const vpc = new ec2.Vpc(this, 'MyVpc', { maxAzs: 2 });

    // Create an EC2 instance role
    const instanceRole = new iam.Role(this, 'EC2InstanceRole', {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore'),
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AmazonEC2RoleforAWSCodeDeploy'),
      ],
    });

    // Create an EC2 instance
    const instance = new ec2.Instance(this, 'MyInstance', {
      vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
      machineImage: ec2.MachineImage.latestAmazonLinux2(),
      role: instanceRole,
    });

    // Create a CodeDeploy Application
    const application = new codedeploy.ServerApplication(this, 'MyCodeDeployApplication', {
      applicationName: 'MyWebApp',
    });

    // Create a CodeDeploy Deployment Group
    new codedeploy.ServerDeploymentGroup(this, 'MyDeploymentGroup', {
      application,
      deploymentGroupName: 'MyWebAppDeploymentGroup',
      deploymentConfig: codedeploy.ServerDeploymentConfig.ALL_AT_ONCE,
      ec2InstanceTags: new codedeploy.InstanceTagSet({
        'Name': ['MyInstance'], // Tag the EC2 instance for CodeDeploy
      }),
      autoRollback: {
        failedDeployment: true,
      },
    });

  }
}