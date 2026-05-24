import { describe, it, expect, vi, beforeEach } from "vitest";

const commentController = require("../../modules/comment/commentController");
const Comment = require("../../modules/comment/commentModel");
const Video = require("../../modules/video/videoModel"); 

describe("Comment Controller", () => {
  let req, res;

  beforeEach(() => {
    vi.restoreAllMocks();
    req = { 
      params: { videoId: 10 }, 
      body: {}, 
      session: { user: { id: 1 } } 
    };
    res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
  });

  it("deve retornar 400 se o conteúdo do comentário estiver vazio", async () => {
    req.body = { content: "   " };

    await commentController.addComment(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "O comentário não pode ser vazio." });
  });

  it("deve retornar a lista de comentários com sucesso", async () => {
    const mockComments = [{ id: 1, content: "Olá!" }];
    vi.spyOn(Comment, "findAll").mockResolvedValue(mockComments);

    await commentController.getComments(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ comments: mockComments });
  });

  it("deve adicionar um comentário e incrementar o contador do vídeo", async () => {
    req.body = { content: "Bom vídeo!" };
    
    vi.spyOn(Comment, "create").mockResolvedValue({ id: 99 });
    vi.spyOn(Video, "increment").mockResolvedValue(true);
    vi.spyOn(Comment, "findByPk").mockResolvedValue({ id: 99, content: "Bom vídeo!" });

    await commentController.addComment(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(Comment.create).toHaveBeenCalled();
  });
});