import * as cloudflare from "@pulumi/cloudflare";
import * as pulumi from "@pulumi/pulumi";

const protonMailRecords = (zoneId: pulumi.Input<string>) => {
  const prefix = "protonmail";

  const mx = new cloudflare.DnsRecord(`${prefix}-mx`, {
    name: "@",
    type: "MX",
    ttl: 300,
    priority: 10,
    content: "mail.protonmail.ch.",
    zoneId,
  });

  const mxSec = new cloudflare.DnsRecord(`${prefix}-mx-sec`, {
    name: "@",
    type: "MX",
    ttl: 300,
    priority: 20,
    content: "mailsec.protonmail.ch.",
    zoneId,
  });

  const verification = new cloudflare.DnsRecord(`${prefix}-verification`, {
    name: "@",
    type: "TXT",
    ttl: 300,
    content:
      `"protonmail-verification=8847b8ab61314140d2b910d9880b8f2e1b6acc9e"`,
    zoneId,
  });

  const dkim1 = new cloudflare.DnsRecord(`${prefix}-dkim1`, {
    name: "protonmail._domainkey",
    type: "CNAME",
    ttl: 300,
    content:
      "protonmail.domainkey.da2yn5w5ksqpkc2do2zieqxjyvkuoe5jq4k5vmocunihf45y5an7a.domains.proton.ch.",
    zoneId,
  });

  const dkim2 = new cloudflare.DnsRecord(`${prefix}-dkim2`, {
    name: "protonmail2._domainkey",
    type: "CNAME",
    ttl: 300,
    content:
      "protonmail2.domainkey.da2yn5w5ksqpkc2do2zieqxjyvkuoe5jq4k5vmocunihf45y5an7a.domains.proton.ch.",
    zoneId,
  });

  const dkim3 = new cloudflare.DnsRecord(`${prefix}-dkim3`, {
    name: "protonmail3._domainkey",
    type: "CNAME",
    ttl: 300,
    content:
      "protonmail3.domainkey.da2yn5w5ksqpkc2do2zieqxjyvkuoe5jq4k5vmocunihf45y5an7a.domains.proton.ch.",
    zoneId,
  });

  const spf = new cloudflare.DnsRecord(`${prefix}-spf`, {
    name: "@",
    type: "TXT",
    ttl: 300,
    content: `"v=spf1 include:_spf.protonmail.ch mx ~all"`,
    zoneId,
  });

  return {
    mx,
    mxSec,
    verification,
    dkim1,
    dkim2,
    dkim3,
    spf,
  };
};

export default protonMailRecords;
