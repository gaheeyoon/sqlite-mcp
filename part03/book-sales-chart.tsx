import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const BookSalesChart = () => {
  const salesData = [
    { year: '2024', month: '01', period: '2024-01', total_sales_qty: 24 },
    { year: '2024', month: '02', period: '2024-02', total_sales_qty: 2 },
    { year: '2024', month: '03', period: '2024-03', total_sales_qty: 4 },
    { year: '2024', month: '04', period: '2024-04', total_sales_qty: 4 },
    { year: '2024', month: '05', period: '2024-05', total_sales_qty: 0 }, // 데이터 없음
    { year: '2024', month: '06', period: '2024-06', total_sales_qty: 6 },
    { year: '2024', month: '07', period: '2024-07', total_sales_qty: 9 },
    { year: '2024', month: '08', period: '2024-08', total_sales_qty: 0 }, // 데이터 없음
    { year: '2024', month: '09', period: '2024-09', total_sales_qty: 0 }, // 데이터 없음
    { year: '2024', month: '10', period: '2024-10', total_sales_qty: 0 }, // 데이터 없음
    { year: '2024', month: '11', period: '2024-11', total_sales_qty: 0 }, // 데이터 없음
    { year: '2024', month: '12', period: '2024-12', total_sales_qty: 0 }, // 데이터 없음
    { year: '2025', month: '01', period: '2025-01', total_sales_qty: 2 },
    { year: '2025', month: '02', period: '2025-02', total_sales_qty: 4 },
    { year: '2025', month: '03', period: '2025-03', total_sales_qty: 3 },
    { year: '2025', month: '04', period: '2025-04', total_sales_qty: 15 },
    { year: '2025', month: '05', period: '2025-05', total_sales_qty: 14 },
    { year: '2025', month: '06', period: '2025-06', total_sales_qty: 4 },
    { year: '2025', month: '07', period: '2025-07', total_sales_qty: 3 }
  ];

  // 실제 판매 데이터만 필터링 (0이 아닌 값들)
  const actualSalesData = salesData.filter(item => item.total_sales_qty > 0);

  const totalSales = actualSalesData.reduce((sum, item) => sum + item.total_sales_qty, 0);
  const avgMonthlySales = Math.round(totalSales / actualSalesData.length * 10) / 10;

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          📚 생활코딩! PHP+MySQL 월별 판매량 분석
        </h1>
        <div className="text-sm text-gray-600 mb-4">
          <p><strong>ISBN:</strong> 9791158391348</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800">총 판매량</h3>
            <p className="text-2xl font-bold text-blue-600">{totalSales}권</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="text-lg font-semibold text-green-800">월평균 판매량</h3>
            <p className="text-2xl font-bold text-green-600">{avgMonthlySales}권</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h3 className="text-lg font-semibold text-purple-800">판매 기간</h3>
            <p className="text-sm font-bold text-purple-600">2024.01 ~ 2025.07</p>
          </div>
        </div>
      </div>

      {/* 라인 차트 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">📈 월별 판매량 추이</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={actualSalesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis 
                dataKey="period" 
                stroke="#666"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis stroke="#666" fontSize={12} />
              <Tooltip 
                formatter={(value, name) => [`${value}권`, '판매량']}
                labelFormatter={(label) => `기간: ${label}`}
                contentStyle={{
                  backgroundColor: '#f8f9fa',
                  border: '1px solid #dee2e6',
                  borderRadius: '6px'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="total_sales_qty" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, fill: '#1d4ed8' }}
                name="월별 판매량"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 바 차트 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">📊 월별 판매량 바 차트</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={actualSalesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis 
                dataKey="period" 
                stroke="#666"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis stroke="#666" fontSize={12} />
              <Tooltip 
                formatter={(value, name) => [`${value}권`, '판매량']}
                labelFormatter={(label) => `기간: ${label}`}
                contentStyle={{
                  backgroundColor: '#f8f9fa',
                  border: '1px solid #dee2e6',
                  borderRadius: '6px'
                }}
              />
              <Legend />
              <Bar 
                dataKey="total_sales_qty" 
                fill="#10b981"
                name="월별 판매량"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 데이터 테이블 */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">📋 상세 판매 데이터</h2>
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">연도</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">월</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">판매량</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {actualSalesData.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.year}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.month}월</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.total_sales_qty}권</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 분석 요약 */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h2 className="text-xl font-semibold text-blue-800 mb-3">📝 판매 분석 요약</h2>
        <div className="space-y-2 text-sm text-blue-700">
          <p>• <strong>최고 판매량:</strong> 2024년 1월 (24권) - 출간 초기 집중 판매</p>
          <p>• <strong>2024년 상반기:</strong> 총 49권 판매, 1월 출간 후 안정적인 판매세</p>
          <p>• <strong>2025년 상반기:</strong> 총 45권 판매, 4-5월에 재성장 트렌드</p>
          <p>• <strong>판매 패턴:</strong> 출간 초기 높은 판매량 후 안정화, 2025년 봄철 재성장</p>
        </div>
      </div>
    </div>
  );
};

export default BookSalesChart;