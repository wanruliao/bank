<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <main class="mx-auto my-2 w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl">
    <div class="mx-2 sm:mx-0 px-2">
      <span class="text-sm text-gray-400 mx-2">powered by <a href="https://5xruby.tw">5xCampus</a></span>
      <h1 class="text-4xl sm:text-5xl font-thin my-2">台灣銀行代碼查詢</h1>
    <!-- 銀行名稱與分行名稱搜尋 -->
      <section class="flex flex-col sm:flex-row">
        <div class="flex flex-col mr-0 sm:mr-2">
          <label for="bank" class="font-bold pl-1">銀行名稱</label>
          <select id="bank" class="mt-1 block w-full border border-gray-300 rounded-md hover:border-gray-400 focus:border-blue-400 text-lg text-gray-500 px-0.5 py-0.5">
            <option value="" disabled selected>請輸入關鍵字或銀行代碼...</option>
            <option >bank.name</option>
          </select>
          <p class="text-sm text-gray-400 pl-1 mt-1">可使用下拉選單或直接輸入關鍵字查詢</p>
        </div>
        <div class="flex flex-col mt-2 sm:mt-0">
          <label for="branch" class="font-bold pl-1">分行名稱</label>
          <select id="branch" class="mt-1 block w-full border border-gray-300 rounded-md hover:border-gray-400 focus:border-blue-400 text-lg text-gray-500 px-0.5 py-0.5">
            <option value="" disabled selected>請選擇分行名稱</option>
            <option>branch.name</option>
          </select>
        </div>
      </section>

      <section class="mt-4 sm:mt-2">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end px-2 py-2 bg-green-50 rounded border border-dotted border-gray-700">
          <div>
            <h2 class="text-3xl mt-1 mb-2">
              合作金庫商業銀行(006)
              <span class="block sm:inline">西門分行</span>
            </h2>
            <p class="text-xl my-1">
              分行代碼：0070948
              <button class="ml-2 bg-green-500 hover:bg-green-400 text-green-50 btn">複製代碼</button>
            </p>
            <p class="text-xl my-1">
              地址：臺北市大安區信義路四184號1、2樓及地下一樓
            </p>
            <p class="text-xl my-1">
              電話：02-23256000
            </p>
          </div>
          <footer class="text-sm text-green-900 text-right">
            資料來源：
            <a href="https://data.gov.tw/dataset/6041">政府資料開放平台</a>
          </footer>
        </div>
        <footer class="mt-2">
          <a href="＃" class="btn mr-1">
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
