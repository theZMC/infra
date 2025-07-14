import * as cloudflare from "@pulumi/cloudflare";
import webRecords from "./web";
import emailRecords from "./email";
import assert from "node:assert";

const dnsRecords = () => {
  const name = "binari.ly";

  const binariDotLy = cloudflare.getZone({
    filter: {
      name,
    },
  }).then((zone) => {
    assert(zone.zoneId, `Zone ${name} not found`);
    return zone.zoneId;
  });

  const web = webRecords(binariDotLy);
  const email = emailRecords(binariDotLy);

  return {
    ...web,
    ...email,
  };
};

export default dnsRecords;
