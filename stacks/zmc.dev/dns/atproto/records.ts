import * as cloudflare from "@pulumi/cloudflare";
import * as pulumi from "@pulumi/pulumi";

export interface RecordsArgs {
  zoneId: pulumi.Input<string>;
}

export class Records extends pulumi.ComponentResource {
  public readonly atProto: cloudflare.DnsRecord;

  constructor(
    name: string,
    args: RecordsArgs,
    {},
    opts?: pulumi.ComponentResourceOptions,
  ) {
    super("zmc.dev:dns:atproto:Records", name, {}, opts);

    const { zoneId } = args;

    this.atProto = new cloudflare.DnsRecord("atproto", {
      name: "_atproto",
      type: "TXT",
      ttl: 300,
      content: `"did=did:plc:zvvriievaywfhpyapwhpehh4"`,
      zoneId,
    }, { parent: this });

    this.registerOutputs({
      atProto: this.atProto,
    });
  }
}
