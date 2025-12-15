import * as cloudflare from "@pulumi/cloudflare";
import * as pulumi from "@pulumi/pulumi";
import { Records as EmailRecords } from "./email/records";
import assert from "node:assert";

export class Records extends pulumi.ComponentResource {
  public readonly emailRecords: EmailRecords;

  constructor(name: string, opts?: pulumi.ComponentResourceOptions) {
    super(`${name}:dns:Records`, name, {}, opts);

    const zoneId = cloudflare.getZone({
      filter: {
        name,
      },
    }).then((zone) => {
      assert(zone.zoneId, `Zone ${name} not found`);
      return zone.zoneId;
    });

    this.emailRecords = new EmailRecords(name, { zoneId }, {
      parent: this,
    });

    this.registerOutputs({
      emailRecords: this.emailRecords,
    });
  }
}
