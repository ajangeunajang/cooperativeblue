import { defineField, defineType } from "sanity";

// 프로젝트 미디어 중 영상 (mp4 + 첫 장면 포스터)
export const video = defineType({
  name: "video",
  title: "Video",
  type: "object",
  fields: [
    defineField({
      name: "file",
      title: "Video (mp4)",
      type: "file",
      options: { accept: "video/mp4" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "poster",
      title: "Poster",
      description: "영상이 뜨기 전에 보여줄 첫 장면 이미지 (Works 썸네일로도 사용)",
      type: "image",
    }),
  ],
  preview: {
    select: { poster: "poster", filename: "file.asset.originalFilename" },
    prepare: ({ poster, filename }) => ({
      title: filename ?? "Video",
      subtitle: "Video",
      media: poster,
    }),
  },
});
