<script setup>
import { getBookings } from '@/api/apiRequest';
import Header from '@/components/Header.vue';
import { onMounted, ref } from 'vue';

const dataBrondeTours = ref([]);

onMounted(async () => {
    getBookings().then((response) => {
        console.log("response.data", response.data);
        if(response.status === 200){
            dataBrondeTours.value = response.data;
        }
    });
});
</script>

<template>
    <main>
        <Header />
        <h1>Заказы</h1>
        <div class="table-container" v-if="dataBrondeTours.length">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Пользователь</th>
                        <th>Тур</th>
                        <th>Статус</th>
                        <th>Комментарий</th>
                        <th>Кол-во людей</th>
                        <th>Дата начала</th>
                        <th>Дата окончания</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="booking in dataBrondeTours" :key="booking.id">
                        <td>{{ booking.id }}</td>
                        <td>{{ booking.userId }}</td>
                        <td>{{ booking.Tour.title }}</td>
                        <td>{{ booking.status }}</td>
                        <td>{{ booking.comment || '—' }}</td>
                        <td>{{ booking.countPeople }}</td>
                        <td>{{ new Date(booking.Tour.dateStart).toLocaleDateString() }}</td>
                        <td>{{ new Date(booking.Tour.dateEnd).toLocaleDateString() }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p v-else>Загрузка данных...</p>
    </main>
</template>

<style scoped lang="scss">
$primary-color: #927AF4;
$secondary-color: #78CFEB;
$text-color: #333;

main {
    padding-top: 100px;
    height: calc(100vh - 451px);
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
        color: $primary-color;
        font-size: 32px;
        margin-bottom: 20px;
    }

    .table-container {
        width: 90%;
        max-width: 1200px;
        overflow-x: auto;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    th, td {
        border: 1px solid #ddd;
        padding: 12px;
        text-align: center;
    }

    th {
        background-color: $primary-color;
        color: white;
    }

    tr:nth-child(even) {
        background-color: #f9f9f9;
    }

    tr:hover {
        background-color: #f5f5f5;
        cursor: pointer;
    }
}
</style>