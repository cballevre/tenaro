export function getCostCalculationString({
  supplyCost,
  laborCost,
  totalCost,
  translate,
}: {
  translate: (key: string) => string;
  supplyCost?: number;
  laborCost?: number;
  totalCost?: number;
}): string {
  if (supplyCost === undefined && laborCost === undefined) return '';
  const parts: string[] = [];
  if (supplyCost !== undefined) {
    parts.push(
      `${supplyCost} € (${translate('interventions.show.supply_cost')})`,
    );
  }
  if (supplyCost !== undefined && laborCost !== undefined) {
    parts.push(' + ');
  }
  if (laborCost !== undefined) {
    parts.push(
      `${laborCost} € (${translate('interventions.show.labor_cost')})`,
    );
  }
  if (totalCost !== undefined) {
    parts.push(` = ${totalCost} €`);
  }
  return parts.join('');
}
