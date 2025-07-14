import * as aws from "@pulumi/aws";

const ghActions = () => {
  const oidcBaseDomain = "token.actions.githubusercontent.com";
  const oidcProvider = new aws.iam.OpenIdConnectProvider("github-oidc", {
    url: `https://${oidcBaseDomain}`,
    clientIdLists: ["sts.amazonaws.com"],
  });

  const assumeRolePolicyDoc = aws.iam.getPolicyDocumentOutput({
    version: "2012-10-17",

    statements: [
      {
        effect: "Allow",
        principals: [{
          type: "Federated",
          identifiers: [oidcProvider.arn],
        }],
        actions: ["sts:AssumeRoleWithWebIdentity"],
        conditions: [
          {
            test: "StringLike",
            variable: `${oidcBaseDomain}:sub`,
            values: [
              "repo:theZMC/infra:*",
            ],
          },
          {
            test: "StringEquals",
            variable: `${oidcBaseDomain}:aud`,
            values: ["sts.amazonaws.com"],
          },
        ],
      },
    ],
  });

  const role = new aws.iam.Role("github-actions", {
    name: "GitHubActions",
    assumeRolePolicy: assumeRolePolicyDoc.json,
  });

  const allowS3Attachment = new aws.iam.RolePolicyAttachment(
    "github-actions-s3",
    {
      role: role.name,
      policyArn: "arn:aws:iam::aws:policy/AmazonS3FullAccess",
    },
  );

  const allowKmsPolicy = new aws.iam.Policy("github-actions-kms", {
    policy: aws.iam.getPolicyDocument({
      statements: [
        {
          effect: "Allow",
          actions: ["kms:Decrypt", "kms:GenerateDataKey", "kms:Encrypt"],
          resources: ["*"],
        },
      ],
    }).then((doc) => doc.json),
  });

  const allowKmsAttachment = new aws.iam.RolePolicyAttachment(
    "github-actions-kms",
    {
      role: role.name,
      policyArn: allowKmsPolicy.arn,
    },
  );

  return {
    role,
    oidcProvider,
    allowS3Attachment,
    allowKmsAttachment,
  };
};

export default ghActions;
