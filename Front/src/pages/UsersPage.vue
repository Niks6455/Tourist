<script setup>
import { onMounted, ref, computed } from 'vue';
import { getUsers, updateUserRole } from '@/api/apiRequest';

const dataUsers = ref([]);
const searchQuery = ref('');

// Загружаем данные
onMounted(async () => {
    getUsers().then((response) => {
        if (response.status === 200) {
            dataUsers.value = response.data;
        }
    });
});

// Фильтр пользователей по поисковому запросу
const filteredUsers = computed(() => {
    if (!searchQuery.value) return dataUsers.value;

    return dataUsers.value.filter((user) => {
        return Object.values(user).some((field) =>
            String(field).toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    });
});

// Обновление роли пользователя
const changeRole = async (user, newRole) => {
    user.role = newRole;
    try {
        await updateUserRole(user.id, { role: newRole });
    } catch (error) {
        console.error('Ошибка обновления роли', error);
    }
};
</script>

<template>
    <section>
        <h1>Пользователи системы</h1>

        <!-- Поле поиска -->
        <input 
            v-model="searchQuery" 
            placeholder="Поиск по пользователям..." 
            class="search-input"
        />

        <div class="table-container" v-if="filteredUsers.length">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Имя</th>
                        <th>Email</th>
                        <th>Роль</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in filteredUsers" :key="user.id">
                        <td>{{ user.id }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                        <td>
                            <select v-model="user.role" @change="changeRole(user, user.role)">
                                <option value="user">Пользователь</option>
                                <option value="manager">Менеджер</option>
                                <option value="admin">Администратор</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p v-else>Ничего не найдено...</p>
    </section>
</template>

<style lang="scss" scoped>
$primary-color: #927AF4;
$secondary-color: #78CFEB;

section {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;

    h1 {
        color: $primary-color;
        font-size: 28px;
        margin-bottom: 15px;
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
        max-width: 800px;
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
        padding: 12px;
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
