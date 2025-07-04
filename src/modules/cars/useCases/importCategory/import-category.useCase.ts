import fs from "node:fs";
import csvParse from "csv-parse";
import { ICategoriesRepository } from "../../repositories/Icategories-repository";

interface IImportCategory {
  name: string;
  description: string;
}

export class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  loadCategories(file: Express.Multer.File) {
    return new Promise<IImportCategory[]>((resolve, reject) => {
      const categories: IImportCategory[] = [];
      const stream = fs.createReadStream(file.path, { encoding: "utf-8" });

      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name, description] = line;
          categories.push({ name, description });
        })
        .on("end", () => {
          fs.promises.unlink(file.path); // deletar o arquivo temporario dps da leitura
          resolve(categories);
        })
        .on("error", (err) => {
          reject(err);
        });

      return categories;
    });
  }

  async execute(file: Express.Multer.File) {
    const categories = await this.loadCategories(file);

    categories.forEach(({ name, description }) => {
      const categoryAlreadyExists = this.categoriesRepository.findByName(name);

      if (!categoryAlreadyExists) {
        this.categoriesRepository.create({ name, description });
      }
    });
  }
}
