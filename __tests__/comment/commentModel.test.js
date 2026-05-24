import { describe, it, expect } from "vitest";
import Comment from "../../modules/comment/commentModel";

describe("Comment Model", () => {

  it("deve criar um comentário válido com os dados obrigatórios", () => {
    const comment = Comment.build({
      content: "Ótimo vídeo, me ajudou muito!",
      userId: 5,
      videoId: 12
    });

    expect(comment.content).toBe("Ótimo vídeo, me ajudou muito!");
    expect(comment.userId).toBe(5);
    expect(comment.videoId).toBe(12);
  });

  it("deve impedir a criação se o conteúdo do comentário estiver vazio (allowNull: false)", () => {
    expect(Comment.rawAttributes.content.allowNull).toBe(false);
  });

  it("deve exigir que o comentário esteja vinculado a um usuário (userId allowNull: false)", () => {
    expect(Comment.rawAttributes.userId.allowNull).toBe(false);
  });

  it("deve exigir que o comentário esteja vinculado a um vídeo (videoId allowNull: false)", () => {
    expect(Comment.rawAttributes.videoId.allowNull).toBe(false);
  });

});