import * as cloudflare from "@pulumi/cloudflare";
import * as pulumi from "@pulumi/pulumi";
import { Records as WebRecords } from "./web/records";
import { Records as EmailRecords } from "./email/records";
import assert from "node:assert";

export class Records extends pulumi.ComponentResource {
  public readonly webRecords: WebRecords;
  public readonly emailRecords: EmailRecords;

  constructor(name: string, opts?: pulumi.ComponentResourceOptions) {
    super("binari.ly:dns:Records", name, {}, opts);

    const binariDotLy = cloudflare.getZone({
      filter: {
        name,
      },
    }).then((zone) => {
      assert(zone.zoneId, `Zone ${name} not found`);
      return zone.zoneId;
    });

    this.webRecords = new WebRecords(name, { zoneId: binariDotLy }, {
      parent: this,
    });

    this.emailRecords = new EmailRecords(name, { zoneId: binariDotLy }, {
      parent: this,
    });

    this.registerOutputs({
      webRecords: this.webRecords,
      emailRecords: this.emailRecords,
    });
  }
}
