import { describe, it, expect } from "vitest";
import Like from "../../modules/like/likeModel";

describe("Like Model", () => {

  it("deve criar uma curtida válida com os dados obrigatórios", () => {
    const like = Like.build({
      userId: 1,
      videoId: 10
    });

    expect(like.userId).toBe(1);
    expect(like.videoId).toBe(10);
  });

  it("deve exigir que a curtida esteja vinculada a um usuário (userId allowNull: false)", () => {
    expect(Like.rawAttributes.userId.allowNull).toBe(false);
  });

  it("deve exigir que a curtida esteja vinculada a um vídeo (videoId allowNull: false)", () => {
    expect(Like.rawAttributes.videoId.allowNull).toBe(false);
  });

  it("deve garantir que um usuário só pode curtir um vídeo uma vez (índice único)", () => {
    const indexes = Like.options.indexes;
    
    const uniqueIndex = indexes.find(index => index.name === 'idx_unique_like');
    
    expect(uniqueIndex).toBeDefined();
    expect(uniqueIndex.unique).toBe(true);
    expect(uniqueIndex.fields).toEqual(['user_id', 'video_id']);
  });

});