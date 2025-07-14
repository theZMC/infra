import * as cloudflare from "@pulumi/cloudflare";
import * as pulumi from "@pulumi/pulumi";

const webRecords = (zoneId: pulumi.Input<string>) => {
  const www = new cloudflare.DnsRecord("www", {
    name: "www",
    type: "CNAME",
    ttl: 300,
    content: "zmc.dev",
    zoneId,
  });

  const wildcard = new cloudflare.DnsRecord("*", {
    name: "*",
    type: "CNAME",
    ttl: 300,
    content: "zmc.dev",
    zoneId,
  });

  const ipAddresses = {
    v4: [
      "162.159.140.98",
      "172.66.0.96",
    ],
    v6: [
      "2606:4700:7::60",
      "2a06:98c1:58::60",
    ],
  };

  const aRecords = Object.fromEntries(
    ipAddresses.v4.map((
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
      }),
    ]),
  );

  const aaaaRecords = Object.fromEntries(
    ipAddresses.v6.map((
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
      }),
    ]),
  );

  return {
    www,
    wildcard,
    ...aRecords,
    ...aaaaRecords,
  };
};

export default webRecords;
