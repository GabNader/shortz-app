import { describe, it, expect, vi, beforeEach } from "vitest";

const videoController = require("../../modules/video/videoController");
const Video = require("../../modules/video/videoModel");
const User = require("../../modules/user/userModel");

describe("Video Controller (Blindado com Require)", () => {
  let req;
  let res;

  beforeEach(() => {

    vi.restoreAllMocks();

    req = {
      body: {},
      params: {},
      session: { user: { id: 1 } },
      flash: vi.fn(),
      files: null,
      headers: {}
    };

    res = {
      redirect: vi.fn(),
      render: vi.fn(),
      status: vi.fn().mockReturnThis(),
      send: vi.fn()
    };
  });

  it("deve rejeitar o upload e redirecionar se faltar o vídeo ou a thumbnail", async () => {
    req.files = null;
    
    await videoController.uploadVideo(req, res);

    expect(req.flash).toHaveBeenCalledWith("error", "Por favor, envie o vídeo e a capa.");
    expect(res.redirect).toHaveBeenCalledWith("/upload");
  });

  it("deve fazer upload do vídeo, salvar no banco e redirecionar para o feed", async () => {
    req.body = { title: "Meu Vídeo", description: "Teste" };
    req.files = {
      video: [{ filename: "video_arquivo.mp4" }],
      thumbnail: [{ filename: "capa_arquivo.png" }]
    };

    vi.spyOn(Video, "create").mockResolvedValue({});
    vi.spyOn(User, "increment").mockResolvedValue(true);

    await videoController.uploadVideo(req, res);

    expect(Video.create).toHaveBeenCalledWith(expect.objectContaining({
      title: "Meu Vídeo",
      videoPath: "video_arquivo.mp4"
    }));
    expect(User.increment).toHaveBeenCalledWith("videosCount", { where: { id: 1 } });
    expect(res.redirect).toHaveBeenCalledWith("/feed");
  });


  it("deve retornar status 404 se tentar fazer stream de um vídeo que não existe", async () => {
    req.params.id = 99;
    
    vi.spyOn(Video, "findByPk").mockResolvedValue(null);

    await videoController.streamVideo(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith("Vídeo não encontrado.");
  });


  it("deve buscar todos os vídeos formatados na função getAllVideos", async () => {
    const fakeVideos = [{ id: 1, title: "Video 1" }, { id: 2, title: "Video 2" }];
    
    vi.spyOn(Video, "findAll").mockResolvedValue(fakeVideos);

    const result = await videoController.getAllVideos();

    expect(Video.findAll).toHaveBeenCalled();
    expect(result).toEqual(fakeVideos);
  });


  it("deve redirecionar para o feed com erro se o vídeo não for encontrado na página de exibição", async () => {
    req.params.id = 99;
    vi.spyOn(Video, "findByPk").mockResolvedValue(null);

    await videoController.renderVideoPage(req, res);

    expect(req.flash).toHaveBeenCalledWith("error", "Vídeo não encontrado.");
    expect(res.redirect).toHaveBeenCalledWith("/feed");
  });

});