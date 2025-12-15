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
    super("zmc.dev:dns:email:protonmail:Records", name, {}, opts);

    const { zoneId } = args;

    this.mx1 = new cloudflare.DnsRecord(`mx`, {
      name: "@",
      type: "MX",
      ttl: 300,
      priority: 10,
      content: "mail.protonmail.ch.",
      zoneId,
    }, { parent: this });

    this.mx2 = new cloudflare.DnsRecord(`mx-sec`, {
      name: "@",
      type: "MX",
      ttl: 300,
      priority: 20,
      content: "mailsec.protonmail.ch.",
      zoneId,
    }, { parent: this });

    this.verification = new cloudflare.DnsRecord(`verification`, {
      name: "@",
      type: "TXT",
      ttl: 300,
      content:
        `"protonmail-verification=8847b8ab61314140d2b910d9880b8f2e1b6acc9e"`,
      zoneId,
    }, { parent: this });

    this.dkim1 = new cloudflare.DnsRecord(`dkim1`, {
      name: "protonmail._domainkey",
      type: "CNAME",
      ttl: 300,
      content:
        "protonmail.domainkey.da2yn5w5ksqpkc2do2zieqxjyvkuoe5jq4k5vmocunihf45y5an7a.domains.proton.ch.",
      zoneId,
    }, { parent: this });

    this.dkim2 = new cloudflare.DnsRecord(`dkim2`, {
      name: "protonmail2._domainkey",
      type: "CNAME",
      ttl: 300,
      content:
        "protonmail2.domainkey.da2yn5w5ksqpkc2do2zieqxjyvkuoe5jq4k5vmocunihf45y5an7a.domains.proton.ch.",
      zoneId,
    }, { parent: this });

    this.dkim3 = new cloudflare.DnsRecord(`dkim3`, {
      name: "protonmail3._domainkey",
      type: "CNAME",
      ttl: 300,
      content:
        "protonmail3.domainkey.da2yn5w5ksqpkc2do2zieqxjyvkuoe5jq4k5vmocunihf45y5an7a.domains.proton.ch.",
      zoneId,
    }, { parent: this });

    this.spf = new cloudflare.DnsRecord(`spf`, {
      name: "@",
      type: "TXT",
      ttl: 300,
      content: `"v=spf1 include:_spf.protonmail.ch mx ~all"`,
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
