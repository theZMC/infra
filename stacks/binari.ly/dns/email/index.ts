import * as cloudflare from "@pulumi/cloudflare";
import * as pulumi from "@pulumi/pulumi";

const emailRecords = (zoneId: pulumi.Input<string>) => {
  // No email is sent from this domain, so these records
  // are here just to prevent spoofing.

  const dmarc = new cloudflare.DnsRecord("dmarc", {
    name: "_dmarc",
    type: "TXT",
    ttl: 300,
    content: `"v=DMARC1;p=reject;sp=reject;adkim=s;aspf=s"`,
    zoneId,
  });

  const spf = new cloudflare.DnsRecord("spf", {
    name: "@",
    type: "TXT",
    ttl: 300,
    content: `"v=spf1 -all"`,
    zoneId,
  });

  const dkim = new cloudflare.DnsRecord("dkim", {
    name: "*._domainkey",
    type: "TXT",
    ttl: 300,
    content: `"v=DKIM1; p="`,
    zoneId,
  });

  return {
    dmarc,
    spf,
    dkim,
  };
};

export default emailRecords;
