import { describe, it, expect, vi, beforeEach } from "vitest";

const likeController = require("../../modules/like/likeController");
const Like = require("../../modules/like/likeModel");

describe("Like Controller", () => {
  let req;
  let res;

  beforeEach(() => {
    vi.restoreAllMocks();
    
    req = {
      params: { videoId: 15 },
      session: { user: { id: 1 } }
    };

    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };
  });

  it("deve retornar liked: false quando não encontrar curtida no banco", async () => {
    vi.spyOn(Like, "findOne").mockResolvedValue(null);

    await likeController.checkLikeStatus(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ liked: false });
  });

});