import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { defineArrayMember, defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    // 프로젝트 목록에서 끌어서 정한 순서 (메인·Works 순서)
    orderRankField({ type: "project" }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description: "주소용 영문 이름",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "kind",
      title: "Type",
      type: "string",
      options: {
        layout: "radio",
        direction: "horizontal",
        list: [
          { title: "Client work", value: "client" },
          { title: "Personal work", value: "personal" },
          { title: "Exhibition", value: "exhibition" },
        ],
      },
      initialValue: "client",
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "string",
      hidden: ({ document }) => document?.kind !== "client",
    }),
    defineField({
      name: "exhibition",
      title: "Exhibition / Venue",
      description: "전시명, 장소 등",
      type: "string",
      hidden: ({ document }) => document?.kind !== "exhibition",
    }),
    defineField({ name: "year", title: "Year", type: "number" }),
    defineField({
      name: "category",
      title: "Category",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "grid",
        list: [
          { title: "Graphic", value: "graphic" },
          { title: "Web", value: "web" },
          { title: "Identity", value: "identity" },
          { title: "Editorial", value: "editorial" },
          { title: "Motion", value: "motion" },
          { title: "Exhibition", value: "exhibition" },
          { title: "Performance", value: "performance" },
        ],
      },
    }),
    defineField({ name: "descriptionKo", title: "Description (KO)", type: "text", rows: 4 }),
    defineField({ name: "descriptionEn", title: "Description (EN)", type: "text", rows: 4 }),
    defineField({
      name: "media",
      title: "Media",
      description: "썸네일을 끌어서 순서 변경. 'Works에 보이기'를 체크한 항목이 Works에 나옴 (없으면 첫 번째)",
      type: "array",
      options: { layout: "grid" },
      of: [
        defineArrayMember({
          type: "image",
          title: "Image",
          fields: [
            defineField({ name: "featured", title: "Works에 보이기", type: "boolean", initialValue: false }),
          ],
        }),
        defineArrayMember({ type: "video" }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: "title",
      kind: "kind",
      client: "client",
      exhibition: "exhibition",
      year: "year",
      first: "media.0",
      firstPoster: "media.0.poster",
    },
    prepare: ({ title, kind, client, exhibition, year, first, firstPoster }) => ({
      title,
      subtitle: [
        { client, personal: "Personal", exhibition: exhibition || "Exhibition" }[kind] ?? client,
        year,
      ]
        .filter(Boolean)
        .join(" · "),
      media: first?._type === "video" ? firstPoster : first,
    }),
  },
});
