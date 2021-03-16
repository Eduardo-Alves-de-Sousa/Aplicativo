import multer from "multer";
import crypto from "crypto"; //gerar caractere aleatorio
// extname - pegar extensão do arquivo e resolve para o caminho do diretorio
import { extname, resolve } from "path";

export default {
  /* Storage: como o multer vai guardar os arquivos de imagem.
        vamos usar o disco da aplicação
    */
  storage: multer.diskStorage({
    destination: resolve(__dirname, "..", "..", "tmp", "uploads"),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);
        return cb(null, res.toString("hex") + extname(file.originalname));
      });
    },
  }),
};