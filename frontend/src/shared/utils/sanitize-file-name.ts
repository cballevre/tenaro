// Cleans a file name for S3/Supabase storage:
// - removes accents
// - replaces special characters with _
// - keeps only letters, numbers, . _ -

export function sanitizeFileName(name: string): string {
  return name
    .normalize('NFD') // removes accents
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9._-]/g, '_'); // replaces everything except letters, numbers, . _ -
}
