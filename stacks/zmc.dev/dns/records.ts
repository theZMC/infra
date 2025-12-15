import * as cloudflare from "@pulumi/cloudflare";
import * as pulumi from "@pulumi/pulumi";
import { Records as ATProtoRecords } from "./atproto/records";
import { Records as EmailRecords } from "./email/records";
import { Records as WebRecords } from "./web/records";
import assert from "node:assert";

export class Records extends pulumi.ComponentResource {
  public readonly atProtoRecords: ATProtoRecords;
  public readonly emailRecords: EmailRecords;
  public readonly webRecords: WebRecords;

  constructor(name: string, opts?: pulumi.ResourceOptions) {
    super("zmc.dev:dns:Records", name, {}, opts);

    const zmcDotDev = cloudflare.getZone({
      filter: {
        name,
      },
    }).then((zone) => {
      assert(zone.zoneId, `Zone ${name} not found`);
      return zone.zoneId;
    });

    this.atProtoRecords = new ATProtoRecords(name, { zoneId: zmcDotDev }, {
      parent: this,
    });

    this.emailRecords = new EmailRecords(name, { zoneId: zmcDotDev }, {
      parent: this,
    });

    this.webRecords = new WebRecords(name, { zoneId: zmcDotDev }, {
      parent: this,
    });
  }
}
