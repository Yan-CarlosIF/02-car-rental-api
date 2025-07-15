import { AppError } from "@shared/errors/app-error";
import { CategoritesRepositoryInMemory } from "@modules/cars/repositories/in-memory/categories-in-memory.repository";
import { CreateCategoryUseCase } from "./create-category.useCase";

describe("Create a Category", () => {
  let categoriesRepositoryInMemory: CategoritesRepositoryInMemory;
  let createCategoryUseCase: CreateCategoryUseCase;

  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoritesRepositoryInMemory();

    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("Should be able to create a new category", async () => {
    const category = {
      name: "Category Test",
      description: "Category description Test",
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    expect(categoryCreated).toHaveProperty("id");
  });

  it("Should not be able to create a new category with an existing name", async () => {
    const category = {
      name: "Category Test",
      description: "Category description Test",
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    await expect(
      createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      })
    ).rejects.toEqual(new AppError("Category already exists!"));
  });
});
