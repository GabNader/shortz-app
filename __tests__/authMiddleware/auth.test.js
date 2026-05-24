import { describe, it, expect, vi } from "vitest";
const auth = require("../../middlewares/auth");

describe("Middleware de Autenticação (auth.js)", () => {
  
  it("deve chamar next() se o usuário estiver logado na sessão", () => {
    const req = { session: { user: { id: 1 } } };
    const res = {};
    const next = vi.fn();

    auth(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("deve redirecionar para o login se o usuário NÃO estiver logado", () => {
    const req = { 
      session: {},
      flash: vi.fn() 
    };
    const res = { redirect: vi.fn() };
    const next = vi.fn();

    auth(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith("/login");
  });

});