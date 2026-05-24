import { describe, it, expect } from "vitest";
import Video from "../../modules/video/videoModel";

describe("Video Model", () => {

  it("deve criar um vídeo válido com os dados obrigatórios", () => {
    const video = Video.build({
      title: "Meu primeiro vídeo",
      videoPath: "/uploads/vid1.mp4",
      thumbnailPath: "/uploads/thumb1.png",
      userId: 1
    });
    
    expect(video.title).toBe("Meu primeiro vídeo");
    expect(video.videoPath).toBe("/uploads/vid1.mp4");
  });

  it("deve impedir a criação se o título estiver vazio (allowNull: false)", () => {
    expect(Video.rawAttributes.title.allowNull).toBe(false);
  });

  it("deve impedir a criação se os caminhos de mídia (video e thumbnail) estiverem vazios", () => {
    expect(Video.rawAttributes.videoPath.allowNull).toBe(false);
    expect(Video.rawAttributes.thumbnailPath.allowNull).toBe(false);
  });

  it("deve garantir que os contadores (views, likes, comments) iniciem zerados", () => {
    expect(Video.rawAttributes.views.defaultValue).toBe(0);
    expect(Video.rawAttributes.likesCount.defaultValue).toBe(0);
    expect(Video.rawAttributes.commentsCount.defaultValue).toBe(0);
  });

  it("deve exigir que o vídeo esteja vinculado a um usuário (FK userId não nula)", () => {
    expect(Video.rawAttributes.userId.allowNull).toBe(false);
  });

});