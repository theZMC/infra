import * as cloudflare from "@pulumi/cloudflare";

const atProtoRecords = (zoneId: Promise<string>) => {
  const atProto = new cloudflare.DnsRecord("atproto", {
    name: "_atproto",
    type: "TXT",
    ttl: 300,
    content: `"did=did:plc:zvvriievaywfhpyapwhpehh4"`,
    zoneId,
  });

  return {
    atProto,
  };
};

export default atProtoRecords;
