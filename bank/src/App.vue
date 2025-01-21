<script setup>
import axios from 'axios';
import { ref, onMounted, watch } from 'vue';
import { useClipboard } from '@vueuse/core';
import { useRouter } from 'vue-router';

const router = useRouter();
const modifiedData = [];
const banksData = ref([]);
const selectedBank = ref(null);
const branchesData = ref([]);
const selectedBranch = ref(null);

onMounted(async () => {
  const rawData = await axios.get("https://stat.fsc.gov.tw/FSC_OAS3_RESTORE/API/json_EXPORT?TableID=B14");
  
  //初步整理資料
  for(const ele of rawData.data){
    const newEle = {
      bankCode: ele.總機構代號,
      branchCode: ele.機構代號,
      name: ele.機構名稱.replace("股份有限公司", "").replace("有限責任", "").replace("保證責任", ""),
      address: ele.地址,
      phone: ele.電話,
    }
    modifiedData.push(newEle);
  }

  //整理銀行名稱資料
  banksData.value = modifiedData.filter((el) => el.branchCode === "");
});

//監聽銀行名稱選擇結果，篩選指定分行
watch(selectedBank, (newBank) => {
  if(newBank){
    branchesData.value = [];
    selectedBranch.value = null;
    const newBranches = modifiedData.filter((el) => el.bankCode === newBank.bankCode && el.branchCode !== "");
    for(const ele of newBranches){
      const newEle = {
        ...ele,
        name: ele.name.replace(newBank.name, "")
      };
      branchesData.value.push(newEle);
    }
  }
})

watch(selectedBranch, (newBranch) => {
  if(newBranch){
    router.push({
      path: `/${selectedBank.value.bankCode}/${newBranch.branchCode}/${selectedBank.value.name}-${newBranch.name}.html`,
    });
  }
})

const { copy, copied } = useClipboard({
  copiedDuring: 1000,
});

</script>

<template>
  <main class="mx-auto my-2 w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl">
    <div class="mx-2 sm:mx-0 px-2">
      <span class="text-sm text-gray-400 mx-2">powered by <a href="https://5xruby.tw">5xCampus</a></span>
      <h1 class="text-4xl sm:text-5xl font-thin my-2">台灣銀行代碼查詢</h1>
      <section class="flex flex-col sm:flex-row">
        <div class="flex flex-col mr-0 sm:mr-2">
          <label for="bank" class="font-bold pl-1">銀行名稱</label>
          <multiselect id="bank" v-model="selectedBank" :options="banksData" :custom-label="(option) => `${option.bankCode} ${option.name}`" :selectLabel="''" :deselectLabel="''" :selectedLabel="''" :close-on-select="true" :clear-on-select="false" placeholder="請輸入關鍵字或銀行代碼...">
          </multiselect>
          <p class="text-sm text-gray-400 pl-1 mt-1">可使用下拉選單或直接輸入關鍵字查詢</p>
        </div>
        <div class="flex flex-col mt-2 sm:mt-0">
          <label for="branch" class="font-bold pl-1">分行名稱</label>
          <multiselect id="branch" v-model="selectedBranch" :options="branchesData" :custom-label="(option) => `${option.name}`" :selectLabel="''" :deselectLabel="''" :selectedLabel="''" :close-on-select="true" :clear-on-select="false" placeholder="請選擇分行名稱">
          </multiselect>
        </div>
      </section>

      <section v-if="selectedBranch" class="mt-4 sm:mt-2">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end px-2 py-2 bg-green-50 rounded border border-dotted border-gray-700">
          <div>
            <h2 class="text-3xl mt-1 mb-2">
              {{ `${selectedBank.name}(${selectedBank.bankCode}) ` }}
              <span class="block sm:inline">{{ selectedBranch.name }}</span>
            </h2>
            <p class="text-xl my-1">
              {{ `分行代碼：${selectedBranch.branchCode}` }}
              <button @click="copy(selectedBranch.branchCode)" class="ml-2 bg-green-500 hover:bg-green-400 text-green-50 btn">{{ copied ? "已複製" : "複製代碼" }}</button>
            </p>
            <p class="text-xl my-1">
              {{ `地址：${selectedBranch.address}` }}
            </p>
            <p class="text-xl my-1">
              {{ `電話：${selectedBranch.phone}` }}
            </p>
          </div>
          <footer class="text-sm text-green-900 text-right">
            資料來源：
            <a href="https://data.gov.tw/dataset/6041">政府資料開放平台</a>
          </footer>
        </div>
        <footer class="mt-2">
          <a href="/" class="btn mr-1">
            重新查詢
          </a>
          <button class="bg-blue-500 hover:bg-blue-400 text-blue-50 btn">
            複製此頁面連結
          </button>
        </footer>
      </section>
    </div>
  </main>
</template>

<style scoped>
.btn {
    border-radius: .25rem;
    border-width: 1px;
    --tw-border-opacity: 1;
    border-color: rgb(75 85 99 / var(--tw-border-opacity));
    padding: .25rem .5rem;
    font-size: .875rem;
    line-height: 1.25rem;
}
</style>
