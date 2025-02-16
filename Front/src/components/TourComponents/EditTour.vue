<script setup>
import { ref, defineProps, onMounted } from 'vue';
import { GetOneTourForId, UpdateTourFunction } from '@/api/apiRequest';
import { useVareblesStore } from '@/store/varebles';
import { UploadTourPhohoFunction } from '@/api/apiRequest';

const vareblesStore = useVareblesStore();
const props = defineProps(['refreshTours']);

const title = ref('');
const description = ref('');
const fullDescription = ref('');
const price = ref(null);
const location = ref('');
const dateStart = ref('');
const dateEnd = ref('');
const nights = ref(null);
const transfer = ref(false);
const fileInput = ref(null);
const fileName = ref('Файл не выбран');
const selectedFile = ref(null);

onMounted(async () => {
    try {
        if (!vareblesStore.selectedTour) return;
        
        const res = await GetOneTourForId(vareblesStore.selectedTour);
        if (res.status === 200 && res.data) {
            title.value = res.data.title;
            description.value = res.data.description;
            fullDescription.value = res.data.fullDescription;
            price.value = res.data.price;
            location.value = res.data.location;
            dateStart.value = res.data.dateStart ? res.data.dateStart.split('T')[0] : '';
            dateEnd.value = res.data.dateEnd ? res.data.dateEnd.split('T')[0] : '';
            nights.value = res.data.nights;
            transfer.value = res.data.transfer;
        }
    } catch (error) {
        console.error("Ошибка при получении данных тура:", error);
    }
});

const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
        console.error("Файл не выбран");
        return;
    }if(file.size > 5242880){
        alert("Файл слишком большой!");
        return
    }

    fileName.value = file.name;
    selectedFile.value = file;

    const data = new FormData();
    data.append('file', file);
    data.append('id', vareblesStore.selectedTour);

    console.log("Отправляемый файл:", file);
    console.log("FormData содержимое:", [...data.entries()]); // Выведет пары ключ-значение

    UploadTourPhohoFunction(data).then((res) => {
        if (res?.status === 200) {
            // vareblesStore.setPopUpState(null);a
            alert("Фотография успешно обновлена!");
            props.refreshTours();
        } else {
            alert("Ошибка при обновлении тура! Заполните все поля правильно!");
        }
    }).catch((err) => {
        console.error("Ошибка загрузки файла:", err);
    });
};


const triggerFileInput = () => {
    fileInput.value.click();
};

const submitTour = async () => {
  try {
    const tourData = {
      title: title.value,
      description: description.value,
      fullDescription: fullDescription.value,
      price: price.value,
      location: location.value,
      dateStart: dateStart.value,
      dateEnd: dateEnd.value,
      nights: nights.value,
      transfer: transfer.value,
    };

    const res = await UpdateTourFunction(tourData, vareblesStore.selectedTour);
    if (res?.status === 200) {
      vareblesStore.setPopUpState(null);
      props.refreshTours(); // Обновляем список туров
    } else {
      alert("Ошибка при обновлении тура! Заполните все поля правильно!");
    }
  } catch (error) {
    console.error(error);
    alert('Ошибка при обновлении тура');
  }
};
</script>


<template>
  <section class="addTour">
    <div class="addTourInner">
      <h1>Редактирование тура</h1>
      <div class="closePopUp" @click="vareblesStore.setPopUpState(null)">&times;</div>
      <div class="InputInner">
        <div>
          <div class="InputInnerCont">
            <label>Название тура:</label>
            <input type="text" v-model="title" placeholder="Название тура" />
          </div>
          <div class="InputInnerCont">
            <label>Краткое описание:</label>
            <input type="text" v-model="description" placeholder="Краткое описание" />
          </div>
          <div class="InputInnerCont">
            <label>Подробное описание:</label>
            <textarea v-model="fullDescription" placeholder="Подробное описание"></textarea>
          </div>
          <div class="InputInnerCont">
            <label>Стоимость тура:</label>
            <input type="number" v-model="price" placeholder="Стоимость" />
          </div>
          <div class="InputInnerCont">
            <label>Расположение тура:</label>
            <input type="text" v-model="location" placeholder="Расположение" />
          </div>
        </div>
        <div>
          <div class="InputInnerCont">
            <label>Дата начала тура:</label>
            <input type="date" v-model="dateStart" />
          </div>
          <div class="InputInnerCont">
            <label>Дата окончания тура:</label>
            <input type="date" v-model="dateEnd" />
          </div>
          <div class="InputInnerCont">
            <label>Количество ночей:</label>
            <input type="number" v-model="nights" placeholder="Кол-во ночей" />
          </div>
          <div class="InputInnerCont">
            <label>Трансфер до аэропорта:</label>
            <div class="radio-group">
              <label>
                <input type="radio" v-model="transfer" :value="true" /> Да
              </label>
              <label>
                <input type="radio" v-model="transfer" :value="false" /> Нет
              </label>
            </div>
          </div>

          <div class="InputInnerCont">
            <label class="labelPhoto">Добавить или обновить фото:</label>
            <div class="file-upload">
              <button type="button" @click="triggerFileInput">Выбрать файл</button>
              <!-- <span>{{ fileName }}</span> -->
              <input type="file" ref="fileInput" @change="handleFileChange" hidden />
            </div>
          </div>

          <button class="btnSubmit" @click="submitTour">Сохранить</button>
        </div>
      </div>
    </div>
  </section>
</template>


<style lang="scss" scoped>
$primary-color: #927AF4;
$secondary-color: #78CFEB;
$darcIndigo: #4C3F91;

    .addTour{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        .addTourInner{
            width: 1000px;
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            position: relative;
            text-align: center;
            min-height: 200px;
            .closePopUp{
                position: absolute;
                top: 0px;
                right: 10px;
                background: none;
                border: none;
                font-size: 26px;
                cursor: pointer;
            }
            h1{
                color: $primary-color;
                font-size: 28px;
                position: absolute;
                left: 10px;
                top: 0px;
                margin: 0;
            }
            .InputInner{
                margin-top: 50px;
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
                .InputInnerCont{
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    margin-bottom: 15px;
                    width: 450px;
                    label{
                        font-size: 16px;
                        margin-bottom: 5px;
                    }
                    input{
                        width: 100%;
                        padding: 10px;
                        border: 1px solid $primary-color;
                        border-radius: 8px;
                        margin-bottom: 15px;
                        font-size: 16px;
                        outline: none;
                        box-sizing: border-box;
                        transition: 0.3s;
                        &:focus{
                            border-color: $secondary-color;
                            box-shadow: 0 0 8px rgba($secondary-color, 0.5);
                        }
                    }
                    textarea{
                        width: 100%;
                        padding: 10px;
                        border: 1px solid $primary-color;
                        border-radius: 8px;
                        margin-bottom: 15px;
                        font-size: 16px;
                        outline: none;
                        box-sizing: border-box;
                        transition: 0.3s;
                        resize: none;
                        &:focus{
                            border-color: $secondary-color;
                            box-shadow: 0 0 8px rgba($secondary-color, 0.5);
                        }
                    }
                }
            }
            .labeltext{
                text-align: start;
                display: flex;
                justify-content: start;
            }
            .radio-group {
                display: flex;
                gap: 20px;
                justify-content: start;
                align-items: center;
                margin-bottom: 0px;
                label {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 18px;
                    cursor: pointer;
                    color: #333;
                    font-weight: 500;
                    transition: color 0.2s ease-in-out;
            
                    &:hover {
                        color: #927AF4;
                    }
                }
            
                input {
                    appearance: none;
                    width: 20px;
                    height: 20px;
                    border: 2px solid #927AF4;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s ease-in-out;
                    position: relative;
            
                    &:checked {
                        background-color: #927AF4;
                        border-color: #927AF4;
                    }
            
                    &:checked::before {
                        content: '';
                        position: absolute;
                        width: 10px;
                        height: 10px;
                        background: white;
                        border-radius: 50%;
                    }
                }
            }
            .labelPhoto{
                margin-top: -23px;
            }
            .file-upload {
                display: flex;
                align-items: center;
                gap: 10px;
                width: 102%;
                button {
                  background-color: $primary-color;
                  color: white;
                  padding: 10px 15px;
                  border: none;
                  border-radius: 5px;
                  cursor: pointer;
                  font-size: 16px;
                  transition: background 0.2s;
                  box-sizing: border-box;
                  width: 105%;
                  &:hover {
                    background-color: darken($primary-color, 10%);
                  }
                }
          
                span {
                  font-size: 16px;
                  color: #333;
                }
              }
            .btnSubmit{
                background-color: $primary-color;
                color: white;
                padding: 10px 0px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 18px;
                width: 93%;
                position: relative;
                left: -15px;
                transition: background 0.2s ease-in-out;
                box-sizing: border-box;
                &:hover {
                    background-color: darken($primary-color, 10%);
                }
            }
        }
    }
</style>