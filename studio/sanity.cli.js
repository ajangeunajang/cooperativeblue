import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "50biemiy",
    dataset: "production",
  },
  // 배포 주소: https://cooperativeblue.sanity.studio
  studioHost: "cooperativeblue",
  deployment: { appId: "pqqbxsoxxghbq9rypahkgnuk", autoUpdates: true },
});
