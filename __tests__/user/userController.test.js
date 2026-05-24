import { describe, it, expect, vi } from "vitest";

const userController = require("../../modules/user/userController");

describe("User Controller (Logout Simples)", () => {

  it("deve destruir a sessão e redirecionar para a home ao fazer logout", () => {
    const req = { 
      session: { 
        destroy: vi.fn((callback) => callback()) // Simulamos a destruição da sessão
      } 
    };
    const res = { 
      redirect: vi.fn() 
    };

    userController.logout(req, res);

    expect(req.session.destroy).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith("/");
  });

});