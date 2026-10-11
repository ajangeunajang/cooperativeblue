import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "default",
  title: "(cooperative) Blue",
  projectId: "50biemiy",
  dataset: "production",
  plugins: [
    structureTool({
      // 프로젝트 목록: 대표 이미지 썸네일을 끌어서 순서 변경
      structure: (S, context) =>
        S.list()
          .title("Content")
          .items([orderableDocumentListDeskItem({ type: "project", title: "Projects", S, context })]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
