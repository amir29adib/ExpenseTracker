interface IBaseRepository<TCreate, TUpdate, TEntity> {
  create(item: TCreate): TEntity;
  update(id: string, item: TUpdate): TEntity | undefined;
  findByUsername(username: string): TEntity | undefined;
  findById(id: string): TEntity | undefined;
  delete(): TEntity[];
  getAll(): TEntity[];
}
