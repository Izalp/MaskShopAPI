const request = require("supertest");
const app = require("../app");
const repository = require("../../src/repositories/customer-repository");
const authService = require("../../src/services/auth-service");
const emailService = require("../../src/services/email-service");

jest.mock("../../src/repositories/customer-repository");
jest.mock("../../src/services/auth-service");
jest.mock("../../src/services/email-service");

describe("Suite de testes do Customer Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Teste 1 - deve criar um cliente com sucesso e enviar e-mail", async () => {
    jest.spyOn(emailService, "send").mockResolvedValue(); // Mockando o serviço de e-mail
    const res = await request(app)
      .post("/customers")
      .send({
        name: "Chris Lima",
        email: "chrislima@email.com",
        password: "senha123",
      });
    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Cliente cadastrado com sucesso!");
    expect(emailService.send).toHaveBeenCalled();
  });


  it("Teste 2 - deve retornar erro se o nome tiver menos de 3 caracteres", async () => {
    const res = await request(app)
      .post("/customers")
      .send({
        name: "Ch",
        email: "chrislima@email.com",
        password: "senha123",
      });
    expect(res.status).toBe(400);
    expect(res.body.errors).toContainEqual({
      message: "O nome deve conter pelo menos 3 caracteres",
    });
  });

  it("Teste 3 - deve retornar erro para formato de e-mail inválido", async () => {
    const res = await request(app)
      .post("/customers")
      .send({
        name: "Chris Lima",
        email: "emailinvalido",
        password: "senha123",
      });
    expect(res.status).toBe(400);
    expect(res.body.errors).toContainEqual({
      message: "E-mail inválido",
    });
  });

  it("Teste 4 - deve retornar erro se a senha for menor que 6 caracteres", async () => {
    const res = await request(app)
      .post("/customers")
      .send({
        name: "Chris Lima",
        email: "chrislima@email.com",
        password: "12345",
      });
    expect(res.status).toBe(400);
    expect(res.body.errors).toContainEqual({
      message: "A senha deve conter pelo menos 6 caracteres",
    });
  });

  it("Teste 5 - deve retornar erro se faltar campos obrigatórios", async () => {
    const res = await request(app)
      .post("/customers")
      .send({
        name: "",
        email: "",
        password: "",
      });

    expect(res.status).toBe(400);
    expect(res.body.errors).toContainEqual({
      message: "Os campos são obrigatórios",
    });
  });

  it("Teste 6 - deve retornar erro se o e-mail já estiver cadastrado", async () => {
    jest.spyOn(repository, "getByEmail").mockResolvedValueOnce({ email: "chrislima@email.com" });

    const res = await request(app)
      .post("/customers")
      .send({
        name: "Chris Lima",
        email: "chrislima@email.com",
        password: "senha123",
      });

    expect(res.status).toBe(400);
    expect(res.body.errors).toContainEqual({
      message: "E-mail já cadastrado",
    });
  });

  it("Teste 7 - deve retornar erro se a criação do cliente falhar", async () => {
    jest.spyOn(repository, "create").mockRejectedValue(new Error("Erro no DB"));
    const res = await request(app)
      .post("/customers")
      .send({
        name: "Chris",
        email: "chrislima@email.com",
        password: "senha123",
      });
    expect(res.status).toBe(500);
    expect(res.body.message).toBe("Falha ao processar sua requisição");
  });

  it("Teste 8 - deve retornar erro para usuário ou senha inválidos", async () => {
    jest.spyOn(repository, "authenticate").mockResolvedValue(null);
    const res = await request(app)
      .post("/customers/authenticate")
      .send({
        email: "inexistente@email.com",
        password: "senhaerrada",
      });
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Usuário ou senha inválidos");
  });

  it("Teste 9 - deve autenticar e retornar um token", async () => {
    const customer = { _id: "1", email: "valido@email.com", name: "Usuário Válido", roles: ["user"] };
    jest.spyOn(repository, "authenticate").mockResolvedValue(customer);
    jest.spyOn(authService, "generateToken").mockResolvedValue("token-valido");

    const res = await request(app)
      .post("/customers/authenticate")
      .send({
        email: "valido@email.com",
        password: "senha123",
      });

    expect(res.status).toBe(201);
    expect(res.body.token).toBe("token-valido");
    expect(res.body.data.email).toBe(customer.email);
  });

  it("Teste 10 - deve tratar erros do servidor durante a geração de token", async () => {
    jest.spyOn(repository, "authenticate").mockResolvedValue({
      _id: "1",
      email: "valido@email.com",
      name: "Usuário Válido",
      roles: ["user"],
    });
    jest.spyOn(authService, "generateToken").mockRejectedValue(new Error("Erro na geração de token"));

    const res = await request(app)
      .post("/customers/authenticate")
      .send({
        email: "valido@email.com",
        password: "senha123",
      });

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("Falha ao processar sua requisição");
  });
});
