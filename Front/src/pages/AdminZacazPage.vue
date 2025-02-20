<script setup>
import { getBookings, updateBookingStatus } from '@/api/apiRequest';
import Header from '@/components/Header.vue';
import { onMounted, ref, computed } from 'vue';
import { useVareblesStore } from '@/store/varebles';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Chart, registerables } from 'chart.js';
import { onBeforeUnmount } from 'vue';
import Footer from '@/components/Footer.vue';
Chart.register(...registerables);

const vareblesStore = useVareblesStore();
const dataBrondeTours = ref([]);
const searchQuery = ref("");
const showChart = ref(false);
const chartInstance = ref(null);
const chartCanvas = ref(null);

onMounted(async () => {
  const response = await getBookings();
  if (response.status === 200) {
    dataBrondeTours.value = response.data;
    renderChart();
  }
});

onBeforeUnmount(() => {
  if (chartInstance.value) {
    chartInstance.value.destroy();
  }
});

const filteredBookings = computed(() => {
  if (!searchQuery.value) return dataBrondeTours.value;
  return dataBrondeTours.value.filter((booking) =>
    Object.values(booking).some((field) =>
      String(field).toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  );
});

const changeStatus = async (booking, newStatus) => {
  try {
    await updateBookingStatus({ bookingId: booking.id, status: newStatus });
    booking.status = newStatus;
  } catch (error) {
    console.error('Ошибка обновления статуса', error);
  }
};

const exportToExcel = () => {
  const formattedData = filteredBookings.value.map((booking) => ({
    ID: booking.id,
    "ФИО клиента": booking.User.fio,
    "Email клиента": booking.User.email,
    "Телефон": booking.phoneNumber,
    "Тур": booking.Tour.title,
    "Местоположение": booking.Tour.location,
    "Цена": booking.Tour.price,
    "Дата начала": new Date(booking.Tour.dateStart).toLocaleDateString(),
    "Дата окончания": new Date(booking.Tour.dateEnd).toLocaleDateString(),
    "Количество человек": booking.countPeople,
    "Требуется трансфер": booking.requiresTransfer ? "Да" : "Нет",
    "Статус бронирования": booking.status,
    "Комментарий": booking.comment || "—",
  }));
  const ws = XLSX.utils.json_to_sheet(formattedData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Бронирования");
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), "bookings.xlsx");
};

const renderChart = () => {
  if (chartInstance.value) {
    chartInstance.value.destroy();
  }
  const ctx = chartCanvas.value.getContext("2d");
  const tourCounts = {};
  dataBrondeTours.value.forEach((booking) => {
    const tourTitle = booking.Tour.title;
    tourCounts[tourTitle] = (tourCounts[tourTitle] || 0) + 1;
  });
  const labels = Object.keys(tourCounts);
  const data = Object.values(tourCounts);
  chartInstance.value = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Количество бронирований',
        data,
        backgroundColor: 'rgb(146, 122, 244)',
      }],
    },
  });
};

const toggleChartView = () => {
  showChart.value = !showChart.value;
  if (showChart.value) {
    setTimeout(renderChart, 100);
  }
};
</script>

<template>
  <main>
    <Header />
    <h1>Заявки на бронирование туров</h1>
    <div class="top-bar">
      <input v-model="searchQuery" placeholder="Поиск..." class="search-input" />
      <div class="top-barButtons">
        <button  class="export-btn" @click="toggleChartView">{{ showChart ? "Показать таблицу" : "Показать диаграмму" }}</button>
        <button class="export-btn" @click="exportToExcel"><img src="/img/export.png"/>Экспорт в Excel</button>
      </div>
    </div>
    <div v-if="showChart" class="chart-container">
        <div class="chart-containerInner">
          <canvas ref="chartCanvas"></canvas>
        </div>
      </div>
      
    <div class="table-container" v-else>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Пользователь</th>
            <th>Email</th>
            <th>Тур</th>
            <th>Статус</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="booking in filteredBookings" :key="booking.id">
            <td>{{ booking.id }}</td>
            <td>{{ booking.User.fio }}</td>
            <td>{{ booking.User.email }}</td>
            <td>{{ booking.Tour.title }}</td>
            <td>
              <select v-model="booking.status" @change="changeStatus(booking, booking.status)">
                <option value="pending">В обработке</option>
                <option value="confirmed">Подтверждено</option>
                <option value="canceled">Завершен</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
   
  </main>
  
</template>

<style scoped lang="scss">
$primary-color: rgb(146, 122, 244);
$secondary-color: #78CFEB;
$text-color: #333;

main {
    padding-top: 100px;
    min-height: calc(100vh - 330px);
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
        color: $primary-color;
        font-size: 32px;
        margin-bottom: 20px;
    }

    .top-bar {
        width: 90%;
        max-width: 1520px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
        .top-barButtons{
            display: flex;
            gap: 10px;
        }
    }

    .search-input {
        width: 300px;
        padding: 10px;
        border: 1px solid $primary-color;
        border-radius: 8px;
        font-size: 16px;
        outline: none;
        transition: 0.3s;

        &:focus {
            border-color: $secondary-color;
            box-shadow: 0 0 8px rgba($secondary-color, 0.5);
        }
    }

    .export-btn {
        background-color: $primary-color;
        color: white;
        padding: 10px 15px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 16px;
        transition: 0.3s;
        display: flex;
        justify-content: center;
        align-content: center;
        img{
            width: 24px;
            height: 24px;
            margin-right: 5px;
        }
        &:hover {
            background-color: darken($primary-color, 10%);
        }
    }

    .table-container {
        width: 90%;
        max-width: 1520px;
        overflow-x: auto;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        background: white;
        padding: 10px;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        border-radius: 10px;
        overflow: hidden;
    }

    th, td {
        border: 1px solid #ddd;
        padding: 14px;
        text-align: center;
        font-size: 14px;
    }

    th {
        background-color: $primary-color;
        color: white;
        font-weight: bold;
    }

    tr:nth-child(even) {
        background-color: #f9f9f9;
    }

    tr:hover {
        background-color: rgba($secondary-color, 0.2);
        cursor: pointer;
    }

    select {
        padding: 5px;
        border-radius: 5px;
        border: 1px solid $primary-color;
        background: white;
        font-size: 14px;
        cursor: pointer;
        outline: none;

        &:focus {
            border-color: $secondary-color;
        }
    }
}
.chart-container {
    width: 90%;
    max-width: 1220px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px auto;
  
    .chart-containerInner {
      width: 100%;
      height: auto /* Можно изменить в зависимости от нужной высоты */
    }
  
    canvas {
      width: 100% !important;
      height: 100% !important;
    }
  }
  
.table-container {
  overflow-x: auto;
}
</style>
