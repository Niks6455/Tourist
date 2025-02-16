<script setup>
import { getBookings, updateBookingStatus } from '@/api/apiRequest';
import Header from '@/components/Header.vue';
import { onMounted, ref, computed } from 'vue';
import { useVareblesStore } from '@/store/varebles';

const vareblesStore = useVareblesStore();
const dataBrondeTours = ref([]);
const searchQuery = ref('');

// Загружаем данные
onMounted(async () => {
    getBookings().then((response) => {
        if(response.status === 200){
            dataBrondeTours.value = response.data;
        }
    });
});

// Фильтруем данные по поисковому запросу
const filteredBookings = computed(() => {
    if (!searchQuery.value) return dataBrondeTours.value;

    return dataBrondeTours.value.filter((booking) => {
        return Object.values(booking).some((field) => 
            String(field).toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    });
});

// Функция смены статуса
const changeStatus = async (booking, newStatus) => {
    const data = {
        bookingId: booking.id,
        status: newStatus
    }
    try {
        await updateBookingStatus(data);
        booking.status = newStatus;
    } catch (error) {
        console.error('Ошибка обновления статуса', error);
    }
};
</script>

<template>
    <main>
        <Header />
        <h1>Заявки на бронирование туров</h1>

        <!-- Поле поиска -->
        <input 
            v-model="searchQuery" 
            placeholder="Поиск по таблице..." 
            class="search-input"
        />

        <div class="table-container" v-if="filteredBookings.length">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Пользователь</th>
                        <th>Email</th>
                        <th>Тур</th>
                        <th>Комментарий</th>
                        <th>Кол-во людей</th>
                        <th>Номер телефона</th>
                        <th>Дата начала</th>
                        <th>Дата окончания</th>
                        <th>Статус</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="booking in filteredBookings" :key="booking.id">
                        <td>{{ booking.id }}</td>
                        <td>{{ booking.User.fio }}</td>
                        <td>{{ booking.User.email }}</td>
                        <td>{{ booking.Tour.title }}</td>
                        <td>{{ booking.comment || '—' }}</td>
                        <td>{{ booking.countPeople }}</td>
                        <td>{{ booking.phoneNumber }}</td>
                        <td>{{ new Date(booking.Tour.dateStart).toLocaleDateString() }}</td>
                        <td>{{ new Date(booking.Tour.dateEnd).toLocaleDateString() }}</td>
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
        <p v-else>Ничего не найдено...</p>
    </main>
</template>

<style scoped lang="scss">
$primary-color: #927AF4;
$secondary-color: #78CFEB;
$text-color: #333;

main {
    padding-top: 100px;
    height: calc(100vh - 330px);
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
        color: $primary-color;
        font-size: 32px;
        margin-bottom: 20px;
    }

    .search-input {
        width: 300px;
        padding: 10px;
        border: 1px solid $primary-color;
        border-radius: 8px;
        margin-bottom: 15px;
        font-size: 16px;
        outline: none;
        transition: 0.3s;

        &:focus {
            border-color: $secondary-color;
            box-shadow: 0 0 8px rgba($secondary-color, 0.5);
        }
    }

    .table-container {
        width: 90%;
        max-width: 1200px;
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
</style>