<script setup>
    import IconList from '~icons/ph/list-fill'
    import IconX from '~icons/ph/x-bold'
    import { ref } from 'vue'
    const toggle = ref(false)
</script>


<template>
    <div class="relative">
        <button @click="toggle = !toggle" ><span v-if="!toggle" v-html="IconList" class="white hover:text-cyan-400 transition-colors" /><span v-if="toggle" v-html="IconX" class="white hover:text-cyan-400 transition-colors" /></button>
        <div class="absolute">
            <h1 v-if="toggle" class="hover: drop-shadow-2xl ">
                <h1 v-show="toggle">
                    <!-- <span v-html="IconX" class="white" /> -->
                    <div class="flex flex-col gap-4 font-light">
                        <a href="" class="mt-2 hover:text-cyan-400 transition-colors">Home</a>
                        <a href="" class="hover:text-cyan-400 transition-colors">Create</a>
                        <a href="" class="hover:text-cyan-400 transition-colors">About</a>
                    </div>
                </h1>
            </h1>
            <h1 v-else class="hover: drop-shadow-2xl"></h1>
        </div>          
    </div>
</template>
