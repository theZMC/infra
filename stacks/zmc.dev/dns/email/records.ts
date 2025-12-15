import * as pulumi from "@pulumi/pulumi";
import { Records as ProtonMailRecords } from "./protonmail/records";
import { Records as SimpleLoginRecords } from "./simplelogin/records";

export interface RecordsArgs {
  zoneId: pulumi.Input<string>;
}

export class Records extends pulumi.ComponentResource {
  public readonly protonMail: ProtonMailRecords;
  public readonly simpleLogin: SimpleLoginRecords;

  constructor(
    name: string,
    args: RecordsArgs,
    opts?: pulumi.ComponentResourceOptions,
  ) {
    super("zmc.dev:dns:email:Records", name, {}, opts);

    const { zoneId } = args;

    this.protonMail = new ProtonMailRecords("protonmail", { zoneId }, {
      parent: this,
    });
    this.simpleLogin = new SimpleLoginRecords("simplelogin", { zoneId }, {
      parent: this,
    });

    this.registerOutputs({
      protonMail: this.protonMail,
      simpleLogin: this.simpleLogin,
    });
  }
}
