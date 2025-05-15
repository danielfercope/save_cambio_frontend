import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function CurrencyChart({ fromCurrency, toCurrency, width = "100%", height = "400px" }) {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [days, setDays] = useState(7); // Período padrão de 7 dias

    useEffect(() => {
        if (!fromCurrency || !toCurrency) return;

        const fetchChartData = async () => {
            try {
                setLoading(true);
                setError(null);

                const endDate = new Date();
                const startDate = new Date();
                startDate.setDate(endDate.getDate() - days);

                const formatDate = (date) => date.toISOString().split('T')[0];

                const response = await fetch(
                    `http://localhost:3001/chart?from=${fromCurrency}&to=${toCurrency}&start=${formatDate(startDate)}&end=${formatDate(endDate)}`
                );

                if (!response.ok) {
                    throw new Error('Erro ao carregar dados do gráfico');
                }

                const data = await response.json();
                setChartData(data);
            } catch (err) {
                setError(err.message);
                console.error('Erro:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchChartData();
    }, [fromCurrency, toCurrency, days]);

    const formatDate = (dateString) => {
        return format(parseISO(dateString), 'dd/MM', { locale: ptBR });
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        return `1 ${fromCurrency} = ${context.parsed.y.toFixed(4)} ${toCurrency}`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                ticks: {
                    callback: (value) => `1 ${fromCurrency} = ${value} ${toCurrency}`
                }
            }
        }
    };

    const data = {
        labels: chartData.map(item => formatDate(item.date)),
        datasets: [
            {
                label: `Câmbio ${fromCurrency} para ${toCurrency}`,
                data: chartData.map(item => item.value),
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                tension: 0.1,
                pointRadius: 5,
                pointHoverRadius: 7
            }
        ]
    };

    return (
        <div className="chart-container" style={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
          <div className="chart-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h2 style={{ margin: 0 }}>Variação Cambial</h2>
            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              style={{
                padding: "0.5rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
                backgroundColor: "var(--background-color)",
                color: "var(--text-color)"
              }}
            >
              <option value={7}>7 dias</option>
              <option value={15}>15 dias</option>
              <option value={30}>30 dias</option>
              <option value={90}>90 dias</option>
            </select>
          </div>
      
          {loading && <p>Carregando gráfico...</p>}
          {error && <p style={{ color: "#ff4d4f" }}>{error}</p>}
      
          {!loading && !error && chartData.length > 0 && (
            <div style={{ 
              width: "100%", 
              height: "400px",
              position: "relative",
              margin: "0 auto"
            }}>
              <Line 
                data={data} 
                options={{
                  ...chartOptions,
                  responsive: true,
                  maintainAspectRatio: false
                }} 
              />
            </div>
          )}
      
          {!loading && !error && chartData.length === 0 && (
            <p>Nenhum dado disponível para o período selecionado</p>
          )}
        </div>
      );
}