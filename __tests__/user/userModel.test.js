import { describe, it, expect } from "vitest";
import User from "../../modules/user/userModel";

describe("User Model", () => {

  it("deve criar um usuário válido com os dados informados", () => {
    const user = User.build({
      username: "ana",
      email: "ana@email.com",
      password: "123456",
    });
    expect(user.username).toBe("ana");
    expect(user.email).toBe("ana@email.com");
  });

  it("deve impedir a criação se o nome estiver vazio (allowNull: false)", () => {
    expect(User.rawAttributes.username.allowNull).toBe(false);
  });

  it("deve impedir a criação se o email for inválido (isEmail: true)", () => {
    expect(User.rawAttributes.email.validate.isEmail).toBe(true);
  });

  it("deve garantir que um novo usuário não seja criado como administrador por padrão", () => {
    expect(User.rawAttributes.isAdmin.defaultValue).toBe(false);
  });

});