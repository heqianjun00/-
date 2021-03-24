<template>
 <div id="edit"></div>
</template>

<script>
import E from 'wangeditor'

export default {
 data(){
 return{}
 },
 mounted(){
    let editor = new E( document.getElementById('edit') )
    editor.create()
 },
 created(){},
 methods:{},
 components:{}
}

</script>
<style scoped>
</style>