import * as cloudflare from "@pulumi/cloudflare";
import * as pulumi from "@pulumi/pulumi";
import protonMailRecords from "./protonmail";
import simpleLoginRecords from "./simplelogin";

const emailRecords = (zoneId: pulumi.Input<string>) => {
  const dmarc = new cloudflare.DnsRecord("dmarc", {
    name: "_dmarc",
    type: "TXT",
    ttl: 300,
    content: `"v=DMARC1; p=none"`,
    zoneId,
  });

  const protonMail = protonMailRecords(zoneId);
  const simpleLogin = simpleLoginRecords(zoneId);

  return {
    dmarc,
    ...protonMail,
    ...simpleLogin,
  };
};

export default emailRecords;
