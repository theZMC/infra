import * as cloudflare from "@pulumi/cloudflare";
import * as pulumi from "@pulumi/pulumi";

const simpleLoginRecords = (zoneId: pulumi.Input<string>) => {
  const prefix = "simplelogin";

  const mx1 = new cloudflare.DnsRecord(`${prefix}-mx1`, {
    name: "alias",
    type: "MX",
    ttl: 300,
    priority: 10,
    content: "mx1.simplelogin.co.",
    zoneId,
  });

  const mx2 = new cloudflare.DnsRecord(`${prefix}-mx2`, {
    name: "alias",
    type: "MX",
    ttl: 300,
    priority: 20,
    content: "mx2.simplelogin.co.",
    zoneId,
  });

  const verification = new cloudflare.DnsRecord(`${prefix}-verification`, {
    name: "alias",
    type: "TXT",
    ttl: 300,
    content: `"sl-verification=rfgjiepkeabvbthdsboxmqrixrskeo"`,
    zoneId,
  });

  const dkim1 = new cloudflare.DnsRecord(`${prefix}-dkim1`, {
    name: "dkim._domainkey.alias",
    type: "CNAME",
    ttl: 300,
    content: "dkim._domainkey.simplelogin.co.",
    zoneId,
  });

  const dkim2 = new cloudflare.DnsRecord(`${prefix}-dkim2`, {
    name: "dkim02._domainkey.alias",
    type: "CNAME",
    ttl: 300,
    content: "dkim02._domainkey.simplelogin.co.",
    zoneId,
  });

  const dkim3 = new cloudflare.DnsRecord(`${prefix}-dkim3`, {
    name: "dkim03._domainkey.alias",
    type: "CNAME",
    ttl: 300,
    content: "dkim03._domainkey.simplelogin.co.",
    zoneId,
  });

  const spf = new cloudflare.DnsRecord(`${prefix}-spf`, {
    name: "alias",
    type: "TXT",
    ttl: 300,
    content: `"v=spf1 include:simplelogin.co ~all"`,
    zoneId,
  });

  return {
    mx1,
    mx2,
    verification,
    dkim1,
    dkim2,
    dkim3,
    spf,
  };
};

export default simpleLoginRecords;
