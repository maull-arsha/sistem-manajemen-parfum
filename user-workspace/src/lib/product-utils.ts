// Format number to IDR currency
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Calculate total material costs
export function calculateMaterialCosts(costs: {
  parfumOil: number;
  alcohol: number;
  additives: number;
  water: number;
}): number {
  return costs.parfumOil + costs.alcohol + costs.additives + costs.water;
}

// Calculate total packaging costs
export function calculatePackagingCosts(costs: {
  bottle: number;
  packaging: number;
  label: number;
  accessories: number;
}): number {
  return costs.bottle + costs.packaging + costs.label + costs.accessories;
}

// Calculate total production costs
export function calculateProductionCosts(costs: {
  labor: number;
  overhead: number;
  shipping: number;
  other: number;
}): number {
  return costs.labor + costs.overhead + costs.shipping + costs.other;
}

// Calculate HPP (Harga Pokok Produksi)
export function calculateHPP(
  materialCosts: number,
  packagingCosts: number,
  productionCosts: number
): number {
  return materialCosts + packagingCosts + productionCosts;
}

// Calculate selling price with margin and tax
export function calculateSellingPrice(
  hpp: number,
  marginPercentage: number,
  taxPercentage: number
): number {
  const marginAmount = (hpp * marginPercentage) / 100;
  const subtotal = hpp + marginAmount;
  const taxAmount = (subtotal * taxPercentage) / 100;
  return subtotal + taxAmount;
}

// Calculate profit
export function calculateProfit(sellingPrice: number, hpp: number): number {
  return sellingPrice - hpp;
}

// Calculate profit percentage
export function calculateProfitPercentage(sellingPrice: number, hpp: number): number {
  return ((sellingPrice - hpp) / hpp) * 100;
}

export type ProductFormData = {
  // Basic Information
  name: string;
  volume: number;
  category: string;
  concentration: number;
  description: string;

  // Material Costs
  materialCosts: {
    parfumOil: number;
    alcohol: number;
    additives: number;
    water: number;
  };

  // Packaging Costs
  packagingCosts: {
    bottle: number;
    packaging: number;
    label: number;
    accessories: number;
  };

  // Production Costs
  productionCosts: {
    labor: number;
    overhead: number;
    shipping: number;
    other: number;
  };

  // Pricing
  marginPercentage: number;
  taxPercentage: number;
};

export const DEFAULT_PRODUCT_DATA: ProductFormData = {
  name: "",
  volume: 0,
  category: "extrait de parfume",
  concentration: 0,
  description: "",
  materialCosts: {
    parfumOil: 0,
    alcohol: 0,
    additives: 0,
    water: 0,
  },
  packagingCosts: {
    bottle: 0,
    packaging: 0,
    label: 0,
    accessories: 0,
  },
  productionCosts: {
    labor: 0,
    overhead: 0,
    shipping: 0,
    other: 0,
  },
  marginPercentage: 0,
  taxPercentage: 0,
};
