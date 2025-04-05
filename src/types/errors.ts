
// Type simplifié pour les résultats de base de données

export type DbResult<T> = T extends PromiseLike<infer U> ? U : never
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }> ? Exclude<U, null> : never
export type DbResultErr = { 
  message: string;
  details: string;
  hint: string;
  code: string;
}
