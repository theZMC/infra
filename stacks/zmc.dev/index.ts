import * as cloudflare from "@pulumi/cloudflare";
import { Records as DnsRecords } from "./dns/records";

export const dns = new DnsRecords("zmc.dev");

export const accountId =
  cloudflare.getZoneOutput({ filter: { name: "zmc.dev" } }).account.id;

