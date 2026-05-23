<template>
  <div class="flex h-screen w-screen overflow-hidden bg-[#F4F7FE]">
    <!-- Left Sidebar -->
    <AppSidebar />

    <!-- Right Panel Wrapper -->
    <div class="flex-1 flex flex-col h-full overflow-hidden">
      <!-- Top Header -->
      <AppHeader />

      <!-- Main Content Viewport -->
      <main class="flex-1 overflow-hidden p-6 bg-[#F4F7FE] flex flex-col">
        <router-view v-slot="{ Component }">
          <Transition name="fade-slide" mode="out-in">
            <component :is="Component" class="flex-1 flex flex-col min-h-0" />
          </Transition>
        </router-view>
      </main>
    </div>

    <!-- Global Toast Notifications -->
    <BaseToast />
  </div>
</template>

<script setup>
import AppSidebar from '../components/layout/AppSidebar.vue'
import AppHeader from '../components/layout/AppHeader.vue'
import BaseToast from '../components/base/BaseToast.vue'
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}
</style>
