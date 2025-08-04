import * as cloudflare from "@pulumi/cloudflare";
import * as pulumi from "@pulumi/pulumi";

// From: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain
const ghPagesIps = {
  v4: [
    "185.199.108.153",
    "185.199.109.153",
    "185.199.110.153",
    "185.199.111.153",
  ],
  v6: [
    "2606:50c0:8000::153",
    "2606:50c0:8001::153",
    "2606:50c0:8002::153",
    "2606:50c0:8003::153",
  ],
};

export interface RecordsArgs {
  zoneId: pulumi.Input<string>;
}

export class Records extends pulumi.ComponentResource {
  public readonly www: cloudflare.DnsRecord;
  public readonly wildcard: cloudflare.DnsRecord;
  public readonly aRecords: Record<string, cloudflare.DnsRecord>;
  public readonly aaaaRecords: Record<string, cloudflare.DnsRecord>;

  constructor(
    name: string,
    args: RecordsArgs,
    opts?: pulumi.ComponentResourceOptions,
  ) {
    super("binari.ly:dns:web:Records", name, {}, opts);

    const { zoneId } = args;

    this.www = new cloudflare.DnsRecord("www", {
      name: "www",
      type: "CNAME",
      ttl: 300,
      content: "binari.ly",
      zoneId,
    }, {
      parent: this,
    });

    this.wildcard = new cloudflare.DnsRecord("*", {
      name: "*",
      type: "CNAME",
      ttl: 300,
      content: "binari.ly",
      zoneId,
    }, {
      parent: this,
    });

    this.aRecords = Object.fromEntries(
      ghPagesIps.v4.map((
        ipv4,
        i,
      ) => [
        `ipv4-${i}`,
        new cloudflare.DnsRecord(`ipv4-${i}`, {
          name: "@",
          type: "A",
          ttl: 300,
          content: ipv4,
          zoneId,
        }, {
          parent: this,
        }),
      ]),
    );

    this.aaaaRecords = Object.fromEntries(
      ghPagesIps.v6.map((
        ipv6,
        i,
      ) => [
        `ipv6-${i}`,
        new cloudflare.DnsRecord(`ipv6-${i}`, {
          name: "@",
          type: "AAAA",
          ttl: 300,
          content: ipv6,
          zoneId,
        }, {
          parent: this,
        }),
      ]),
    );

    this.registerOutputs({
      www: this.www,
      wildcard: this.wildcard,
      aRecords: this.aRecords,
      aaaaRecords: this.aaaaRecords,
    });
  }
}
