import * as cloudflare from "@pulumi/cloudflare";
import emailRecords from "./email";
import atProtoRecords from "./atproto";
import webRecords from "./web";
import assert from "node:assert";

const dnsRecords = () => {
  const name = "zmc.dev";

  const zmcDotDev = cloudflare.getZone({
    filter: {
      name,
    },
  }).then((zone) => {
    assert(zone.zoneId, `Zone ${name} not found`);
    return zone.zoneId;
  });

  const atProto = atProtoRecords(zmcDotDev);
  const email = emailRecords(zmcDotDev);
  const web = webRecords(zmcDotDev);

  return {
    ...atProto,
    ...email,
    ...web,
  };
};

export default dnsRecords;
