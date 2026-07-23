import * as XLSX from 'xlsx';
import type { LeadRow } from '@/types/db';

/**
 * Défense contre l'injection de formule dans un tableur (classe reconnue
 * OWASP, distincte du XSS) : un nom de client commençant par `=`, `+`, `-`
 * ou `@` s'exécute comme une formule à l'ouverture dans Excel/Sheets — pour
 * qui ouvre l'export, pas pour le site. On préfixe d'une apostrophe pour
 * forcer l'affichage en texte brut, sans changer la valeur visible.
 */
export function excelSafe(value: string): string {
  return /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
}

const headers = [
  'Type',
  'Nom',
  'Société',
  'Téléphone',
  'E-mail',
  'Service concerné',
  'Message',
  'Langue',
  'Statut',
  'Date',
];

export function exportLeadsToExcel(leads: readonly LeadRow[]) {
  const rows = leads.map((lead) => [
    lead.kind === 'devis' ? 'Devis' : 'Contact',
    excelSafe(lead.name),
    excelSafe(lead.organisation),
    excelSafe(lead.phone),
    excelSafe(lead.email),
    excelSafe(lead.service_slug),
    excelSafe(lead.message),
    lead.lang,
    lead.status,
    new Date(lead.created_at).toLocaleString('fr-FR'),
  ]);

  const sheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, sheet, 'Demandes');

  const date = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(workbook, `demandes-his-${date}.xlsx`);
}
