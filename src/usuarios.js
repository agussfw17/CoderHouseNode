import fs from "fs";

class UserManager {
  static #path = "./Usuarios.json";

  static async CrearUsuarios(nombre, apellido, edad, curso) {
    if (!fs.existsSync(this.#path)) {
      const dataVacia = { payload: [] };
      await fs.promises.writeFile(this.#path, JSON.stringify(dataVacia));
    }

    const res = await fs.promises.readFile(this.#path, "utf-8");
    const data = JSON.parse(res);

    const usuario = { nombre, apellido, edad, curso };
    data.payload.push(usuario);

    await fs.promises.writeFile(this.#path, JSON.stringify(data));
  }

  static async ConsultarUsuarios() {
    const res = await fs.promises.readFile(this.#path, "utf-8");
    return JSON.parse(res).payload;
  }
}

UserManager.CrearUsuarios("Agustin", "Ferreira", 27, "BACKEND II");
console.log(await UserManager.ConsultarUsuarios());
