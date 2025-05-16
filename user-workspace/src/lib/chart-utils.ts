// Chart data types
export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
    borderWidth?: number;
  }[];
}

// Chart options and configurations
export const defaultChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    title: {
      display: true,
      text: '',
    },
  },
};

// Color schemes
export const chartColors = {
  primary: 'rgb(99, 102, 241)',
  secondary: 'rgb(161, 163, 247)',
  success: 'rgb(34, 197, 94)',
  danger: 'rgb(239, 68, 68)',
  warning: 'rgb(234, 179, 8)',
  info: 'rgb(6, 182, 212)',
  // Transparent versions for backgrounds
  primaryTransparent: 'rgba(99, 102, 241, 0.2)',
  secondaryTransparent: 'rgba(161, 163, 247, 0.2)',
  successTransparent: 'rgba(34, 197, 94, 0.2)',
  dangerTransparent: 'rgba(239, 68, 68, 0.2)',
  warningTransparent: 'rgba(234, 179, 8, 0.2)',
  infoTransparent: 'rgba(6, 182, 212, 0.2)',
};

// Helper function to generate random colors
export function generateRandomColors(count: number): string[] {
  return Array.from({ length: count }, () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
  });
}

// Sample data generators for different chart types
export function generateSalesChartData(salesData: any[]): ChartData {
  const labels = salesData.map(sale => new Date(sale.date).toLocaleDateString('id-ID'));
  const totals = salesData.map(sale => sale.total);
  const profits = salesData.map(sale => sale.profit);

  return {
    labels,
    datasets: [
      {
        label: 'Total Penjualan',
        data: totals,
        backgroundColor: chartColors.primaryTransparent,
        borderColor: chartColors.primary,
        borderWidth: 2,
      },
      {
        label: 'Profit',
        data: profits,
        backgroundColor: chartColors.successTransparent,
        borderColor: chartColors.success,
        borderWidth: 2,
      },
    ],
  };
}

export function generateProductPerformanceChart(products: any[]): ChartData {
  const labels = products.map(product => product.name);
  const quantities = products.map(product => product.quantity);

  return {
    labels,
    datasets: [
      {
        label: 'Jumlah Terjual',
        data: quantities,
        backgroundColor: generateRandomColors(products.length),
        borderWidth: 1,
      },
    ],
  };
}

export function generateHPPCompositionChart(productData: any): ChartData {
  const labels = [
    'Biaya Bahan',
    'Biaya Kemasan',
    'Biaya Produksi',
  ];

  const data = [
    productData.materialCosts,
    productData.packagingCosts,
    productData.productionCosts,
  ];

  return {
    labels,
    datasets: [
      {
        label: 'Komposisi HPP',
        data,
        backgroundColor: [
          chartColors.primary,
          chartColors.success,
          chartColors.warning,
        ],
        borderWidth: 1,
      },
    ],
  };
}

export function generateInventoryChart(inventoryData: any[]): ChartData {
  const labels = inventoryData.map(item => item.productName);
  const currentStock = inventoryData.map(item => item.stock);
  const minStock = inventoryData.map(item => item.minStock);

  return {
    labels,
    datasets: [
      {
        label: 'Stok Saat Ini',
        data: currentStock,
        backgroundColor: chartColors.primaryTransparent,
        borderColor: chartColors.primary,
        borderWidth: 2,
      },
      {
        label: 'Minimum Stok',
        data: minStock,
        backgroundColor: chartColors.dangerTransparent,
        borderColor: chartColors.danger,
        borderWidth: 2,
      },
    ],
  };
}

export function generateMarketingEffectivenessChart(
  marketingCosts: Record<string, number>,
  sales: number
): ChartData {
  const labels = Object.keys(marketingCosts).map(key => 
    key.charAt(0).toUpperCase() + key.slice(1)
  );
  const costs = Object.values(marketingCosts);

  return {
    labels,
    datasets: [
      {
        label: 'Biaya Marketing',
        data: costs,
        backgroundColor: generateRandomColors(costs.length),
        borderWidth: 1,
      },
    ],
  };
}
