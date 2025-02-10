// import { useState, useEffect } from 'react'
// import dynamic from 'next/dynamic'
// import { api } from '~services/api'

// const ChartNoSSR = dynamic(() => import('react-apexcharts'), { ssr: false })

interface SplineProps {
  type:
    | 'line'
    | 'area'
    | 'bar'
    | 'pie'
    | 'donut'
    | 'radialBar'
    | 'scatter'
    | 'bubble'
    | 'heatmap'
    | 'candlestick'
    | 'boxPlot'
    | 'radar'
    | 'polarArea'
    | 'rangeBar'
    | 'rangeArea'
    | 'treemap'
    | undefined
  height: number
  title: string
}

export function Spline({ type, height, title }: SplineProps) {
//   const [data, setData] = useState<any[]>([]) // Estado para os dados do gráfico
//   const [loading, setLoading] = useState<boolean>(true) // Estado para o carregamento dos dados

//   // Função para buscar os dados
//   const fetchData = async () => {
//     try {
//       const response = await api.get('/pedido') 
//       const fetchedData = response.data

//       // Certifique-se de que os dados retornados sejam estruturados corretamente
//       const chartData = fetchedData.map((item: any) => ({
//         date: new Date(item.date).getTime(), // Convertendo a data para timestamp
//         value: item.total, // O campo 'total' deve ser retornado do seu backend
//       }))

//       setData(chartData) // Atualiza os dados para o gráfico
//     } catch (error) {
//       console.error('Erro ao buscar dados', error)
//     } finally {
//       setLoading(false) // Marca como carregamento concluído
//     }
//   }

//   useEffect(() => {
//     fetchData()
//   }, [])

//   // Verifica se há dados e prepara a série
//   const series = [
//     {
//       name: 'Vendas',
//       data: data.map(item => item.value), // Extraímos os valores para o gráfico
//     },
//   ]

//   // Configuração do gráfico
//   const options = {
//     chart: {
//       height: height,
//       type: type,
//       toolbar: {
//         show: false,
//       },
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     // stroke: {
//     //   curve: 'smooth',
//     // },
//     xaxis: {
//       type: 'datetime',
//       categories: data.length > 0 ? data.map(item => item.date) : [], // Garantir que não há erro se os dados estiverem vazios
//     },
//     tooltip: {
//       x: {
//         format: 'dd/MM/yy HH:mm',
//       },
//     },
//     legend: {
//       show: false,
//     },
//     colors: ['var(--blue-100)'],
//     fill: {
//       colors: ['var(--blue-100)'],
//       gradient: {
//         shadeIntensity: 1,
//         opacityFrom: 0.7,
//         opacityTo: 0,
//       },
//     },
//     markers: {
//       colors: ['var(--blue-100)'],
//     },
//   }

//   return (
//     <div>
//       <small
//         className="badge ms-3 text-uppercase"
//         style={{
//           background: 'var(--blue-50)',
//           fontSize: '25px',
//           padding: '10px',
//           fontWeight: '700',
//         }}
//       >
//         {title}
//       </small>
//       <div style={{ width: '100%', padding: '15px' }}>
//         {loading ? (
//           <div style={{ textAlign: 'center', marginTop: '50px' }}>
//             <p>Carregando gráfico...</p> {/* Mensagem de carregamento */}
//           </div>
//         ) : data.length > 0 ? (
//           <ChartNoSSR
//             options={options}
//             series={series}
//             type={type}
//             height={height}
//           />
//         ) : (
//           <div style={{ textAlign: 'center', marginTop: '50px' }}>
//             <p>Sem dados para exibir.</p> {/* Mensagem caso não haja dados */}
//           </div>
//         )}
//       </div>
//     </div>
//   )
}
