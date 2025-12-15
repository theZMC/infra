import * as cloudflare from "@pulumi/cloudflare";
import * as pulumi from "@pulumi/pulumi";

export interface RecordsArgs {
  zoneId: pulumi.Input<string>;
}

export class Records extends pulumi.ComponentResource {
  public readonly dmarc: cloudflare.DnsRecord;
  public readonly spf: cloudflare.DnsRecord;
  public readonly dkim: cloudflare.DnsRecord;

  constructor(
    name: string,
    args: RecordsArgs,
    opts?: pulumi.ComponentResourceOptions,
  ) {
    super(`${name}:dns:email:Records`, name, {}, opts);

    const { zoneId } = args;

    this.dmarc = new cloudflare.DnsRecord("dmarc", {
      name: "_dmarc",
      type: "TXT",
      ttl: 300,
      content: `"v=DMARC1;p=reject;sp=reject;adkim=s;aspf=s"`,
      zoneId,
    });

    this.spf = new cloudflare.DnsRecord("spf", {
      name: "@",
      type: "TXT",
      ttl: 300,
      content: `"v=spf1 -all"`,
      zoneId,
    });

    this.dkim = new cloudflare.DnsRecord("dkim", {
      name: "*._domainkey",
      type: "TXT",
      ttl: 300,
      content: `"v=DKIM1; p="`,
      zoneId,
    });

    this.registerOutputs({
      dmarc: this.dmarc,
      spf: this.spf,
      dkim: this.dkim,
    });
  }
}
