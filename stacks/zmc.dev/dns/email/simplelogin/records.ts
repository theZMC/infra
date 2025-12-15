import * as cloudflare from "@pulumi/cloudflare";
import * as pulumi from "@pulumi/pulumi";

export interface RecordsArgs {
  zoneId: pulumi.Input<string>;
}

export class Records extends pulumi.ComponentResource {
  public readonly mx1: cloudflare.DnsRecord;
  public readonly mx2: cloudflare.DnsRecord;
  public readonly verification: cloudflare.DnsRecord;
  public readonly dkim1: cloudflare.DnsRecord;
  public readonly dkim2: cloudflare.DnsRecord;
  public readonly dkim3: cloudflare.DnsRecord;
  public readonly spf: cloudflare.DnsRecord;

  constructor(
    name: string,
    args: RecordsArgs,
    opts?: pulumi.ComponentResourceOptions,
  ) {
    super("zmc.dev:dns:email:simplelogin:Records", name, {}, opts);

    const { zoneId } = args;

    this.mx1 = new cloudflare.DnsRecord(`mx1`, {
      name: "alias",
      type: "MX",
      ttl: 300,
      priority: 10,
      content: "mx1.simplelogin.co.",
      zoneId,
    }, { parent: this });

    this.mx2 = new cloudflare.DnsRecord(`mx2`, {
      name: "alias",
      type: "MX",
      ttl: 300,
      priority: 20,
      content: "mx2.simplelogin.co.",
      zoneId,
    }, { parent: this });

    this.verification = new cloudflare.DnsRecord(`verification`, {
      name: "alias",
      type: "TXT",
      ttl: 300,
      content: `"sl-verification=rfgjiepkeabvbthdsboxmqrixrskeo"`,
      zoneId,
    }, { parent: this });

    this.dkim1 = new cloudflare.DnsRecord(`dkim1`, {
      name: "dkim._domainkey.alias",
      type: "CNAME",
      ttl: 300,
      content: "dkim._domainkey.simplelogin.co.",
      zoneId,
    }, { parent: this });

    this.dkim2 = new cloudflare.DnsRecord(`dkim2`, {
      name: "dkim02._domainkey.alias",
      type: "CNAME",
      ttl: 300,
      content: "dkim02._domainkey.simplelogin.co.",
      zoneId,
    }, { parent: this });

    this.dkim3 = new cloudflare.DnsRecord(`dkim3`, {
      name: "dkim03._domainkey.alias",
      type: "CNAME",
      ttl: 300,
      content: "dkim03._domainkey.simplelogin.co.",
      zoneId,
    }, { parent: this });

    this.spf = new cloudflare.DnsRecord(`spf`, {
      name: "alias",
      type: "TXT",
      ttl: 300,
      content: `"v=spf1 include:simplelogin.co ~all"`,
      zoneId,
    }, { parent: this });

    this.registerOutputs({
      mx1: this.mx1,
      mx2: this.mx2,
      verification: this.verification,
      dkim1: this.dkim1,
      dkim2: this.dkim2,
      dkim3: this.dkim3,
      spf: this.spf,
    });
  }
}
